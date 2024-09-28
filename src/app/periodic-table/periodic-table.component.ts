import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, EMPTY, Observable, Subject, map, throwError, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../services/api.service';
import { PeriodicElement, PeriodicElementComponent } from "../periodic-element/periodic-element.component";
import { MatGridListModule } from '@angular/material/grid-list';

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
    MatGridListModule,
    PeriodicElementComponent
  ],
})
export class PeriodicTableComponent implements OnInit {
  elements$: Observable<PeriodicElement[]>;
  elementsTable: Array<Array<PeriodicElement>>;
  filterText: string = '';
  private filterSubject = new Subject<string>();

  constructor(private dialog: MatDialog, private api: APIService) {
    this.elements$ = EMPTY;
    this.elementsTable = Array.from({ length: 10 }, () => Array(18).fill({ empty: true }));
    this.PreloadTable();
  }
  PreloadTable() {
    PERIODIC_TABLE_MAP.forEach((value,key) =>{
      this.elementsTable[value[0]][value[1]].position = key;
    })
  }

  ngOnInit(): void {
    this.elements$ = this.api.getData();
    this.populateTable();
  }

  populateTable() {
    this.api.getData().pipe(
      tap((elements:PeriodicElement[])=>{
        elements.forEach((element)=>{
          console.log('popTab: %s',element.name);
          if(element.position!=null){
            const coords = PERIODIC_TABLE_MAP.get(element.position);
            if(coords){
              this.elementsTable[coords[0]][coords[1]] = element;
              console.log('Current element: %s',element.name);
            }
          }
        })
      })).subscribe();
  }
}

const PERIODIC_TABLE_MAP = new Map<number, [number, number]>([
  // Row 0 (Hydrogen and Helium)
  [1, [0, 0]], [2, [0, 17]],

  // Row 1 (Lithium to Neon)
  [3, [1, 0]], [4, [1, 1]], [5, [1, 12]], [6, [1, 13]], [7, [1, 14]], [8, [1, 15]], [9, [1, 16]], [10, [1, 17]],

  // Row 2 (Sodium to Argon)
  [11, [2, 0]], [12, [2, 1]], [13, [2, 12]], [14, [2, 13]], [15, [2, 14]], [16, [2, 15]], [17, [2, 16]], [18, [2, 17]],

  // Row 3 (Potassium to Krypton)
  [19, [3, 0]], [20, [3, 1]], [21, [3, 2]], [22, [3, 3]], [23, [3, 4]], [24, [3, 5]], [25, [3, 6]], 
  [26, [3, 7]], [27, [3, 8]], [28, [3, 9]], [29, [3, 10]], [30, [3, 11]], [31, [3, 12]], [32, [3, 13]], 
  [33, [3, 14]], [34, [3, 15]], [35, [3, 16]], [36, [3, 17]],

  // Row 4 (Rubidium to Xenon)
  [37, [4, 0]], [38, [4, 1]], [39, [4, 2]], [40, [4, 3]], [41, [4, 4]], [42, [4, 5]], [43, [4, 6]], 
  [44, [4, 7]], [45, [4, 8]], [46, [4, 9]], [47, [4, 10]], [48, [4, 11]], [49, [4, 12]], [50, [4, 13]], 
  [51, [4, 14]], [52, [4, 15]], [53, [4, 16]], [54, [4, 17]],

  // Row 5 (Cesium to Radon)
  [55, [5, 0]], [56, [5, 1]], [57, [5, 2]], [72, [5, 3]], [73, [5, 4]], [74, [5, 5]], [75, [5, 6]], 
  [76, [5, 7]], [77, [5, 8]], [78, [5, 9]], [79, [5, 10]], [80, [5, 11]], [81, [5, 12]], [82, [5, 13]], 
  [83, [5, 14]], [84, [5, 15]], [85, [5, 16]], [86, [5, 17]],

  // Row 6 (Francium to Oganesson)
  [87, [6, 0]], [88, [6, 1]], [89, [6, 2]], [104, [6, 3]], [105, [6, 4]], [106, [6, 5]], [107, [6, 6]], 
  [108, [6, 7]], [109, [6, 8]], [110, [6, 9]], [111, [6, 10]], [112, [6, 11]], [113, [6, 12]], [114, [6, 13]], 
  [115, [6, 14]], [116, [6, 15]], [117, [6, 16]], [118, [6, 17]],

  // Lanthanides (Row 8)
  [58, [8, 3]], [59, [8, 4]], [60, [8, 5]], [61, [8, 6]], [62, [8, 7]], [63, [8, 8]], [64, [8, 9]], 
  [65, [8, 10]], [66, [8, 11]], [67, [8, 12]], [68, [8, 13]], [69, [8, 14]], [70, [8, 15]], [71, [8, 16]],

  // Actinides (Row 9)
  [90, [9, 3]], [91, [9, 4]], [92, [9, 5]], [93, [9, 6]], [94, [9, 7]], [95, [9, 8]], [96, [9, 9]], 
  [97, [9, 10]], [98, [9, 11]], [99, [9, 12]], [100, [9, 13]], [101, [9, 14]], [102, [9, 15]], [103, [9, 16]]
]);
