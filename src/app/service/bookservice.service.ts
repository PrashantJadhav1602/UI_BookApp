import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../entity/Book';
import { query } from '@angular/animations';
import { SubscribeBook } from '../entity/SubscribeBook';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  
  constructor(private http:HttpClient) { }

   // p05-
   private url:string = "http://localhost:9090/api/v1/digitalbooks/books"
   private searchUrl : string = "";
   private buyUrl : string = "";

   searchBook(book:Book){
    console.log("book = > "+book.author)
      let queryParam= new HttpParams();
      queryParam.append("authorId",book.author)
      if(book.author!=null){
      }
      if(book.price!=null){
        queryParam.append("price",book.price)
      }
      if(book.category!=null){
        queryParam.append("category",book.category)
      }
      if(book.publisher!=null){
        queryParam.append("publisher",book.publisher)
      }
      console.log("queryParam = > "+queryParam.has("author"));
      console.log("queryParam = > "+queryParam.get("price"));
      console.log("queryParam = > "+queryParam.get("publisher"));
      console.log("queryParam = > "+queryParam.get("category"));

      this.searchUrl= this.url+"/search?author="+book.author+"&price="+book.price+"&publisher="+book.publisher+"&category="+book.category;
      console.log("url = > "+this.searchUrl);
          
      return this.http.get(this.searchUrl
            // ,{
            //   params:queryParam
            // }
            );
      //  return this.http.post(this.url, movie);
   }

   buyBook(subscribeBook: any){
    console.log("SubscribeBook = > "+subscribeBook)
    this.buyUrl= this.url+"/buy";
    console.log(this.http.post(this.buyUrl,subscribeBook));
    return this.http.post(this.buyUrl,subscribeBook);
   }

}
