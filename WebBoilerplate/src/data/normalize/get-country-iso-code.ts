import { countries } from 'countries-list';

export const getCountryIsoCode = (countryName: string): string | null => {
    const entry = Object.entries(countries).find(
        ([, info]) => info.name.toLowerCase() === countryName.toLowerCase()
    );

    return entry ? entry[0] : null;
};