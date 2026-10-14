import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Mensaje visible (éxito, error, aviso) basado en las alertas de Bootstrap. */
@Component({
  selector: 'app-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="alert d-flex align-items-start gap-2 mb-0"
      [class]="'alert-' + type()"
      [class.alert-dismissible]="dismissible()"
      [attr.role]="type() === 'danger' ? 'alert' : 'status'"
    >
      <i class="bi flex-shrink-0 mt-1" [class]="icon()" aria-hidden="true"></i>
      <div class="flex-grow-1"><ng-content /></div>
      @if (dismissible()) {
        <button type="button" class="btn-close" aria-label="Cerrar mensaje" (click)="closed.emit()"></button>
      }
    </div>
  `,
})
export class AlertComponent {
  readonly type = input<'success' | 'danger' | 'warning' | 'info'>('info');
  readonly dismissible = input(false);
  readonly closed = output<void>();

  protected icon(): string {
    switch (this.type()) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'danger':
        return 'bi-exclamation-octagon-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  }
}
