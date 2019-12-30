import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../shared/course.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stateForm: FormGroup;
  showDropDown = false;
  Courses: Course[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private fb: FormBuilder) {
    http.get<Course[]>(baseUrl + 'api/Home').subscribe(result => {
      this.Courses = result;
    }, error => console.error(error));
    this.initForm();
  }

  initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    });
  }

  ngOnInit() {

  }

  selectValue(value) {
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
}
