import db from "../../../server/db.json";
import { isNull } from '../../user-interactions/tools';
import {User} from "../../data/normalize/users-normalization";

const createTeacherInfoModal = (teacher: User) => {
    const pic = !isNull(teacher?.picture_large)
        ? `<img src="${teacher.picture_large}" alt="teacher-photo-modal" class="teacher-photo-modal">`
        : `<div class="teacher-photo-modal">no photo</div>`
    const email = !isNull(teacher.email)
        ? `<a href="mailto:${teacher.email}">${teacher.email}</a>`
        : `<span>no email</span>`;
    const favouriteButton = teacher.favorite
        ? `<button class="standard-button" id="mark-favourite">Unmark favourite</button>`
        : `<button class="standard-button" id="mark-favourite">Mark favourite</button>`;

    return `
    <div class="teacher-card-modal-wrapper">
        ${pic}
        <div class="teacher-info-modal-wrapper">
            <div class="teacher-name">
                ${teacher.full_name}
            </div>
            <p class="teacher-subject-modal">${teacher.course}</p>
            <p>${teacher.city}, ${teacher.country}</p>
            <p>${teacher?.age ?? 'no age'}, ${teacher.gender}</p>
            ${email}
            <p>${teacher?.phone ?? 'no phone'}</p>
        </div>
    </div>
    <p class="teacher-info-modal-description">${teacher?.note ?? ''}</p>
    <div class="teacher-info-wrapper-bottom">
        <a href="#" class="toggle-map-modal">toggle map</a>
        ${favouriteButton}
    </div>
`
};

const changeFavourite = async (id, value) => {
    const resp = await fetch("/api/set-favourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value }),
    });
    if (!resp.ok) throw new Error(await resp.text());

    return resp.json();
};

const openTeacherInfoModal = (teacher: User) => {
    const modal = document.getElementById('teacher-info-modal');
    const modalBody = modal.querySelector(".teacher-info-modal-body");
    if (!modal || !modalBody) return;
    modalBody.innerHTML = createTeacherInfoModal(teacher);
    modal.style.display = "block";

    const favBtn = modalBody.querySelector<HTMLButtonElement>("#mark-favourite");
    if (favBtn) {
        favBtn.addEventListener("click", async () => {
            teacher.favorite = !teacher.favorite;
            await changeFavourite(teacher.id, teacher.favorite);
            modalBody.innerHTML = createTeacherInfoModal(teacher);
            openTeacherInfoModal(teacher);
        });
    }
};

document.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest(".teacher-card[data-id]") as HTMLElement | null;
    if (!card) return;

    const teacher: User = db.users.find((u: User) => String(u.id) === card.dataset.id);

    if (teacher) {
        openTeacherInfoModal(teacher);
    }
});