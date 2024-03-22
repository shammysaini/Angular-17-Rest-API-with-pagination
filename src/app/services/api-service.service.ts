import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

 private saveUrl:string = "http://localhost:9090/save";
 private getUrl:string = "http://localhost:9090/employee";
 private updateUrl:string = "http://localhost:9090/employee/update";
 private deleteUrl:string = "http://localhost:9090/employee/delete";

  constructor(private http:HttpClient) { }

saveEmployee(data:any):Observable<any>{

  return this.http.post(this.saveUrl,data);
}

fetchRecord():Observable<Employee[]>{

  return this.http.get<Employee[]>(this.getUrl);
}
updateEmployee(id:number,data:Employee):Observable<any>{
  
  return this.http.post(`${this.updateUrl}/${id}`,data);
}

deleteEmployee(id:number):Observable<any>{

  return this.http.delete(`${this.deleteUrl}/${id}`);
}

findRecord(id:number):Observable<any>{
  return this.http.get<any>(`${this.getUrl}/${id}`);
}

}