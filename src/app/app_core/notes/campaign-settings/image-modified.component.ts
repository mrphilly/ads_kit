
import {Component, Inject} from '@angular/core'
import {
    MatTableDataSource, MatPaginator, MatSnackBar, NativeDateAdapter, MatDialog, MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material';
@Component({
  selector: 'image-modified-component',
  templateUrl: './image-modified.component.html',
})
export class ImageModifedComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageModifedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}