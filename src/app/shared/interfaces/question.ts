import { AnswerInterface } from "./answer";

export interface QuestionInterFace {
    id:number;
    question: string;
    multipleAnswers: 'checkbox' |'radio';
    answers: AnswerInterface[];
}
