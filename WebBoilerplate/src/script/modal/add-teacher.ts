import {yearsPassedUtil} from "../../data/normalize/years-passed";
import {User} from "../../data/normalize/users-normalization";
import {courseOptionsDropdown} from "./courses-options";
import {capitalizeWord} from "../../user-interactions/tools";
import {countryOptionsDropdown} from "./countries-options";

const addNewTeacher = async (userData: User) => {
    const response = await fetch("/api/add-new-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error(await response.text());

    return response.json();
};

document.addEventListener('componentsLoaded', async () => {
    const addTeacherModal = document.getElementById('add-teacher-modal');
    const addTeacherForm = addTeacherModal?.querySelector('.add-teacher-form') as HTMLFormElement | null;
    if (!addTeacherModal || !addTeacherForm) return;

    countryOptionsDropdown();
    courseOptionsDropdown();

    addTeacherForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dateOfBirth = addTeacherForm["teacher-dob"].value;
        const years = dateOfBirth ? yearsPassedUtil(new Date(dateOfBirth)) : null;
        const color = addTeacherForm["teacher-color"].value || "#000000";

        const newUser: User = {
            id: crypto.randomUUID(),
            full_name: addTeacherForm["teacher-name"].value.trim(),
            course: addTeacherForm["teacher-speciality"].value,
            country: addTeacherForm["teacher-country"].value,
            city: addTeacherForm["teacher-city"].value,
            email: addTeacherForm["teacher-email"].value.trim(),
            phone: addTeacherForm["teacher-phone"].value.trim(),
            b_date: String(new Date(dateOfBirth)),
            gender: capitalizeWord(addTeacherForm["teacher-sex"].value),
            bg_color: color,
            age: years,
            note: addTeacherForm["teacher-notes"].value || '',
            favorite: false,
            picture_large: `https://singlecolorimage.com/get/${String(color).replace("#","")}/100x100`,
        };
        try {
            await addNewTeacher(newUser);
            alert('New teacher added successfully!');
            addTeacherForm.reset();
        } catch (error) {
            alert(`Error adding teacher: ${error}`);
        }
    });
});