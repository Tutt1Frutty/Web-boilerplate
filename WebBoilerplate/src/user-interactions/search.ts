import {FormattedUser} from './interfaces';

export function findUsers(users: FormattedUser[], param: string): FormattedUser[] {
    const ageBoundRegex = /^(<=|>=|<|>|=)\s*(\d+)$/;
    const matchAgeBound = param.match(ageBoundRegex);
    if (matchAgeBound) {
        return findByAgeBound(users, matchAgeBound);
    }
    const ageIntervalRegex = /^(\d+)\s*(-)\s*(\d+)$/;
    const matchAgeInterval = param.match(ageIntervalRegex);
    if (matchAgeInterval) {
        return findByAgeInterval(users, matchAgeInterval);
    }
    return users.filter(user =>
        user.full_name.toLowerCase().includes(param.toLowerCase()) ||
        user.note?.toLowerCase().includes(param.toLowerCase()) ||
        user.age === Number(param)
    );
}

function getPredicateFunc(operator: string): (a: number, b: number) => boolean {
    switch (operator) {
        case '>':
            return (a, b) => a > b;
        case '>=':
            return (a, b) => a >= b;
        case '<':
            return (a, b) => a < b;
        case '<=':
            return (a, b) => a <= b;
        case '=':
            return (a, b) => a === b;
        default:
            return () => false;
    }
}

function findByAgeBound(users: FormattedUser[], match: string[]) {
    const [operator, num] = match;
    const predicateFunc = getPredicateFunc(operator);
    return users.filter(user => predicateFunc(user.age ?? 0, Number(num)));
}

function findByAgeInterval(users: FormattedUser[], match: string[]) {
    const firstNum = Number(match[1]);
    const secondNum = Number(match[3]);
    return users.filter(user =>
        (user.age ?? 0) >= firstNum && (user.age ?? 0) <= secondNum);
}