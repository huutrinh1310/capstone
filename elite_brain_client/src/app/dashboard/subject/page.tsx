'use client';
import ListSubjects from '@/components/ListSubjects';
import { SubjectTopic } from '@/interface/SubjectTopic.interface';
import { getListQuestions } from '@/services/SubjectService';
import { useEffect, useState } from 'react';

export interface QuestionBankProps {}

export default function QuestionBank(props: QuestionBankProps) {
    const [listSubject, setListSubject] = useState<SubjectTopic[]>([]);

    useEffect(() => {
        const listSubject = async () => {
            try {
                const response: SubjectTopic[] = await getListQuestions();
                setListSubject(response);
            } catch (error) {
                console.log(error);
            }
        };

        listSubject();

        return () => {
            setListSubject([]);
        };
    }, []);

    return (
        <div>
            <h2 className="text-4xl font-bold text-text-400">Overview</h2>
            {listSubject.map((subject) => (
                <ListSubjects subjectName={subject.title} key={subject.id} listTopic={subject.topics}>
                    {subject.title}
                </ListSubjects>
            ))}
        </div>
    );
}
