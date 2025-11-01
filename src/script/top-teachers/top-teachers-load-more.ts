const loadTenTeachers = async () => {
    const resp = await fetch("/api/random-teachers", {
        method: "POST",
        body: JSON.stringify({ amount: 10 }),
        headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error(await resp.text());
};
export const setupLoadMoreTopTeachers = (onChange: ()=>void) => {
    const loadMoreButton = document.querySelector('.load-some-random-teachers');

    loadMoreButton.addEventListener('click', async () => {
        await loadTenTeachers();
        onChange();
    });
};