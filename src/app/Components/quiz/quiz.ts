import { Component } from '@angular/core';
import { FormArray, FormBuilder,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz-service';
import { Login } from '../../services/loginService';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz {
  MyQuiz:FormGroup;
  constructor(private fb:FormBuilder,private sendQuiz:QuizService,private login:Login){    
    this.MyQuiz=this.fb.group({
      title:['',Validators.required],
      isStarted:[false],
     userId:[login.getUserId()],
   
      question:this.fb.array([
        this.fb.group({
          text:['',Validators.required],
          questionType:['multiplechoice'],
          options:this.fb.array([
              this.fb.group({
                isCorrect:[true],
                optionText:['',Validators.required],

              })
          ])
        })
      ])
    })
  }
  removeQuestion(Qid:number){
    this.Question.removeAt(Qid);
  }
  get title(){
    return this.MyQuiz.get('title');
  }
  get Question():FormArray{
    return this.MyQuiz.get('question') as FormArray;
  }
  get QType():string{
    return this.MyQuiz.get('questionType')?.value;
  }
  get options():FormArray{
    return this.MyQuiz.get('options') as FormArray;
  }
  selectedOption(Qid:number,opt:number){
    this.getOptions(Qid).controls.map((x,y)=>{
      x.get('isCorrect')?.setValue(false);
    })
    this.getOptions(Qid).at(opt).get('isCorrect')?.setValue(true);
  }
  addOption(Qid:number){
    this.getOptions(Qid).push(this.fb.group({
      isCorrect:[false],
      optionText:['',Validators.required]
    }))
  }
  removeOption(Qid:number,OptId:number){
   this.getOptions(Qid).removeAt(OptId);
 
  }
  addQuestion(){
    this.Question.push(this.fb.group({
          text:['',Validators.required],
          questionType:['singlechoice'],
          options:this.fb.array([
              this.fb.group({
                isCorrect:[true],
                optionText:['',Validators.required]

              })])
            }))
  }
  getOptions(Qid:number):FormArray{
    return this.Question.at(Qid).get('options') as FormArray;
  }
  optionClicked(Qid:number,OptId:number){
    this.getOptions(Qid).at(OptId).get('isCorrect')?.value
  }
  submitForm(){
    if(this.MyQuiz.invalid){
      alert("complete required fields before submit")
      return;
    }
    
    console.log(this.MyQuiz.value);
   const payload=JSON.parse(JSON.stringify(this.MyQuiz.value));

   this.sendQuiz.sendCreatedQuiz(payload).subscribe(id=>{
     alert("Quiz Submitted Successfully QuizId"+ id );
   })
      console.log(this.MyQuiz?.value)
  }
  //  MyFormQ:FormGroup;
  //  constructor(private fb:FormBuilder){
  //   this.MyFormQ=fb.group({
  //     question:[''],
  //     QType:['singlechoice'],
  //     options:this.fb.array(
  //       [
  //         this.fb.group({
  //           OptionText:[''],
  //           isCorrect:[false],
  //         })
  //       ]
  //     )    
  //   })
  //  }
  //  get options():FormArray{
  //   return this.MyFormQ.get('options') as FormArray;
  //  }
  //  get questionType():string{
  //   return this.MyFormQ.get('QType')?.value;
  //  }
  //  addOption(){
  //   this.options.push(this.fb.group({
  //     OptionText:[''],
  //     isCorrect:[false]
  //   }));
  //  }
  //  removeOption(index:number){
  //   this.options.removeAt(index);
  //  }
  // MyFormSubmit(){
  //  console.log(this.MyFormQ.value);
  // }
// res:boolean[]=[];
// fruits:String[]=["Apple","Banana","Orange","Mango"];
// correctAns:String[]=["Orange","Mango"];
// flag:boolean=true;
// response(){

//   console.log(this.res);
//  this.res.forEach((val,index)=>{
//   if(val)if( !this.correctAns.includes(this.fruits[index]) ){
// this.flag=false;
//    }})
//      if( this.flag )
//   alert("Correct Answers "  );
// else
//   alert("Wrong Answer  " );
   
 

//  } 


// questions=[
//   {
//       questionId:1,
//       QText:"Spot the error sentence!",
//       Type:"single",
//       options:[
//         {
//           optionId:1,
//           Text:"many are ready to serve",
//           isCorrect:false
//         },
//         {
//           optionId:2,
//           Text:"It is a good news",
//           isCorrect:true
//         },
//         {
//           optionId:3,
//           Text:"Neither my father nor his attended the meeting.",
//           isCorrect:false
//         }
//         ,
//         {
//           optionId:4,
//           Text:"one of us is driving the car.",
//           isCorrect:false
//         }
//       ]
//   },
//   {
//     questionId:2,
//       QText:"Select two options for something human made or caused by human",
//       Type:"Multiple",
//       options:[
//         {
//           optionId:1,
//           Text:"Anthrology",
//           isCorrect:false
//         },
//         {
//           optionId:2,
//           Text:"Anthrepogenesis",
//           isCorrect:true
//         },
//         {
//           optionId:3,
//           Text:"artificial",
//           isCorrect:true
//         }
//         ,
//         {
//           optionId:4,
//           Text:"innovation",
//           isCorrect:false
//         }
//       ]
//   }

// ]
// currentIndex=1;
// selectedoptions:any=[];
// RadORBox=this.questions[0]?.Type=='single'?'radio':'checkbox';
// selectedOption(ans: any[],QId:number ) {
  
//   this.RadORBox=this.questions.at(this.currentIndex)?.Type=='single'?'radio':'checkbox';
//   this.currentIndex+=1;
// throw new Error('Method not implemented.');
// }
}
