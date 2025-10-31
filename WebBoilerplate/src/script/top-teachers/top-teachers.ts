import {splitName, isNull, getInitials} from '../../user-interactions/tools'
import db from "../../../server/db.json" assert { type: "json" };
import {User} from "../../data/normalize/users-normalization";
import {Filter, usersFilterUtil} from "../../user-interactions/filters";
import {userSearchUtil} from "../../user-interactions/search";
import {setupFilters} from "./top-teachers-filter";
import {addCountryOptions} from "./countries-options-filters";
import {setupSearch} from "./top-teachers-search";

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

export function loadTenTeachers(teachers: User[]): boolean {
    const container = document.querySelector('.teachers-list');
    if (!container) {
        return false;
    }
    container.innerHTML = teachers
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(createTeacherCard)
        .join("");
    return true;
}

let filterState = {};
let searchState = '';

const getUsers = (): User[] => {
    let filtered = usersFilterUtil(db.users, filterState);
    if (searchState !== '') {
        filtered = userSearchUtil(filtered, searchState);
    }

    return filtered
}

document.addEventListener('componentsLoaded', () => {
    loadTenTeachers(getUsers());
    addCountryOptions();
    setupFilters((filter: Filter) => {
        filterState = filter;
        loadTenTeachers(getUsers());
    });
    setupSearch((query: string) => {
        searchState = query;
        loadTenTeachers(getUsers());
    });
});
