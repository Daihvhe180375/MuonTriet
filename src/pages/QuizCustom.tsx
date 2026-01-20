import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Play, CheckCircle, XCircle, X, History } from 'lucide-react';
import Confetti from 'react-confetti';
import { Button } from '@/components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { Modal } from '@/components/common/Modal';
import { useQuizStore } from '@/store/useQuizStore';
import { useStreakStore } from '@/store/useStreakStore';
import { getRandomQuestions } from '@/data/quizzes';
import { Category, Difficulty, CustomQuiz } from '@/types';
import toast from 'react-hot-toast';

const categoryLabels: Record<Category | 'all', string> = {
    all: 'Tất cả',
    ethics: '📖 Đạo đức',
    epistemology: '🧠 Nhận thức',
    existence: '🌍 Tồn tại',
    logic: '🎯 Logic',
    aesthetics: '🎨 Thẩm mỹ',
};

const difficultyLabels: Record<Difficulty | 'all', string> = {
    all: 'Tất cả',
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó',
};

export function QuizCustom() {
    const { customQuizzes, addCustomQuiz, deleteCustomQuiz, recordQuizAttempt } = useQuizStore();
    const { recordActivity } = useStreakStore();

    const [showSettings, setShowSettings] = useState(false);
    const [takingQuiz, setTakingQuiz] = useState<CustomQuiz | null>(null);
    const [viewingHistory, setViewingHistory] = useState<CustomQuiz | null>(null);

    // Quiz generation settings
    const [selectedCategories, setSelectedCategories] = useState<(Category | 'all')[]>(['all']);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
    const [questionCount, setQuestionCount] = useState(10);
    const [timedMode, setTimedMode] = useState(false);

    // Quiz taking state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
    const [showResults, setShowResults] = useState<boolean[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleGenerateQuiz = () => {
        const category = selectedCategories.includes('all') ? undefined : selectedCategories[0] as string;
        const difficulty = selectedDifficulty === 'all' ? undefined : selectedDifficulty;

        const questions = getRandomQuestions(questionCount, category, difficulty);

        if (questions.length === 0) {
            toast.error('Không tìm thấy câu hỏi phù hợp!');
            return;
        }

        addCustomQuiz({
            title: `Quiz tùy chỉnh - ${new Date().toLocaleDateString('vi-VN')}`,
            questions,
        });

        toast.success('Đã tạo quiz!');
        setShowSettings(false);
    };

    const handleDeleteQuiz = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa quiz này?')) {
            deleteCustomQuiz(id);
            toast.success('Đã xóa quiz!');
        }
    };

    const toggleCategory = (category: Category | 'all') => {
        if (category === 'all') {
            setSelectedCategories(['all']);
        } else {
            const newCategories = selectedCategories.filter(c => c !== 'all');
            if (newCategories.includes(category)) {
                const filtered = newCategories.filter(c => c !== category);
                setSelectedCategories(filtered.length === 0 ? ['all'] : filtered);
            } else {
                setSelectedCategories([...newCategories, category]);
            }
        }
    };

    const handleStartQuiz = (quiz: CustomQuiz) => {
        setTakingQuiz(quiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setShowResults([]);
        setIsCompleted(false);
        setFinalScore(0);
    };

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setSelectedAnswers(newAnswers);

        const newShowResults = [...showResults];
        newShowResults[currentQuestionIndex] = true;
        setShowResults(newShowResults);
    };

    const handleNext = () => {
        if (!takingQuiz) return;

        const isLastQuestion = currentQuestionIndex === takingQuiz.questions.length - 1;

        if (isLastQuestion) {
            // Calculate score
            let correct = 0;
            takingQuiz.questions.forEach((question, index) => {
                if (selectedAnswers[index] === question.correctAnswer) {
                    correct++;
                }
            });

            const score = Math.round((correct / takingQuiz.questions.length) * 100);
            setFinalScore(score);
            setIsCompleted(true);

            // Record attempt  
            recordQuizAttempt(takingQuiz.id, score, correct, takingQuiz.questions.length);
            recordActivity('quizzes');

            if (score >= 70) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }

            toast.success('Hoàn thành quiz!');
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleCloseQuiz = () => {
        setTakingQuiz(null);
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setShowResults([]);
        setIsCompleted(false);
    };

    const currentQuestion = takingQuiz?.questions[currentQuestionIndex];
    const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined && selectedAnswers[currentQuestionIndex] !== null;

    return (
        <div className="min-h-screen py-8 bg-bg-primary">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-text-primary mb-2">
                            🎯 Quiz Tùy Chỉnh
                        </h1>
                        <p className="text-text-secondary">Tạo và quản lý quiz của riêng bạn</p>
                    </div>
                    <Button icon={Plus} onClick={() => setShowSettings(true)}>
                        Tạo quiz mới
                    </Button>
                </div>

                {/* Quiz List */}
                {customQuizzes.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-serif font-bold text-text-primary mb-2">
                            Chưa có quiz nào
                        </h2>
                        <p className="text-text-secondary mb-6">
                            Tạo quiz đầu tiên của bạn để bắt đầu!
                        </p>
                        <Button icon={Plus} onClick={() => setShowSettings(true)}>
                            Tạo quiz
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {customQuizzes.map((quiz) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
                                        <p className="text-sm text-text-secondary mt-1">
                                            {quiz.questions.length} câu hỏi • {new Date(quiz.createdAt).toLocaleDateString('vi-VN')}
                                        </p>
                                        {quiz.attempts.length > 0 && (
                                            <div className="mt-2 text-xs text-accent-blue">
                                                📊 Đã làm {quiz.attempts.length} lần •
                                                Cao nhất: {Math.max(...quiz.attempts.map(a => a.score))}%
                                            </div>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    icon={Play}
                                                    size="sm"
                                                    onClick={() => handleStartQuiz(quiz)}
                                                >
                                                    {quiz.attempts.length > 0 ? 'Làm lại' : 'Làm quiz'}
                                                </Button>
                                                {quiz.attempts.length > 0 && (
                                                    <Button
                                                        icon={History}
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setViewingHistory(quiz)}
                                                    >
                                                        Lịch sử
                                                    </Button>
                                                )}
                                                <Button
                                                    icon={Trash2}
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                                    className="text-accent-red hover:bg-accent-red hover:bg-opacity-10"
                                                >
                                                    Xóa
                                                </Button>
                                            </div>

                                            {/* Show recent 2 attempts */}
                                            {quiz.attempts.length > 0 && (
                                                <div className="bg-bg-tertiary rounded p-2 space-y-1">
                                                    <p className="text-xs font-semibold text-text-secondary">Lần làm gần nhất:</p>
                                                    {quiz.attempts.slice(-2).reverse().map((attempt) => (
                                                        <div key={attempt.attemptId} className="text-xs text-text-tertiary flex items-center justify-between">
                                                            <span>{new Date(attempt.completedAt).toLocaleString('vi-VN', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}</span>
                                                            <span className={`font-semibold ${attempt.score >= 80 ? 'text-accent-green' :
                                                                    attempt.score >= 60 ? 'text-accent-blue' :
                                                                        'text-accent-yellow'
                                                                }`}>
                                                                {attempt.score}% ({attempt.correctAnswers}/{attempt.totalQuestions})
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Quiz Generation Settings Modal */}
                <Modal
                    isOpen={showSettings}
                    onClose={() => setShowSettings(false)}
                    title="⚙️ Tạo Quiz Mới"
                    size="lg"
                >
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-3">Chọn chủ đề</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(Object.entries(categoryLabels) as [Category | 'all', string][]).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => toggleCategory(key)}
                                        className={`px-4 py-2 rounded-lg text-left transition-all ${selectedCategories.includes(key)
                                                ? 'bg-accent-blue text-white'
                                                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-3">Độ khó</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(Object.entries(difficultyLabels) as [Difficulty | 'all', string][]).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedDifficulty(key)}
                                        className={`px-4 py-2 rounded-lg transition-all ${selectedDifficulty === key
                                                ? 'bg-accent-purple text-white'
                                                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-3">Số câu hỏi</label>
                            <div className="flex gap-2">
                                {[5, 10, 15, 20].map((count) => (
                                    <button
                                        key={count}
                                        onClick={() => setQuestionCount(count)}
                                        className={`flex-1 px-4 py-2 rounded-lg transition-all ${questionCount === count
                                                ? 'bg-accent-green text-white'
                                                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
                                            }`}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
                            <div>
                                <p className="text-text-primary font-medium">Chế độ hẹn giờ</p>
                                <p className="text-sm text-text-secondary">60 giây mỗi câu</p>
                            </div>
                            <button
                                onClick={() => setTimedMode(!timedMode)}
                                className={`px-4 py-2 rounded-lg transition-colors ${timedMode
                                        ? 'bg-accent-blue text-white'
                                        : 'bg-bg-secondary text-text-secondary'
                                    }`}
                            >
                                {timedMode ? 'Bật' : 'Tắt'}
                            </button>
                        </div>

                        <Button onClick={handleGenerateQuiz} className="w-full" icon={Plus}>
                            Tạo quiz
                        </Button>
                    </div>
                </Modal>

                {/* History Modal */}
                <Modal
                    isOpen={!!viewingHistory}
                    onClose={() => setViewingHistory(null)}
                    title={`📊 Lịch sử - ${viewingHistory?.title}`}
                    size="lg"
                >
                    {viewingHistory && (
                        <div className="space-y-4">
                            <div className="bg-bg-tertiary rounded p-4">
                                <p className="text-sm text-text-secondary mb-2">Tổng quan</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-text-tertiary">Tổng lần làm</p>
                                        <p className="text-2xl font-bold text-text-primary">{viewingHistory.attempts.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-tertiary">Điểm cao nhất</p>
                                        <p className="text-2xl font-bold text-accent-green">
                                            {Math.max(...viewingHistory.attempts.map(a => a.score))}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-tertiary">Điểm trung bình</p>
                                        <p className="text-2xl font-bold text-accent-blue">
                                            {Math.round(viewingHistory.attempts.reduce((sum, a) => sum + a.score, 0) / viewingHistory.attempts.length)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                <p className="text-sm font-semibold text-text-secondary">Tất cả lần làm ({viewingHistory.attempts.length}):</p>
                                {viewingHistory.attempts.slice().reverse().map((attempt, index) => (
                                    <div key={attempt.attemptId} className="bg-bg-tertiary rounded p-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-text-primary">
                                                #{viewingHistory.attempts.length - index}
                                            </p>
                                            <p className="text-xs text-text-tertiary">
                                                {new Date(attempt.completedAt).toLocaleString('vi-VN')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-2xl font-bold ${attempt.score >= 80 ? 'text-accent-green' :
                                                    attempt.score >= 60 ? 'text-accent-blue' :
                                                        'text-accent-yellow'
                                                }`}>
                                                {attempt.score}%
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                {attempt.correctAnswers}/{attempt.totalQuestions} đúng
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Quiz Taking Modal */}
                <AnimatePresence>
                    {takingQuiz && (
                        <>
                            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

                            <div className="fixed inset-0 bg-black bg-opacity-75 z-40" onClick={handleCloseQuiz} />

                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <motion.div
                                    className="bg-bg-secondary rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                >
                                    <div className="flex items-center justify-between p-6 border-b border-bg-tertiary">
                                        <h2 className="text-2xl font-serif font-semibold text-text-primary">
                                            {takingQuiz.title}
                                        </h2>
                                        <button onClick={handleCloseQuiz} className="text-text-secondary hover:text-text-primary">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        {!isCompleted ? (
                                            <>
                                                <div className="mb-6">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-text-secondary">Tiến độ</span>
                                                        <span className="text-sm font-semibold text-text-primary">
                                                            Câu {currentQuestionIndex + 1}/{takingQuiz.questions.length}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-bg-tertiary rounded-full h-2">
                                                        <div
                                                            className="bg-accent-blue h-2 rounded-full transition-all"
                                                            style={{ width: `${((currentQuestionIndex + 1) / takingQuiz.questions.length) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {currentQuestion && (
                                                    <div className="space-y-6">
                                                        <h3 className="text-xl font-serif font-bold text-text-primary">
                                                            {currentQuestion.question}
                                                        </h3>

                                                        <div className="space-y-3">
                                                            {currentQuestion.options.map((option, index) => {
                                                                const isSelected = selectedAnswers[currentQuestionIndex] === index;
                                                                const isCorrect = index === currentQuestion.correctAnswer;
                                                                const showResult = showResults[currentQuestionIndex];

                                                                let bgClass = 'bg-bg-tertiary hover:bg-bg-primary';
                                                                if (showResult) {
                                                                    if (isCorrect) {
                                                                        bgClass = 'bg-accent-green bg-opacity-20 border-accent-green';
                                                                    } else if (isSelected && !isCorrect) {
                                                                        bgClass = 'bg-accent-red bg-opacity-20 border-accent-red';
                                                                    }
                                                                } else if (isSelected) {
                                                                    bgClass = 'bg-accent-blue bg-opacity-20 border-accent-blue';
                                                                }

                                                                return (
                                                                    <button
                                                                        key={index}
                                                                        onClick={() => !showResult && handleAnswerSelect(index)}
                                                                        disabled={showResult}
                                                                        className={`w-full text-left p-4 rounded-lg border-2 border-transparent transition-all ${bgClass} ${!showResult ? 'cursor-pointer' : 'cursor-default'
                                                                            }`}
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-text-primary">{option}</span>
                                                                            {showResult && isCorrect && <CheckCircle className="text-accent-green" size={20} />}
                                                                            {showResult && isSelected && !isCorrect && <XCircle className="text-accent-red" size={20} />}
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        {showResults[currentQuestionIndex] && (
                                                            <div className="bg-accent-blue bg-opacity-10 p-4 rounded-lg border-l-4 border-accent-blue">
                                                                <h4 className="text-sm font-semibold text-accent-blue mb-2">💡 Giải thích</h4>
                                                                <p className="text-text-secondary text-sm">{currentQuestion.explanation}</p>
                                                            </div>
                                                        )}

                                                        {hasAnswered && (
                                                            <div className="text-center pt-4">
                                                                <Button onClick={handleNext}>
                                                                    {currentQuestionIndex === takingQuiz.questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-center space-y-6 py-8">
                                                <div className="text-6xl">🎉</div>
                                                <h2 className="text-3xl font-serif font-bold text-text-primary">Hoàn thành!</h2>

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-text-secondary mb-2">Điểm của bạn</p>
                                                        <p className="text-5xl font-bold text-accent-blue">{finalScore}%</p>
                                                        <p className="text-lg text-text-secondary mt-2">
                                                            {takingQuiz.questions.filter((_, i) => selectedAnswers[i] === takingQuiz.questions[i].correctAnswer).length}/{takingQuiz.questions.length} câu đúng
                                                        </p>
                                                    </div>

                                                    <div className="border-t border-bg-tertiary pt-4">
                                                        <p className="text-sm text-text-tertiary mb-2">💭 Nhận xét</p>
                                                        <p className="text-lg text-text-primary italic">
                                                            "{finalScore >= 80
                                                                ? 'Bạn có tư duy phản biện tuyệt vời!'
                                                                : finalScore >= 60
                                                                    ? 'Bạn đang trên đường trở thành nhà tư tưởng!'
                                                                    : 'Hãy tiếp tục học hỏi và khám phá!'}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 justify-center pt-4">
                                                    <Button variant="secondary" onClick={handleCloseQuiz}>
                                                        Đóng
                                                    </Button>
                                                    <Button onClick={() => handleStartQuiz(takingQuiz)}>
                                                        Làm lại
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
