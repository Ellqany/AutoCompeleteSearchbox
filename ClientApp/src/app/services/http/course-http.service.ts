import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CourseModel } from '../../models';

const API_REGIONS_URL = 'https://localhost:5001/api/Home';

@Injectable({
   providedIn: 'root',
})
export class CourseHTTPService {
   constructor(private http: HttpClient) { }

   // public methods
   GetCourse(courseId: number): Observable<CourseModel> {
      return this.http.get<CourseModel>(`${API_REGIONS_URL}/${courseId}`);
   }

   Search(courseName: string | null): Observable<CourseModel[]> {
      return this.http.get<CourseModel[]>(`${API_REGIONS_URL}/Search?name=${courseName}`);
   }
}
