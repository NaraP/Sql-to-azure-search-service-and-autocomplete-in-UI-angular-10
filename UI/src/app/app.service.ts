import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  setValue:any = [];
  constructor(private http:HttpClient) { }

  getList() {
    return this.http.post('https://localhost:44335/api/SearchAzure?searchText=Testname',  null);
  }

  setValues(value) {
    this.setValue = value;  
    console.log('Value', this.setValue);
  }

  getValues() {  
    return this.setValue;  
  }  

}