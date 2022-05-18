import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureEvents } from './state/actions/feature.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {




  constructor(store: Store) {
      store.dispatch(FeatureEvents.FeatureEntered());
  }
}
