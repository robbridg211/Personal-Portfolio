import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { FlipAnimation } from '../animations'

import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: FlipAnimation.animations
})
export class AppComponent {

  user: any;

  show: true;

  constructor(public http: HttpService) { }


  nameFormControl = new FormControl("", [
    Validators.required
  ]);

  emailRegEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(this.emailRegEx)
  ]);

  companyFormControl = new FormControl("", [
    Validators.required
  ]);

  messageFormControl = new FormControl("", [
    Validators.required
  ]);

  ngOnInit(){
    document.getElementById('back').style.backfaceVisibility='hidden';
    this.user = {
      name: "", company:"", email: "", message: ""};
    }
  register() {

    let user = {
      name: this.nameFormControl.value,
      company: this.companyFormControl.value,
      email: this.emailFormControl.value,
      message: this.messageFormControl.value,
    }

    this.http.sendEmail("http://localhost:8000/sendmail", user).subscribe(
      data => {
        let res: any=data;
        console.log(`From Component.ts - Message Sent: ${user.name}, ${user.company}, ${user.email}, ${user.message} with resID: ${res.messageId}`);
      },
      err => {
        console.log(err);
 
      },() => {
        console.log('Success!')
      }
      );
      
    }

  
  flip = 'inactive';  

  toggleFlip() {
    this.flip = this.flip === 'inactive' ? 'active' : 'inactive';
    console.log(this.flip);
    if(this.flip === 'inactive') {
      this.showFront();
      document.getElementById('back').style.backfaceVisibility="hidden";
    }
    if(this.flip === 'active') {
      this.hideFront();
      document.getElementById('back').style.backfaceVisibility="visible";
    }
  
  }

  showFront() {
    document.getElementById('front').style.display="unset";
  }
  hideFront() {
    document.getElementById('front').style.display="none";
  }



    
  }
  // disabled project buttons right now!