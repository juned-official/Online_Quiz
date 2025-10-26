import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Juned } from './Components/juned/juned';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Juned], //classes of children
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  // encapsulation:ViewEncapsulation.Emulated -->parent.css won't effect child.html
  // encapsulation: ViewEncapsulation.ShadowDom //css will effect its entire child (Grand) too
  // encapsulation: ViewEncapsulation.None //css will effect its parent & entire child (Grand) too

})
export class App {
  protected readonly title = signal('Angular_18_Tutorial');
  
//   // fruits:string[] = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];
//  FName:string="";
//   selectedFruit(fruit:string){
// this.FName=fruit;
//  }
MyColors(Color:string[]){
  console.log("Selected Color:", Color);
}
handleObj(developer:string){
console.log("Developer Name:", developer);
}
counter:number=0;
change() {
  this.counter++;
  console.log("Counter incremented to:", this.counter);
}

users:any;
ngOnInit(){
  
}
}
