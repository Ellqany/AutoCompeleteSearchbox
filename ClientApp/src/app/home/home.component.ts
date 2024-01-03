import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SearchFilterPipe } from '../shared/filter-pipe';
import { SearchFormModel } from '../models/searchForm.model';
import { ClickOutsideDirective } from '../shared/clickOutside.directive';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, SearchFilterPipe, ClickOutsideDirective],
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
   private ngUnsubscribe = new Subject();
   stateForm: FormGroup<SearchFormModel>;
   showDropDown = false;
   Courses: Course[] = [];
   baseUrl = 'https://localhost:5001/';

   constructor(private http: HttpClient, private fb: FormBuilder) {
      this.stateForm = this.initForm();
   }

   initForm(): FormGroup {
      return this.fb.group<SearchFormModel>({
         search: new FormControl('',
            Validators.compose([
               Validators.maxLength(100),
            ]),
         ),
      });
   }

   ngOnInit() {
      this.http.get<Course[]>(this.baseUrl + 'api/Home').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
         next: (result) => {
            this.Courses = result;
         },
         error: (error) => console.error(error)
      });
   }

   selectValue(value: string) {
      this.stateForm.controls.search.setValue(value);
      this.showDropDown = false;
   }

   closeDropDown() {
      this.showDropDown = false;
   }

   openDropDown() {
      this.showDropDown = true;
   }

   getSearchValue() {
      return this.stateForm.controls.search.value;
   }

   ngOnDestroy(): void {
      this.ngUnsubscribe.next(null);
      this.ngUnsubscribe.complete();
   }
}
