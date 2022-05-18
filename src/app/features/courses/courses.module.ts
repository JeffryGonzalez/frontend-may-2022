import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './state/effects/course.effects';
import { EnrollComponent } from './components/enroll/enroll.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassesEffects } from './state/effects/classes.effects';
import { AuthModule } from 'auth-lib';
import { UserIsAuthenticatedGuard } from 'auth-lib';
import { ReactiveComponentModule } from '@ngrx/component';
import { RegistrationEffects } from './state/effects/registration.effects';
import { DateDiffPipe } from 'src/app/pipes/date-diff.pipe';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { FeatureEffects } from './state/effects/feature.effects';
const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'list', component: ListComponent },
      {
        path: 'registrations', component: RegistrationsComponent
      },
      {
        path: 'enroll/:id',
        component: EnrollComponent,
        canActivate: [UserIsAuthenticatedGuard],
      },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  declarations: [
    CoursesComponent,
    ListComponent,
    EnrollComponent,
    DateDiffPipe,
    RegistrationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthModule,
    StoreModule.forFeature(featureName, reducers),
    ReactiveComponentModule,
    EffectsModule.forFeature([
      CourseEffects,
      ClassesEffects,
      RegistrationEffects,
      FeatureEffects
    ]),
    HttpClientModule,
    ReactiveFormsModule,
  ],

  exports: [RouterModule],
})
export class CoursesModule {}
