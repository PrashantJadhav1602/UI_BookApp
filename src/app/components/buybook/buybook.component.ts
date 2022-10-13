import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookResponse } from 'src/app/entity/BookResponse';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-buybook',
  templateUrl: './buybook.component.html',
  styleUrls: ['./buybook.component.css']
})
export class BuybookComponent {

  buyForm:FormGroup;
  selectedbookId: any;
  subscribedBook: any;

  constructor(private _bookService:BookserviceService,
              private router:Router) { 
    this.selectedbookId = localStorage.getItem("bookId")
    this.buyForm = new FormGroup({
      readerName: new FormControl("", [Validators.required]),
      readerEmailId: new FormControl("", [Validators.required]),
      bookId: new FormControl({disabled: true, value: this.selectedbookId})
  })
  
  }

 
  saveSubscribedBook(){
    console.log("new Date()  > "+new Date());
     return this._bookService.buyBook(
                                {
               "bookId":Number(localStorage.getItem("bookId")),
                                  "readerEmailId":this.buyForm.get(["readerEmailId"])?.value,
                                  "readerName":this.buyForm.get(["readerName"])?.value,
                                  "subscribedDateTime":new Date()
                                }
                                  ).subscribe({
                                  next: (res:any)=>{
                                      console.log(res);
                                      this.subscribedBook = res;
                                      if(confirm("Successfully Subscribed !!")){
                                           this.router.navigate(["home"]); 
                                      } 
                                  },
                                  error: (err:any)=>{
                                      console.log(err)
                                  }
                              })
  }

  homeButton(){
    this.router.navigate(["home"]);
  }
}
