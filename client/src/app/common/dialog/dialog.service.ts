import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(): Observable<boolean> {

    let dialogRef: MatDialogRef<DialogComponent>;

    dialogRef = this.dialog.open(DialogComponent);

    return dialogRef.afterClosed();
  }

}
