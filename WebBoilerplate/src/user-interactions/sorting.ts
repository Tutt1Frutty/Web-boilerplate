import {FormattedUser} from './interfaces';

type SortingField = 'full_name' | 'age' | 'b_day' | 'country';
type Order = 'asc' | 'desc';

export function sortUsers(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    if (isStringField(field)) {
        return sortUsersByStringField(users, field, order);
    } else if (field === 'age') {
        return sortUsersByNumField(users, field, order);
    } else {
        return sortUsersByDateField(users, field, order);
    }
}

function isStringField(field: string): boolean {
    return field === 'full_name' || field === 'country';
}

function sortUsersByStringField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return users.sort((a, b) => {
        const fieldA = a[field] as string;
        const fieldB = b[field] as string;
        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
}

function sortUsersByNumField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return users.sort((a, b) => {
        const fieldA = a[field] as number;
        const fieldB = b[field] as number;
        return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });
}

function sortUsersByDateField(users: FormattedUser[], field: SortingField, order: Order = 'asc'): FormattedUser[] {
    return users.sort((a, b) => {
        const fieldA = new Date(a[field] as string);
        const fieldB = new Date(b[field] as string);
        return order === 'asc' ? fieldA.getTime() - fieldB.getTime() : fieldB.getTime() - fieldA.getTime();
    });
}