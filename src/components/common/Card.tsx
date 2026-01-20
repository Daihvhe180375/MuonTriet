import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
    return (
        <motion.div
            className={`bg-bg-secondary rounded-lg p-6 shadow-md ${hover ? 'cursor-pointer' : ''} ${className}`}
            whileHover={hover ? { y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } : {}}
            transition={{ duration: 0.2 }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return <h3 className={`text-xl font-serif font-semibold text-text-primary ${className}`}>{children}</h3>;
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={`text-text-secondary ${className}`}>{children}</div>;
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return <div className={`mt-4 pt-4 border-t border-bg-tertiary ${className}`}>{children}</div>;
}
