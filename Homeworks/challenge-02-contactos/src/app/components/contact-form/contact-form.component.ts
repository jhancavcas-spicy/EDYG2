import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Formulario para capturar y validar los datos de un
 * nuevo contacto (nombre y teléfono).
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  @Output() add = new EventEmitter<{ name: string; phone: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  get phoneControl() {
    return this.form.get('phone');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, phone } = this.form.value as { name: string; phone: string };
    this.add.emit({ name: name.trim(), phone: phone.trim() });
    this.form.reset();
  }
}
