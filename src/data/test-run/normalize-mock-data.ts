import { userNormalizeAndSave } from '../normalize/users-normalization';
import { joinMockAndAdditionalUtil } from '../normalize/join-mock-and-additional';
import { additionalUsers, randomUserMock } from '../FE4U-Lab2-mock';

(async () => {
    try {
        const joinedUsers = joinMockAndAdditionalUtil(randomUserMock, additionalUsers);
        await userNormalizeAndSave(joinedUsers, 'users-normalized.json');
        console.log('Users-normalized.json saved successfully.');
    } catch (error) {
        console.error('Error normalizing users:', (error as Error).stack);
    }
})();