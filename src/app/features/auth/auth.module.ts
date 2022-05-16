import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { UserIsAuthenticatedGuard } from './guards/auth.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { UserIsNotAuthenticatedGuard } from './guards/not-loggedin.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';

// This is faked auth.
@NgModule({
  declarations: [LoginFormComponent, UserStatusComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureName, reducers),
    ReactiveFormsModule,
    ReactiveComponentModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [UserIsAuthenticatedGuard, UserIsNotAuthenticatedGuard],
  exports: [LoginFormComponent, UserStatusComponent],
})
export class AuthModule {}
