import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../entity/Author';
import { Book } from '../entity/Book';
import { BookResponse } from '../entity/BookResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  private url:string = "http://localhost:9090/api/v1/digitalbooks/author";

  signUp(author: Author){
    console.log("signUp  author = > "+author);  
    console.log(this.http.post(this.url+"/signup",author));
    return this.http.post(this.url+"/signup",author)
  }

  login(author: Author){
    console.log("sigIn  author = > "+author);  
    console.log(this.http.post(this.url+"/login",author));
    return this.http.post(this.url+"/login",author)
  }

  getAuthorBook(id:number){
    console.log("id  author = > "+id); 
    console.log(this.http.get(this.url+"/books/"+id));
    return this.http.get(this.url+"/books/"+id);
  }

  saveBook(book: BookResponse){
    console.log("book to Save = > "+book); 
    console.log(this.http.post(this.url+"/"+book.authorId+"/books",book));
    return this.http.post(this.url+"/"+book.authorId+"/books",book);
  }

  updateAuthorBook(book: BookResponse){
    console.log("book to Update = > "+book.block); 
    if(book.block == false){
      console.log("book.block = > "+book.block);
      book.block = true;
    }else{
      console.log("book.block = > "+book.block);
      book.block = false;
    }
    console.log(this.http.put(this.url+"/"+book.authorId+"/books/"+book.bookId,book));
    return this.http.put(this.url+"/"+book.authorId+"/books/"+book.bookId,book);
  }
}
