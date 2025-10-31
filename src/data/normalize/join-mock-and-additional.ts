import { userGetComparableIdUtil, UserLike } from './user-get-comparable-id';

const fillMissingDeep = <T extends Record<string, any>>(base: T, donor: T): T => {
    const result: any = Array.isArray(donor) ? [] : {};

    const keys = new Set([...Object.keys(donor ?? {}), ...Object.keys(base ?? {})]);
    for (const key of keys) {
        const baseVal = base?.[key];
        const donorVal = donor?.[key];

        if (baseVal !== null && baseVal !== undefined && baseVal !== '') {
            result[key] =
                typeof baseVal === 'object' && typeof donorVal === 'object' && baseVal && donorVal
                    ? fillMissingDeep(baseVal, donorVal)
                    : baseVal;
        } else {
            result[key] = donorVal;
        }
    }

    return result as T;
};

export const joinMockAndAdditionalUtil = (
    randomUserMock: UserLike[] = [],
    additionalUsers: UserLike[] = []
): UserLike[] => {
    const joinedUsers = new Map<string, UserLike>();

    for (const u of additionalUsers) {
        let key = userGetComparableIdUtil(u);
        if (key === u.id) {
            const hasMatch = randomUserMock.some(randU => userGetComparableIdUtil(randU) === key);
            if (hasMatch) key = userGetComparableIdUtil(u, true);
        }
        if (!key) continue;
        joinedUsers.set(key, u);
    }

    for (const u of randomUserMock) {
        const key = userGetComparableIdUtil(u);
        if (!key) continue;

        if (joinedUsers.has(key)) {
            const merged = fillMissingDeep(joinedUsers.get(key)!, u);
            joinedUsers.set(key, merged);
        } else {
            joinedUsers.set(key, u);
        }
    }

    return Array.from(joinedUsers.values());
};
