import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const API_TRANS_URL = `${environment.apiTransUrl}`;
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) {}

  // public methods
  getDocType(): Observable<any> {
    return this.http.get<any>(`${API_TRANS_URL}Academic/GetDocType`);
  }
  getStudentSearch(studentSearch: any): Observable<any> {
    return this.http.post<any>(`${API_TRANS_URL}Academic/GetStudents`,studentSearch);
  }
  postStudentAssignment(studentAssign: any): Observable<any> {
    return this.http.post<any>(`${API_TRANS_URL}Academic/SubmitNotification`,studentAssign);
  }

  GetNotificationDetails(notificationdetails: any): Observable<Document[]> {
    return this.http.get<Document[]>(`${API_TRANS_URL}Academic/GetNotificationDetails?InType=`+notificationdetails.InType+'&TypeCode=0&SectionCode=0');
  }

  GetNotificationDetail(notificationdetails: any): Observable<Document[]> {
    return this.http.get<Document[]>(`${API_TRANS_URL}Academic/GetNotificationDetails?InType=`+notificationdetails.InType+'&TypeCode='+ notificationdetails.TypeCode+'&SectionCode=0');
  }

  DeleteStudentAssignment(studentAssign: any): Observable<any> {
    return this.http.post<any>(`${API_TRANS_URL}Academic/DeleteNotification`,studentAssign.NotificationaDetailId);
  }

}
