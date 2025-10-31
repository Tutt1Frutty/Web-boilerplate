import db from "../../../server/db.json" assert { type: "json" };

import {splitName, isNull, getInitials} from '../../user-interactions/tools'
import {User} from "../../data/normalize/users-normalization";

const createFavTeacherCard = (teacher: User) => {
    const pic = !isNull(teacher?.picture_large)
        ? `<div class="teacher-photo-clipper"><img class="teacher-photo-avatar" src="${teacher.picture_large}" alt="teacher-photo"></div>`
        : `<div class="teacher-text-avatar"><span>${getInitials(teacher.full_name)}</span></div>`;
    const teacherNameParsed = splitName(teacher.full_name);

    return `
    <div class="teacher-card" data-id="${teacher.id}">
      <div class="wrapper">
        ${pic}
      </div>
      <div class="teacher-info">
        <div class="teacher-name">
          <p>${teacherNameParsed.firstname}</p>
          <p>${teacherNameParsed.lastname}</p>
        </div>
        <p class="teacher-country">${teacher.country}</p>
      </div>
    </div>
  `;
};

export const loadFavourites = (usersList: User[]) => {
    const container = document.querySelector(".favourites-list");
    if (!container) return;
    const favourites = usersList.filter((u) => u.favorite === true);
    container.innerHTML = favourites.map(createFavTeacherCard).join("");

    initCarousel(container);
};

const initCarousel = (container) => {
    const previousButton = document.querySelector(".list-prev-button");
    const nextButton = document.querySelector(".list-next-button");

    if (!previousButton || !nextButton) return;

    const scrollAmount = container.firstElementChild?.offsetWidth || 250;

    previousButton.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
};

document.addEventListener("componentsLoaded", () => {
    loadFavourites(db.users);
});