import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
//import { ChartEvent } from 'angular-google-charts';
//import { ChartErrorEvent } from 'angular-google-charts'; 
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { CHART_VERSION } from 'angular-google-charts/lib/models/injection-tokens.model';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  //chart: GoogleChartComponent; //Component name in the template
  // @ViewChild(GoogleChartComponent ,{static: false})  mychart ;

  @ViewChild('chart', {static: false} ) 
  chart : GoogleChartComponent;

  title = 'Browser market shares at a specific website, 2014';
   type = 'PieChart';
   data = [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7] 
   ];
   columnNames = ['Browser', 'Percentage'];
   options = {    
   };
   width = 550;
   height = 400;
 
   csvData : any;
   allTextLines : any;
   headers: any;
   lines =[];
   NewData : Array<Array<string|number>>=[];   
   //private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
   private csvData2; 
   //_http: any;  
  constructor(private _http: Http) { }
  //constructor() { }

  ngOnInit() { 
    this.readCsvData();
    console.log("Assigning data to the Graph");  
    for (let i=0; i< this.lines.length; i+=2 )
    {
      this.NewData.push([this.lines[i],this.lines[i+1]]);
      console.log("element of new data:"+ this.NewData[this.NewData.length -1]+ "\n\r");
    }
    console.log("New Data is:"+ this.NewData);
    
    this.columnNames = ['Year','Val'];
    console.log("this.NewData[0] is:"+ this.NewData[0]);
    
    this.NewData.reverse();
    this.NewData.pop();
    this.data = this.NewData; 
    console.log("this.NewData is:"+ this.NewData);
    this.type="Table";
    this.title = "Table"; 
  }
  
  readCsvData() {
    this._http.get("http://172.10.10.3:6000/ifr.csv")
    .subscribe(
      data => this.extractData(data),
      err => {console.log("Error in readCsvData " + err);}
    );
  }
  
  private extractData(res: any) {
     this.csvData = res['_body'] || '';
     this.allTextLines = this.csvData.split(/\r\n|\n/);
     this.headers = this.allTextLines[0].split(',');
   
    for ( let i = 0; i < this.allTextLines.length; i++) {
        // split content based on comma
        let data = this.allTextLines[i].split(',');
        if (data.length == this.headers.length) {
            let tarr = [];
            for ( let j = 0; j < this.headers.length; j++) {
                tarr.push(data[j]);
                this.lines.push(data[j]); 
                console.log("element "+data[j] +"\n\r");              
            }
            //this.lines.push(tarr);
        }
    }
    //this.csvData2 = this.lines;    
    console.log ("Data is :" + this.lines);    
  }

  
  public onReady()
  {
    console.log(" Ready event called." );
    
    //this.type='BarChart';
  }


  myClickFunction3(event){
     this.NewData=[];
    for (let i=0; i< this.lines.length; i+=2 )
    {
      this.NewData.push([this.lines[i],this.lines[i+1]]);
      console.log("element of new data:"+ this.NewData[this.NewData.length -1]+ "\n\r");
    }
    console.log("New Data is:"+ this.NewData);
    
    this.columnNames = <string[]> this.NewData[0];
    console.log("this.NewData[0] is:"+ this.NewData[0]);
    
    this.NewData.reverse();
    this.NewData.pop();
    this.data = this.NewData; 
   
    console.log("this.NewData is:"+ this.NewData);
    this.type="Table";
    this.title = "Table";

    console.log("from chart type " + this.chart.title)
  }

   myClickFunction(event) { 
      //just added console.log which will display the event details in browser on click of the button.
      alert("Button is clicked");
      console.log(event);
      this.readCsvData();
      console.log("Assigning data to the Graph");
      this.type='BarChart';
   }

   myClickFunctionLine(event)   {
    
    this.NewData=[];
    for (let i=0; i< this.lines.length; i+=2 )
    {
      if(i>0){
         this.NewData.push([this.lines[i],parseInt(this.lines[i+1])]);
         }
      else
      {
         this.NewData.push([<string>this.lines[i],<string>this.lines[i+1]]);       
      }
      console.log("element of new data:"+ this.NewData[this.NewData.length -1]+ "\n\r");
    }
    console.log("New Data is:"+ this.NewData);
    
    this.columnNames = <string[]> this.NewData[0];
    console.log(" this.NewData[0] is:"+ this.NewData[0]);
    
    this.NewData.reverse();
    this.NewData.pop();
    this.data = this.NewData; 
   
    console.log("this.NewData is:"+ this.NewData);
    
    this.type="BarChart";
    this.title = "Bar Graph Updated";
  }
}
