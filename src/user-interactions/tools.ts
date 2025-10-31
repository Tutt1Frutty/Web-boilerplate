import * as fs from "fs";
import * as path from "path";
import {User} from "../data/normalize/users-normalization";

export const isNull = (val) => val === null;

export const isNil = (val) => val === undefined || val === null;

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isObject = (value: unknown): value is object => value !== null && typeof value === 'object';

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const hasKey = <T extends object>(obj: T, key: keyof any): boolean => Object.prototype.hasOwnProperty.call(obj, key);

export function toJson(users: User[], filePath: string): void {
    const data = JSON.stringify(users, null, 2);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing to the file:', err);
        }
    });
}

export function capitalizeWord(word: string) {
    if (!word){
        return "";
    }
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function getInitials(name: string): string {
    return name.trim()
        .split(/\s+/)
        .map(word => word[0].toLocaleUpperCase() + ".")
        .join(" ");
}

export function splitName(name: string): { firstname: string; lastname: string } {
    const parts = name.trim().split(/\s+/);
    return {
        firstname: parts[0] || "",
        lastname: parts[1] || ""
    };
}

export function generateId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

export function getRandomCourse(): string {
    const courses = [
        "Mathematics",
        "Physics",
        "English",
        "Computer Science",
        "Dancing",
        "Chess",
        "Biology",
        "Chemistry",
        "Law",
        "Art",
        "Statistics",
        "Medicine"
    ];
    const randomIndex = Math.floor(Math.random() * courses.length);
    return courses[randomIndex];
}