export const emailValidation = (email: unknown): email is string => {
    if (typeof email !== 'string' || email.trim() === '') return false;

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) {
        console.error('Invalid email:', email);
    }

    return emailIsValid;
};
