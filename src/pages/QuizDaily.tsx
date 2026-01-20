import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Flame } from 'lucide-react';
import Confetti from 'react-confetti';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useQuizStore } from '@/store/useQuizStore';
import { useStreakStore } from '@/store/useStreakStore';
import { getDailyQuiz } from '@/data/quizzes';
import { QuizQuestion } from '@/types';
import toast from 'react-hot-toast';

export function QuizDaily() {
    const navigate = useNavigate();
    const [questions] = useState<QuizQuestion[]>(getDailyQuiz());
    const [showConfetti, setShowConfetti] = useState(false);

    const {
        currentQuestionIndex,
        selectedAnswers,
        setCurrentQuestionIndex,
        selectAnswer,
        calculateScore,
        completeDailyQuiz,
        isDailyQuizCompleted,
        resetQuiz,
    } = useQuizStore();

    const { currentStreak, recordActivity } = useStreakStore();

    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState<boolean[]>([]);

    useEffect(() => {
        resetQuiz();
    }, []);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined && selectedAnswers[currentQuestionIndex] !== null;

    const handleAnswerSelect = (answerIndex: number) => {
        selectAnswer(currentQuestionIndex, answerIndex);
        const newShowResults = [...showResults];
        newShowResults[currentQuestionIndex] = true;
        setShowResults(newShowResults);
    };

    const handleNext = () => {
        if (isLastQuestion) {
            const finalScore = calculateScore(questions);
            setScore(finalScore);
            setIsCompleted(true);
            completeDailyQuiz(finalScore);
            recordActivity('quizzes');

            if (finalScore >= 70) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }

            toast.success('Hoàn thành quiz!');
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    if (isDailyQuizCompleted() && !isCompleted) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto bg-bg-secondary rounded-xl p-8"
                >
                    <CheckCircle className="mx-auto mb-4 text-accent-green" size={64} />
                    <h2 className="text-2xl font-serif font-bold text-text-primary mb-4">
                        Bạn đã hoàn thành quiz hôm nay!
                    </h2>
                    <p className="text-text-secondary mb-6">Quay lại vào ngày mai để tiếp tục học nhé! 🌟</p>
                    <Button onClick={() => navigate('/')}>Về trang chủ</Button>
                </motion.div>
            </div>
        );
    }

    if (isCompleted) {
        const personality = score >= 80
            ? 'Bạn có tư duy phản biện tuyệt vời!'
            : score >= 60
                ? 'Bạn đang trên đường trở thành nhà tư tưởng!'
                : 'Hãy tiếp tục học hỏi và khám phá!';

        return (
            <div className="container mx-auto px-4 py-16">
                {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="text-center">
                        <div className="space-y-6">
                            <div className="text-6xl">🎉</div>
                            <h2 className="text-3xl font-serif font-bold text-text-primary">Hoàn thành!</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-text-secondary mb-2">Điểm của bạn</p>
                                    <p className="text-5xl font-bold text-accent-blue">{score}%</p>
                                    <p className="text-lg text-text-secondary mt-2">
                                        {questions.filter((_, i) => selectedAnswers[i] === questions[i].correctAnswer).length}/{questions.length} câu đúng
                                    </p>
                                </div>

                                <div className="border-t border-bg-tertiary pt-4">
                                    <p className="text-sm text-text-tertiary mb-2">💭 Nhận xét</p>
                                    <p className="text-lg text-text-primary italic">"{personality}"</p>
                                </div>

                                <div className="flex items-center justify-center gap-3 bg-accent-yellow bg-opacity-10 py-4 rounded-lg">
                                    <Flame className="text-accent-yellow" size={32} />
                                    <div className="text-left">
                                        <p className="text-sm text-text-secondary">Streak hiện tại</p>
                                        <p className="text-2xl font-bold text-text-primary">{currentStreak} ngày</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center pt-4">
                                <Button variant="secondary" onClick={() => navigate('/')}>
                                    Về trang chủ
                                </Button>
                                <Button onClick={() => navigate('/flashcard')}>
                                    Học flashcard
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Progress */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Tiến độ</span>
                        <span className="text-sm font-semibold text-text-primary">
                            Câu {currentQuestionIndex + 1}/{questions.length}
                        </span>
                    </div>
                    <div className="w-full bg-bg-tertiary rounded-full h-2">
                        <motion.div
                            className="bg-accent-blue h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <Card className="mb-6">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-text-primary mb-4">
                                    {currentQuestion.question}
                                </h2>
                                {currentQuestion.relatedPhilosopher && (
                                    <p className="text-sm text-accent-purple">
                                        🧑‍🏫 {currentQuestion.relatedPhilosopher}
                                    </p>
                                )}
                            </div>

                            {/* Options */}
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

                            {/* Explanation */}
                            {showResults[currentQuestionIndex] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-accent-blue bg-opacity-10 p-4 rounded-lg border-l-4 border-accent-blue"
                                >
                                    <h4 className="text-sm font-semibold text-accent-blue mb-2">💡 Giải thích</h4>
                                    <p className="text-text-secondary text-sm">{currentQuestion.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </Card>

                    {/* Next Button */}
                    {hasAnswered && (
                        <div className="text-center">
                            <Button onClick={handleNext}>
                                {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo'}
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
