import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';

/** Ventana de confirmación (estilos de modal de Bootstrap, sin su JavaScript). */
@Component({
  selector: 'app-confirm-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'open() && cancelled.emit()' },
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  readonly open = input(false);
  readonly title = input('¿Estás seguro?');
  readonly message = input('');
  readonly confirmLabel = input('Confirmar');
  readonly busy = input(false);

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  private readonly cancelButton = viewChild<ElementRef<HTMLButtonElement>>('cancelButton');

  constructor() {
    // Al abrir, el foco va al botón "Cancelar" (la opción segura).
    effect(() => {
      const button = this.cancelButton();
      if (this.open() && button) {
        setTimeout(() => button.nativeElement.focus());
      }
    });
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancelled.emit();
    }
  }
}
