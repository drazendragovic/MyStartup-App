import { Component, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, FormControl, FormGroup, Validators, ValidatorFn, FormBuilder } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegisterFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RegisterFormComponent),
      multi: true
    }
  ]
})
export class RegisterFormComponent implements OnInit, ControlValueAccessor, Validator {
  public registerInfoForm: FormGroup | any;
  isPasswordSame!: boolean;

  constructor(private fb: FormBuilder) { }

  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false;
      } else {
        matchingControl.setErrors(null);
        this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false;
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.registerInfoForm.valid ? null : { invalidForm: { valid: false, message: "RegisterInfoForm fields are invalid" } };
  }

  public onTouched: () => void = () => { };

  writeValue(obj: any): void {
    obj && this.registerInfoForm.setValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.registerInfoForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.registerInfoForm.disable() : this.registerInfoForm.enable();
  }

  ngOnInit() {
    this.getRegistrationForm();
  }

  getRegistrationForm() {
    this.registerInfoForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.confirmPasswordValidator('password', 'confirmPassword') });
  }

}
