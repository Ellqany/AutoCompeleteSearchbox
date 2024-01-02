import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../shared/course.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SearchFilterPipe } from '../shared/filter-pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchFilterPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  stateForm: FormGroup;
  showDropDown = false;
  Courses: Course[] = [];
  baseUrl = 'https://localhost:5001/';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.stateForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      search: [null]
    });
  }

  ngOnInit() {
    console.log(this.baseUrl)
    this.http.get<Course[]>(this.baseUrl + 'api/Home').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (result) => {
        this.Courses = result;
      },
      error: (error) => console.error(error)
    });
  }

  selectValue(value: string) {
    this.stateForm.patchValue({ 'search': value });
    this.showDropDown = false;
  }

  closeDropDown() {
    this.showDropDown = false;
  }

  openDropDown() {
    this.showDropDown = true;
  }

  getSearchValue() {
    return this.stateForm.value.search;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
