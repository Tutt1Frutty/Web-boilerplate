import {courses} from "../../user-interactions/interfaces";

export const courseOptionsDropdown = () => {
    const specialityContainer = document.querySelector("#teacher-speciality");
    if (!specialityContainer) return;
    const options = courses.map(course => `<option value="${course}">${course}</option>`);
    if (!options) return;
    specialityContainer.innerHTML = options.join('');
};