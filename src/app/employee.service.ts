import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employeeInterface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient ) { }

  getEmpData(): Observable<Employee[]>{
    return this.http.get<Employee[]>('http://127.0.0.1:8000/employee/view/');
  }
  saveEmpData(data: Employee):Observable<Employee>{
    return this.http.post<Employee>('http://127.0.0.1:8000/employee/add/', data);
  }
  getBdayMsg(date: string){
    return this.http.get('http://127.0.0.1:8000/employee/bday/',{
      params: {date}
    })
  }
  //  headers = new Headers({'Content-Type': 'application/json',
  //  'Authorization':'OTk2Y2YxMmMtZTgxMi00MjQzLThiMTctYmI2MzhjMDU4MDVjNTA3NDE4ZjYtZThi_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f '
  // }); 

   sendMsg(getData: any){
    return this.http.post('https://webexapis.com/v1/messages', getData,{
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer OTFiMDc0NWMtNjkyYi00MmVmLTg4OTMtOTI2NjllMGRmZDYyOTI0ZThiMmUtZTgx_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f ' , 
        }
    )})}
  
}
