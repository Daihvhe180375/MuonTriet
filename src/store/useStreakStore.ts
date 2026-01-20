import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyActivity } from '@/types';
import { getTodayString, calculateStreak } from '@/utils/dateHelpers';

interface StreakState {
    currentStreak: number;
    highestStreak: number;
    lastActivityDate: string | null;
    calendar: { [date: string]: DailyActivity };

    // Actions
    recordActivity: (type: 'flashcards' | 'quizzes' | 'pomodoros', count?: number) => void;
    updateStreak: () => void;
    getActivityForDate: (date: string) => DailyActivity | null;
    getTotalActivities: () => number;
    resetStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
    persist(
        (set, get) => ({
            currentStreak: 0,
            highestStreak: 0,
            lastActivityDate: null,
            calendar: {},

            recordActivity: (type, count = 1) => {
                const today = getTodayString();
                const { calendar } = get();

                const todayActivity = calendar[today] || {
                    date: today,
                    flashcards: 0,
                    quizzes: 0,
                    pomodoros: 0,
                };

                todayActivity[type] += count;

                set({
                    calendar: {
                        ...calendar,
                        [today]: todayActivity,
                    },
                    lastActivityDate: today,
                });

                get().updateStreak();
            },

            updateStreak: () => {
                const { lastActivityDate, currentStreak, highestStreak } = get();
                const today = getTodayString();

                if (!lastActivityDate) {
                    set({ currentStreak: 1, highestStreak: 1 });
                    return;
                }

                if (lastActivityDate === today) {
                    // Already counted today
                    return;
                }

                const streakContinues = calculateStreak(lastActivityDate);

                if (streakContinues) {
                    const newStreak = currentStreak + 1;
                    set({
                        currentStreak: newStreak,
                        highestStreak: Math.max(newStreak, highestStreak),
                    });
                } else {
                    // Streak broken
                    set({
                        currentStreak: 1,
                    });
                }
            },

            getActivityForDate: (date) => {
                const { calendar } = get();
                return calendar[date] || null;
            },

            getTotalActivities: () => {
                const { calendar } = get();
                return Object.values(calendar).reduce((total, activity) => {
                    return total + activity.flashcards + activity.quizzes + activity.pomodoros;
                }, 0);
            },

            resetStreak: () =>
                set({
                    currentStreak: 0,
                    highestStreak: 0,
                    lastActivityDate: null,
                    calendar: {},
                }),
        }),
        {
            name: 'streak-storage',
        }
    )
);
