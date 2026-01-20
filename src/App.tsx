import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Flashcard } from './pages/Flashcard';
import { QuizDaily } from './pages/QuizDaily';
import { Dashboard } from './pages/Dashboard';
import { Pomodoro } from './pages/Pomodoro';
import { QuizCustom } from './pages/QuizCustom';
import './styles/globals.css';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-bg-primary">
                <Header />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/flashcard" element={<Flashcard />} />
                        <Route path="/quiz-daily" element={<QuizDaily />} />
                        <Route path="/quiz-custom" element={<QuizCustom />} />
                        <Route path="/pomodoro" element={<Pomodoro />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>

                <Footer />

                {/* Toast Notifications */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--bg-tertiary)',
                        },
                        success: {
                            iconTheme: {
                                primary: 'var(--accent-green)',
                                secondary: 'var(--bg-secondary)',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: 'var(--accent-red)',
                                secondary: 'var(--bg-secondary)',
                            },
                        },
                    }}
                />
            </div>
        </Router>
    );
}

export default App;
