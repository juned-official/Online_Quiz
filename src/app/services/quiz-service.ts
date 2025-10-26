import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { quizStart } from '../Classes/quizStarted';
import { User } from '../Classes/User';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  AddUser(user:User) {
    return this.http.post<number>(`${environment.apiUrl}`+"/User/AddUser",user);
  }
  deleteQuiz(Id: number) {
    return this.http.delete<quizStart>(`${environment.apiUrl}`+"/api/quizzes/delete/"+Id);
  }
  
  
  constructor(private http:HttpClient){}
  FetchAllQuiz(getUserId: number):Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}`+"/api/quizzes/Get/"+getUserId)
    .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 404)
          return throwError(() => new Error("UserId not Found, please Login"))
        else {
          return throwError(() => new Error("Something went wrong "));
        }
      }));;
  }
  CheckQuizStarted(quizId: number) {
   return this.http.get<quizStart>(`${environment.apiUrl}`+"/api/take/check/"+quizId);
  }
sendCreatedQuiz(MYQuizForm:any):Observable<number>{
  return this.http.post<number>(`${environment.apiUrl}`+"/api/quizzes/createQuiz",MYQuizForm)
  .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 500)
          return throwError(() => new Error("Internal Server Error"))
        else {
          return throwError(() => new Error("Something went wrong "));
        }
      }));
}
fetchQuiz(Code:number){
  return this.http.get<any>(`${environment.apiUrl}`+"/api/take/MyQuestions/"+Code)
  .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 500)
          return throwError(() => new Error("Internal Server Error"))
        else {
          return throwError(() => new Error("Something went wrong "));
        }
      }));
}
toggleQuizstatus(quizId:number){
  return this.http.put<quizStart>(`${environment.apiUrl}`+"/api/quizzes/toggleQuiz",quizId);
  // .pipe(catchError((err: HttpErrorResponse) => {
  //       if (err.status == 500)
  //         return throwError(() => new Error("Internal Server Error"))
  //       else {
  //         return throwError(() => new Error("Something went wrong "));
  //       }
  //     }));
}
}
