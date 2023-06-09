'use client';
import ListQuestion from '@/components/ListQuestion';
import { QuestionType } from '@/components/QuestionDetail';
import QuestionDetailForm from '@/components/QuestionDetailForm';
import { Choice } from '@/interface/Choice.interface';
import { Question } from '@/interface/Question.interface';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RiFileExcel2Line } from 'react-icons/ri';
import { FiFilePlus } from 'react-icons/fi';
import { MdSort } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';

import { Fragment } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
import { getQuestion } from '@/services/QuestionService';

export default function QuestionDetail() {
    const [isOpen, setIsOpen] = React.useState(false);
    const searchParams = useSearchParams();
    const subjectName: string | null = searchParams.get('subjectName');
    const topicName: string | null = searchParams.get('topicName');

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [listQuestion, setListQuestion] = React.useState<Question[]>([]);
    //TODO: get Detail question
    React.useEffect(() => {
        const getListQuestion = async () => {
            try {
                const list: Question[] = await getQuestion(1);
                console.log(list)
                setListQuestion(list);
            } catch (e) {
                console.log(e);
            }
        };

        getListQuestion();
        return () => {
            setListQuestion([]);
        };
    }, []);

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ');
    }

    const [addNewQuestions, setAddNewQuestions] = React.useState([
        { id: uuidv4(), form: 'question', question: '', type: 'MCQ', choices: [] },
    ]);

    const handleAddQuestionCard = () => {
        setAddNewQuestions([...addNewQuestions, {
            id: uuidv4(),
            form: 'question',
            question: '',
            type: 'MCQ',
            choices: [],
        }]);
    };

    const handleRemoveQuestionCard = (id: any) => {
        const values = [...addNewQuestions];
        values.splice(values.findIndex(value => value.id === id), 1);
        setAddNewQuestions(values);
    };

    return (
        <main>
            <div className='flex justify-between'>
                <div>
                    <div className='mb-5'>
                        <span className='text-text-100 text-2xl me-2'>{subjectName}</span>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className='text-text-200 text-sm me-2'
                        />
                        <span className='text-text-100 text-2xl'>{topicName}</span>
                    </div>
                    <div>
                        <span className='text-text-400 text-5xl font-bold'>{topicName}</span>
                    </div>
                </div>

                <div className='flex items-center self-end bg-white rounded-2xl pe-8 px-5'>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className='text-primary-text w-[20px] h-[20px] '
                    />
                    <input
                        type='text'
                        className='shadow-slate-400 bg-transparent text-primary-text placeholder-primary-text text-xl w-[300px] h-[40px] py-2 focus:outline-none px-5'
                        placeholder='Search...'
                        onChange={() => {
                            console.log('search');
                        }}
                    />
                </div>
                <div className='flex items-center '>
                    <button
                        className='bg-white self-end me-5 inline-flex w-full justify-center h-[35px] gap-x-1.5 rounded-xl px-3 py-2 text-2xl font-normal text-gray-700 shadow-md shadow-indigo-400/50'>
                        <MdSort className='self-center mr-1 h-7 w-7 text-gray-700' />
                        Filter
                    </button>

                    <Menu as='div' className='self-end relative inline-block text-left'>
                        <div>
                            <Menu.Button
                                className=' self-end me-5 inline-flex w-full justify-center gap-x-1.5 h-[35px] rounded-xl bg-indigo-700 px-3 py-2 text-2xl font-base text-slate-200 shadow-md shadow-indigo-500/50'>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className='self-center mr-1 h-5 w-5 text-slate-200'
                                />
                                Create
                                <ChevronDownIcon
                                    className='self-center ml-2 -mr-1 h-7 w-7 text-slate-200'
                                    aria-hidden='true'
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Menu.Items
                                className='absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <div className='py-1'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={openModal}
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'inline-flex items-center px-4 py-2 text-2xl',
                                                )}
                                            >
                                                <FiFilePlus className='mr-2' /> Create Manually
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'inline-flex items-center px-4 py-2 text-2xl',
                                                )}
                                            >
                                                <RiFileExcel2Line className='mr-2' /> Import by
                                                Excel
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as='div' className='relative z-10 overflow-auto' onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0'
                                enterTo='opacity-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <div className='fixed inset-0 bg-black bg-opacity-25' />
                            </Transition.Child>

                            <div className='fixed inset-0 overflow-y-auto'>
                                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                    <Transition.Child
                                        as={Fragment}
                                        enter='ease-out duration-300'
                                        enterFrom='opacity-0 scale-95'
                                        enterTo='opacity-100 scale-100'
                                        leave='ease-in duration-200'
                                        leaveFrom='opacity-100 scale-100'
                                        leaveTo='opacity-0 scale-95'
                                    >
                                        <Dialog.Panel
                                            className='w-[calc(100%-150px)] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-3xl flex justify-between place-items-center font-medium leading-6 text-gray-900'
                                            >
                                                Create new question
                                                <div className='ml-auto flex items-end '>
                                                    <button
                                                        onClick={handleAddQuestionCard}
                                                        className='bg-white self-end me-5 inline-flex w-full justify-center h-auto gap-x-1.5 rounded-xl px-3 py-2 text-2xl font-normal text-gray-700 shadow-md shadow-indigo-400/50'>
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            className='self-center mr-1 h-5 w-5 text-gray-600'
                                                        />
                                                        Add
                                                    </button>
                                                    <button
                                                        className=' self-end me-5 inline-flex w-full justify-center gap-x-1.5 h-auto rounded-xl bg-indigo-700 px-3 py-2 text-2xl font-base text-slate-200 shadow-md shadow-indigo-500/50'>
                                                        Submit
                                                    </button>
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={closeModal}
                                                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-6 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                                                    data-modal-hide='defaultModal'
                                                >
                                                    <svg
                                                        aria-hidden='true'
                                                        className='w-5 h-5'
                                                        fill='currentColor'
                                                        viewBox='0 0 20 20'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            fillRule='evenodd'
                                                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                                            clipRule='evenodd'
                                                        ></path>
                                                    </svg>
                                                    <span className='sr-only'>Close modal</span>
                                                </button>
                                            </Dialog.Title>
                                            <div className='mt-2'>
                                                {addNewQuestions.map(addNewQuestion => {
                                                    return (
                                                        <div key={addNewQuestion.id}
                                                             className='flex justify-between place-items-center'>
                                                            <QuestionDetailForm
                                                            />
                                                            <button
                                                                type='button'
                                                                onClick={() => handleRemoveQuestionCard(addNewQuestion.id)}
                                                                className='text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-6 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                                                                data-modal-hide='defaultModal'
                                                            >
                                                                <IoTrashOutline className='h-10 w-10 ' />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
            <div className='bg-white rounded-3xl w-full h-auto px-16 py-10 mt-16 shadow-md shadow-indigo-500/10'>
                <div
                    className='question_table-header w-full py-10 bg-bg-table-header rounded-3xl flex items-center justify-between px-44'>
                    <div className='flex gap-[80px]'>
                        <span className='text-text-200 text-3xl'>Type</span>
                        <span className='text-text-200 text-3xl'>Subject</span>
                        <span className='text-text-200 text-3xl'>Topic</span>
                        <span className='text-text-200 text-3xl'>Question</span>
                    </div>
                    <div>
                        <span className='text-text-200 text-3xl'>Answer</span>
                    </div>
                </div>
                <ListQuestion subjectName={subjectName} topicName={topicName} className='w-full ps-24 pe-44'
                              listQuestion={listQuestion} />
            </div>
        </main>
    );
}
