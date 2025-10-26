import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { evaluate } from 'mathjs';

@Component({
  selector: 'app-calculator',
  imports: [RouterLink],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {
Display:string='';
check_digit(input:string):boolean{
  return /^\d+$/.test(input);
}
add(char:string){
  if(char === 'AC')
    this.Display='';
  else if(char=='Back')
    this.Display=this.Display.slice(0,-1);
  else if(this.check_digit(char))
    this.Display+=char;
  else if(this.validate(char))
this.Display+=char;
  else if(char === '=')
    try {
      this.Display = evaluate(this.Display).toString();
    } catch (error) {
      this.Display = 'Error';
    }
  }


validate(c:string):boolean{
 if(/[+%/*\-]/.test(c)){
  if(/[\-*/%+]/.test(this.Display.slice(-1))){
    this.Display=this.Display.slice(0,-1)+c;

  }
  else
return true;
 }
    
    if(c === '.'){
      const parts=this.Display.split(/[+/*-]/);
      if(parts[parts.length-1].includes('.'))

return false;
else
  return true;

}
if(c=== '=')
  return false;
      return false;

}

 developer:string='John Doe';
@Output() emitter:EventEmitter<any>=new EventEmitter<any>();
ngOnInit(){
this.emitter.emit(this.developer);
}
}