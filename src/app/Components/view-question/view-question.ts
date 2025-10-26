import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Quizclass } from '../../Classes/Quiz';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz-service';
import { question } from '../../Classes/question';

@Component({
  selector: 'app-view-question',
  imports: [ FormsModule],
  templateUrl: './view-question.html',
  styleUrl: './view-question.css'
})
export class ViewQuestion {


checkClicked(optId: number) {
  const arr=this.CurRes();
  if(arr.includes(optId,0)){
    
    
    this.currentRes.set(this.currentIndex,arr.filter(x=>
       x!=optId
    ));
    
  }
  else{
   
    arr.push(optId);
    console.log(arr)
   
this.currentRes.set(this.currentIndex,arr);
    
  }
  console.log("checkbox Clicked")
  for(let key in this.currentRes){
    console.log(`key: ${key} ${this.CurRes()}`);
    
  }
}
CurRes():number[]{

  
   const arr=this.currentRes.get(this.currentIndex);
   if(arr)
    return arr;
return [];
}
RadioClicked(optId:number) {
  const arr=[];
  arr.push(optId);

  this.currentRes.set(this.currentIndex,arr);

  console.log("radio Clicked",arr)
for(let key in this.currentRes){
  console.log(`key: ${key} ${this.CurRes()}`);

}
}
  constructor(private fb:FormBuilder,private actRoute:ActivatedRoute,private qService:QuizService){
    this.MyForm=this.fb.group({});
  }

    MyForm:FormGroup;
    currentIndex:number=0;
    score:number=0;
    currentRes=new Map<number,number[]>;
    ViewAnswers:boolean=false;
    scoreMap=new Map<number,number>;


   ActQuiz:Quizclass=new Quizclass();
  ngOnInit(){
    this.actRoute.queryParams.subscribe((param)=>{
      const Codestr=param['quizId'];
     const Code=Codestr? Number.parseInt(Codestr):0;
  
     if(Code!=0){

       this.qService.fetchQuiz(Code).subscribe((p)=>{
         this.ActQuiz=p;
         console.log(p)
       
      })
    }else{
        
      
    }
    })
    
  }
  getType(){
    return this.currentQuestion().questionType;
  }
currentQuestion(){
  const q=this.ActQuiz.question.at(this.currentIndex);
  if(q)
return q ;
  return new question();
}
getText():string|undefined{
 return  this.currentQuestion().text;
}

previous(){
  
  if(this.currentIndex>0){
    this.currentIndex-=1;
  }
  console.log("previous->"+this.currentIndex)
}
Save(){
  
  const flag=this.CurRes().every(p=>{
    const x=this.currentQuestion().options.at(p);
    if(x)
     return  x.isCorrect==true;
    return false;
  })
  if(flag && (this.scoreMap?.get(this.currentIndex)!=1)){
    this.score++;
    this.scoreMap.set(this.currentIndex,1)
  }
  else if(this.scoreMap?.get(this.currentIndex)==1){
    this.score--;
  }
  else
  this.scoreMap.set(this.currentIndex,0);
}
next(){
  this.Save();
  if(this.currentIndex<=this.ActQuiz.question.length-1)
    this.currentIndex++;
  console.log("scores-> "+this.score)
  
}
viewResult(){
  this.ViewAnswers=true;
}
}
