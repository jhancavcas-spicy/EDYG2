import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Correo con formato `usuario@dominio.ext` (más estricto que `Validators.email`). */
export const emailFormat: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = String(control.value ?? '').trim();
  return !value || EMAIL_PATTERN.test(value) ? null : { emailFormat: true };
};

/** Rechaza textos que solo tienen espacios. */
export const notBlank: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  String(control.value ?? '').length > 0 && String(control.value).trim() === ''
    ? { blank: true }
    : null;

/** Validador de grupo: marca `mismatch` si las dos contraseñas no coinciden. */
export function passwordsMatch(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirm = group.get(confirmKey)?.value;
    return password === confirm ? null : { mismatch: true };
  };
}
