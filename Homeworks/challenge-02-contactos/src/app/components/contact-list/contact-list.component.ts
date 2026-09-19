import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactItemComponent } from '../contact-item/contact-item.component';

/**
 * Muestra la lista completa de contactos y delega
 * la eliminación individual a ContactItemComponent.
 */
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() delete = new EventEmitter<number>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  trackByContactId(_index: number, contact: Contact): number {
    return contact.id;
  }
}
