import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../Classes/User";
import { catchError, Observable, throwError } from "rxjs";
import { quizStart } from "../Classes/quizStarted";
import { AIO } from "../Classes/AIO";
import { environment } from "../environment";


@Injectable({
  providedIn: 'root'
})
export class Login {
    IsLoggedIn:boolean=false;
  UserId:number=-1;
   
    constructor(private http:HttpClient ){}
    deleteAccount(){
      return this.http.delete<quizStart>(`${environment.apiUrl}`+"/User/DeleteUser/"+this.UserId)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 406)
          return throwError(() => new Error(err.error))
        else {
          return throwError(() => new Error("Something went wrong "));
        }
      }));
    }
     
  addUser(user:User){
    return this.http.post(`${environment.apiUrl}`+"/User/AddUser",user)
    .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 500)
          return throwError(() => new Error("Internal Server Error"))
        else {
          return throwError(() => new Error("Something went wrong "));
        }
      }));
  }
 checkCredential(user:User):Observable<AIO>{
  return this.http.post<AIO>(`${environment.apiUrl}`+"/User/check",user)
  .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 500)
          return throwError(() => new Error("Internal Server Error"))
        else {
          return throwError(() => new Error("Something went wrong "));
        }
      }));;
 }
 getUserId():number{
      return this.UserId;
 }
 setUserId(id:number){
  this.UserId=id;
 }

 LoggedOut(){
  this.IsLoggedIn=false;
  this.UserId=-1;
  
 }
isLoggedIn(){
  if(this.UserId!=-1)
  this.IsLoggedIn=true;
return this.IsLoggedIn;
}
//     CheckCredentials(){ 
//       return this.http.get(this.URL+"api/checkCredentials")

//     }
//     IsAuthenticatedUser():boolean{
//         if(this.IsLoggedIn){
//             return true;
            
//         }
//         else
//             return false;     
//     }
//  logout(){
//     this.IsLoggedIn=false;
    
//  }

}