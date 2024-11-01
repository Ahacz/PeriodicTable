import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  isHighlighted?: boolean; // Optional for highlighting
}

@Component({
  selector: 'app-periodic-element',
  templateUrl: './periodic-element.component.html',
  styleUrls: ['./periodic-element.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PeriodicElementComponent {
  @Input() element!: PeriodicElement; // Ensure element is passed to the component
}
