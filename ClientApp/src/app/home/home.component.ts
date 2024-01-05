import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CourseService } from '../services';
import { ClickOutsideDirective } from '../directive';
import { CourseModel, SearchFormModel } from '../models';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, ClickOutsideDirective],
   templateUrl: './home.component.html',
   styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
   private unsubscribe: Subscription[] = [];
   stateForm: FormGroup<SearchFormModel>;
   showDropDown = false;
   Courses = signal<CourseModel[]>([]);

   constructor(private courseService: CourseService, private fb: FormBuilder) {
      this.stateForm = this.initForm();
   }

   ngOnInit() {
      const getCourses = this.courseService.Search('').subscribe(courselist => {
         this.Courses.set(courselist);
      })

      this.unsubscribe.push(getCourses);
   }

   selectValue(value: string) {
      this.stateForm.controls.search.setValue(value);
      this.searchCourse();
      this.showDropDown = false;
   }

   closeDropDown() {
      this.showDropDown = false;
   }

   openDropDown() {
      this.showDropDown = true;
   }

   searchCourse() {
      const getCourses = this.courseService.Search(this.stateForm.controls.search.value).subscribe(courselist => {
         this.Courses.set(courselist);
      })

      this.unsubscribe.push(getCourses);
   }

   private initForm(): FormGroup {
      return this.fb.group<SearchFormModel>({
         search: new FormControl('',
            Validators.compose([
               Validators.maxLength(100),
            ]),
         ),
      });
   }

   ngOnDestroy(): void {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
   }
}
