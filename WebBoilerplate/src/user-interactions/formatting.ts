import {FormattedUser, Gender} from './interfaces';
import {capitalizeWord, generateId, getRandomCourse} from './tools';

export function mergeUsers(users: FormattedUser[], additionalUsers: FormattedUser[]): FormattedUser[] {
    return getDistinctUsers(users.concat(additionalUsers));
}

function getDistinctUsers(users: FormattedUser[]): FormattedUser[] {
    return users.filter((item, index, self) =>
        index === self.findIndex(t => t.email === item.email)
    );
}

export function formatUsersAndAddFields(users: any[]): FormattedUser[] {
    return users.map(user => addMissingFields(formatUser(user)));
}

export function addFieldsToUsers(users: any[]): FormattedUser[] {
    return users.map(user => addMissingFields(user));
}

function addMissingFields(user: any): FormattedUser {
    return {
        ...user,
        id: user.id || generateId(13),
        favourite: user.favourite || false,
        course: user.course || getRandomCourse(),
        bg_color: user.bg_color || "#ffffff",
        note: user.note || "Note",
    };
}

function formatUser(user: any): Partial<FormattedUser> {
    return {
        gender: capitalizeWord(user.gender) as Gender,
        title: user.name.title,
        full_name: user.name.first + ' ' + user.name.last,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        date_of_birth: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail
    };
}