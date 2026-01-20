import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flashcard, Category, Difficulty } from '@/types';
import { flashcards } from '@/data/flashcards';

interface FlashcardState {
    currentIndex: number;
    isFlipped: boolean;
    mastered: string[];
    reviewing: string[];
    selectedCategory: Category | 'all';
    selectedDifficulty: Difficulty | 'all';
    studyMode: 'sequential' | 'random' | 'review';

    // Actions
    setCurrentIndex: (index: number) => void;
    nextCard: () => void;
    previousCard: () => void;
    toggleFlip: () => void;
    markAsMastered: (id: string) => void;
    markForReview: (id: string) => void;
    setCategory: (category: Category | 'all') => void;
    setDifficulty: (difficulty: Difficulty | 'all') => void;
    setStudyMode: (mode: 'sequential' | 'random' | 'review') => void;
    getFilteredCards: () => Flashcard[];
    resetProgress: () => void;
}

export const useFlashcardStore = create<FlashcardState>()(
    persist(
        (set, get) => ({
            currentIndex: 0,
            isFlipped: false,
            mastered: [],
            reviewing: [],
            selectedCategory: 'all',
            selectedDifficulty: 'all',
            studyMode: 'sequential',

            setCurrentIndex: (index) => set({ currentIndex: index, isFlipped: false }),

            nextCard: () => {
                const filtered = get().getFilteredCards();
                const current = get().currentIndex;
                const next = current + 1 >= filtered.length ? 0 : current + 1;
                set({ currentIndex: next, isFlipped: false });
            },

            previousCard: () => {
                const filtered = get().getFilteredCards();
                const current = get().currentIndex;
                const prev = current - 1 < 0 ? filtered.length - 1 : current - 1;
                set({ currentIndex: prev, isFlipped: false });
            },

            toggleFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),

            markAsMastered: (id) =>
                set((state) => ({
                    mastered: state.mastered.includes(id)
                        ? state.mastered
                        : [...state.mastered, id],
                    reviewing: state.reviewing.filter((cardId) => cardId !== id),
                })),

            markForReview: (id) =>
                set((state) => ({
                    reviewing: state.reviewing.includes(id)
                        ? state.reviewing
                        : [...state.reviewing, id],
                    mastered: state.mastered.filter((cardId) => cardId !== id),
                })),

            setCategory: (category) => set({ selectedCategory: category, currentIndex: 0 }),

            setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty, currentIndex: 0 }),

            setStudyMode: (mode) => set({ studyMode: mode, currentIndex: 0 }),

            getFilteredCards: () => {
                const { selectedCategory, selectedDifficulty, studyMode, reviewing } = get();
                let filtered = [...flashcards];

                // Filter by category
                if (selectedCategory !== 'all') {
                    filtered = filtered.filter((card) => card.category === selectedCategory);
                }

                // Filter by difficulty
                if (selectedDifficulty !== 'all') {
                    filtered = filtered.filter((card) => card.difficulty === selectedDifficulty);
                }

                // Filter by study mode
                if (studyMode === 'review') {
                    filtered = filtered.filter((card) => reviewing.includes(card.id));
                }

                // Randomize if in random mode
                if (studyMode === 'random') {
                    filtered = filtered.sort(() => Math.random() - 0.5);
                }

                return filtered;
            },

            resetProgress: () =>
                set({
                    mastered: [],
                    reviewing: [],
                    currentIndex: 0,
                }),
        }),
        {
            name: 'flashcard-storage',
        }
    )
);
