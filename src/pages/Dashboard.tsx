import React from 'react';
import { motion } from 'framer-motion';
import { Flame, BookMarked, CheckCircle, Timer, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { useFlashcardStore } from '@/store/useFlashcardStore';
import { useQuizStore } from '@/store/useQuizStore';
import { useStreakStore } from '@/store/useStreakStore';
import { formatDate, getTodayString } from '@/utils/dateHelpers';
import { staggerContainer, staggerItem } from '@/utils/animations';

export function Dashboard() {
    const mastered = useFlashcardStore((state) => state.mastered);
    const reviewing = useFlashcardStore((state) => state.reviewing);
    const completedQuizzes = useQuizStore((state) => state.completedQuizzes);
    const quizScores = useQuizStore((state) => state.quizScores);
    const { currentStreak, highestStreak, calendar, getTotalActivities } = useStreakStore();

    const totalActivities = getTotalActivities();
    const avgQuizScore = completedQuizzes.length > 0
        ? Math.round(
            Object.values(quizScores).reduce((sum, score) => sum + score, 0) / completedQuizzes.length
        )
        : 0;

    // Calculate calendar heatmap data (last 12 weeks)
    const getCalendarData = () => {
        const today = new Date();
        const weeks: Date[][] = [];

        for (let weekOffset = 11; weekOffset >= 0; weekOffset--) {
            const week: Date[] = [];
            for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
                const date = new Date(today);
                date.setDate(date.getDate() - (weekOffset * 7 + dayOffset));
                week.unshift(date);
            }
            weeks.push(week);
        }

        return weeks;
    };

    const calendarWeeks = getCalendarData();

    const getActivityIntensity = (date: Date) => {
        const dateStr = formatDate(date, 'yyyy-MM-dd');
        const activity = calendar[dateStr];

        if (!activity) return 0;

        const total = activity.flashcards + activity.quizzes + activity.pomodoros;
        if (total === 0) return 0;
        if (total <= 2) return 1;
        if (total <= 5) return 2;
        if (total <= 8) return 3;
        return 4;
    };

    const getIntensityColor = (intensity: number) => {
        switch (intensity) {
            case 0: return 'bg-bg-tertiary';
            case 1: return 'bg-accent-blue bg-opacity-20';
            case 2: return 'bg-accent-blue bg-opacity-40';
            case 3: return 'bg-accent-blue bg-opacity-60';
            case 4: return 'bg-accent-blue bg-opacity-100';
            default: return 'bg-bg-tertiary';
        }
    };

    // Achievements
    const achievements = [
        {
            id: 'first-quiz',
            title: 'Khởi đầu tốt',
            description: 'Hoàn thành quiz đầu tiên',
            icon: '🎯',
            unlocked: completedQuizzes.length >= 1,
        },
        {
            id: 'week-streak',
            title: 'Kiên trì',
            description: 'Streak 7 ngày',
            icon: '🔥',
            unlocked: currentStreak >= 7 || highestStreak >= 7,
        },
        {
            id: 'month-streak',
            title: 'Triết gia',
            description: 'Streak 30 ngày',
            icon: '🏆',
            unlocked: currentStreak >= 30 || highestStreak >= 30,
        },
        {
            id: 'flashcard-master',
            title: 'Uyên bác',
            description: 'Thành thạo 20 flashcards',
            icon: '📚',
            unlocked: mastered.length >= 20,
        },
        {
            id: 'perfect-quiz',
            title: 'Bậc thầy',
            description: 'Đạt 100% trong 1 quiz',
            icon: '⭐',
            unlocked: Object.values(quizScores).some(score => score === 100),
        },
        {
            id: 'quiz-master',
            title: 'Chuyên gia Quiz',
            description: 'Hoàn thành 10 quiz',
            icon: '🎓',
            unlocked: completedQuizzes.length >= 10,
        },
    ];

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <div className="min-h-screen py-8 bg-bg-primary">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-serif font-bold text-text-primary mb-2">
                        📊 Thống kê học tập
                    </h1>
                    <p className="text-text-secondary">Theo dõi tiến trình học tập của bạn</p>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={staggerItem}>
                        <Card hover={false} className="bg-gradient-to-br from-accent-yellow to-accent-red">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white opacity-80 mb-1">Streak hiện tại</p>
                                    <p className="text-4xl font-bold text-white">{currentStreak}</p>
                                    <p className="text-xs text-white opacity-60 mt-1">Cao nhất: {highestStreak}</p>
                                </div>
                                <Flame size={48} className="text-white opacity-80" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                        <Card hover={false} className="bg-gradient-to-br from-accent-blue to-accent-purple">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white opacity-80 mb-1">Flashcards</p>
                                    <p className="text-4xl font-bold text-white">{mastered.length}</p>
                                    <p className="text-xs text-white opacity-60 mt-1">Đang xem lại: {reviewing.length}</p>
                                </div>
                                <BookMarked size={48} className="text-white opacity-80" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                        <Card hover={false} className="bg-gradient-to-br from-accent-green to-accent-blue">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white opacity-80 mb-1">Quizzes</p>
                                    <p className="text-4xl font-bold text-white">{completedQuizzes.length}</p>
                                    <p className="text-xs text-white opacity-60 mt-1">Điểm TB: {avgQuizScore}%</p>
                                </div>
                                <CheckCircle size={48} className="text-white opacity-80" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                        <Card hover={false} className="bg-gradient-to-br from-accent-purple to-accent-red">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white opacity-80 mb-1">Tổng hoạt động</p>
                                    <p className="text-4xl font-bold text-white">{totalActivities}</p>
                                    <p className="text-xs text-white opacity-60 mt-1">Tất cả thời gian</p>
                                </div>
                                <TrendingUp size={48} className="text-white opacity-80" />
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Calendar Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <Card hover={false}>
                        <CardHeader>
                            <CardTitle>📅 Lịch học tập (12 tuần gần nhất)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <div className="inline-flex gap-1">
                                    {calendarWeeks.map((week, weekIdx) => (
                                        <div key={weekIdx} className="flex flex-col gap-1">
                                            {week.map((date, dayIdx) => {
                                                const intensity = getActivityIntensity(date);
                                                const dateStr = formatDate(date, 'yyyy-MM-dd');
                                                const activity = calendar[dateStr];
                                                const isToday = dateStr === getTodayString();

                                                return (
                                                    <motion.div
                                                        key={dayIdx}
                                                        className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)} ${isToday ? 'ring-2 ring-accent-yellow' : ''
                                                            }`}
                                                        whileHover={{ scale: 1.5 }}
                                                        title={
                                                            activity
                                                                ? `${formatDate(date, 'dd/MM/yyyy')}: ${activity.flashcards
                                                                } flashcards, ${activity.quizzes} quiz, ${activity.pomodoros} pomodoro`
                                                                : formatDate(date, 'dd/MM/yyyy')
                                                        }
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 text-sm text-text-secondary">
                                <span>Ít hoạt động</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-bg-tertiary rounded-sm" />
                                    <div className="w-3 h-3 bg-accent-blue bg-opacity-20 rounded-sm" />
                                    <div className="w-3 h-3 bg-accent-blue bg-opacity-40 rounded-sm" />
                                    <div className="w-3 h-3 bg-accent-blue bg-opacity-60 rounded-sm" />
                                    <div className="w-3 h-3 bg-accent-blue bg-opacity-100 rounded-sm" />
                                </div>
                                <span>Nhiều hoạt động</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card hover={false}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>🏆 Thành tựu</CardTitle>
                                <span className="text-sm text-text-secondary">
                                    {unlockedCount}/{achievements.length} đã mở khóa
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {achievements.map((achievement) => (
                                    <motion.div
                                        key={achievement.id}
                                        className={`p-4 rounded-lg border-2 transition-all ${achievement.unlocked
                                                ? 'border-accent-green bg-accent-green bg-opacity-10'
                                                : 'border-bg-tertiary bg-bg-tertiary opacity-50'
                                            }`}
                                        whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="text-4xl">{achievement.icon}</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-text-primary mb-1">
                                                    {achievement.title}
                                                </h4>
                                                <p className="text-sm text-text-secondary">{achievement.description}</p>
                                                {achievement.unlocked && (
                                                    <p className="text-xs text-accent-green mt-2">✓ Đã mở khóa</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
