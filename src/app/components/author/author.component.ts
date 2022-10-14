import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { BookResponse } from 'src/app/entity/BookResponse';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  books:Array<BookResponse> = [];
  bookResponse:any;
  createForm:FormGroup;
  authorId:any;

  constructor(private router: Router,private _authorservice: AuthorService){
    this.authorId=localStorage.getItem("authorId");
      this.createForm = new FormGroup({
          authorId: new FormControl({"disabled":false,"value":this.authorId}, [Validators.required]),
          title: new FormControl({"disabled":false,"value":"Happy Life"}, [Validators.required]),
          category: new FormControl({"disabled":false,"value":"Philosophy"}, [Validators.required]),
          price: new FormControl({"disabled":false,"value":200}, [Validators.min(0), Validators.max(5)]),
          publisher : new FormControl({"disabled":false,"value":"Nation"}, [Validators.required]),
          block :  new FormControl({"disabled":false,"value":"true"}, [Validators.required]),
          publishDate :  new FormControl({"disabled":false,"value":"2022-10-12"}, [Validators.required])
      })
  }

  homeButton(){
    this.router.navigate(["home"])
  }

  logout(){
    if(confirm("Do you really want to Log-out")){
      localStorage.removeItem("username");
      this.router.navigate(["home"])
    }else{
      this.router.navigate(["createbook"])
    }
  }

  saveBook(){
       console.log(this.createForm.value); 
      this._authorservice.saveBook(this.createForm.value).subscribe({
          next: (res:any)=>{
              console.log(res);
               alert("Book created successfully !!");
          },
          error: (err:any)=>{
              console.log(err)
              alert("Unable to create book. Try after sometime !!");
          }
      })
  }

  viewAuthorBooks(){
   this._authorservice.getAuthorBook(1)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          this.books = res; 
        },
        error:(err:any) =>{
          console.log(err)
        }
      })
  }

  updateBook(book:any)
  {
      this._authorservice.updateAuthorBook(book)
        .subscribe(
        {
          next: (res:any) => {
            console.log(res);
            this.bookResponse = res; 
            alert("Block status updated Successfully !!")
            this.viewAuthorBooks();
          },
          error:(err:any) =>{
            console.log(err)
            alert("Failed to updated block status !!")
          }
        }
      )
  }

}
