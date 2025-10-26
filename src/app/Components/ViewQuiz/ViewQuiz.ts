import { Component } from '@angular/core';
import { Login } from '../../services/loginService';
import { QuizService } from '../../services/quiz-service';
import { User } from '../../Classes/User';
import { Quizclass } from '../../Classes/Quiz';

@Component({
  selector: 'app-View-Quiz',
  imports: [],
  templateUrl: './ViewQuiz.html',
  styleUrl: './admin-dashboard.css'
})
export class ViewQuiz {
DeleteQuiz(Id: number) {
  if(confirm("Are you sure to delete this quiz?"))
{
this.qService.deleteQuiz(Id).subscribe(p=>{
if(p.messg=="Quiz Deleted successfully"){
  this.showAlert(p.messg);
this.user.quizes=this.user.quizes.filter(x=>x.quizId!=Id);
}
});
}
}
StartQuiz(quiz: Quizclass) {
 this.qService.toggleQuizstatus(quiz.quizId).subscribe(p=>{
  quiz.isStarted=p.started;
  console.log(p);
  this.showAlert(p.messg);
 })

}
  user:User=new User();
  toggle:boolean=false;
message:string="";
constructor(private login:Login,private qService:QuizService){}
ngOnInit(){

console.log("from ViewQiuz->"+this.login.getUserId())
    this.qService.FetchAllQuiz(this.login.getUserId()).subscribe({
     next: p=>{
        this.user=p;
      },
      error: err=>{
        this.showAlert(err.Message);
      }
})
  
  
}


showAlert(p: string) {
  this.toggle=true;
  this.message=p;
  setTimeout(()=>{
    this.toggle=false;
    
  },5000);
}
}

