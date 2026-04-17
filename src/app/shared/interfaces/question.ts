import { AnswerInterface } from "./answer";

export interface QuestionInterFace {
    id:number;
    question: string;
    checkboxType: 'checkbox' |'radio';
    answers: AnswerInterface[];
    
}
