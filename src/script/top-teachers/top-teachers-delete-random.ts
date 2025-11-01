const deleteTenTeachers = async () => {
    const resp = await fetch("/api/delete-teachers-random", {
        method: "DELETE",
        body: JSON.stringify({ amount: 10 }),
        headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error(await resp.text());
};
export const setupDeleteLessTopTeachers = (onChange: ()=>void) => {
    const deleteLessButton = document.querySelector('.delete-some-random-teachers');

    deleteLessButton.addEventListener('click', async () => {
        await deleteTenTeachers();
        onChange();
    });
};