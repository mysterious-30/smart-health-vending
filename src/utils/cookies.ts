/**
 * Cookie utility functions for storing and retrieving user profile data
 */

export interface UserProfile {
    uid: string;
    fullName: string;
    name: string; // First name
    age: number | null;
    allergy: string | null;
    number: string;
}

const USER_COOKIE_NAME = 'curegenie_user';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

/**
 * Store user profile in cookie
 */
export function setUserCookie(profile: UserProfile): void {
    if (typeof document === 'undefined') return;

    const cookieValue = encodeURIComponent(JSON.stringify(profile));
    const expires = new Date(Date.now() + COOKIE_MAX_AGE * 1000).toUTCString();

    document.cookie = `${USER_COOKIE_NAME}=${cookieValue}; expires=${expires}; path=/; SameSite=Strict`;
}

/**
 * Retrieve user profile from cookie
 */
export function getUserCookie(): UserProfile | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie =>
        cookie.trim().startsWith(`${USER_COOKIE_NAME}=`)
    );

    if (!userCookie) return null;

    try {
        const cookieValue = userCookie.split('=')[1];
        const decoded = decodeURIComponent(cookieValue);
        return JSON.parse(decoded) as UserProfile;
    } catch (error) {
        console.error('Failed to parse user cookie:', error);
        return null;
    }
}

/**
 * Clear user profile cookie (for logout)
 */
export function clearUserCookie(): void {
    if (typeof document === 'undefined') return;

    document.cookie = `${USER_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Check if user is authenticated (has valid cookie)
 */
export function isAuthenticated(): boolean {
    return getUserCookie() !== null;
}
