import { Quote } from '@/types';

export const quotes: Quote[] = [
    {
        id: 'qt-001',
        text: 'Cuộc sống chưa được suy ngẫm không đáng sống',
        author: 'Socrates',
        context: 'ancient',
    },
    {
        id: 'qt-002',
        text: 'Tôi tư duy, vậy nên tôi tồn tại',
        author: 'René Descartes',
        context: 'modern',
    },
    {
        id: 'qt-003',
        text: 'Địa ngục chính là người khác',
        author: 'Jean-Paul Sartre',
        context: 'contemporary',
    },
    {
        id: 'qt-004',
        text: 'Điều làm ta đau khổ không phải là bản thân sự việc, mà là cách ta nghĩ về nó',
        author: 'Marcus Aurelius',
        context: 'ancient',
    },
    {
        id: 'qt-005',
        text: 'Con người bị kết án tự do',
        author: 'Jean-Paul Sartre',
        context: 'contemporary',
    },
    {
        id: 'qt-006',
        text: 'Chỉ biết rằng mình không biết gì cả',
        author: 'Socrates',
        context: 'ancient',
    },
    {
        id: 'qt-007',
        text: 'Người ta không bước vào cùng một dòng sông hai lần',
        author: 'Heraclitus',
        context: 'ancient',
    },
    {
        id: 'qt-008',
        text: 'Hãy trở thành con người mà bạn muốn trở thành',
        author: 'Friedrich Nietzsche',
        context: 'modern',
    },
    {
        id: 'qt-009',
        text: 'Hạnh phúc phụ thuộc vào chính chúng ta',
        author: 'Aristotle',
        context: 'ancient',
    },
    {
        id: 'qt-010',
        text: 'Đời người như giấc mơ',
        author: 'Zhuangzi',
        context: 'ancient',
    },
    {
        id: 'qt-011',
        text: 'Ta tồn tại, do ta cảm nhận',
        author: 'Arthur Schopenhauer',
        context: 'modern',
    },
    {
        id: 'qt-012',
        text: 'Đừng nghĩ quá nhiều, hãy sống trong hiện tại',
        author: 'Lao Tzu',
        context: 'ancient',
    },
];

export function getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
