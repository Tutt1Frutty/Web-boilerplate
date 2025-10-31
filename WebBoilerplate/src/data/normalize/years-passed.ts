export const yearsPassedUtil = (date: unknown): number | null => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return null;

    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
        age--;
    }

    return age;
};
