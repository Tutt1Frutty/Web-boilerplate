import { emailValidation } from './validate-email';
import { phoneValidation } from './validate-phone';
import { isNumber } from '../../user-interactions/tools';
import {
    startsWithCapitalChar,
    startsWithCapitalCharEveryWord
} from './validate-string';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import {User} from "./users-normalization";

export interface ValidationResult {
    changedIds: Array<number | string>;
    users: User[];
}

export const userValidateDataUtil = (data: User[]): ValidationResult => {
    const invalidIds = new Set<string|number>();

    const markInvalid = (id: number | string): null => {
        invalidIds.add(id);
        return null;
    };

    const users: User[] = data.map((user) => ({
        ...user,
        email: emailValidation(user?.email) ? user?.email : markInvalid(user.id),
        phone: phoneValidation(user?.phone, user?.country) ? user?.phone : markInvalid(user.id),
        age: isNumber(user?.age) ? user?.age : markInvalid(user.id),
        gender: startsWithCapitalChar(user?.gender) ? user?.gender : markInvalid(user.id),
        note: startsWithCapitalChar(user?.note) ? user?.note : markInvalid(user.id),
        state: startsWithCapitalChar(user?.state) ? user?.state : markInvalid(user.id),
        city: startsWithCapitalChar(user?.city) ? user?.city : markInvalid(user.id),
        full_name: startsWithCapitalCharEveryWord(user?.full_name) ? user?.full_name : markInvalid(user.id),
    }));

    const changedIds:(string|number)[] = Array.from(invalidIds );

    //eslint-disable-next-line no-console
    console.log(`Invalid fields were in users with IDs: [${changedIds.join(', ')}]`);

    return { changedIds, users };
};

export const userValidateDataAndSave = async (
    data: User[],
    filename = 'users-validated.json',
    baseUrl: string = import.meta.url
): Promise<void> => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    const result = userValidateDataUtil(data);
    await writeFile(outPath, JSON.stringify(result, null, 2));
};
