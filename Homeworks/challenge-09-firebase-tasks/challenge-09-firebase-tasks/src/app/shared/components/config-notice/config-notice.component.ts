import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

/** Aviso que se muestra mientras `environment.ts` conserva los valores de ejemplo. */
@Component({
  selector: 'app-config-notice',
  imports: [AlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-alert type="warning">
      <strong>Firebase aún no está configurado.</strong>
      Pega los valores de tu proyecto en <code>src/environments/environment.ts</code> y reinicia
      <code>npm start</code>. Mientras tanto no se puede iniciar sesión ni guardar tareas.
    </app-alert>
  `,
})
export class ConfigNoticeComponent {}
