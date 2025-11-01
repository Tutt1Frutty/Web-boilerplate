import validatedUsers from '../results/validatedUsers.json';
import { usersFilterUtil } from "./filters";
import {userFilteredPercentUtil} from "./percentages";
import {usersSortUtil} from "./sorting";
import {userSearchUtil} from "./search";

const filteredUsers = usersFilterUtil(
    validatedUsers,
    {
        // genders: ['Male'],
        // favorites: [true, false],
        // ageRange: { max: 70 },
        // countries: ['United States'],
        // photos: [true],
    }
);

console.log(filteredUsers.length);
console.log(filteredUsers);
//
// const usersSorted = usersSortUtil(validatedUsers, { sortBy: 'age', order: 'asc' });
// console.log(usersSorted);
//
// const usersSearched = userSearchUtil(validatedUsers, 'Dar');
// console.log(usersSearched);
//
// const searchWithPercent = userFilteredPercentUtil(validatedUsers, 24, userSearchUtil);
// console.log(searchWithPercent);