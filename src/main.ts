import { bootstrapApplication } from '@angular/platform-browser';
import { PeriodicTableComponent } from './app/periodic-table/periodic-table.component'; // Adjust path as necessary
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(PeriodicTableComponent, {
  providers: [provideAnimations(),provideHttpClient()],
}).catch((err) => console.error(err));