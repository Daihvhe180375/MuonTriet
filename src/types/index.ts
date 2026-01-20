// Core data types
export type Category = 'ethics' | 'epistemology' | 'existence' | 'logic' | 'aesthetics';
export type Difficulty = 'easy' | 'medium' | 'hard';

// Flashcard
export interface Flashcard {
    id: string;
    category: Category;
    front: string;
    back: {
        explanation: string;
        example: string;
    };
    difficulty: Difficulty;
    philosopher?: string;
}

// Quiz Question
export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: string;
    difficulty: Difficulty;
    relatedPhilosopher?: string;
}

// User Progress
export interface UserProgress {
    streak: {
        current: number;
        highest: number;
        lastDate: string;
    };
    flashcards: {
        total: number;
        mastered: string[];
        reviewing: string[];
    };
    quizzes: {
        completed: string[];
        scores: { [quizId: string]: number };
    };
    pomodoro: {
        sessionsToday: number;
        totalSessions: number;
    };
    calendar: {
        [date: string]: {
            flashcards: number;
            quizzes: number;
            pomodoros: number;
        };
    };
}

// Quiz Attempt History
export interface QuizAttempt {
    attemptId: string;
    score: number;
    completedAt: string;
    correctAnswers: number;
    totalQuestions: number;
}

// Custom Quiz
export interface CustomQuiz {
    id: string;
    createdAt: string;
    title: string;
    questions: QuizQuestion[];
    attempts: QuizAttempt[];
}

// Quote
export interface Quote {
    id: string;
    text: string;
    author: string;
    context: 'ancient' | 'modern' | 'contemporary';
}

// Story
export interface Story {
    id: string;
    title: string;
    philosopher: string;
    summary: string;
    content: string;
    image?: string;
}

// Daily Activity
export interface DailyActivity {
    date: string;
    flashcards: number;
    quizzes: number;
    pomodoros: number;
}

// Achievement
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedDate?: string;
}
