import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private httpClient: HttpClient) { }

  private url:string = "http://localhost:9090/api/v1/digitalbooks/readers"
  searchBookByEmailId(emailId:any){
    console.log("==== emailId =======");
    return this.httpClient.get(this.url +"/"+emailId+"/books");
  }

  searchBookBySubscrptionId(emailId:any,subscrptionId:any){
    console.log("==== SubscriptionId =====");
    return this.httpClient.post(this.url +"/"+emailId+"/books?pid="+subscrptionId,null);
  }
  // /{emailId}/books/{bookId}/refund

  unsubscribeBook(emailId:any,bookId:any){
      return this.httpClient.post(this.url +"/"+emailId+"/books/"+bookId+"/refund",null);
  }
}
