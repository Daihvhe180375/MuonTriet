import { QuizQuestion } from '@/types';

export const quizzes: QuizQuestion[] = [
    {
        id: 'q-001',
        question: 'Theo Socrates, điều gì quan trọng nhất trong cuộc sống?',
        options: [
            'Tích lũy tài sản',
            'Đạt được danh tiếng',
            'Suy ngẫm và tự hiểu biết',
            'Chinh phục người khác',
        ],
        correctAnswer: 2,
        explanation:
            'Socrates tin rằng "cuộc sống chưa được suy ngẫm không đáng sống". Việc tự tìm hiểu bản thân và đặt câu hỏi về cuộc sống quan trọng hơn mọi thành tựu vật chất.',
        category: 'ethics',
        difficulty: 'easy',
        relatedPhilosopher: 'Socrates',
    },
    {
        id: 'q-002',
        question: 'Marcus Aurelius dạy rằng ta nên tập trung vào điều gì?',
        options: [
            'Những gì ta kiểm soát được',
            'Ý kiến người khác về ta',
            'Vận may và số phận',
            'Thành công vật chất',
        ],
        correctAnswer: 0,
        explanation:
            'Triết học Khắc Kỷ dạy rằng ta chỉ nên tập trung vào những gì ta có thể kiểm soát (suy nghĩ, hành động), và chấp nhận những gì nằm ngoài tầm kiểm soát (thời tiết, ý kiến người khác).',
        category: 'ethics',
        difficulty: 'medium',
        relatedPhilosopher: 'Marcus Aurelius',
    },
    {
        id: 'q-003',
        question: 'Theo Sartre, "tồn tại đi trước bản chất" có nghĩa là gì?',
        options: [
            'Con người sinh ra đã có định mệnh',
            'Bản chất con người do Thượng đế quyết định',
            'Con người tự tạo ra bản chất qua hành động',
            'Tồn tại là điều ngẫu nhiên không có ý nghĩa',
        ],
        correctAnswer: 2,
        explanation:
            'Sartre tin rằng con người không có "bản chất" định sẵn. Ta tồn tại trước, rồi tự quyết định mình là ai qua những lựa chọn và hành động.',
        category: 'existence',
        difficulty: 'hard',
        relatedPhilosopher: 'Jean-Paul Sartre',
    },
    {
        id: 'q-004',
        question: 'Descartes bắt đầu triết học của mình bằng cách nào?',
        options: [
            'Tin vào mọi thứ người khác nói',
            'Nghi ngờ mọi thứ có thể nghi ngờ được',
            'Chấp nhận kiến thức truyền thống',
            'Dựa vào kinh nghiệm giác quan',
        ],
        correctAnswer: 1,
        explanation:
            'Descartes sử dụng "nghi ngờ có phương pháp" - nghi ngờ mọi thứ để tìm ra điều chắc chắn tuyệt đối. Ông phát hiện rằng điều duy nhất không thể nghi ngờ là việc chính mình đang suy nghĩ.',
        category: 'epistemology',
        difficulty: 'medium',
        relatedPhilosopher: 'René Descartes',
    },
    {
        id: 'q-005',
        question: 'Ngụy biện "Ad Hominem" là gì?',
        options: [
            'Tấn công người nói thay vì lập luận',
            'Đưa ra lập luận không có căn cứ',
            'Sử dụng cảm xúc thay vì lý trí',
            'Lặp lại lập luận nhiều lần',
        ],
        correctAnswer: 0,
        explanation:
            'Ad Hominem là khi bạn tấn công cá nhân người đưa ra lập luận thay vì phản bác lập luận của họ. Ví dụ: "Ý kiến của bạn sai vì bạn còn trẻ" - không bác bỏ ý kiến, chỉ tấn công tuổi tác.',
        category: 'logic',
        difficulty: 'easy',
    },
    {
        id: 'q-006',
        question: 'Theo Aristotle, hạnh phúc đạt được bằng cách nào?',
        options: [
            'Có nhiều tiền và quyền lực',
            'Thực hành đức hạnh liên tục',
            'Tránh mọi khó khăn',
            'Theo đuổi khoái lạc',
        ],
        correctAnswer: 1,
        explanation:
            'Aristotle tin rằng hạnh phúc (eudaimonia) không phải là cảm xúc tạm thời mà là trạng thái sống tốt đẹp, đạt được qua việc thực hành đức hạnh mỗi ngày.',
        category: 'ethics',
        difficulty: 'medium',
        relatedPhilosopher: 'Aristotle',
    },
    {
        id: 'q-007',
        question: 'Câu chuyện "Hố sâu" của Plato dạy gì?',
        options: [
            'Thực tại là ảo giác',
            'Ta chỉ thấy bóng của thực tại thật',
            'Không có thực tại khách quan',
            'Mọi thứ đều là giấc mơ',
        ],
        correctAnswer: 1,
        explanation:
            'Plato so sánh con người như tù nhân trong hang động, chỉ nhìn thấy bóng trên tường. Những gì ta thấy chỉ là phản chiếu mờ nhạt của thực tại thật (thế giới ý niệm).',
        category: 'epistemology',
        difficulty: 'medium',
        relatedPhilosopher: 'Plato',
    },
    {
        id: 'q-008',
        question: 'Albert Camus nói về "cảm giác vô nghĩa" là gì?',
        options: [
            'Cuộc sống hoàn toàn vô ích',
            'Mâu thuẫn giữa tìm ý nghĩa và im lặng của vũ trụ',
            'Con người không cần ý nghĩa',
            'Chỉ tôn giáo mới có ý nghĩa',
        ],
        correctAnswer: 1,
        explanation:
            'Camus mô tả "absurdity" (sự vô lý) là mâu thuẫn giữa nhu cầu tìm ý nghĩa của con người và sự im lặng, thờ ơ của vũ trụ. Nhưng ta vẫn nên sống đầy đủ bất chấp điều này.',
        category: 'existence',
        difficulty: 'hard',
        relatedPhilosopher: 'Albert Camus',
    },
    {
        id: 'q-009',
        question: 'Kant nói rằng hành động đạo đức phải xuất phát từ đâu?',
        options: [
            'Cảm xúc tốt',
            'Bổn phận và lý trí',
            'Lợi ích cá nhân',
            'Truyền thống xã hội',
        ],
        correctAnswer: 1,
        explanation:
            'Kant tin rằng hành động đạo đức thực sự phải xuất phát từ bổn phận (duty) và lý trí, không phải từ cảm xúc hay lợi ích. Làm điều đúng vì nó đúng, không vì lợi ích.',
        category: 'ethics',
        difficulty: 'hard',
        relatedPhilosopher: 'Immanuel Kant',
    },
    {
        id: 'q-010',
        question: 'Ngụy biện "Dốc trơn" (Slippery Slope) là gì?',
        options: [
            'Lập luận có logic chặt chẽ',
            'Cho rằng hành động nhỏ dẫn đến thảm họa không có căn cứ',
            'Đưa ra nhiều ví dụ',
            'Sử dụng thống kê sai',
        ],
        correctAnswer: 1,
        explanation:
            'Ngụy biện dốc trơn là khi ta cho rằng một hành động nhỏ sẽ tất yếu dẫn đến hậu quả thảm khốc mà không có chứng cứ rõ ràng. Ví dụ: "Nếu cho phép game, trẻ sẽ nghiện, bỏ học, thất nghiệp!"',
        category: 'logic',
        difficulty: 'medium',
    },
    {
        id: 'q-011',
        question: 'Đức Phật dạy về "Vô thường" (Anicca) là gì?',
        options: [
            'Mọi thứ đều thay đổi',
            'Không có thần linh',
            'Cuộc sống là khổ đau',
            'Cần tịnh tâm mỗi ngày',
        ],
        correctAnswer: 0,
        explanation:
            'Anicca (vô thường) là nguyên lý rằng mọi thứ đều thay đổi và không có gì tồn tại mãi mãi. Hiểu điều này giúp ta bớt bám víu vào khoái lạc hay đau khổ tạm thời.',
        category: 'existence',
        difficulty: 'easy',
        relatedPhilosopher: 'Đức Phật',
    },
    {
        id: 'q-012',
        question: 'Theo Hume, vấn đề của "quy nạp" là gì?',
        options: [
            'Quy nạp luôn đúng',
            'Không thể chứng minh tương lai giống quá khứ',
            'Quy nạp không cần chứng minh',
            'Chỉ khoa học mới dùng quy nạp',
        ],
        correctAnswer: 1,
        explanation:
            'Hume chỉ ra rằng ta không thể chứng minh logic rằng tương lai sẽ giống quá khứ chỉ dựa vào kinh nghiệm. Mặt trời mọc mỗi ngày không đảm bảo nó sẽ mọc ngày mai.',
        category: 'epistemology',
        difficulty: 'hard',
        relatedPhilosopher: 'David Hume',
    },
    {
        id: 'q-013',
        question: 'Triết học Khắc Kỷ khuyên ta làm gì khi gặp khó khăn?',
        options: [
            'Than phiền và tìm người đổ lỗi',
            'Tập trung vào điều ta kiểm soát được',
            'Bỏ cuộc và chấp nhận thất bại',
            'Cầu nguyện cho may mắn',
        ],
        correctAnswer: 1,
        explanation:
            'Triết học Khắc Kỷ dạy ta phân biệt giữa điều ta kiểm soát (suy nghĩ, hành động) và điều nằm ngoài tầm kiểm soát. Tập trung năng lượng vào điều ta có thể thay đổi.',
        category: 'ethics',
        difficulty: 'easy',
    },
    {
        id: 'q-014',
        question: 'Theo Plato, "cái đẹp" là gì?',
        options: [
            'Chủ quan, mỗi người khác nhau',
            'Sự hài hòa và tỷ lệ hoàn hảo',
            'Những gì xã hội chấp nhận',
            'Không có tiêu chuẩn',
        ],
        correctAnswer: 1,
        explanation:
            'Plato tin rằng cái đẹp là khách quan - là sự hài hòa, cân đối, tỷ lệ hoàn hảo phản ánh chân lý vĩnh cửu trong thế giới ý niệm.',
        category: 'aesthetics',
        difficulty: 'medium',
        relatedPhilosopher: 'Plato',
    },
    {
        id: 'q-015',
        question: 'Kierkegaard nói "lo âu" sinh ra từ đâu?',
        options: [
            'Thiếu tiền bạc',
            'Đối mặt với tự do và lựa chọn',
            'Sợ cái chết',
            'Không có tôn giáo',
        ],
        correctAnswer: 1,
        explanation:
            'Kierkegaard tin rằng lo âu (anxiety) sinh ra khi con người nhận ra mình hoàn toàn tự do lựa chọn và phải chịu trách nhiệm về lựa chọn đó. Tự do là gánh nặng.',
        category: 'existence',
        difficulty: 'medium',
        relatedPhilosopher: 'Søren Kierkegaard',
    },
];

export function getRandomQuestions(count: number, category?: string, difficulty?: string): QuizQuestion[] {
    let filtered = [...quizzes];

    if (category) {
        filtered = filtered.filter((q) => q.category === category);
    }

    if (difficulty) {
        filtered = filtered.filter((q) => q.difficulty === difficulty);
    }

    // Shuffle and take 'count' items
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function getDailyQuiz(): QuizQuestion[] {
    // Get 3 random questions for daily quiz
    return getRandomQuestions(3);
}
