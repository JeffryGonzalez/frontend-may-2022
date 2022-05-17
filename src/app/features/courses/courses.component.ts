import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassesCommands } from './state/actions/classes.actions';
import { CoursesCommands } from './state/actions/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {

  


  constructor(store: Store) {
    store.dispatch(CoursesCommands.LoadCourses());
    store.dispatch(ClassesCommands.LoadClasses());
  }
}
