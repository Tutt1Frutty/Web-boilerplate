import {courses} from "../../user-interactions/interfaces";

export const getRandomCourseUtil = () => courses[Math.floor(Math.random() * courses.length)];