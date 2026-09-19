import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

/**
 * Representa una tarjeta individual de contacto.
 * Muestra su información y emite un evento al eliminarlo.
 */
@Component({
  selector: 'app-contact-item',
  standalone: true,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input({ required: true }) contact!: Contact;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.contact.id);
  }
}
