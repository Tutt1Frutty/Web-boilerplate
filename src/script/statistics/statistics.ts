import { User } from "../../data/normalize/users-normalization";
import {Filter, usersFilterUtil} from "../../user-interactions/filters";
import { userSearchUtil } from "../../user-interactions/search";
import { usersSortUtil } from "../../user-interactions/sorting";
import { isNil } from "../../user-interactions/tools";
import {setupFilters} from "../top-teachers/top-teachers-filter";
import {setupSearch} from "../top-teachers/top-teachers-search";

type SortOrder = "asc" | "desc" | null;

interface SortOptions {
    sortBy: keyof User | null;
    order: SortOrder;
}

interface StatisticsProperties {
    getUsers: () => Promise<User[]>;
    tableRows: number;
    currentPage: number;
    sort: SortOptions;
}

let tableRows = 10;
let currentPage = 1;
let sort: SortOptions = { sortBy: null, order: null };
let filterState: Filter = {};
let searchState = "";

const getUsers = async (): Promise<User[]> => {
    const fetchedUsers = await(await fetch('/api/users')).json();
    let users: User[] = fetchedUsers.users.slice();
    users = usersFilterUtil(users, filterState)
    if (searchState !== '') {
        users = userSearchUtil(users, searchState);
    }
    return users;
};

const statisticProperties: StatisticsProperties = {
    getUsers,
    tableRows,
    currentPage,
    sort,
};

const fillRow = (user: User): string => `
    <tr data-id="${user.id}">
        <td>${isNil(user.full_name) ? "" : user.full_name}</td>
        <td>${isNil(user.course) ? "" : user.course}</td>
        <td>${isNil(user.age) ? "" : user.age}</td>
        <td>${isNil(user.gender) ? "" : user.gender}</td>
        <td>${isNil(user.country) ? "" : user.country}</td>
    </tr>
`;

const loadTable = async (
    getUsers: () => Promise<User[]>,
    tableRows: number,
    currentPage: number,
    sort: SortOptions
): Promise<void> => {
    const tableBody = document.querySelector(".statistics-table tbody");
    if (!tableBody) return;

    const users = usersSortUtil(await getUsers(), sort);
    const start = (currentPage - 1) * tableRows;
    const pageUsers = users.slice(start, start + tableRows);
    tableBody.innerHTML = pageUsers.map((user) => fillRow(user)).join("");
};

const loadPagination = (
    usersAmount: number,
    tableRows: number,
    currentPage: number,
    querySelector: string
): void => {
    const totalPages = Math.max(1, Math.ceil(usersAmount / tableRows));
    let paginationContainer = document.querySelector(`${querySelector} > ul`);

    if (!paginationContainer) {
        paginationContainer = document.createElement("ul");
        document.querySelector(querySelector)?.appendChild(paginationContainer);
    }

    const loadPageButton = (page: number, label = String(page)): string => {
        return `<button type="button" class="pagination-button${
            currentPage === page ? " is-active" : ""
        }" data-page="${page}">${label}</button>`;
    };

    if (totalPages === 1) {
        paginationContainer.innerHTML = loadPageButton(1);
        return;
    }

    const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 1)
        .map((p) => loadPageButton(p))
        .join("");

    paginationContainer.innerHTML = pages + loadPageButton(totalPages, "last");
};

const loadTablePagination = async (
    usersAmount: number,
    tableRows: number,
    currentPage: number
): Promise<void> => {
    loadPagination(usersAmount, tableRows, currentPage, ".statistics-section > .navigation-buttons");
};

const goToPage = async (
    getUsers: () => Promise<User[]>,
    page: number,
    currentPage: number,
    tableRows: number,
    sort: SortOptions
): Promise<number> => {
    const users = await getUsers();
    const totalPages = Math.max(1, Math.ceil(users.length / tableRows));
    const newPage = Math.min(Math.max(1, page), totalPages);

    await loadTable(getUsers, tableRows, (currentPage = newPage), sort);
    await loadTablePagination(users.length, tableRows, currentPage);

    return currentPage;
};

const changePage = async (
    querySection: Element,
): Promise<void> => {
    querySection.addEventListener("click", async (e) => {
        const target = (e.target as HTMLElement).closest(".pagination-button") as HTMLElement | null;
        if (!target) return;

        statisticProperties.currentPage = await goToPage(
            statisticProperties.getUsers,
            Number(target.dataset.page),
            statisticProperties.currentPage,
            statisticProperties.tableRows,
            statisticProperties.sort
        );
    });
};

const toggleSort = async (
    sort: SortOptions,
    sortByValue: keyof User
): Promise<SortOptions> => {
    if (sort.sortBy !== sortByValue) {
        return { sortBy: sortByValue, order: "asc" };
    } else if (sort.order === "asc") {
        return { sortBy: sortByValue, order: "desc" };
    } else {
        return { sortBy: null, order: null };
    }
};

const changeSorting = async (
    querySection: Element,
): Promise<void> => {
    querySection.addEventListener("click", async (e) => {
        const target = (e.target as HTMLElement).closest("th[data-sort]") as HTMLElement | null;
        if (!target) return;

        querySection
            .querySelectorAll("th[data-sort]")
            .forEach((th) => th.classList.remove("is-sorted-asc", "is-sorted-desc"));

        const newSort = await toggleSort(
            statisticProperties.sort,
            target.dataset.sort as keyof User
        );

        if (newSort.order === "asc") target.classList.add("is-sorted-asc");
        else if (newSort.order === "desc") target.classList.add("is-sorted-desc");

        statisticProperties.sort = newSort;

        await loadTable(
            statisticProperties.getUsers,
            statisticProperties.tableRows,
            statisticProperties.currentPage,
            statisticProperties.sort
        );
    });
};

export const initializeStatisticsPage = async (querySection: Element): Promise<void> => {
    await loadTable(
        statisticProperties.getUsers,
        statisticProperties.tableRows,
        statisticProperties.currentPage,
        statisticProperties.sort
    );
    await loadTablePagination(
        (await statisticProperties.getUsers()).length,
        statisticProperties.tableRows,
        statisticProperties.currentPage
    );
    await changePage(querySection);
    await changeSorting(querySection);
};

document.addEventListener("componentsLoaded", async () => {
    const statisticsSection = document.querySelector(".statistics-section");
    if (!statisticsSection) return;
    statisticProperties.currentPage = 1;
    await initializeStatisticsPage(statisticsSection);
    setupFilters(async (filter: Filter) => {
        filterState = filter;
        statisticProperties.currentPage = 1;
        await changePage(statisticsSection);
        await initializeStatisticsPage(statisticsSection);
    });
    setupSearch(async (query: string) => {
        searchState = query;
        statisticProperties.currentPage = 1;
        await changePage(statisticsSection);
        await initializeStatisticsPage(statisticsSection);
    });
});

document.addEventListener("change", async () => {
    const statisticsSection = document.querySelector(".statistics-section");
    if (!statisticsSection) return;
    await changeSorting(statisticsSection);
    await initializeStatisticsPage(statisticsSection);
});