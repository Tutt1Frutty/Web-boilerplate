import { isValidPhoneNumber, parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import {getCountryIsoCode} from "./get-country-iso-code";

export const normalizePhoneNumber = (phone: string | number, countryName: string): string | null => {
    const strPhone = String(phone);
    if (strPhone.trim() === '' || countryName.trim() === '') return null;

    const isoCode = getCountryIsoCode(countryName);
    if (!isoCode) return null;

    const parsed = parsePhoneNumberFromString(strPhone, isoCode as CountryCode);
    if (parsed && isValidPhoneNumber(parsed.number, isoCode as CountryCode)) {
        return parsed.number;
    }

    return null;
};
