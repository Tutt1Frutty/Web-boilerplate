import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to emulate import.meta.url in CommonJS
export const importMetaUrl = (filename: string) => {
    return pathToFileURL(path.resolve(filename)).href;
};

// Helper to get directory like import.meta.url usage
export const importMetaDir = (filename: string) => {
    return path.dirname(fileURLToPath(importMetaUrl(filename)));
};