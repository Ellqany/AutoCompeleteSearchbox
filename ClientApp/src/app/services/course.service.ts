import { map, catchError } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';

import { CourseModel } from '../models';
import { CourseHTTPService } from './http';

@Injectable({
   providedIn: 'root',
})
export class CourseService implements OnDestroy {
   // private fields
   private unsubscribe: Subscription[] = [];

   // public fields
   isLoading$: Observable<boolean>;
   isLoadingSubject: BehaviorSubject<boolean>;

   constructor(private courseHttpService: CourseHTTPService) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
   }

   get defaultCourse(): CourseModel {
      return {
         id: 0,
         name: '',
         description: '',
         imageUrl: ''
      };
   }

   // public methods
   GetCourse(courseId: number): Observable<CourseModel | undefined> {
      return this.courseHttpService.GetCourse(courseId).pipe(
         map((course: CourseModel) => {
            if (course) {
               return course;
            }
            return undefined;
         }),
         catchError((err) => {
            console.error('Get Course error:', err);
            return of(undefined);
         })
      );
   }

   Search(courseName: string | null): Observable<CourseModel[]> {
      return this.courseHttpService.Search(courseName).pipe(
         map((courses: CourseModel[]) => courses),
         catchError((err) => {
            console.error('Course Search error:', err);
            return of([]);
         }),
      );
   }

   // private methods
   ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
   }
}
