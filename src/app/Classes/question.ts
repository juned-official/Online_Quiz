import { optionsClass } from "./optionsClass";

export class question{
    questionType:'multiplechoice'|'singlechoice'='multiplechoice';
    question_id:number=0;
    text:string="";
    options:optionsClass[]=[];

}