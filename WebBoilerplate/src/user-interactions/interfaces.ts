export interface FilterParams {
    country?: string;
    age?: number;
    gender?: string;
    favourite?: boolean;
}

export interface FormattedUser {
    id: number;
    favourite: boolean;
    course: Course;
    bg_color: string;
    note: string;
    gender: Gender;
    title: Title;
    full_name: string;
    city: string;
    state?: string;
    country: string;
    postcode: string;
    coordinates: Coordinates;
    timezone: Timezone;
    email?: string;
    date_of_birth?: string;
    age?: number;
    phone?: string;
    picture_large?: string;
    picture_thumbnail?: string;
}

export type Course = 'Mathematics' | 'Physics' | 'English' | 'Computer Science' | 'Dancing'
    | 'Chess' | 'Biology' | 'Chemistry' | 'Law' | 'Art' | 'Medicine' | 'Statistics';
export const courses: Course[] = [
    'Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing',
    'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'
];
export type Gender = 'Male' | 'Female' | 'Other';
export type Title = 'Mr' | 'Mrs' | 'Ms' | 'Miss' | 'Monsieur' | 'Madame';
export interface Coordinates {
    latitude: string;
    longitude: string;
}
export interface Timezone {
    offset: string;
    description: string;
}
