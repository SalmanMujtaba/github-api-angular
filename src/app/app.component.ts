import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { appConstants } from './contants/common-constants';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'github-api-angular';
  matError: string = appConstants.MAT_ERROR;
  matLabel: string = appConstants.MAT_LABEL;

  constructor(private coreService: CoreService, public dialog: MatDialog) {
    // this.apiService.getRepositories();
  }

  formValue({ threshold }) {
    this.getRepositoryData(threshold);
  }

  getRepositoryData(threshold): void {
    this.coreService.getRepositories(threshold).pipe(
      // takeUntil(this.subs$),
      // tap((res1: IResponse) => this.totalPages = res1.total_pages),
      // map((res1: IResponse) => res1.data.filter((x: IData) => x.submission_count > this.getThreshold()).map((re: IData) => re.username)),
    )
      .subscribe(
        (res: Array<any>) => this.manageData(res),
        (err => this.manageError(err)),
        () => console.log("at the end")
      );
  }

  manageData(res) {
    console.log(res);
  }

  manageError(error: HttpErrorResponse) {
    console.log(error)
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "250px",
      height: "250px",
      // panelClass: ["dialog-container"],
      data: { name: error?.error?.errors[0]?.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });

  }
}
