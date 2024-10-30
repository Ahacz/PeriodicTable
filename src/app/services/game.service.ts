import { Injectable, input } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { PeriodicElement } from '../periodic-element/periodic-element.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private elementsTable$: BehaviorSubject<PeriodicElement[][] | null>;
  constructor() {
    this.elementsTable$ = new BehaviorSubject<PeriodicElement[][] | null>(null);
 
  }
  getPeriodicTable$(): Observable<PeriodicElement[][] | null> {
    return this.elementsTable$.asObservable();
  }
  initializePeriodicTable(table: PeriodicElement[][]): void {
    this.elementsTable$.next(table);  // Emit the table to all subscribers
  }

  // Method to update a specific element by position
  updateElement(element: PeriodicElement): void {
    const currentTable = this.elementsTable$.value;
    if (currentTable) {
      const coords = PERIODIC_TABLE_MAP.get(element.position);
      if (coords) {
        currentTable[coords[0]][coords[1]] = element;
        this.elementsTable$.next(currentTable);  // Emit the updated table
      }
    }
  }
}
