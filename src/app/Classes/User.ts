import { Quizclass } from "./Quiz";

 export class User{
   private userId?:number;
    private password:string="";
    private email:string="";
     quizes:Quizclass[]=[];
    public constructor(){
 
    }
    public get getEmail():string{
        return this.email;
    }
    public get getPassword():string{
        return this.password;
    }
    public set setEmail(id:string){
        this.email=id;
    }
    public set setPassword(name:string){
        this.password=name;
    }
    public get getId(){
        return this.userId;
    }
    public set setID(userId:number){
        this.userId=userId;
    }
    
    
 }