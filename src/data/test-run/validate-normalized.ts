import { userValidateDataAndSave } from '../normalize/validate-data';
import usersNormalized from './users-normalized.json'

await userValidateDataAndSave(usersNormalized, 'users-validated.json', import.meta.url);