import { Injectable } from '@angular/core';
import { NodeRecord } from '../models/tree-node';

const KEY = 'p2_nodes';

/** "Base de datos" mock: guarda los registros planos del árbol en localStorage. */
@Injectable({ providedIn: 'root' })
export class TreeDbService {
  getAll(): NodeRecord[] {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  }
  saveAll(records: NodeRecord[]): void {
    localStorage.setItem(KEY, JSON.stringify(records));
  }
}
