import db from "../../../server/db.json" assert { type: "json" };

const countriesList = new Set<string>(
    db.users
        .map((u) => u.country)
        .filter((c): c is string => typeof c === "string" && c.trim().length > 0)
);

export const addCountryOptions = (): boolean => {
    const container = document.querySelector<HTMLSelectElement>("#country-filter");
    if (!container) return false;

    const options = Array.from(countriesList).map(
        (country) => `<option value="${country}">${country}</option>`
    );

    container.innerHTML += options.join("");
    return true;
};
