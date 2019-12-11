import { Component, OnInit } from '@angular/core';  
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';


@Component({  
	selector: 'app-home',  
	templateUrl: './home.component.html',  
	styleUrls: ['./home.component.css']   
})  
export class HomeComponent implements OnInit {
	products = [];
  private httpClient: HttpClient
	//constructor(private apiService: ApiService) { }
	ngOnInit() {
   //this.httpClient.get("/myapi").subscribe((data: any[])=>{
   //this.apiService.get().subscribe((data: any[])=>{   
   // 	console.log("Tring to get the data" );    
		//	console.log(data);  
		//	console.log("Done..." );
    //  this.products = data;  
		//})  
	}
}
