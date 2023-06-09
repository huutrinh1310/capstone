import { QuestionType } from '@/components/QuestionDetail';
import { Choice } from './Choice.interface';

export interface Question {
    id: number;
    image?: string;
    question: string;
    description?: string;
    questionType: QuestionType;
    choices: Choice[];
    note?: string;
}
