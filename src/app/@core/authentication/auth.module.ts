import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterFormModule } from './components/register-form/register-form.module';
import { LoginFormModule } from './components/login-form/login-form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    RegisterFormModule,
    LoginFormModule
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
