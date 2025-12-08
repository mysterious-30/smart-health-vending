/**
 * Logger utility for development-only console logging
 * Prevents console statements from appearing in production builds
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
    error: (...args: unknown[]) => {
        if (isDevelopment) {
            console.error(...args);
        }
    },

    warn: (...args: unknown[]) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    log: (...args: unknown[]) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    info: (...args: unknown[]) => {
        if (isDevelopment) {
            console.info(...args);
        }
    }
};
