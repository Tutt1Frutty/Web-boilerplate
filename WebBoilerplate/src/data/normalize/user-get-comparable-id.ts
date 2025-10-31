export interface UserLike {
    id?: string | { name?: string; value?: string };
    email?: string | null;
}

export const userGetComparableIdUtil = (
    user: UserLike | null | undefined,
    getEmail = false
): string | null => {
    if (!user) return null;

    const id = user.id;

    if (id && typeof id === 'object') {
        const n = id.name?.toString().trim() ?? '';
        const v = id.value?.toString().trim() ?? '';
        const joined = (n + v).replace(/\s+/g, '');
        if (joined && !getEmail) return joined;
        return user.email ?? null;
    }

    if (typeof id === 'string') {
        return !getEmail ? id : user.email ?? null;
    }

    return user.email ?? null;
};
