import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Author } from 'src/app/entity/Author';
import { AuthorResponse } from 'src/app/entity/AuthorResponse';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm:FormGroup;

  constructor(private router: Router, private _authorSerivce: AuthorService ){
    this.signUpForm = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
    })
}
author:Author = {
  "username":"",
  "password":""
}
authorreponse:AuthorResponse ={
  "id": 0,
  "username":"",
  "password":""
}

  doSignUp(){
    this.author.username=this.signUpForm.get(["username"])?.value;
    this.author.password=this.signUpForm.get(["password"])?.value;
    console.log("author --> "+this.author);
    
     this._authorSerivce.signUp(this.author).subscribe({
      next: (res:any)=>{
          console.log(res);
           this.authorreponse = res;
           if(confirm("Great! Successfully Registered. Please login and continue")) {
            this.router.navigate(["login"])
          }
      },
      error: (err:any)=>{
          console.log(err);
          if(confirm("User with "+this.signUpForm.get(["username"])?.value+" already exists. Please try with different Username.")) {
            
          }
      }
  });

  }
  doLogin(){

  }

  cancelButton(){
    this.router.navigate(["home"]);
  }

  goToLogin(){
    this.router.navigate(["login"]);
  }
}
