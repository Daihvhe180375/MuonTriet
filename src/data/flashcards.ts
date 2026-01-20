import { Flashcard } from '@/types';

export const flashcards: Flashcard[] = [
    // Ethics
    {
        id: 'fc-001',
        category: 'ethics',
        front: 'Đế chế là gì theo Marcus Aurelius?',
        back: {
            explanation: 'Không phải là quyền lực hay tài sản, mà là khả năng kiểm soát suy nghĩ và hành động của chính mình.',
            example: 'Khi gặp khó khăn, thay vì than phiền, hãy tự hỏi: "Tôi có thể học được gì từ điều này?"',
        },
        difficulty: 'medium',
        philosopher: 'Marcus Aurelius',
    },
    {
        id: 'fc-002',
        category: 'ethics',
        front: 'Hạnh phúc (Eudaimonia) theo Aristotle',
        back: {
            explanation: 'Hạnh phúc là trạng thái sống tốt đẹp, đạt được qua việc thực hành đức hạnh liên tục.',
            example: 'Không phải việc ăn một bữa lành mạnh làm bạn khỏe, mà là thói quen ăn uống tốt mỗi ngày.',
        },
        difficulty: 'medium',
        philosopher: 'Aristotle',
    },
    {
        id: 'fc-003',
        category: 'ethics',
        front: 'Mệnh lệnh tuyệt đối (Categorical Imperative)',
        back: {
            explanation: 'Chỉ hành động theo nguyên tắc mà bạn muốn nó trở thành quy luật phổ quát.',
            example: 'Trước khi nói dối, hãy tự hỏi: "Nếu mọi người đều nói dối, thế giới sẽ ra sao?"',
        },
        difficulty: 'hard',
        philosopher: 'Immanuel Kant',
    },
    {
        id: 'fc-004',
        category: 'ethics',
        front: 'Chủ nghĩa Khoái lạc (Hedonism)',
        back: {
            explanation: 'Hành động đúng là hành động mang lại hạnh phúc tối đa cho số đông nhất.',
            example: 'Khi quyết định mở nhạc to, hãy nghĩ: "Niềm vui của tôi có đáng để làm phiền hàng xóm không?"',
        },
        difficulty: 'easy',
        philosopher: 'Jeremy Bentham',
    },
    {
        id: 'fc-005',
        category: 'ethics',
        front: 'Đức hạnh Khắc Kỷ (Stoic Virtue)',
        back: {
            explanation: 'Tập trung vào những gì ta kiểm soát được, chấp nhận những gì ta không kiểm soát được.',
            example: 'Bạn không kiểm soát được thời tiết, nhưng kiểm soát được cách ứng xử với mưa.',
        },
        difficulty: 'medium',
        philosopher: 'Epictetus',
    },

    // Existence
    {
        id: 'fc-006',
        category: 'existence',
        front: 'Anxiety (Lo âu) theo Kierkegaard',
        back: {
            explanation: 'Lo lắng sinh ra khi con người đối mặt với tự do và trách nhiệm lựa chọn.',
            example: 'Cảm giác bối rối khi phải chọn ngành học - vì bạn tự do, nhưng phải chịu trách nhiệm về lựa chọn.',
        },
        difficulty: 'hard',
        philosopher: 'Søren Kierkegaard',
    },
    {
        id: 'fc-007',
        category: 'existence',
        front: 'Tồn tại đi trước bản chất',
        back: {
            explanation: 'Con người tồn tại trước tiên, rồi mới tự tạo ra bản chất của chính mình.',
            example: 'Bạn không sinh ra với "định mệnh", bạn tự quyết định mình là ai qua hành động.',
        },
        difficulty: 'medium',
        philosopher: 'Jean-Paul Sartre',
    },
    {
        id: 'fc-008',
        category: 'existence',
        front: 'Cảm giác Vô nghĩa (Absurdity)',
        back: {
            explanation: 'Mâu thuẫn giữa nhu cầu tìm ý nghĩa và sự im lặng của vũ trụ.',
            example: 'Bạn muốn cuộc đời có mục đích, nhưng vũ trụ không quan tâm bạn tồn tại hay không.',
        },
        difficulty: 'hard',
        philosopher: 'Albert Camus',
    },
    {
        id: 'fc-009',
        category: 'existence',
        front: 'Heidegger - Dasein (Hiện-có)',
        back: {
            explanation: 'Con người là thực thể duy nhất quan tâm đến sự tồn tại của chính mình.',
            example: 'Một viên đá không bao giờ tự hỏi: "Tại sao tôi ở đây?" - nhưng con người thì có.',
        },
        difficulty: 'hard',
        philosopher: 'Martin Heidegger',
    },
    {
        id: 'fc-010',
        category: 'existence',
        front: 'Vô thường (Anicca)',
        back: {
            explanation: 'Mọi thứ đều thay đổi, không có gì tồn tại mãi mãi.',
            example: 'Cơn đau đầu sẽ qua, niềm vui cũng sẽ qua - hiểu điều này giúp bạn bớt bám víu.',
        },
        difficulty: 'easy',
        philosopher: 'Đức Phật (Buddha)',
    },

    // Epistemology
    {
        id: 'fc-011',
        category: 'epistemology',
        front: 'Nghi ngờ có phương pháp',
        back: {
            explanation: 'Nghi ngờ mọi thứ có thể nghi ngờ được, để tìm ra điều chắc chắn tuyệt đối.',
            example: 'Descartes nghi ngờ cả giấc mơ, nhưng không thể nghi ngờ rằng mình đang suy nghĩ.',
        },
        difficulty: 'medium',
        philosopher: 'René Descartes',
    },
    {
        id: 'fc-012',
        category: 'epistemology',
        front: 'Kinh nghiệm là nguồn tri thức',
        back: {
            explanation: 'Tất cả kiến thức đều đến từ trải nghiệm giác quan, không có ý tưởng bẩm sinh.',
            example: 'Bạn biết lửa nóng vì đã chạm vào, không phải vì sinh ra đã biết.',
        },
        difficulty: 'medium',
        philosopher: 'John Locke',
    },
    {
        id: 'fc-013',
        category: 'epistemology',
        front: 'Hố sâu Plato (Allegory of the Cave)',
        back: {
            explanation: 'Con người như tù nhân trong hang động, chỉ nhìn thấy bóng của thực tại.',
            example: 'Những gì bạn thấy trên mạng xã hội chỉ là "bóng" của cuộc sống thật.',
        },
        difficulty: 'easy',
        philosopher: 'Plato',
    },
    {
        id: 'fc-014',
        category: 'epistemology',
        front: 'Vấn đề quy nạp (Problem of Induction)',
        back: {
            explanation: 'Không thể chứng minh rằng tương lai sẽ giống quá khứ chỉ dựa vào kinh nghiệm.',
            example: 'Mặt trời mọc mỗi ngày không đảm bảo nó sẽ mọc ngày mai - đó chỉ là thói quen.',
        },
        difficulty: 'hard',
        philosopher: 'David Hume',
    },
    {
        id: 'fc-015',
        category: 'epistemology',
        front: 'Lý trí thuần túy',
        back: {
            explanation: 'Một số kiến thức không đến từ kinh nghiệm mà từ cấu trúc tâm trí.',
            example: 'Bạn biết 2+2=4 không cần đếm đá, vì đó là quy luật logic bẩm sinh.',
        },
        difficulty: 'medium',
        philosopher: 'Immanuel Kant',
    },

    // Logic
    {
        id: 'fc-016',
        category: 'logic',
        front: 'Mâu thuẫn Logic (Logical Contradiction)',
        back: {
            explanation: 'Một mệnh đề không thể vừa đúng vừa sai cùng lúc.',
            example: 'Không thể nói "tôi luôn nói dối" vì câu đó tự phủ định chính nó.',
        },
        difficulty: 'easy',
    },
    {
        id: 'fc-017',
        category: 'logic',
        front: 'Ngụy biện Ad Hominem',
        back: {
            explanation: 'Tấn công người nói thay vì phản bác lập luận của họ.',
            example: '"Ý kiến của bạn không đáng tin vì bạn chỉ mới 20 tuổi" - không bác bỏ ý kiến, chỉ tấn công tuổi tác.',
        },
        difficulty: 'easy',
    },
    {
        id: 'fc-018',
        category: 'logic',
        front: 'Ngụy biện Dốc trơn (Slippery Slope)',
        back: {
            explanation: 'Cho rằng một hành động nhỏ sẽ dẫn đến hậu quả thảm khốc không có căn cứ.',
            example: '"Nếu cho phép người ta chơi game, họ sẽ bỏ học, thất nghiệp, vô gia cư!"',
        },
        difficulty: 'medium',
    },
    {
        id: 'fc-019',
        category: 'logic',
        front: 'Ngụy biện Hậu quả sai (False Cause)',
        back: {
            explanation: 'Cho rằng A gây ra B chỉ vì A xảy ra trước B.',
            example: '"Tôi đi thi thi rớt, chắc vì không đi lễ" - tương quan không phải nhân quả.',
        },
        difficulty: 'medium',
    },
    {
        id: 'fc-020',
        category: 'logic',
        front: 'Phi lý Lý tưởng (Nirvana Fallacy)',
        back: {
            explanation: 'Từ chối giải pháp tốt vì nó không hoàn hảo.',
            example: '"Đeo khẩu trang không ngăn 100% virus nên không cần đeo" - bỏ qua lợi ích một phần.',
        },
        difficulty: 'medium',
    },

    // Aesthetics
    {
        id: 'fc-021',
        category: 'aesthetics',
        front: 'Cái Đẹp là gì?',
        back: {
            explanation: 'Cái đẹp là sự hài hòa, cân đối, và tỷ lệ hoàn hảo - phản ánh chân lý vĩnh cửu.',
            example: 'Một bức tranh đẹp không phải vì màu sắc rực rỡ, mà vì sự cân bằng giữa các yếu tố.',
        },
        difficulty: 'easy',
        philosopher: 'Plato',
    },
    {
        id: 'fc-022',
        category: 'aesthetics',
        front: 'Nghệ thuật là bắt chước (Mimesis)',
        back: {
            explanation: 'Nghệ thuật tái hiện thực tại, giúp con người hiểu thế giới sâu sắc hơn.',
            example: 'Một bộ phim về chiến tranh giúp ta hiểu nỗi đau của chiến tranh mà không cần trải qua.',
        },
        difficulty: 'medium',
        philosopher: 'Aristotle',
    },
    {
        id: 'fc-023',
        category: 'aesthetics',
        front: 'Sự Cao Cả (The Sublime)',
        back: {
            explanation: 'Cảm giác vừa kinh ngạc vừa sợ hãi khi đối mặt với điều vượt khỏi hiểu biết.',
            example: 'Đứng trước núi cao hoặc biển cả - bạn cảm thấy nhỏ bé nhưng cũng kính sợ.',
        },
        difficulty: 'hard',
        philosopher: 'Immanuel Kant',
    },
    {
        id: 'fc-024',
        category: 'aesthetics',
        front: 'Nghệ thuật vì nghệ thuật',
        back: {
            explanation: 'Nghệ thuật không cần phục vụ mục đích đạo đức hay chính trị - chỉ cần đẹp.',
            example: 'Một bức tranh trừu tượng không cần "dạy bài học" - đẹp là đủ.',
        },
        difficulty: 'medium',
        philosopher: 'Oscar Wilde',
    },
    {
        id: 'fc-025',
        category: 'aesthetics',
        front: 'Cái Đẹp là Chủ quan',
        back: {
            explanation: 'Không có tiêu chuẩn khách quan về cái đẹp - mỗi người cảm nhận khác nhau.',
            example: 'Bạn thích nhạc rock, bạn thích ballad - không ai đúng, không ai sai.',
        },
        difficulty: 'easy',
        philosopher: 'David Hume',
    },
];

export function getFlashcardsByCategory(category: string) {
    return flashcards.filter((card) => card.category === category);
}

export function getFlashcardsByDifficulty(difficulty: string) {
    return flashcards.filter((card) => card.difficulty === difficulty);
}
