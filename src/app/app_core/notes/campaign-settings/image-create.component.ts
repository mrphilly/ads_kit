
import {Component, Inject} from '@angular/core'
import {
    MatTableDataSource, MatPaginator, MatSnackBar, NativeDateAdapter, MatDialog, MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material';
@Component({
  selector: 'image-modified-component',
  templateUrl: './image-create.component.html',
})
export class ImageCreateComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}