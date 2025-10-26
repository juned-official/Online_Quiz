export class quizStart{
   
   messg:string='';
 
    public get Getmessage(): string {
        return this.messg;
    }
    public set Setmessage(value: string) {
        this.messg = value;
    }
    started:boolean=false;
}