import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EmailRequest } from '../Classes/EmailRequest';
import { catchError, throwError } from 'rxjs';
import { quizStart } from '../Classes/quizStarted';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class Candidate {
  constructor(private http: HttpClient) {
  }
  
  /*getCandidateData():Observable<StudentClass[]> {
  return this.http.get<StudentClass[]>(this.url+"/all");
  }
  AddStudent(s:StudentClass){
   return this.http.post(this.url+"/insert",s,{responseType:'text'});
  }
  DeleteStudent(name:String){
    return this.http.delete(this.url+"/"+name,{responseType:'text'});
  }*/
  sendOTPEmail(emailRequest: EmailRequest):Observable<quizStart> {
    return this.http.post<quizStart>(`${environment.apiUrl}` + "/sendEmail", emailRequest)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 406)
          return throwError(() => new Error("Incorrect Email Id"));
        else if(err.status == 500) {
          return throwError(() => new Error("Internal Server Error"))
        }
        else {
          return throwError(() => new Error("Some thing went wrong "));
        }
      }));
    
  

  }
}
