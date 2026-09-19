import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactService } from './services/contact.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

/**
 * Componente raíz de la aplicación. Orquesta el loader inicial,
 * el formulario de contactos y la lista de contactos.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ContactFormComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  isLoading = true;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.isLoading = false;
    });
  }

  onAddContact(data: { name: string; phone: string }): void {
    const newContact = this.contactService.addContact(data.name, data.phone);
    this.contacts = [...this.contacts, newContact];
  }

  onDeleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }
}
