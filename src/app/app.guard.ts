import { inject } from "@angular/core";
import { Login } from "./services/loginService"
import { ActivatedRouteSnapshot, Router } from "@angular/router";

export const CanActivateCreator = (r:ActivatedRouteSnapshot) => {
    console.log("from guard");
        const router =inject(Router);
        const login =inject(Login);
        const url:string=r.data['go'];
        
        if(!login.isLoggedIn()){
            console.log("not logged in");
            router.navigate(['/Login'],{queryParams:{redirect:url}})
            return false;
        }
        else {
console.log("logged in");
            return true;
        }
    }
        // const newLogin = inject(Login);
        // const route=inject(Router);
        // if( newLogin.IsAuthenticatedUser() && newLogin.GetRole() === "ADMIN"){
        //     return true;
        // }
        // else{
        //     route.navigate(['/Login']);
        //    return false;
        // }
        
    
export const CanActivateCustomerComponents = () => {
//     const newLogin = inject(Login);
//     const route=inject(Router);
//     const role= newLogin.GetRole();
//     if( newLogin.IsAuthenticatedUser()
//  && (role === "CUSTOMER" || role==="ADMIN" || role==="EMPLOYEE")){
    
//         return true;
//     }
// else
// {
//     route.navigate(['/Login']);

//     return false;
// }   

    
 
}
