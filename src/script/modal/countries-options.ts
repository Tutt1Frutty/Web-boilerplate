import { countries } from 'countries-list';

export const countryOptionsDropdown = () => {
    const countryContainer = document.querySelector("#teacher-country") as HTMLSelectElement | null;
    if (!countryContainer) return;

    const options = Object.values(countries).map((country: any) => {
        const value = typeof country === "string"
            ? country
            : country.name || country.country || Object.values(country)[0];

        return `<option value="${value}">${value}</option>`;
    });

    countryContainer.innerHTML = options.join('');
};