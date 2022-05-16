import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthCommands } from '../../state/actions/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  param$!: Observable<ParamMap>;
  redirectUrl: string | undefined = undefined;
  form = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.param$ = this.router.queryParamMap.pipe(
      tap((p) => (this.redirectUrl = p.get('redirect') || undefined))
    );
  }
  login() {
    if (this.form.valid) {
      const userName = this.form.get('userName')?.value;
      const password = this.form.get('password')?.value;
      const redirectUrl = this.redirectUrl;
      this.store.dispatch(
        AuthCommands.loginUser({ userName, password, redirectUrl })
      );
    }
  }
}
