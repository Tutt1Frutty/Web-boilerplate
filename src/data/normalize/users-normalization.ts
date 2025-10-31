import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import { yearsPassedUtil } from './years-passed';
import { getRandomCourseUtil } from './get-random-course';
import { UserDataClass } from '../user-data-class';
import {UserLike} from "./user-get-comparable-id";
import {normalizePhoneNumber} from "./phone-normalization";
import {capitalizeWord, isNil, isObject } from "../../user-interactions/tools";

interface RawUser {
    gender?: string;
    title?: string;
    full_name?: string;
    name?: { title: string; first: string; last: string };
    location?: {
        city: string;
        state: string;
        country: string;
        coordinates: { latitude: number; longitude: number };
        timezone: { offset: string; description: string };
        postcode: string | number;
    };
    city?: string;
    state?: string;
    country?: string;
    coordinates?: { latitude: number; longitude: number };
    timezone?: { offset: string; description: string };
    postcode?: string | number;
    dob?: { date: string; age: number };
    b_day?: string;
    picture?: { large: string; thumbnail: string };
    picture_large?: string;
    picture_thumbnail?: string;

    id?: { name?: string; value?: string } | string | null;

    email?: string;
    phone?: string;
    favorite?: boolean;
    bg_color?: string;
    note?: string;
}

export interface User {
    id?: number | string;
    email?: string | null;
    phone?: string | null;
    age?: number | null;
    gender?: string | null;
    note?: string | null;
    state?: string | null;
    city?: string | null;
    full_name?: string | null;
    country?: string | null;
    favorite?: boolean;
    picture_large?: string;
    picture_thumbnail?: string;
    course?: string;
    b_date?: string | null;
    bg_color?: string | null;
}

const normalizeName = (user: RawUser) => {
    if (!isNil(user.name)) {
        return {
            title: capitalizeWord(user.name.title),
            full_name: capitalizeWord(user.name.first) + ' ' + capitalizeWord(user.name.last),
        };
    }
    return {
        title: capitalizeWord(user.title) ?? "Noname",
        full_name: capitalizeWord(user.full_name) ?? "Noname",
    };
};

const normalizeLocation = (user: RawUser) => {
    if (!isNil(user.location)) {
        return {
            city: capitalizeWord(user.location.city),
            state: capitalizeWord(user.location.state),
            country: capitalizeWord(user.location.country),
            coordinates: user.location.coordinates,
            timezone: user.location.timezone,
            postcode: user.location.postcode,
        };
    }
    return {
        city: capitalizeWord(user.city) ?? null,
        state: capitalizeWord(user.state) ?? null,
        country: capitalizeWord(user.country) ?? null,
        coordinates: user.coordinates ?? null,
        timezone: user.timezone ?? null,
        postcode: user.postcode ?? null,
    };
};

const normalizeBDateAndAge = (user: RawUser) => {
    if (!isNil(user.dob)) {
        const dateObj = new Date(user.dob.date);
        return {
            b_date: isNaN(dateObj.getTime()) ? null : dateObj.toISOString(),
            age: user.dob.age,
        };
    }
    if (!isNil(user.b_day)) {
        const bDate = new Date(user.b_day);
        return {
            b_date: isNaN(bDate.getTime()) ? null : bDate.toISOString(),
            age: yearsPassedUtil(bDate),
        };
    }
    return { b_date: null, age: null };
};

const normalizePicture = (user: RawUser) => {
    if (!isNil(user.picture)) {
        return {
            picture_large: user.picture.large,
            picture_thumbnail: user.picture.thumbnail,
        };
    }
    return {
        picture_large: user.picture_large ?? null,
        picture_thumbnail: user.picture_thumbnail ?? null,
    };
};

const normalizeId = (user: RawUser) => {
    if (!isNil(user.id) && isObject(user.id)) {
        const idObj = user.id as { name: string; value: string };
        return { id: idObj.name + idObj.value };
    }
    return { id: (user.id as string) ?? null };
};

const normalizePhone = (user: RawUser): { phone: string | null } => {
    if (!isNil(user?.location)) {
        return {
            phone: normalizePhoneNumber(user.phone, user.location?.country) ?? null,
        };
    }

    return {
        phone: normalizePhoneNumber(user?.phone, user?.country) ?? null,
    };
};

export const userNormalizeDataUtil = (data: RawUser[]): User[] => {
    return data.map(
        (user) => ({
            gender: capitalizeWord(user?.gender) ?? null,
            email: user?.email ?? null,
            ...normalizePhone(user),
            ...normalizeName(user),
            ...normalizeLocation(user),
            ...normalizeBDateAndAge(user),
            ...normalizePicture(user),
            ...normalizeId(user),
            course: getRandomCourseUtil(),
            favorite: user?.favorite ?? false,
            bg_color: user?.bg_color ?? null,
            note: isNil(user?.note) ? null : capitalizeWord(user.note),
        })
    );
};

export const userNormalizeAndSave = async (
    data: UserLike[],
    filename = 'users.json',
    baseUrl = import.meta.url
) => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    const normalizedUsers = userNormalizeDataUtil(data);
    await writeFile(outPath, JSON.stringify(normalizedUsers, null, 2));
};
