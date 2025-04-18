import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'quiz', component: QuizComponent }, // Quiz page
  { path: 'result', component: ResultComponent }, // Result page
  { path: 'history', component: HistoryComponent }, // History page
  { path: 'settings', component: SettingsComponent }, // Settings page
  { path: '**', redirectTo: '' } // Redirect to Home if the URL is invalid
];