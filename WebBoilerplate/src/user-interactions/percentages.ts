import {User} from "../data/normalize/users-normalization";

export const userFilteredPercentUtil = (users: User[], filterValue, filterFunc) => {
    const initialLength = users.length;
    const filtered = filterFunc(users, filterValue);
    return {users: filtered, filteredPercent: filtered.length / initialLength * 100}
};