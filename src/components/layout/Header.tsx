import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X } from 'lucide-react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Trang chủ' },
        { path: '/flashcard', label: 'Flashcard' },
        { path: '/quiz-daily', label: 'Quiz Daily' },
        { path: '/quiz-custom', label: 'Quiz Tùy Chỉnh' },
        { path: '/pomodoro', label: 'Pomodoro' },
        { path: '/dashboard', label: 'Thống kê' },
    ];

    return (
        <header className="bg-bg-secondary border-b border-bg-tertiary sticky top-0 z-30">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <BookOpen className="text-accent-purple group-hover:text-accent-blue transition-colors" size={28} />
                        <div>
                            <h1 className="text-xl font-serif font-bold text-text-primary">Muôn Triết</h1>
                            <p className="text-xs text-text-tertiary">Philosophy for Everyday Life</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-text-secondary hover:text-accent-blue transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.nav
                        className="md:hidden py-4 border-t border-bg-tertiary"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block py-2 text-text-secondary hover:text-accent-blue transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.nav>
                )}
            </div>
        </header>
    );
}
