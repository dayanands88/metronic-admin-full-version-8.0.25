import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { subject } from '../_models/subject';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = "https://localhost:7103/";
  students: subject[] = [];
  constructor(private http: HttpClient) { }
  getStudent() {
    return this.http.get<Partial<subject[]>>(this.baseUrl + 'SubjectMaster/GetSubject');
  }
}
