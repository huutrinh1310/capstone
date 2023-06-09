import { Question } from './Question.interface';

export interface Topic {
    id: number;
    topicName: string;
    subjectName: string;
    questions: Question[];
}
