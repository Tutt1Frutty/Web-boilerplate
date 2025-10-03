import {randomUserMock, additionalUsers} from './FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from './formatting';
import {validateUsers} from './checks';
import {filterUsers} from "./filters";
import {FilterParams} from "./interfaces";
import {sortUsers} from './sorting';
import {toJson} from './tools'
import {findUsers} from "./search";
import {calcPercentageOfFoundUsers} from "./percentages";

const formattedUsers = formatUsersAndAddFields(randomUserMock);
toJson(formattedUsers, './../results/formatted.json');
const mergedUsers
    = mergeUsers(formattedUsers, addFieldsToUsers(additionalUsers));
toJson(mergedUsers, './../results/mergedUsers.json');
console.log(`Formatted users num: ${formattedUsers.length}`);
console.log(`Additional users num: ${additionalUsers.length}`);
console.log(`Merged users num: ${mergedUsers.length} \n`);

const validatedUsers= validateUsers(mergedUsers);
toJson(validatedUsers, './../results/validatedUsers.json')
console.log(`Num of validated users: ${validatedUsers.length}\n`);

const filters: FilterParams = {
    gender: "Male",
    country: 'Ireland',
    favourite: false,
};
const filteredUsers = filterUsers(validatedUsers, filters);
toJson(filteredUsers, './../results/filteredUsers.json')
console.log(`Num of filtered users: ${filteredUsers.length}\n`);

const sortedUsers = sortUsers(validatedUsers, 'country', 'desc');
toJson(sortedUsers, './../results/sortedUsers.json')
console.log(`Users were sorted\n`);

const searchParam = '30-40';

const searchResult = findUsers(validatedUsers, searchParam);
toJson(searchResult, './../results/foundUsers.json');
console.log(`Users found: ${searchResult.length}\n`);

const percent = calcPercentageOfFoundUsers(validatedUsers, searchParam);
console.log(`Percent of found users: ${percent}`);