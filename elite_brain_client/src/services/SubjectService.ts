import { SubjectTopic } from '@/interface/SubjectTopic.interface';
import * as httpRequest from '@/utils/httpRequest';
import { Topic } from '@/interface/Topic.interface';
import { Question } from '@/interface/Question.interface';
import { QuestionType } from '@/components/QuestionDetail';
import { Choice } from '@/interface/Choice.interface';

export const getListQuestions = async () => {
    try {
        const response = await httpRequest.get('/subject');

        const result: SubjectTopic[] = mapperSubjectTopic(response.data);

        return result;
    } catch (error) {
        throw error;
    }
};

const mapperSubjectTopic = (data: any): SubjectTopic[] => {
    const result: SubjectTopic[] = [];
    data.forEach((item: any) => {
        const subjectTopic: SubjectTopic = {
            id: item.id,
            title: item.subjectName,
            topics: item.topics,
        };
        result.push(subjectTopic);
    });
    return result;
};

// const mapTopics = (data: any, subjectName: string): Topic[] => {
//     const  result: Topic[]=[];
//     data.forEach((item:any) =>{
//         const topic: Topic = {
//             id: item.id,
//             topicName: item.topicName,
//             subjectName: subjectName,
//             questions: mapQuestions(item.questions, item.topicName, item.subjectName)
//         }
//         result.push(topic);
//     })
//     return result;
// }
//
// const mapQuestions = (data: any, topicName: string, subjectName: string): Question[]=>{
//     const  result: Question[]=[];
//     data.forEach((item:any) =>{
//         const question: Question = {
//             id: item.id,
//             image: item.image,
//             question: item.question,
//             description: item.description,
//             questionType: item.questionType,
//             choices: item.choices,
//             note: item.note,
//             topicName: item.topicName,
//             subjectName: subjectName,
//         }
//         result.push(question);
//     })
//     return result;
// }