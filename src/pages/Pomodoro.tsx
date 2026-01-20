import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { Modal } from '@/components/common/Modal';
import { useStreakStore } from '@/store/useStreakStore';
import { getRandomQuote } from '@/data/quotes';
import toast from 'react-hot-toast';

type SessionType = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    sessionsUntilLongBreak: number;
    soundEnabled: boolean;
}

interface PomodoroState {
    sessionType: SessionType;
    timeLeft: number;
    isRunning: boolean;
    completedSessions: number;
    lastUpdated: number;
}

const STORAGE_KEY = 'pomodoro-state';

export function Pomodoro() {
    const recordActivity = useStreakStore((state) => state.recordActivity);

    const [settings, setSettings] = useState<PomodoroSettings>(() => {
        const saved = localStorage.getItem('pomodoro-settings');
        return saved ? JSON.parse(saved) : {
            workDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            sessionsUntilLongBreak: 4,
            soundEnabled: true,
        };
    });

    // Load state from localStorage
    const loadState = (): PomodoroState | null => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;

        const state: PomodoroState = JSON.parse(saved);

        // If timer was running, calculate elapsed time
        if (state.isRunning) {
            const elapsed = Math.floor((Date.now() - state.lastUpdated) / 1000);
            state.timeLeft = Math.max(0, state.timeLeft - elapsed);

            // If time ran out while away, handle it
            if (state.timeLeft === 0) {
                state.isRunning = false;
            }
        }

        return state;
    };

    const savedState = loadState();

    const [sessionType, setSessionType] = useState<SessionType>(savedState?.sessionType || 'work');
    const [timeLeft, setTimeLeft] = useState(savedState?.timeLeft || settings.workDuration * 60);
    const [isRunning, setIsRunning] = useState(savedState?.isRunning || false);
    const [completedSessions, setCompletedSessions] = useState(savedState?.completedSessions || 0);
    const [showSettings, setShowSettings] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        const state: PomodoroState = {
            sessionType,
            timeLeft,
            isRunning,
            completedSessions,
            lastUpdated: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [sessionType, timeLeft, isRunning, completedSessions]);

    // Save settings to localStorage
    useEffect(() => {
        localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    }, [settings]);

    // Timer effect
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleSessionComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    // Update document title with timer
    useEffect(() => {
        if (isRunning) {
            document.title = `${formatTime(timeLeft)} - ${getSessionLabel()} | Muôn Triết`;
        } else {
            document.title = 'Muôn Triết - Philosophy for Everyday Life';
        }

        return () => {
            document.title = 'Muôn Triết - Philosophy for Everyday Life';
        };
    }, [isRunning, timeLeft, sessionType]);

    const handleSessionComplete = () => {
        setIsRunning(false);

        if (sessionType === 'work') {
            const newCompletedSessions = completedSessions + 1;
            setCompletedSessions(newCompletedSessions);
            recordActivity('pomodoros');

            // Determine next session type
            if (newCompletedSessions % settings.sessionsUntilLongBreak === 0) {
                setSessionType('longBreak');
                setTimeLeft(settings.longBreakDuration * 60);
                toast.success('🎉 Hoàn thành! Nghỉ dài nhé!');
            } else {
                setSessionType('shortBreak');
                setTimeLeft(settings.shortBreakDuration * 60);
                toast.success('✅ Hoàn thành! Nghỉ ngắn thôi!');
            }

            if (settings.soundEnabled) {
                playNotificationSound();
            }
        } else {
            setSessionType('work');
            setTimeLeft(settings.workDuration * 60);
            setCurrentQuote(getRandomQuote());
            toast('⏰ Hết giờ nghỉ! Tiếp tục học thôi!');
        }
    };

    const playNotificationSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.3;

            oscillator.start();
            setTimeout(() => oscillator.stop(), 200);
        } catch (error) {
            console.log('Audio not supported');
        }
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        const duration = sessionType === 'work'
            ? settings.workDuration
            : sessionType === 'shortBreak'
                ? settings.shortBreakDuration
                : settings.longBreakDuration;
        setTimeLeft(duration * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getSessionLabel = () => {
        switch (sessionType) {
            case 'work': return '🎯 Học tập';
            case 'shortBreak': return '☕ Nghỉ ngắn';
            case 'longBreak': return '🌟 Nghỉ dài';
        }
    };

    const getSessionColor = () => {
        switch (sessionType) {
            case 'work': return 'from-accent-blue to-accent-purple';
            case 'shortBreak': return 'from-accent-green to-accent-blue';
            case 'longBreak': return 'from-accent-purple to-accent-red';
        }
    };

    return (
        <div className="min-h-screen py-8 bg-bg-primary">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif font-bold text-text-primary">
                        ⏳ Pomodoro Timer
                    </h1>
                    <Button icon={Settings} variant="ghost" onClick={() => setShowSettings(true)}>
                        Cài đặt
                    </Button>
                </div>

                {/* Main Timer Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <Card hover={false} className={`bg-gradient-to-br ${getSessionColor()} p-12`}>
                        <div className="text-center space-y-6">
                            {/* Session Type */}
                            <div className="text-2xl font-semibold text-white">
                                {getSessionLabel()}
                            </div>

                            {/* Timer Display */}
                            <div className="text-8xl font-bold text-white font-mono">
                                {formatTime(timeLeft)}
                            </div>

                            {/* Session Progress Dots */}
                            <div className="flex items-center justify-center gap-2">
                                {Array.from({ length: settings.sessionsUntilLongBreak }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-3 h-3 rounded-full ${idx < completedSessions % settings.sessionsUntilLongBreak
                                            ? 'bg-white'
                                            : 'bg-white bg-opacity-30'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-4 pt-4">
                                <Button
                                    onClick={toggleTimer}
                                    size="lg"
                                    variant="secondary"
                                    icon={isRunning ? Pause : Play}
                                    className="bg-white text-accent-blue hover:bg-opacity-90"
                                >
                                    {isRunning ? 'Tạm dừng' : 'Bắt đầu'}
                                </Button>
                                <Button
                                    onClick={resetTimer}
                                    size="lg"
                                    variant="ghost"
                                    icon={RotateCcw}
                                    className="text-white hover:bg-white hover:bg-opacity-20"
                                >
                                    Đặt lại
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Stats & Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stats */}
                    <Card hover={false}>
                        <CardHeader>
                            <CardTitle>📊 Thống kê hôm nay</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-text-secondary">Sessions hoàn thành</span>
                                    <span className="text-2xl font-bold text-accent-blue">{completedSessions}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-text-secondary">Thời gian tập trung</span>
                                    <span className="text-2xl font-bold text-accent-green">
                                        {completedSessions * settings.workDuration} phút
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-text-secondary">Mục tiêu hôm nay</span>
                                    <span className="text-sm text-text-tertiary">4 sessions (100 phút)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Suggestions */}
                    <Card hover={false}>
                        <CardHeader>
                            <CardTitle>
                                {sessionType === 'work' ? '📚 Gợi ý học' : '💭 Quote thư giãn'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {sessionType === 'work' ? (
                                <div className="space-y-3">
                                    <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = '/flashcard'}>
                                        5 flashcards về Đạo đức
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = '/quiz-daily'}>
                                        Quiz ngắn (3 câu)
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <blockquote className="text-lg italic text-text-primary">
                                        "{currentQuote.text}"
                                    </blockquote>
                                    <p className="text-sm text-accent-purple">— {currentQuote.author}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Settings Modal */}
                <Modal
                    isOpen={showSettings}
                    onClose={() => setShowSettings(false)}
                    title="⚙️ Cài đặt Pomodoro"
                >
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Thời gian làm việc (phút)
                            </label>
                            <div className="flex gap-2">
                                {[15, 25, 45].map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => {
                                            setSettings({ ...settings, workDuration: duration });
                                            if (sessionType === 'work' && !isRunning) {
                                                setTimeLeft(duration * 60);
                                            }
                                        }}
                                        className={`px-4 py-2 rounded transition-colors ${settings.workDuration === duration
                                            ? 'bg-accent-blue text-white'
                                            : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
                                            }`}
                                    >
                                        {duration}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Nghỉ ngắn (phút)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="15"
                                value={settings.shortBreakDuration}
                                onChange={(e) =>
                                    setSettings({ ...settings, shortBreakDuration: parseInt(e.target.value) })
                                }
                                className="w-full px-4 py-2 bg-bg-tertiary text-text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Nghỉ dài (phút)
                            </label>
                            <input
                                type="number"
                                min="10"
                                max="30"
                                value={settings.longBreakDuration}
                                onChange={(e) =>
                                    setSettings({ ...settings, longBreakDuration: parseInt(e.target.value) })
                                }
                                className="w-full px-4 py-2 bg-bg-tertiary text-text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-text-primary">Âm thanh thông báo</span>
                            <button
                                onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                                className={`px-4 py-2 rounded transition-colors ${settings.soundEnabled
                                    ? 'bg-accent-green text-white'
                                    : 'bg-bg-tertiary text-text-secondary'
                                    }`}
                            >
                                {settings.soundEnabled ? 'Bật' : 'Tắt'}
                            </button>
                        </div>

                        <div className="bg-accent-blue bg-opacity-10 p-4 rounded-lg">
                            <p className="text-sm text-accent-blue">
                                💡 <strong>Lưu ý:</strong> Timer sẽ tự động lưu tiến trình khi bạn chuyển tab hoặc đóng trình duyệt!
                            </p>
                        </div>

                        <Button onClick={() => setShowSettings(false)} className="w-full">
                            Lưu cài đặt
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
