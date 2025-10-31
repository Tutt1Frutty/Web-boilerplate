import { isNil } from './tools';
import {User} from "../data/normalize/users-normalization";

export const userSearchUtil = (users: User[], value: string) => {
    if(isNil(value) || value === '' ) return users;
    const strValue = String(value).trim().toLocaleLowerCase();

    return users.filter((user: User) => {
        const nameOk = !isNil(user?.full_name) ? user.full_name.toLocaleLowerCase().includes(strValue) : false;
        const noteOk = !isNil(user?.note) ? user.note.toLocaleLowerCase().includes(strValue) : false;
        const ageOk = !isNil(user?.age) ? String(user.age).toLocaleLowerCase() === strValue : false;
        return nameOk || noteOk || ageOk;
    });
};