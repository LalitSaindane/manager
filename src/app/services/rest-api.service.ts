import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  url:String = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  postManagerInfo(managerInfo:object){
    return this.http.post(`${this.url}manager`,managerInfo)
  }

  getManagerInfo(){
    return this.http.get(`${this.url}manager`)
  }

  postEmployeeInfo(employeeInfo:object){
    return this.http.post(`${this.url}employee`,employeeInfo)
  }


  getListOfEmployee(){
    return this.http.get(`${this.url}employee`);
  }

  getSingleEmployee(employeeId:number){
    return this.http.get(`${this.url}employee/${employeeId}`);
  }

  putSingleEmployeeInfo(employeeId:number,employeeInfo:object){
    return this.http.put(`${this.url}employee/${employeeId}`,employeeInfo);
  }

  deleteEmployeeInfo(employeeId:number){
    return this.http.delete(`${this.url}employee/${employeeId}`);
  }

  getManager(emailId:string){
    return this.http.get(`${this.url}manager?email=${emailId}`);
  }

  randomIdGenerator(){
    return Math.floor(Math.random() * 100);
  }
}
