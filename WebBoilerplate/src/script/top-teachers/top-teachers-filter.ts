import {AgeRange, Filter} from "../../user-interactions/filters";

export const setupFilters = (onFilterChange: (filter: Filter) => void): void => {
    const filtersContainer = document.querySelector(".filters");
    if (!filtersContainer) return;

    const parseFilterOptions = (): Filter => {
        const ageInput = filtersContainer.querySelector<HTMLInputElement>('[name="age"]');
        const countryInput = filtersContainer.querySelector<HTMLSelectElement>('[name="country"]');
        const sexInput = filtersContainer.querySelector<HTMLSelectElement>('[name="sex"]');
        const favInput = filtersContainer.querySelector<HTMLInputElement>('[name="only-favourites"]');
        const photoInput = filtersContainer.querySelector<HTMLInputElement>('[name="only-with-photo"]');

        let ageParsed: AgeRange | {} = {};
        if (ageInput) {
            const selectedAge = ageInput.value;
            if (selectedAge === "all") {
                ageParsed = {};
            } else {
                const parts = selectedAge.split("-").map(Number);
                ageParsed =
                    parts.length === 2 ? { min: parts[0], max: parts[1] } : { min: parts[0] };
            }
        }

        return {
            ageRange: ageParsed,
            countries: countryInput && countryInput.value !== "all" ? [countryInput.value] : [],
            genders: sexInput && sexInput.value !== "all" ? [sexInput.value] : [],
            favorites: favInput?.checked ? [true] : [],
            photos: photoInput?.checked ? [true] : [],
        };
    };

    const updateFilters = (): void => {
        const filter = parseFilterOptions();
        onFilterChange(filter);
    };

    filtersContainer.addEventListener("change", updateFilters);

    updateFilters();
};
