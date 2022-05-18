import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationsViewModel } from '../../models';
import { selectAllRegistrations, selectRegistrationListViewModel } from '../../state';
import { RegistrationEntity } from '../../state/reducers/registrations.reducer';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {

  model$!: Observable<RegistrationsViewModel>;

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.model$ = this.store.select(selectRegistrationListViewModel);
  }

}
