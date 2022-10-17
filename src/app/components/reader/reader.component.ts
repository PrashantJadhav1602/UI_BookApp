import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderService } from 'src/app/service/reader.service';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { BookResponse } from 'src/app/entity/BookResponse';
import { MatDialog } from '@angular/material/dialog';
import { OpenbookComponent } from 'src/app/components/openbook/openbook.component';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent{

  readerForm:FormGroup;
  books:Array<BookResponse> = [];
  selectedBookId: any;
  public textBoxDisabledemail: boolean = false;
  public textBoxDisabledsub: boolean= true;

  constructor(private router:Router, private _readerService: ReaderService, 
    private matDialog: MatDialog,) {
    this.readerForm = new FormGroup({
      emailId: new FormControl({value:"t@t.com",disabled:false}),
      subscriptionId: new FormControl(),
  })
   }


  ngOnInit(): void {
  }

  homeButton(){
    this.router.navigate(["home"]);
  }

  searchBooksByEmailId(){
    console.log(this.readerForm.get(['emailId'])?.value);
    
    this._readerService.searchBookByEmailId(this.readerForm.get(['emailId'])?.value).subscribe({
      next: (res:any)=>{
          console.log(res);
           this.books = res;
      },
      error: (err:any)=>{
          console.log(err)
      }
  })

    return this._readerService.searchBookByEmailId(this.readerForm.get(['emailId'])?.value);
  }
  // searchBookBySubscrptionId
  searchBooksBySubscrptionId(){
    this.books = [];
    console.log(this.readerForm.get(['subscriptionId'])?.value);
    
    this._readerService
    .searchBookBySubscrptionId(this.readerForm.get(['emailId'])?.value,
                              this.readerForm.get(['subscriptionId'])?.value )
                              .subscribe({
                            next: (res:any)=>{
                                console.log(res);
                                this.books = res;
                            },
                            error: (err:any)=>{
                                console.log(err)
                            }
  })

    return this._readerService.searchBookBySubscrptionId(this.readerForm.get(['emailId'])?.value,
    this.readerForm.get(['subscriptionId'])?.value );
  }

  searchBooks(){
      if(!this.textBoxDisabledemail){
        this.searchBooksByEmailId();
      }else{
        this.searchBooksBySubscrptionId();
      }
  }

  
  toggle(){
    this.textBoxDisabledemail= !this.textBoxDisabledemail;
    this.textBoxDisabledsub= !this.textBoxDisabledsub;
    console.log("textBoxDisabledemail ->  "+this.textBoxDisabledemail);
    console.log("textBoxDisabledsub ->  "+this.textBoxDisabledsub);
    
  }

  UnSubscribeBook(bs: BookResponse){
    console.log("bs -> "+bs.bookId+" - "+this.readerForm.get(["emailId"])?.value);
    if(confirm("Really want to Unsubscribe ?")){
         this._readerService.unsubscribeBook(this.readerForm.get(["emailId"])?.value,bs.bookId)
         .subscribe({
          next: (res:any)=>{
            console.log(res);
            if(res==false){
              alert("Can't be Refund now. 24 hours finished.")
            }else{
            this.searchBooks();
            alert("Successfully Book Returned. Unsubscribed !!")
            }
        },
        error: (err:any)=>{
            if(confirm("Unable to unsubscribe Book")){

            }
        }
         })
    }else{

    }
  }

  openModal() {
    // this.matDialog.open(OpenbookComponent, {
    //   "width": '6000px',
    //   "maxHeight": '90vh',
    //   "data": "John",
    //   "autoFocus": false
    // });
  }
}
