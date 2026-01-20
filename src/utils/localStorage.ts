// LocalStorage utility functions with type safety

export function setItem<T>(key: string, value: T): void {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
    }
}

export function getItem<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        return JSON.parse(item) as T;
    } catch (error) {
        console.error(`Error reading from localStorage: ${error}`);
        return defaultValue;
    }
}

export function removeItem(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
    }
}

export function clear(): void {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
    }
}

// Storage keys
export const STORAGE_KEYS = {
    USER_PROGRESS: 'muon-triet-progress',
    FLASHCARD_STATE: 'muon-triet-flashcards',
    QUIZ_STATE: 'muon-triet-quizzes',
    STREAK_STATE: 'muon-triet-streak',
    CUSTOM_QUIZZES: 'muon-triet-custom-quizzes',
    POMODORO_STATE: 'muon-triet-pomodoro',
} as const;
