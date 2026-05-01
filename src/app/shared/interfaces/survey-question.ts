import { QuestionInterFace } from "./question";

export interface SurveyQuestionInterFace {
    id: number;
    name:string
    description?:string
    endDate: string;
    category:string;
    questions: QuestionInterFace[];
}
