import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailRequest } from '../../Classes/EmailRequest';
import { Candidate } from '../../services/candidate_service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz-service';
import { User } from '../../Classes/User';
import { Login } from '../../services/loginService';


@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

AddUser() {
  const user=new User();
  user.setEmail=this.recipient;
  user.setPassword=this.password;
 
  this.qService.AddUser(user).subscribe(p=>{
this.MyAlert("User Registered successfully")
setTimeout(()=>{

  this.nav.navigate(['/Login'],{queryParams:{redirect:'/quiz'}})
},3000);
  });
}

autoFocusNext(e: any,i: number) {
const input=e.target;
if(input.value && i<5){
  const next=input.parentElement.children[i+1];
  next.focus();
}


}
  OTPForm:FormGroup;
  constructor(private cdd: Candidate,private fb:FormBuilder,private router:ActivatedRoute,private nav:Router,private qService:QuizService,private login:Login){
    this.OTPForm= this.fb.group({ 
      digit:this.fb.array(Array(6).fill('').map(()=> this.fb.control('',[Validators.required,Validators.pattern('[0-9]')])))
    });

  }
 
  
  get digit():FormArray
{
  return this.OTPForm.get('digit') as FormArray;
}  
  
   
  
  /*
  ngOnInit() {
    this.getCandidate_Details();
  }
  Students :StudentClass[] = [];
  getCandidate_Details() {
  this.cd.getCandidateData().subscribe(p=>{
  console.log(p);
  this.Students = p;
  
  });
  }
  navigateToSignup(){
  this.route.navigate(['/header']);
  }
  remove(name:string){
  if(confirm("Do you sure delete "+ name + " ?")){
    this.cd.DeleteStudent(name).subscribe(p=>{
      console.log("after delete "+name);
   est:EmailRequest,private route:Router,private activatedRoute:ActivatedRoute
      this.getCandidate_Details();
  
    });
  }
  }
  submit(detail:any){
  this.cd.AddStudent(detail).subscribe(p=>{
    console.log(p);
    this.getCandidate_Details();
    
  });
  }*/




  email: EmailRequest = new EmailRequest();
  showTextBox: boolean = false;
  IsTimerActive: boolean = false;
  displayTimer: string = '';
  seconds: number = 60;
  private timerInterval: any;
  ShowDisplayTime: boolean = true;
  recipient:string="";
  OTPBTNTEXT="Get OTP";
  password:string="";
MyAlert(m:string): void {
this.Message=m;
setTimeout(() => {
  this.Message="";  
}, 5000);
}
  DisablesFor2minute(): void {
    this.seconds = 180;
    this.IsTimerActive = true;
    this.showTextBox=true;
    this.ShowDisplayTime = true;
    this.timerInterval = setInterval(() => {
      if (this.seconds == 0) {
        this.IsTimerActive = false;
        this.OTP=0;
        clearInterval(this.timerInterval);
        this.ShowDisplayTime = false;
        this.showTextBox = false;
      }
      this.displayTimer = this.formatTime(this.seconds);
      this.seconds--;

    }, 1000);
  }
  formatTime(sec: number): string {
    let minutes: number = Math.floor(sec / 60);
    let seconds: number = sec % 60;
    return `0${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  OTP: number = 0;
  SendOTP(): void {
    
   this.email.recipient = this.recipient;
    this.email.subject = "Verify Your Email Address";
    this.OTP = Math.floor(100000 + Math.random() * 900000);
    this.email.body = `Dear User,\n\n Thank you for registering with us! To complete your email varification,
    please use the One-Time Password (OTP) below:\n
    Your OTP: [${this.OTP}] \n This OTP  is valid for the next 5 minutes. Please do not share it with anyone.\n
    If you did not initiate this request, please ignore this email or contact support immediately.\n
    Best Regards,\n Juned Maniyar\n
    pseudo8433@gmail.com`;
    this.email.purpose="register";

    this.cdd.sendOTPEmail(this.email).subscribe({
      next: (p) => {
        if(p.started){
          this.DisablesFor2minute();
          console.log(p); 
          this.MyAlert(p.messg);
        
          this.digit.controls.map(c=> c.setValue(''))    
          this.showTextBox = true;
        }
        else if(p.messg ==='Account already exist'){
          this.MyAlert(p.messg);
           this.showTextBox = false;
        }
      
      },
      error: (err) => {
        this.MyAlert(err.message);
      }

    })
      
          
  }
  Message: string = "";
  showPassword=false;
  getOtp():string{
    return this.digit.controls.map(d=>d.value).join('');
  }
  CheckOTP(): void {
    if (this.getOtp() === this.OTP.toString()) {
      this.MyAlert("Email Verified Successfully");
      this.showTextBox = false;
      clearInterval(this.timerInterval);
      this.IsTimerActive = false;
      this.OTPBTNTEXT="Verified";
      
            
    }
    else {
     this.MyAlert(" Invalid OTP, Please try again");
    }
  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

}
