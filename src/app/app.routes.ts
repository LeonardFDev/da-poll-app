import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { CreateSurvey } from './pages/create-survey/create-survey';

export const routes: Routes = [
    {
        path: '',
        component: Main,
    },
    {
        path: 'create-question',
        component: CreateSurvey,
    },
];
