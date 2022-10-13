import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Book } from 'src/app/entity/Book';
import { BookResponse } from 'src/app/entity/BookResponse';
import { BookserviceService } from 'src/app/service/bookservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bookForm:FormGroup;
  books:Array<BookResponse> = [];
  bookIdSelected:number = 0 ;

  constructor(private router: Router, private _bookService:BookserviceService){
      this.bookForm = new FormGroup({
          category: new FormControl("", [Validators.required]),
          author: new FormControl("", [Validators.required]),
          publisher: new FormControl("", [Validators.required]),
          price : new FormControl("", [Validators.required])
      })

}


  searchBook(){
      console.log(this.bookForm.value); 
        this._bookService.searchBook(this.bookForm.value).subscribe({
            next: (res:any)=>{
                console.log(res);
                 this.books = res;
            },
            error: (err:any)=>{
                console.log(err)
            }
        })
  }

  buyBook(bookId:any){
    console.log("bookId = = > "+bookId);
    localStorage.setItem("bookId", bookId);
    this.router.navigate(["buybook"])
  }

  openSignUp(){
    this.router.navigate(["signup"]);
  }

  openLogin(){
    this.router.navigate(["login"]);
  }

  openReaderPage(){
    this.router.navigate(["reader"]);
  }
}
