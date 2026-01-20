import { format, isToday, parseISO, startOfDay, differenceInDays } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: vi });
}

export function getTodayString(): string {
    return format(startOfDay(new Date()), 'yyyy-MM-dd');
}

export function isDateToday(dateStr: string): boolean {
    try {
        const date = parseISO(dateStr);
        return isToday(date);
    } catch {
        return false;
    }
}

export function calculateStreak(lastDate: string | null): boolean {
    if (!lastDate) return false;

    try {
        const last = parseISO(lastDate);
        const today = startOfDay(new Date());
        const daysDiff = differenceInDays(today, startOfDay(last));

        // Streak continues if last activity was today or yesterday
        return daysDiff <= 1;
    } catch {
        return false;
    }
}

export function getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        dates.push(format(current, 'yyyy-MM-dd'));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

export function getWeeksInMonth(date: Date = new Date()): Date[][] {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);

    const weeks: Date[][] = [];
    let week: Date[] = [];

    // Fill in days before first day of month
    const startDayOfWeek = firstDay.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const prevDate = new Date(year, month, -i);
        week.push(prevDate);
    }

    // Fill in days of month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        week.push(new Date(year, month, day));

        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    // Fill in remaining days
    if (week.length > 0) {
        const remaining = 7 - week.length;
        for (let i = 1; i <= remaining; i++) {
            week.push(new Date(year, month + 1, i));
        }
        weeks.push(week);
    }

    return weeks;
}
