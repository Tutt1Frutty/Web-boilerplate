import { isString, isNumber, isDate, isObject, hasKey } from "../user-interactions/tools";

interface Coordinates {
    latitude: number | null;
    longitude: number | null;
}

interface Timezone {
    offset: string | null;
    description: string | null;
}

interface UserDataProps {
    gender?: string;
    title?: string;
    full_name?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string | number | null;
    coordinates?: Partial<Coordinates>;
    timezone?: Partial<Timezone>;
    email?: string;
    b_date?: Date;
    age?: number;
    phone?: string;
    picture_large?: string;
    picture_thumbnail?: string;
    id?: string;
    favorite?: boolean;
    course?: string;
    bg_color?: string;
    note?: string;
}

export class UserDataClass {
    gender: string | null;
    title: string | null;
    full_name: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postcode: string | number | null;
    coordinates: Coordinates;
    timezone: Timezone;
    email: string | null;
    b_date: Date | null;
    age: number | null;
    phone: string | null;
    picture_large: string | null;
    picture_thumbnail: string | null;
    id: string | null;
    favorite: boolean;
    course: string | null;
    bg_color: string | null;
    note: string;

    constructor(props: UserDataProps) {
        this.gender = isString(props.gender) && props.gender !== '' ? props.gender : null;
        this.title = isString(props.title) && props.title !== '' ? props.title : null;
        this.full_name = isString(props.full_name) && props.full_name !== '' ? props.full_name : null;
        this.city = isString(props.city) && props.city !== '' ? props.city : null;
        this.state = isString(props.state) && props.state !== '' ? props.state : null;
        this.country = isString(props.country) && props.country !== '' ? props.country : null;
        this.postcode = props.postcode ?? null;

        this.coordinates =
            isObject(props.coordinates) &&
            hasKey(props.coordinates, 'latitude') &&
            hasKey(props.coordinates, 'longitude')
                ? { latitude: props.coordinates.latitude ?? null, longitude: props.coordinates.longitude ?? null }
                : { latitude: null, longitude: null };

        this.timezone =
            isObject(props.timezone) &&
            hasKey(props.timezone, 'offset') &&
            hasKey(props.timezone, 'description')
                ? { offset: props.timezone.offset ?? null, description: props.timezone.description ?? null }
                : { offset: null, description: null };

        this.email = isString(props.email) && props.email !== '' ? props.email : null;
        this.b_date = isDate(props.b_date) ? props.b_date : null;
        this.age = isNumber(props.age) ? props.age : null;
        this.phone = isString(props.phone) && props.phone !== '' ? props.phone : null;
        this.picture_large = isString(props.picture_large) && props.picture_large !== '' ? props.picture_large : null;
        this.picture_thumbnail =
            isString(props.picture_thumbnail) && props.picture_thumbnail !== '' ? props.picture_thumbnail : null;
        this.id = isString(props.id) && props.id !== '' ? props.id : null;
        this.favorite = Boolean(props.favorite);
        this.course = isString(props.course) && props.course !== '' ? props.course : null;
        this.bg_color = isString(props.bg_color) && props.bg_color !== '' ? props.bg_color : null;
        this.note = isString(props.note) && props.note !== '' ? props.note : '';
    }
}
