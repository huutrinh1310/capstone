import { Topic } from './Topic.interface';

export interface SubjectTopic {
    id: number;
    title: string;
    topics: Topic[];
}
