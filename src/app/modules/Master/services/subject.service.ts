import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { subject } from '../_models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrl = "https://localhost:7103/api/";
  subject: subject[] = [];
  constructor(private http: HttpClient) { }
  getSubject(): Observable<subject[]> {
    return this.http.get<subject[]>(this.baseUrl + 'SubjectMaster/GetSubject');
  }

  createSubject(model: any) {
    return this.http.post<any>(this.baseUrl + 'SubjectMaster/CreateSubject', model).subscribe(
    data =>{

    })
  }
}
