import { bootstrapApplication } from '@angular/platform-browser';
import { PeriodicTableComponent } from './app/periodic-table/periodic-table.component'; // Adjust path as necessary
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(PeriodicTableComponent, {
  providers: [provideAnimations()],
}).catch((err) => console.error(err));