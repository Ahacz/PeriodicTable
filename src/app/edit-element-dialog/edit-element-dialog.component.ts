import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { PeriodicElement } from '../periodic-element/periodic-element.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-element-dialog',
  templateUrl: './edit-element-dialog.component.html',
  styleUrls: ['./edit-element-dialog.component.scss'],
  standalone: true,
  imports:[CommonModule, MatDialogModule, FormsModule,MatFormFieldModule]
})
export class EditElementDialogComponent {
  elementCopy: PeriodicElement;

  constructor(
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {
    // Make a copy of the element to avoid mutating the original data
    this.elementCopy = { ...data };
  }
  cancel(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    // Here you would typically send the updated data back
    this.dialogRef.close(this.data);
  }
}
