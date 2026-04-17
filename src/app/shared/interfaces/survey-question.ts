import { QuestionInterFace } from "./question";

export interface SurveyQuestionInterFace {
    id: number;
    name:string
    description?:string
    endDate?: Date | number | string;
    category:string;
    questions: QuestionInterFace[];
}
