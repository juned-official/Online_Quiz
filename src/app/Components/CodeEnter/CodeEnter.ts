import { Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';

import { QuizService } from '../../services/quiz-service';
import { Quizclass } from '../../Classes/Quiz';
import { quizStart } from '../../Classes/quizStarted';
import { Router } from '@angular/router';


@Component({
  selector: 'app-codeEnter',
  imports: [FormsModule],
  templateUrl: './Code.html',
  styleUrls: ['./header.css']
})
export class CodeEnter {
 QuizCode:number=0;
 alertType:string="";
 Verify:string="Submit";
 Quiz:Quizclass=new Quizclass();
 showAlert:boolean=false;
 showAlertMssg:string="";
 AllowInput:boolean=false;

qStart:quizStart=new quizStart();
constructor(private quizService:QuizService,private route:Router){

}
toggleAlert(m:string){
  this.showAlert=true;
  if(m.includes('Invalid'))
    this.alertType='danger';
  else if(m.endsWith('started')){
    this.alertType='success';
  }
  else{
    this.alertType='warning';
  }
  this.showAlertMssg=m;
  this.AllowInput=true;
  setTimeout(()=>{

this.showAlert=false;
this.AllowInput=false;

  },5000);
}
  SubmitCode(){
    if(this.Verify ==='Start'){
      alert(this.QuizCode);
      this.ViewQuestions();
      /*
      this.quizService.fetchQuiz(this.QuizCode).subscribe({
        next:(p)=>{
          this.Quiz=p;
          console.log(this.Quiz);
          this.ViewQuestions();
        
      },
      error:(er)=>{
        alert(er);
      }
    })*/
  }
  else{
    this.quizService.CheckQuizStarted(this.QuizCode).subscribe((p)=>{
      this.qStart=p;
      console.log(this.qStart.messg+" ",)
      if(p.started){
            this.Verify="Start"; 
             this.toggleAlert(this.qStart.messg);
          }
          else{
            this.toggleAlert(this.qStart.messg);
          }
      });
  }

  }
  
  ViewQuestions(){
  this.route.navigate(['/ViewQuestions'],{queryParams:{quizId:this.QuizCode}});
  }

  // Change(str: string) {
  //   this.Mysignal.set(str);
  // }
  // onsubmit(MyForm: any) {
  //   console.log(MyForm)

  // }
  // GoToProfile(c1: Customer) {
  //   this.router.navigate(['/signup'], { queryParams: { ID: c1.ID, Name: c1.Name, Address: c1.Address, Mobile: c1.Mobile } });
  // }
  // Update(c: Customer) {
  //   console.log(c);
  //   this.customer = this.customer.map((cus) => {
  //     console.log(cus.ID + " " + c.ID);
  //     if (cus.ID == c.ID) {
  //       return c;
  //     }

  //     return cus;
  //   });
  //   console.log(this.customer);
  //   this.Editable = false;
  // }

  // Editable: boolean = false;
  // cust: Customer = new Customer(0, "", "", "");
  // EditCustomer(c: Customer) {
  //   this.cust.ID = c.ID;
  //   this.cust.Name = c.Name;
  //   this.cust.Address = c.Address;
  //   this.cust.Mobile = c.Mobile;
  //   this.Editable = true;
  // }
  // constructor(private cd: Candidate, private router: Router, private route: ActivatedRoute) {

  //   effect(() => {
  //     console.log("Signal value changed:", this.Mysignal());
  //   });
  //   console.log("Header component constructor called");
  // }
  //   show(): void {
  //     throw new Error('Method not implemented.');
  //   }
  //   age: number= 0;
  //   city: string= '';
  //   name: string= '';

  //   Users=[
  //     {username: 'Juned', Password:'@J23'},
  //     {username: 'Yusuf', Password:'@yu'},
  //     {username: 'Thor', Password:'@Th'},
  //     {username: 'John', Password:'@Jo'}
  //   ]
  // navigateToJunedComponent() {
  //   // Logic to navigate to the Juned component
  //   console.log('Navigating to Juned component'); 
  //   // You can use the Angular Router to navigate to the desired route
  //    this.router.navigate(['/',{ city:"" }]); 
  // }
  // // name=new FormControl('Huzef maniyar');
  // // password=new FormControl('@%^&*');
  // // show(){
  // // console.log(this.name.value+"  "+this.password.value);
  // // }
  // profile = new FormGroup({
  //   name: new FormControl('',[Validators.required,Validators.minLength(3)]),
  //   email: new FormControl('',[Validators.email,Validators.required]),
  //   password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  // });
  // submitted(){
  //   // Logic to handle form submission
  //   console.log(this.profile.value);
  //   console.log(this.profile.value.email);
  //   console.log(this.profile.value.name);
  //   console.log(this.profile.value.password);
  // }
  // // get name(){
  // //   return this.profile.value.name;
  // // }
  // // get email(){
  // //   return this.profile.get('email');
  // // }
  // // get password(){
  // //   return this.profile.value.password;
  // // }
  // @Input() myMessage:string="";
  // @Input() fruit:string="";
  // ngOnInit() {
  //   console.log("initialiazed ");
  // }
  // ngOnDestroy() {
  //   console.log("Header component destroyed");
  // }
  // ngOnChanges() {
  //   console.log("Header component changes detected");
  //   console.log("New message:", this.count);
  // }
  // @Input() count:number=0;
  // Add(sdt:std){
  // this.name = sdt.name;
  // this.age = sdt.age;
  // this.city = sdt.city;
  //   console.log("student Data: "+sdt);
  //   console.log(sdt.name);
  // }
  // customer: Customer[] = [
  //   new Customer(101, "Juned", "Surat", "1234567890"),
  //   new Customer(102, "Yusuf", "Bardoli", "0987654321"),
  //   new Customer(103, "Thor", "Asgard", "5678901234"),
  //   new Customer(104, "John", "Newyork", "6789012345"),
  //   new Customer(105, "Steve", "California", "7890123456"),
  //   new Customer(106, "Natasha", "Russia", "8901234567"),

  // ];

  // Mysignal = signal<string>('MY SIGNAL');
  // MycomputedSignal = computed(() => {
  //   if (this.Mysignal() == 'juned')
  //     return 'yusuf';
  //   else
  //     return 'juned';

  // });
}


