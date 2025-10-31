import { isString } from '../../user-interactions/tools';

export const startsWithCapitalChar = (str: unknown): boolean => {
    if (!isString(str) || str.trim() === '') {
        return false;
    }
    return str.charAt(0) === str.charAt(0).toUpperCase();
};

const lowercaseParticles = new Set([
    "van", "der", "de", "den", "von", "da", "di", "del", "la", "le", "du", "of", "the"
]);

export const startsWithCapitalCharEveryWord = (str: unknown): boolean => {
    if (!isString(str) || str.trim() === '') return false;

    return str
        .split(/\s+/)
        .every((word) =>
            lowercaseParticles.has(word.toLowerCase()) || startsWithCapitalChar(word)
        );
};
