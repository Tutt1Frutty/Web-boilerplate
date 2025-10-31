export const setupSearch = (onSearchChange: (query: string) => void): void => {
    const searchForm = document.querySelector<HTMLFormElement>(".search-field");
    const searchInput = searchForm?.querySelector<HTMLInputElement>("#search-input");

    if (!searchForm || !searchInput) return;

    const handleSearch = (event: Event): void => {
        event.preventDefault();
        const query = searchInput.value.trim();
        onSearchChange(query);
    };

    searchForm.addEventListener("submit", handleSearch);
};
