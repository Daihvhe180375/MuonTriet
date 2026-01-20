import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    color?: 'blue' | 'green' | 'purple' | 'yellow';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export function ProgressBar({
    value,
    max = 100,
    color = 'blue',
    size = 'md',
    showLabel = true,
    className = '',
}: ProgressBarProps) {
    const percentage = Math.min(Math.round((value / max) * 100), 100);

    const colorStyles = {
        blue: 'bg-accent-blue',
        green: 'bg-accent-green',
        purple: 'bg-accent-purple',
        yellow: 'bg-accent-yellow',
    };

    const sizeStyles = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Tiến độ</span>
                    <span className="text-sm font-semibold text-text-primary">{percentage}%</span>
                </div>
            )}

            <div className={`w-full bg-bg-tertiary rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <motion.div
                    className={`${colorStyles[color]} ${sizeStyles[size]} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}
