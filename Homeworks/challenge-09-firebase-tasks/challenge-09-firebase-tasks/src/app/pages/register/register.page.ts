import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { isFirebaseConfigured } from '../../core/firebase/firebase.config';
import { useAsyncAction } from '../../core/hooks/use-async-action';
import { AuthService } from '../../core/services/auth.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { ConfigNoticeComponent } from '../../shared/components/config-notice/config-notice.component';
import { emailFormat, passwordsMatch } from '../../shared/validators/form-validators';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, ConfigNoticeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.page.html',
})
export class RegisterPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private redirectTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly firebaseConfigured = isFirebaseConfigured;
  protected readonly action = useAsyncAction(10000);

  protected readonly form = this.fb.group(
    {
      email: ['', [Validators.required, emailFormat]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatch('password', 'confirmPassword') },
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.redirectTimer));
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    const result = await this.action.run(
      () => this.auth.register(email.trim(), password),
      '¡Cuenta creada! Te estamos llevando a tus tareas…',
    );
    if (result.ok) {
      // Firebase ya inició la sesión con la cuenta nueva.
      this.redirectTimer = setTimeout(() => this.router.navigateByUrl('/tasks'), 1200);
    }
  }
}
