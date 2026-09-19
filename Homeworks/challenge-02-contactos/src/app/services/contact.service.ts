import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

/**
 * Servicio encargado de administrar los contactos en memoria.
 * Simula una carga inicial (como si viniera de un servidor) y
 * expone métodos para agregar y eliminar contactos.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    { id: 1, name: 'Juan Pérez', phone: '3001234567' },
    { id: 2, name: 'María González', phone: '3019876543' },
    { id: 3, name: 'Carlos Rodríguez', phone: '3154567890' },
    { id: 4, name: 'Ana Martínez', phone: '3207654321' }
  ];

  private nextId = 5;

  /**
   * Simula una petición de carga inicial de contactos.
   * No realiza ninguna petición real a un servidor.
   */
  getContacts(): Observable<Contact[]> {
    return of(this.contacts).pipe(delay(1800));
  }

  /**
   * Agrega un nuevo contacto a la lista y lo retorna.
   */
  addContact(name: string, phone: string): Contact {
    const newContact: Contact = {
      id: this.nextId++,
      name,
      phone
    };
    this.contacts = [...this.contacts, newContact];
    return newContact;
  }

  /**
   * Elimina un contacto según su identificador.
   */
  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }
}
