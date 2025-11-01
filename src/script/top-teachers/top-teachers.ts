import {splitName, isNull, getInitials} from '../../user-interactions/tools'
import {User} from "../../data/normalize/users-normalization";
import {Filter, usersFilterUtil} from "../../user-interactions/filters";
import {userSearchUtil} from "../../user-interactions/search";
import {setupFilters} from "./top-teachers-filter";
import {addCountryOptions} from "./countries-options-filters";
import {setupSearch} from "./top-teachers-search";
import {setupLoadMoreTopTeachers} from "./top-teachers-load-more";
import {setupDeleteLessTopTeachers} from "./top-teachers-delete-random";

const createTeacherCard = (teacher: User): string => {
    const picture = !isNull(teacher.picture_large)
        ? `<div class="teacher-photo-clipper"><img class="teacher-photo-avatar" src="${teacher.picture_large}" alt="teacher-photo"></div>`
        : `<div class="teacher-text-avatar">${getInitials(teacher.full_name)}</div>`;

    const star = teacher.favorite
        ? `<img class="teacher-star" src="/src/static/images/star.png" alt="star-icon">`
        : `<img class="teacher-star" style="display: none;" src="/src/static/images/star.png" alt="star-icon">`;

    const teachernameParsed = splitName(teacher.full_name);

    return `
    <div class="teacher-card" data-id="${teacher.id}">
        <div class="wrapper">
        ${picture}
        ${star}
        </div>
        <div class="teacher-info">
            <div class="teacher-name">
                <p>${teachernameParsed.firstname}</p>
                <p>${teachernameParsed.lastname}</p>
            </div>
            <p class="teacher-subject">${teacher.course}</p>
            <p class="teacher-country">${teacher.country}</p>
        </div>
    </div>
`;
}

export function loadTeachers(teachers: User[]): boolean {
    const container = document.querySelector('.teachers-list');
    if (!container) {
        return false;
    }
    container.innerHTML = teachers
        .slice()
        .sort(() => Math.random() - 0.5)
        .map(createTeacherCard)
        .join("");
    return true;
}

let filterState = {};
let searchState = '';

const getUsers = async () => {
    const users = await(await fetch('/api/users')).json();
    let filtered = usersFilterUtil(users.users, filterState);
    if (searchState !== '') {
        filtered = userSearchUtil(filtered, searchState);
    }

    return filtered
}

document.addEventListener('componentsLoaded', async () => {
    loadTeachers(await getUsers());
    addCountryOptions();
    setupFilters(async (filter: Filter) => {
        filterState = filter;
        loadTeachers(await getUsers());
    });
    setupSearch(async (query: string) => {
        searchState = query;
        loadTeachers(await getUsers());
    });
    setupLoadMoreTopTeachers(async () => loadTeachers(await getUsers()));
    setupDeleteLessTopTeachers(async () => loadTeachers(await getUsers()));
});
