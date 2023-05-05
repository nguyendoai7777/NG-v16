import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkExisted(source: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const existed = source.find(e => control.value === e);
    return existed ? {existed: true} : null;
  }
}
