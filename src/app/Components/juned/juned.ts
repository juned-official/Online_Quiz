import { Component } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Candidate } from '../../services/candidate_service';
import { FormsModule } from '@angular/forms';
import { EmailRequest } from '../../Classes/EmailRequest';
import { Login } from '../../services/loginService';


@Component({
  selector: 'juned',
  imports: [FormsModule,RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './juned.html',
  styleUrl: './juned.css',

})
export class Juned {
OutLog() {
this.login.LoggedOut();
this.nav.navigate(['/Login']);
}
DeleteAccount() {
if(confirm("Do you want to delete your account?")){
 this.login.deleteAccount().subscribe(p=>{
  if(p.started){
    alert(p.messg)
    this.Logout();
  }
 })
  
}
}
// name:"juned",
// roll_no: 45,
// city: "latur",
// State: "MH",
// }
// messag:string=""
// display():void{
//   this.messag="Message from Angular"
// }
// show_alert(){
//   alert("message from angular")
// }
// key():void{
// console.log("key up")
// }
// getName(name:string):void{
//   this.messag=name;
// }
// change(e:Event){
// console.log(e.type)
// console.log("function called",e.target)
// //console.log("function called"+e.)
// }
// @Input() message:string="";
// @Output() methodName= new EventEmitter();
// ngOnInit(){
//   console.log("Juned component initialized");
//   this.methodName.emit(this.fruits);
// }
Logout() {
this.login.LoggedOut();
this.nav.navigate(['/Login']);
}

  name: string = "juned maniyar";
  age: number = 22;
  input: string = "date";
  image: string = "app/Components/juned/jalpari.png"
  image2: string = "nature4.png"
  //  change():void{
  //   if(this.input === "date")
  //  this.input ="text"
  // else 
  //   this.input="date"
  //  }
  color: string = "magenta"
  // allset:string ="primary secondary"
  // fruits:String[] =["banana","Apple","Grapes","Orange","Mango","Pineapple", "Watermelon"];
  //  user={
  // name:"juned",
  // roll_no: 45,
  // city: "latur",
  // State: "MH",
  // }
  // messag:string=""
  // display():void{
  //   this.messag="Message from Angular"
  // }
  // show_alert(){
  //   alert("message from angular")
  // }
  // key():void{
  // console.log("key up")
  // }
  // getName(name:string):void{

  //   this.messag=name;
  // }
  // change(e:Event){
  // console.log(e.type)
  // console.log("function called",e.target)
  // //console.log("function called"+e.)

  // }
  // @Input() message:string="";
  // @Output() methodName= new EventEmitter();
  // ngOnInit(){
  //   console.log("Juned component initialized");
  //   this.methodName.emit(this.fruits);
  // }

  constructor(private cd: Candidate,public login:Login,private nav:Router) {
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

  DisablesFor2minute(): void {
    this.seconds = 120;
    this.IsTimerActive = true;
    this.timerInterval = setInterval(() => {
      if (this.seconds == 0) {
        this.IsTimerActive = false;
        clearInterval(this.timerInterval);
        this.ShowDisplayTime = false;
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
  OTPEXPIREDCheck() {
    setTimeout(() => {
      this.showTextBox = false;
      this.Message = "OTP Expired, Please try again";
    }, 1000 * 60 * 3);

  }
  OTP: number = 0;
  // SendOTP(emai: string): void {
  //   this.Message = "";
  //   this.DisablesFor2minute();
  //   this.email.recipient = emai;
  //   this.email.subject = "Your OTP for Email Verification";
  //   this.OTP = Math.floor(100000 + Math.random() * 900000);
  //   this.email.body = `This ${this.OTP} OTP  is valid for 5 minutes. Please do not share it with anyone.`;
  //   console.log(this.email);
  //   this.cd.sendOTPEmail(this.email).subscribe({
  //     next: (p) => {

  //       console.log(p);

  //       alert(p + " " + emai);
  //       this.OTPEXPIREDCheck();
  //       this.showTextBox = true;
  //     },
  //     error: (err) => {
  //       this.Message = err.message;
  //     }

  //   })
  // }
  Message: string = "";
  CheckOTP(otp: string): void {
    if (otp == this.OTP.toString()) {
      this.Message = "Email Varified Successfully";
      this.showTextBox = false;
      clearInterval(this.timerInterval);
    }
    else {
      this.Message = "Invalid OTP, Please try again";
    }
  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

}

