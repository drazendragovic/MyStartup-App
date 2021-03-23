import { Component, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => LoginFormComponent),
   multi: true
 },
  {
   provide: NG_VALIDATORS,
   useExisting: forwardRef(() => LoginFormComponent),
   multi: true
 }
]
})
export class LoginFormComponent implements OnInit, ControlValueAccessor, Validator {

  public loginInfoForm: FormGroup | any = new FormGroup(
    {
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.loginInfoForm.valid ? null : { invalidForm: {valid: false, message: "loginInfoForm fields are invalid"}};
  }

  public onTouched: () => void = () => {};

  writeValue(obj: any): void {
    obj && this.loginInfoForm.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.loginInfoForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.loginInfoForm.disable() : this.loginInfoForm.enable();
  }

  ngOnInit() {
  }

}
