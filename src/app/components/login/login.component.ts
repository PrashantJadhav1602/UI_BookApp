import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorResponse } from 'src/app/entity/AuthorResponse';
import { Author } from 'src/app/entity/Author';
import { AuthorService } from 'src/app/service/author.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm:FormGroup;

  constructor(private router:Router, private _authorSerivce:AuthorService){
    this.loginForm = new FormGroup({
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
  respone:any;
doLogin(){

  this.author.username=this.loginForm.get(["username"])?.value;
    this.author.password=this.loginForm.get(["password"])?.value;
    console.log("author --> "+this.author);
     this._authorSerivce.login(this.author).subscribe({
      next: (res:any)=>{
          console.log(res);
           this.respone = res;
           localStorage.setItem("username",  this.author.username);
           localStorage.setItem("authorId",res.authorId);
            this.router.navigate(["createbook"])
          
      },
      error: (err:any)=>{
          console.log(err);
          if(confirm("Incorrect Username or Password. Try again")) {
            this.router.navigate(["login"])
          }
      }
  });

}


cancelButton(){
  this.router.navigate(["home"]);
}
}
