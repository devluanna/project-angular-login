import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function identityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { identityInvalid: true }; 
    }
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    const isUsername = usernamePattern.test(value);

    return isUsername ? null : { identityInvalid: true };
  };
}