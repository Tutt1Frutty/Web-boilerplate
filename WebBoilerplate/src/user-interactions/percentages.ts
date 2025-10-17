import {FormattedUser} from './interfaces';
import {findUsers} from "./search";

export function calcPercentageOfFoundUsers(users: FormattedUser[], param: string) {
    const percent = (findUsers(users, param).length / users.length) * 100.0;
    return Math.round(percent * 10) / 10;
}