import { userValidateDataAndSave } from '../normalize/validate-data';
import usersNormalized from './users-normalized.json'

(async () => {
    await userValidateDataAndSave(usersNormalized, 'users-validated.json');
})();