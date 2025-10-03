import {FormattedUser, FilterParams} from "./interfaces";

export function applyFilter(user: FormattedUser, filter: FilterParams): boolean {
    return Object.keys(filter).every((key) => {
        return user[key as keyof FilterParams] === filter[key as keyof FilterParams];
    });
}

export function filterUsers(users: FormattedUser[], filter: FilterParams): FormattedUser[] {
    return users.filter(user => applyFilter(user, filter));
}