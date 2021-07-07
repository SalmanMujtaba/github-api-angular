import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { appConstants } from './contants/common-constants';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  title = 'github-api-angular';
  matError: string;
  matLabel: string;
  repoResponse: any;
  buttonText: string;
  setFormCardHeightClass: string;
  showSpinner: boolean;
  subs$ = new Subject();
  commitsResponse: any;

  constructor(private coreService: CoreService, public dialog: MatDialog) {
    this.buttonText = appConstants.CARD_BUTTON_LABEL;
    this.matError = appConstants.MAT_ERROR;
    this.matLabel = appConstants.MAT_LABEL;
    this.setFormCardHeightClass = "search-box-height";
  }

  formValue({ threshold }) {
    this.setFormCardHeightClass = "search-box-height";
    this.getRepositoryData(threshold);
  }

  getRepositoryData(threshold): void {
    this.showSpinner = true;
    this.coreService.getRepositories(threshold).pipe(
      takeUntil(this.subs$),
    )
      .subscribe(
        (res: Array<any>) => this.manageData(res["items"]),
        (err => this.manageError(err)));
  }

  manageData(items) {
    this.showSpinner = false;
    this.setFormCardHeightClass = "search-box-submit-height";
    if (items) {
      this.repoResponse = items;

    }
  }

  manageError(error: HttpErrorResponse) {
    this.showSpinner = false;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "400px",
      height: "250px",
      data: { name: error?.error?.errors[0]?.message }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  repositoryName(repoName: string) {
    this.showSpinner = true;
    if (repoName && repoName.trim().length > 0) {
      this.coreService.getCommits(repoName).pipe(
        takeUntil(this.subs$),
      )
        .subscribe(
          (res: Array<any>) => this.manageCommits(res["items"]),
          (err => this.manageError(err)));
    }
  }

  manageCommits(commitsData: Array<unknown>) {
    this.showSpinner = false;
    this.commitsResponse = commitsData;
    console.log(commitsData);
  }

  ngOnDestroy() {
    this.subs$.next();
    this.subs$.complete();
  }
}
