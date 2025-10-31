import {isNil, isNull} from "./tools";
import {User} from "../data/normalize/users-normalization";

export interface AgeRange {
    min?: number;
    max?: number;
}

export interface Filter {
    countries?: string[];
    genders?: string[];
    favorites?: boolean[];
    photos?: boolean[];
    ageRange?: AgeRange;
}

export interface ParsedFilter {
    countries: string[];
    genders: string[];
    favorites: boolean[];
    photos: boolean[];
    ageRange: {
        min: number;
        max: number;
    };
}

const filterFields = ['countries', 'genders', 'favorites', 'ageRange', 'photos'] as const;

export const parseFilter = (filter: Filter = {}): ParsedFilter | null => {
    const filterKeys = Object.keys(filter);
    if (!filterKeys.every((k) => filterFields.includes(k as typeof filterFields[number]))) return null;

    const countries = Array.isArray(filter.countries) ? filter.countries : [];
    const genders = Array.isArray(filter.genders) ? filter.genders : [];
    const favorites = Array.isArray(filter.favorites) ? filter.favorites : [];
    const photos = Array.isArray(filter.photos) ? filter.photos : [];

    const ar = filter.ageRange ?? {};
    const minNum = Number(ar.min);
    const maxNum = Number(ar.max);

    const ageRange = {
        min: Number.isFinite(minNum) ? minNum : 0,
        max: Number.isFinite(maxNum) ? maxNum : 999,
    };

    return { countries, genders, favorites, ageRange, photos };
};

export const usersFilterUtil = (users: User[], filter: Filter = {}): User[] => {
    const parsedFilter = parseFilter(filter);
    if (isNil(parsedFilter)) return users;

    const { countries, genders, favorites, ageRange, photos } = parsedFilter;

    return users.filter((user: User) => {
        const ageOk = user.age >= ageRange.min && user.age <= ageRange.max;
        const genderOk = genders.length ? genders.includes(user.gender) : true;
        const countryOk = countries.length ? countries.includes(user.country) : true;
        const favoriteOk = favorites.length ? favorites.includes(user.favorite) : true;
        const photoOk = photos.length ? photos.includes(!isNull(user.picture_large)) : true;

        return ageOk && genderOk && countryOk && favoriteOk && photoOk;
    });
};
