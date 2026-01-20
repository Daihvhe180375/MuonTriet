
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useFlashcardStore } from '@/store/useFlashcardStore';
import { useStreakStore } from '@/store/useStreakStore';
import { Category, Difficulty } from '@/types';
import toast from 'react-hot-toast';

const categoryLabels: Record<Category, string> = {
    ethics: '📖 Đạo đức',
    epistemology: '🧠 Nhận thức',
    existence: '🌍 Tồn tại',
    logic: '🎯 Logic',
    aesthetics: '🎨 Thẩm mỹ',
};

const difficultyLabels: Record<Difficulty, string> = {
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó',
};

export function Flashcard() {
    const {
        currentIndex,
        isFlipped,
        mastered,
        // reviewing, // unused
        selectedCategory,
        selectedDifficulty,
        studyMode,
        // setCurrentIndex, // unused
        nextCard,
        previousCard,
        toggleFlip,
        markAsMastered,
        markForReview,
        setCategory,
        setDifficulty,
        setStudyMode,
        getFilteredCards,
    } = useFlashcardStore();

    const recordActivity = useStreakStore((state) => state.recordActivity);
    const filteredCards = getFilteredCards();
    const currentCard = filteredCards[currentIndex];

    const handleMarkMastered = () => {
        if (currentCard) {
            markAsMastered(currentCard.id);
            recordActivity('flashcards');
            toast.success('Đã đánh dấu thành thạo!');
            nextCard();
        }
    };

    const handleMarkReview = () => {
        if (currentCard) {
            markForReview(currentCard.id);
            toast('Đã đánh dấu để xem lại');
            nextCard();
        }
    };

    const masteredCount = mastered.length;
    const totalCards = filteredCards.length;

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleFlip();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextCard();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousCard();
        }
    };

    if (totalCards === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-serif text-text-primary mb-4">Không có flashcard nào</h2>
                <p className="text-text-secondary">Thử thay đổi bộ lọc để xem thêm thẻ</p>
                <Button onClick={() => { setCategory('all'); setDifficulty('all'); }} className="mt-4">
                    Đặt lại bộ lọc
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-bg-secondary rounded-lg p-6">
                            <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">Chủ đề</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setCategory('all')}
                                    className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === 'all'
                                        ? 'bg-accent-blue text-white'
                                        : 'text-text-secondary hover:bg-bg-tertiary'
                                        }`}
                                >
                                    Tất cả
                                </button>
                                {Object.entries(categoryLabels).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setCategory(key as Category)}
                                        className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === key
                                            ? 'bg-accent-blue text-white'
                                            : 'text-text-secondary hover:bg-bg-tertiary'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-bg-secondary rounded-lg p-6">
                            <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">Độ khó</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setDifficulty('all')}
                                    className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedDifficulty === 'all'
                                        ? 'bg-accent-purple text-white'
                                        : 'text-text-secondary hover:bg-bg-tertiary'
                                        }`}
                                >
                                    Tất cả
                                </button>
                                {Object.entries(difficultyLabels).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setDifficulty(key as Difficulty)}
                                        className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedDifficulty === key
                                            ? 'bg-accent-purple text-white'
                                            : 'text-text-secondary hover:bg-bg-tertiary'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-bg-secondary rounded-lg p-6">
                            <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">Chế độ học</h3>
                            <div className="space-y-2">
                                {[
                                    { key: 'sequential', label: 'Tuần tự' },
                                    { key: 'random', label: 'Ngẫu nhiên' },
                                    { key: 'review', label: 'Ôn tập' },
                                ].map((mode) => (
                                    <button
                                        key={mode.key}
                                        onClick={() => setStudyMode(mode.key as any)}
                                        className={`w-full text-left px-3 py-2 rounded transition-colors ${studyMode === mode.key
                                            ? 'bg-accent-green text-white'
                                            : 'text-text-secondary hover:bg-bg-tertiary'
                                            }`}
                                    >
                                        {mode.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-bg-tertiary rounded-lg p-4">
                            <p className="text-sm text-text-secondary">Đã thành thạo</p>
                            <p className="text-2xl font-bold text-accent-green">{masteredCount}/{totalCards}</p>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <div className="mb-6">
                            <ProgressBar value={masteredCount} max={totalCards} color="green" />
                        </div>

                        {/* Flashcard */}
                        <div
                            className="perspective-1000 mb-8"
                            onKeyDown={handleKeyPress}
                            tabIndex={0}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentCard?.id}
                                    className="relative h-96 cursor-pointer"
                                    onClick={toggleFlip}
                                    initial={{ rotateY: 0 }}
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Front */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center ${isFlipped ? 'invisible' : 'visible'
                                            }`}
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <div className="text-center space-y-4">
                                            <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-4">
                                                {categoryLabels[currentCard?.category as Category]}
                                            </div>
                                            <h2 className="text-3xl font-serif font-bold text-white leading-relaxed">
                                                {currentCard?.front}
                                            </h2>
                                            <p className="text-white text-opacity-80 text-sm">Nhấn để lật thẻ</p>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <span className="text-xs text-white opacity-60">
                                                {difficultyLabels[currentCard?.difficulty as Difficulty]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Back */}
                                    <div
                                        className={`absolute inset-0 bg-bg-secondary border-2 border-accent-green rounded-xl shadow-2xl p-8 ${isFlipped ? 'visible' : 'invisible'
                                            }`}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                        }}
                                    >
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-xl font-semibold text-accent-green mb-2">Giải thích</h3>
                                                <p className="text-text-primary leading-relaxed">{currentCard?.back.explanation}</p>
                                            </div>
                                            <div className="bg-accent-yellow bg-opacity-10 p-4 rounded-lg border-l-4 border-accent-yellow">
                                                <h4 className="text-sm font-semibold text-accent-yellow mb-2">💡 Ví dụ thực tế</h4>
                                                <p className="text-text-secondary text-sm">{currentCard?.back.example}</p>
                                            </div>
                                            {currentCard?.philosopher && (
                                                <p className="text-sm text-accent-purple">
                                                    🧑‍🏫 Triết gia: {currentCard.philosopher}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mb-6">
                            <Button icon={ChevronLeft} onClick={previousCard} variant="secondary">
                                Trước
                            </Button>

                            <div className="flex items-center gap-3">
                                <span className="text-text-secondary">
                                    {currentIndex + 1} / {totalCards}
                                </span>
                                <Button icon={RotateCw} onClick={toggleFlip} variant="ghost" size="sm">
                                    Lật thẻ
                                </Button>
                            </div>

                            <Button icon={ChevronRight} onClick={nextCard} variant="secondary">
                                Sau
                            </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <Button icon={Check} onClick={handleMarkMastered} variant="primary" className="bg-accent-green">
                                ✅ Đã hiểu
                            </Button>
                            <Button icon={RefreshCw} onClick={handleMarkReview} variant="secondary">
                                🔄 Xem lại
                            </Button>
                        </div>

                        {/* Keyboard Shortcuts Hint */}
                        <div className="mt-8 bg-bg-tertiary rounded-lg p-4">
                            <p className="text-sm text-text-secondary text-center">
                                <strong>Phím tắt:</strong> Space = Lật thẻ | ← → = Điều hướng
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
