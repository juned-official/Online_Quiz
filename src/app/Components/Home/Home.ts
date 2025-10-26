import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: 'Home.html',
 
})
export class Home{
  constructor(private rout:Router){

  }
Go(nav: string) {
this.rout.navigate([nav])
}

}