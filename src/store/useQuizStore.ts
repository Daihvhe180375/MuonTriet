import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizQuestion, CustomQuiz, QuizAttempt } from '@/types';
import { getTodayString } from '@/utils/dateHelpers';

interface QuizState {
    dailyQuizCompleted: string | null; // Date string
    currentQuestionIndex: number;
    selectedAnswers: (number | null)[];
    score: number;
    customQuizzes: CustomQuiz[];
    completedQuizzes: string[];
    quizScores: { [quizId: string]: number };

    // Actions
    setCurrentQuestionIndex: (index: number) => void;
    selectAnswer: (questionIndex: number, answerIndex: number) => void;
    calculateScore: (questions: QuizQuestion[]) => number;
    completeDailyQuiz: (score: number) => void;
    isDailyQuizCompleted: () => boolean;
    addCustomQuiz: (quiz: Omit<CustomQuiz, 'id' | 'createdAt' | 'attempts'>) => void;
    deleteCustomQuiz: (id: string) => void;
    completeQuiz: (quizId: string, score: number) => void;
    recordQuizAttempt: (quizId: string, score: number, correctAnswers: number, totalQuestions: number) => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set, get) => ({
            dailyQuizCompleted: null,
            currentQuestionIndex: 0,
            selectedAnswers: [],
            score: 0,
            customQuizzes: [],
            completedQuizzes: [],
            quizScores: {},

            setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

            selectAnswer: (questionIndex, answerIndex) =>
                set((state) => {
                    const newAnswers = [...state.selectedAnswers];
                    newAnswers[questionIndex] = answerIndex;
                    return { selectedAnswers: newAnswers };
                }),

            calculateScore: (questions) => {
                const { selectedAnswers } = get();
                let correct = 0;

                questions.forEach((question, index) => {
                    if (selectedAnswers[index] === question.correctAnswer) {
                        correct++;
                    }
                });

                const score = Math.round((correct / questions.length) * 100);
                set({ score });
                return score;
            },

            completeDailyQuiz: (score) => {
                const today = getTodayString();
                set({
                    dailyQuizCompleted: today,
                    score,
                });
            },

            isDailyQuizCompleted: () => {
                const { dailyQuizCompleted } = get();
                const today = getTodayString();
                return dailyQuizCompleted === today;
            },

            addCustomQuiz: (quiz) => {
                const newQuiz: CustomQuiz = {
                    ...quiz,
                    id: `custom-${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    attempts: [],
                };
                set((state) => ({
                    customQuizzes: [...state.customQuizzes, newQuiz],
                }));
            },

            deleteCustomQuiz: (id) =>
                set((state) => ({
                    customQuizzes: state.customQuizzes.filter((quiz) => quiz.id !== id),
                })),

            completeQuiz: (quizId, score) =>
                set((state) => ({
                    completedQuizzes: state.completedQuizzes.includes(quizId)
                        ? state.completedQuizzes
                        : [...state.completedQuizzes, quizId],
                    quizScores: {
                        ...state.quizScores,
                        [quizId]: score,
                    },
                })),

            recordQuizAttempt: (quizId, score, correctAnswers, totalQuestions) =>
                set((state) => {
                    const quizIndex = state.customQuizzes.findIndex(q => q.id === quizId);
                    if (quizIndex === -1) return state;

                    const attempt: QuizAttempt = {
                        attemptId: `attempt-${Date.now()}`,
                        score,
                        completedAt: new Date().toISOString(),
                        correctAnswers,
                        totalQuestions,
                    };

                    const updatedQuizzes = [...state.customQuizzes];
                    updatedQuizzes[quizIndex] = {
                        ...updatedQuizzes[quizIndex],
                        attempts: [...updatedQuizzes[quizIndex].attempts, attempt],
                    };

                    return {
                        customQuizzes: updatedQuizzes,
                        completedQuizzes: state.completedQuizzes.includes(quizId)
                            ? state.completedQuizzes
                            : [...state.completedQuizzes, quizId],
                        quizScores: {
                            ...state.quizScores,
                            [quizId]: score, // Keep last score for backward compatibility
                        },
                    };
                }),

            resetQuiz: () =>
                set({
                    currentQuestionIndex: 0,
                    selectedAnswers: [],
                    score: 0,
                }),
        }),
        {
            name: 'quiz-storage',
        }
    )
);
