import { isNil, isString } from "./tools";

type SortOrder = "asc" | "desc";

export interface Sort<T> {
    sortBy: keyof T;
    order: SortOrder;
}

export const parseSort = <T extends Record<string, any>>(
    sort: Partial<Sort<T>> = {}
): Sort<T> | null => {
    const keysArr = Object.keys(sort);
    if (keysArr.length !== 2 || !keysArr.includes("order") || !keysArr.includes("sortBy")) {
        return null;
    }

    const { order, sortBy } = sort as Sort<T>;

    if (!["asc", "desc"].includes(order)) return null;
    return { order, sortBy };
};

export const usersSortUtil = <T extends Record<string, any>>(
    users: T[],
    sort: Partial<Sort<T>> = {}
): T[] => {
    const parsedSort = parseSort(sort);
    if (isNil(parsedSort)) return users;

    const { order, sortBy } = parsedSort;
    const orderNum = order === "asc" ? 1 : -1;

    return [...users].sort((a, b) => {
        const va = a?.[sortBy];
        const vb = b?.[sortBy];

        if (isString(va) && isString(vb)) {
            return va.localeCompare(vb) * orderNum;
        }

        if (va > vb) return 1 * orderNum;
        if (va < vb) return -1 * orderNum;
        return 0;
    });
};
