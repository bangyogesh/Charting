import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private SERVER_URL = "http://172.10.10.3:3000/products"; 
  //private SERVER_URL = "/myapi";
  private SERVER_URL = "http://192.168.0.4:5001/book/scrips.xls/sheets/0/range/A1:D4";
  
  constructor(private httpClient: HttpClient) { console.log("API Service constructor called..." ); }
  
  
  public get(){  
 		return this.httpClient.get(this.SERVER_URL);  
	}  
}
