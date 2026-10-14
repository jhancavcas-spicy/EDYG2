import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { isFirebaseConfigured } from '../../core/firebase/firebase.config';
import { useAsyncAction } from '../../core/hooks/use-async-action';
import { AuthService } from '../../core/services/auth.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { ConfigNoticeComponent } from '../../shared/components/config-notice/config-notice.component';
import { emailFormat } from '../../shared/validators/form-validators';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, ConfigNoticeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly firebaseConfigured = isFirebaseConfigured;
  protected readonly action = useAsyncAction();

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, emailFormat]],
    password: ['', [Validators.required]],
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    const result = await this.action.run(() => this.auth.login(email.trim(), password));
    if (result.ok) {
      await this.router.navigateByUrl('/tasks');
    }
  }
}
