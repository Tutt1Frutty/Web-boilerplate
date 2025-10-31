import {isValidPhoneNumber} from 'libphonenumber-js';
import {countries} from 'countries-list';
import {isString} from '../../user-interactions/tools';

export const getCountryPhoneCode = (countryName: string): string => {
    for (const iso2 in countries) {
        if (countries[iso2].name.toLowerCase() === countryName.toLowerCase()) {
            return countries[iso2].phone[0];
        }
    }
    throw new Error(`Country not found: ${countryName}`);
};

export const phoneValidation = (phone: unknown, countryName: unknown): phone is string => {
    if (!isString(phone) || !isString(countryName)) return false;
    if (phone.trim() === '' || countryName.trim() === '') return false;

    const countryCode = getCountryPhoneCode(countryName);
    return isValidPhoneNumber(phone) && phone.startsWith('+' + countryCode);
};