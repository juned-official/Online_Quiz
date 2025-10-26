import { Routes } from '@angular/router';

import {  CanActivateCreator } from './app.guard';





export const routes: Routes = [
    

        {path:"",loadComponent: ()=> import('./Components/Home/Home').then(m=>m.Home)},
        { path: "ViewQuiz", loadComponent: ()=> import('./Components/ViewQuiz/ViewQuiz').then(m=>m.ViewQuiz), canActivate:[CanActivateCreator] ,data:{go:'/ViewQuiz'}},
       { path: "CodeEnter", loadComponent: ()=> import('./Components/CodeEnter/CodeEnter').then(m=>m.CodeEnter) },
       { path: "quiz", loadComponent: ()=> import('./Components/quiz/quiz').then(m=>m.Quiz),canActivate:[CanActivateCreator],data:{go:'/quiz'}},
       { path: "ViewQuestions",loadComponent: ()=> import('./Components/view-question/view-question').then(m=>m.ViewQuestion),canActivate:[]},
    
     { path: "Login", loadComponent: ()=> import('./Components/Signup/Signup').then(m=>m.Signup) },
    { path: "register", loadComponent: ()=> import('./Components/registration/registration').then(m=>m.Registration) },

    { path: "**", loadComponent: ()=> import('./Components/Page-404/Page-Not-Found').then(m=>m.Page_404) } 

];
