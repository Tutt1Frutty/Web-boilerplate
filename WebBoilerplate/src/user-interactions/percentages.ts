import {FormattedUser} from './interfaces';
import {findUsers} from "./search";

export function calcPercentageOfFoundUsers(users: FormattedUser[], param: string) {
    return (findUsers(users, param).length / users.length) * 100.0;
}