import { Component, computed, effect, EventEmitter, Output, signal, WritableSignal } from "@angular/core";

import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { Registration } from "../registration/registration";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Candidate } from "../../services/candidate_service";
import { Juned } from "../juned/juned";
import { JsonPipe, NgOptimizedImage } from "@angular/common";
import { Login } from "../../services/loginService";
import { User } from "../../Classes/User";
import { AIO } from "../../Classes/AIO";




@Component({
    selector: 'signup',

    imports: [FormsModule, ReactiveFormsModule, RouterLink],
    standalone: true,
    templateUrl: "./signup.html",
    styleUrl: "./signup.css"
})



export class Signup {
    go:String|undefined="";
    
    constructor(private rout: ActivatedRoute, private add: Candidate, private route: Router, private j: Juned, private login: Login) {
        console.log("Signup component constructor called");
    }
    Message:string="";
    showPassword:boolean=false;
    MyAlert(m:string): void {
        this.Message=m;
setTimeout(() => {
  this.Message="";  
}, 5000);
}
    ngOnInit() {
         this.rout.queryParamMap.subscribe(p=>{
               this.go=p.get('redirect')??"";
              
            });
        }
      
     
        SubmitLoginForm(cred: User) {
            console.log(cred)
            this.login.checkCredential(cred).subscribe({
                next:  (p)=>{
                    
                    console.log("from sign up: "+p.msg);
                    console.log("from sign up: "+p.num);
                    console.log("from sign up: "+p.flag);
                    if(p.flag){
                        this.login.setUserId(p.num);
                        this.MyAlert(p.msg);
                        setTimeout(()=>{
                if(this.go != null)
                        this.route.navigate([this.go]);

                    },2000);
                }
                    else{
                            this.MyAlert(p.msg);
                    }
                    
            
           
        },
           error:(msg)=>{
                this.MyAlert("Error Occurred, Try Again later");
           }
           
        })

        // this.login.checkCredential();
        // let role = this.login.IsAuthenticatedUser();
        // if (role === undefined)
        //     alert('Invalid Credentials, Try Again');
        // else {
        //     alert('Welcome ' + role);
        //     this.route.navigate(['calculator']);
        // }
    }
    // MyFormGroup = new FormGroup({
    //     name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]),
    //     password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('[ a-zA-Z0-9@#$%^&*]*')]),
    //     city: new FormControl('Latur')
    // });
    // submitted: boolean = false;
    // LogoutimgPath: string = "images";
    // ;
    // ShowSkills() {
    //     this.skills.forEach((s) => {
    //         console.log(s);
    //     });
    // }
    // count: number[] = [];
    // skills: string[] = [];
    // counter: number = 1;
    // showRepeatation(num: number) {
    //     this.count.push(this.counter);
    //     this.counter++;
    // }


    // fruits:string[]=["banana","Apple","Grapes","Orange"]
    // students: student[] = [new student(100, "juned", "BCS", 9.1),
    // new student(101, "Yusuf", "BCS TY", 9.6),
    // new student(102, "", "BCS", 9.1),
    // new student(103, "juned", "BCS", 9.1),
    // new student(104, "juned", "BCS", 9.1)

    // ]
    // sig:WritableSignal<string>=signal("juned")
    // emps=[
    //     {id:101,name:"juned",salary:40000},
    //     {id:102,name:"j1",salary:40000},
    //     {id:103,name:"j2",salary:40000},
    //     {id:104,name:"j3",salary:40000},
    //     {id:105,name:"j4",salary:40000},
    // ]
    //  hide(){
    //     if(this.display)
    //         this.display=false
    //  }
    //  show(){
    //     if(!this.display)
    //         this.display=true
    //  }

    // updatesignal(){
    //     this.sig.set("Updated Value");
    //     console.log("Signal updated to:", this.sig());
    // }
    // display:boolean=false;
    // (){
    //     effect(() => {
    //         console.log("Effect triggered, data value:", this.data());
    //        if(this.data() ==2){
    //         this.display=true
    //         setTimeout(() => {
    //             this.display=false;
    //         }, 2000);
    //     }
    //     });  
    // }

    // data= signal< number>(0); ;

    // computedsignal = computed(() => {this.data(); return this.data() + " Computed"; });
    // update(){
    // this.data.set(this.data() + 1);
    // }
    // fruits: string[] = [];
    // fruitvar: string = "";
    // addfruit() {
    //     this.fruits.push(this.fruitvar);
    //     this.fruitvar = ""; // Clear the input field after adding
    // }
    // remove(index: number) {
    //     // this.fruits.splice(index, 1);
    //     this.fruits = this.fruits.filter((item) => {
    //         return item !== this.fruits[index];
    //     })
    // }

        // this.rout.queryParamMap.subscribe((p) => {
        //     if (Boolean(p.get('logout'))) {
        //         alert('You have been logged out successfully.');
        //         this.login.logout();
        //         this.route.navigate(['/Login']);

        //     }
        // });
        // this.getColor.emit(this.Color);
        // this.rout.queryParamMap.subscribe((p) => {
        //     this.customer.ID = p.get('ID') ? Number(p.get('ID')) : 0;
        //     this.customer.Name = p.get('Name') ? String(p.get('Name')) : "";
        //     this.customer.Address = p.get('Address') ? String(p.get('Address')) : "";
        //     this.customer.Mobile = p.get('Mobile') ? String(p.get('Mobile')) : "";


        // });
    // }
    // Color: string[] = ["red", "green", "blue", "yellow", "orange", "purple"];
    // @Output() getColor: EventEmitter<any> = new EventEmitter();


    // currency = [
    //     { name: "Indian Rupee", nick: 'INR' },
    //     { name: "Pakistani Rupee", nick: 'PAK' },
    //     { name: "USA Dollar", nick: "USD" },
    //     { name: "Qatari Riyal", nick: "QAT" },
    //     { name: "EURO", nick: "EUR" },
    //     { name: "Japanese YEN", nick: "YEN" }
    // ]

    // FromAmount: number = 0;
    // ToAmount: number = 0;
    // FromCurrency: string = 'INR';
    // ToCurrency: string = 'USD';
    // ExchangeRates: { [Key: string]: number } = {
    //     'INR_USD': 0.012,
    //     'USD_INR': 83.33,
    //     'INR_PAK': 2.25,
    //     'PAK_INR': 0.44,
    //     'INR_QAT': 0.11,
    //     'QAT_INR': 9.09,
    //     'INR_EUR': 0.011,
    //     'EUR_INR': 90.91,
    //     'INR_YEN': 1.65,
    //     'YEN_INR': 0.61,
    //     'USD_PAK': 180.00,
    //     'PAK_USD': 0.0056,
    //     'USD_QAT': 3.64,
    //     'QAT_USD': 0.27,
    //     'USD_EUR': 0.85,
    //     'EUR_USD': 1.18,
    //     'USD_YEN': 110.00,
    //     'YEN_USD': 0.0091,
    //     'PAK_QAT': 0.16,
    //     'QAT_PAK': 6.25,
    //     'PAK_EUR': 0.0049,
    //     'EUR_PAK': 204.08,
    // }
    // P_fromCurrency: string = this.FromCurrency;
    // P_toCurrency: string = this.ToCurrency;
    // convert() {
    // if(this.FromAmount>0 && this.FromCurrency !== this.ToCurrency){
    //     this.P_fromCurrency=this.FromCurrency;
    // this.P_toCurrency=this.ToCurrency;
    // this.ToAmount=this.FromAmount*this.ExchangeRates[this.FromCurrency+'_'+this.ToCurrency];
    // }
    // else if(this.FromAmount>=0 || this.FromCurrency === this.ToCurrency){
    //     this.ToCurrency=this.P_fromCurrency;
    //     this.FromCurrency=this.P_toCurrency;
    //     this.convert();
    // }
    // }

    // name = new FormControl('Juned Maniyar');
    // password = new FormControl('@%^&*');
    // submitData() {
    //     this.submitted = true;
    //     if (this.MyFormGroup.invalid) {
    //         return;
    //     }
    //     console.log(this.MyFormGroup.value);


    // }

}
