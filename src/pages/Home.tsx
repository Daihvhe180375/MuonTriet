import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, BookOpen, Flame, BookMarked, CheckCircle } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { Modal } from '@/components/common/Modal';
import { getRandomQuote } from '@/data/quotes';
import { stories } from '@/data/stories';
import { useFlashcardStore } from '@/store/useFlashcardStore';
import { useQuizStore } from '@/store/useQuizStore';
import { useStreakStore } from '@/store/useStreakStore';
import { fadeIn, slideUp, staggerContainer, staggerItem } from '@/utils/animations';

export function Home() {
    const navigate = useNavigate();
    const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
    const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);

    const mastered = useFlashcardStore((state) => state.mastered);
    const completedQuizzes = useQuizStore((state) => state.completedQuizzes);
    const currentStreak = useStreakStore((state) => state.currentStreak);

    const handleRefreshQuote = () => {
        setCurrentQuote(getRandomQuote());
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="section bg-gradient-to-b from-bg-primary to-bg-secondary"
                {...fadeIn}
            >
                <div className="container mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <blockquote className="text-3xl md:text-4xl font-serif italic text-text-primary leading-relaxed">
                            "{currentQuote.text}"
                        </blockquote>
                        <p className="mt-4 text-xl text-accent-purple">— {currentQuote.author}</p>
                    </motion.div>

                    <Button variant="ghost" icon={RefreshCw} onClick={handleRefreshQuote} size="sm">
                        Quote khác
                    </Button>

                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-4 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Button icon={BookOpen} onClick={() => navigate('/flashcard')}>
                            Bắt đầu học ngay
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/quiz-daily')}>
                            Quiz hôm nay
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Intro Section */}
            <section className="section bg-bg-secondary">
                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <motion.h2
                        className="text-3xl font-serif font-bold text-text-primary"
                        {...slideUp}
                    >
                        Triết học là gì?
                    </motion.h2>

                    <motion.div
                        className="space-y-4 text-lg text-text-secondary leading-relaxed"
                        {...slideUp}
                    >
                        <p>Không phải sách vở khô khan. Không phải tranh luận phức tạp.</p>
                        <p className="text-text-primary font-medium">
                            Triết học là <span className="text-accent-blue">nghệ thuật đặt câu hỏi</span> về cuộc sống.
                        </p>
                        <p>Là cách bạn nhìn nhận thế giới mỗi ngày.</p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Stories */}
            <section className="section">
                <div className="container mx-auto">
                    <motion.h2
                        className="text-3xl font-serif font-bold text-text-primary text-center mb-12"
                        {...slideUp}
                    >
                        Câu chuyện Triết học
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {stories.map((story) => (
                            <motion.div key={story.id} variants={staggerItem}>
                                <Card onClick={() => setSelectedStory(story)}>
                                    {story.image && (
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                    )}
                                    <CardHeader>
                                        <CardTitle>{story.title}</CardTitle>
                                        <p className="text-sm text-accent-purple mt-1">{story.philosopher}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-text-secondary line-clamp-3">{story.summary}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="section bg-bg-secondary">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <motion.div
                            className="bg-bg-tertiary rounded-lg p-6 text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Flame className="mx-auto mb-3 text-accent-yellow" size={40} />
                            <p className="text-3xl font-bold text-text-primary">{currentStreak}</p>
                            <p className="text-text-secondary mt-1">Ngày liên tiếp</p>
                        </motion.div>

                        <motion.div
                            className="bg-bg-tertiary rounded-lg p-6 text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <BookMarked className="mx-auto mb-3 text-accent-blue" size={40} />
                            <p className="text-3xl font-bold text-text-primary">{mastered.length}</p>
                            <p className="text-text-secondary mt-1">Flashcard đã học</p>
                        </motion.div>

                        <motion.div
                            className="bg-bg-tertiary rounded-lg p-6 text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <CheckCircle className="mx-auto mb-3 text-accent-green" size={40} />
                            <p className="text-3xl font-bold text-text-primary">{completedQuizzes.length}</p>
                            <p className="text-text-secondary mt-1">Quiz hoàn thành</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Story Modal */}
            <Modal
                isOpen={selectedStory !== null}
                onClose={() => setSelectedStory(null)}
                title={selectedStory?.title}
                size="lg"
            >
                {selectedStory && (
                    <div className="space-y-4">
                        {selectedStory.image && (
                            <img
                                src={selectedStory.image}
                                alt={selectedStory.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        )}
                        <div className="flex items-center gap-2">
                            <p className="text-accent-purple font-semibold">{selectedStory.philosopher}</p>
                        </div>
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                            {selectedStory.content}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
