import { AnswerInterface } from "./answer";

export interface SurveyQuestionInterFace {
    id: number;
    name:string
    question: string;
    endDate?: Date;
    description?:string
    answers: AnswerInterface[];
    checkboxType: 'checkbox' |'radio';
}
