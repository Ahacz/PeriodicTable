import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';

// Define the PeriodicElement interface
interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  isHighlighted?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
  ],
})

export class PeriodicTableComponent implements OnInit {
  elements: PeriodicElement[] = [];
  displayedElements: PeriodicElement[] = [];
  tableRows: Array<Array<PeriodicElement | null>> = [];
  lanthanidesActinidesRows: Array<Array<PeriodicElement | null>> = [];
  filterText: string = '';
  private filterSubject = new Subject<string>();

  dataLoading = true;

  constructor(private dialog: MatDialog) {
    // Debounce the filter input with a 2-second delay
    this.filterSubject.pipe(debounceTime(2000)).subscribe((filterValue) => {
      this.applyFilter(filterValue);
    });
  }

  ngOnInit(): void {
    this.tableRows = Array.from({ length: 7 }, () => Array(18).fill(null));
    this.lanthanidesActinidesRows = Array.from({ length: 2 }, () => Array(14).fill(null));

    // Populate the main periodic table
    this.populateTable();
    
    // Handle filtering with debouncing
    this.filterSubject.pipe(debounceTime(2000)).subscribe(value => {
      this.filterText = value;
      this.filterElements();
    });
  }

  populateTable() {
    for (const element of ELEMENT_DATA) {
      const position = [Math.floor((element.position - 1) / 18), (element.position - 1) % 18];
      this.tableRows[position[0]][position[1]] = { ...element, isHighlighted: false };
    }
  }

  filterElements() {
    const searchText = this.filterText.toLowerCase();

    // Clear highlights if filter is empty
    const clearHighlight = searchText === '';

    // Highlight elements in the main table
    for (const row of this.tableRows) {
      for (const element of row) {
        if (element) {
          element.isHighlighted = !clearHighlight && element.name.toLowerCase().includes(searchText);
        }
      }
    }

    // Highlight elements in the lanthanides and actinides table (if applicable)
    for (const row of this.lanthanidesActinidesRows) {
      for (const element of row) {
        if (element) {
          element.isHighlighted = !clearHighlight && element.name.toLowerCase().includes(searchText);
        }
      }
    }
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // You can handle the edited result here without mutating the original elements
        // For example, just log or process the result as needed
      }
    });
  }

  applyFilter(filterValue: string): void {
    const lowerCaseFilter = filterValue.toLowerCase();
    this.displayedElements = this.elements.map((el) => ({
      ...el,
      // Highlighting is only for display purposes
      isHighlighted: el.name.toLowerCase().includes(lowerCaseFilter) || 
                     el.symbol.toLowerCase().includes(lowerCaseFilter),
    }));
  }

  onFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(inputValue); 
  }
}
const MAIN_PERIODIC_TABLE_MAP: { [key: number]: [number, number] } = {
  1: [0, 0], 2: [0, 17], 3: [1, 0], 4: [1, 1], 5: [1, 12],  
  6: [1, 13], 7: [1, 14], 8: [1, 15], 9: [1, 16], 10: [1, 17],
  11: [2, 0], 12: [2, 1], 13: [2, 12], 14: [2, 13], 15: [2, 14], 
  16: [2, 15], 17: [2, 16], 18: [2, 17], 19: [3, 0], 20: [3, 1], 
  21: [3, 2], 22: [3, 3], 23: [3, 4], 24: [3, 5], 25: [3, 6], 
  26: [3, 7], 27: [3, 8], 28: [3, 9], 29: [3, 10], 30: [3, 11], 
  31: [4, 0], 32: [4, 1], 33: [4, 2], 34: [4, 3], 35: [4, 4], 
  36: [4, 5], 37: [4, 6], 38: [4, 7], 39: [4, 8], 40: [4, 9],  
  41: [4, 10], 42: [4, 11], 43: [4, 12], 44: [4, 13], 45: [4, 14], 
  46: [4, 15], 47: [4, 16], 48: [4, 17], 49: [5, 0], 50: [5, 1],  
  51: [5, 2], 52: [5, 3], 53: [5, 4], 54: [5, 5], 55: [5, 6],  
  56: [5, 7], 
};
const LANTHANIDES_ACTINIDES_MAP: { [key: number]: [number, number] } = {
  57: [0, 0],  
  58: [0, 1],  
  59: [0, 2],  
  60: [0, 3],  
  61: [0, 4],  
  62: [0, 5], 
  63: [0, 6], 
  64: [0, 7],  
  65: [0, 8],  
  66: [0, 9],  
  67: [0, 10], 
  68: [0, 11], 
  69: [0, 12], 
  70: [0, 13], 
  71: [0, 14], 
  89: [1, 0],  
  90: [1, 1],  
  91: [1, 2],  
  92: [1, 3],  
  93: [1, 4],  
  94: [1, 5],  
  95: [1, 6],  
  96: [1, 7],  
  97: [1, 8],  
  98: [1, 9],  
  99: [1, 10], 
  100: [1, 11], 
  101: [1, 12], 
  102: [1, 13], 
  103: [1, 14], 
};
