import { AnswerInterface } from "./answer";

export interface SurveyQuestionInterFace {
    id: number;
    name: string;
    endDate?: Date;
    description?:string
    question: string;
    answers: AnswerInterface[];
    checkboxType: 'checkbox' |'radio';
    counter:Number,
}
