import * as httpRequest from '@/utils/httpRequest';
import { Question } from '@/interface/Question.interface';
import { QuestionType } from '@/components/QuestionDetail';
import { Choice } from '@/interface/Choice.interface';

export const getQuestion = async (id: number) => {
    try {
        const response = await httpRequest.get('/question?topicId=' + id);
        const result: Question[] = mapperQuestions(response.data);
        return result;
    } catch (e){
        throw e;
    }
};



const mapperQuestions = (data: any): Question[] => {
    const result: Question[] = [];
    console.log(data);
    data.forEach((item: any) =>{
        const question: Question ={
            id: item.id,
            image: item.image,
            question: item.description,
            // description: item.description,
            //TODO: equals enum
            questionType: item.type,
            choices: item.questionChoices,
            note: item.note,
        }
        result.push(question);
    })
    return result
}