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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  repository: string;
  cacheCommits = new Map<string, string>();
  cacheRepositories = new Map<string, string>();
  isRepositoriesOnScreen: boolean;
  authorRepoName: string;
  hint: string;
  toggleSearchbox: boolean = true;

  constructor(private coreService: CoreService, public dialog: MatDialog) {
    this.buttonText = appConstants.CARD_BUTTON_LABEL;
    this.matError = appConstants.MAT_ERROR;
    this.matLabel = appConstants.MAT_LABEL;
    this.setFormCardHeightClass = "search-box-height";
    this.hint = appConstants.MAT_HINT;
  }

  formValue({ threshold }) {
    this.repository = threshold.trim();
    this.setFormCardHeightClass = "search-box-height";
    if (!this.cacheRepositories.get(this.repository)) {
      this.getRepositoryData(threshold);
    } else {
      this.setFormCardHeightClass = "search-box-submit-height";
      this.repoResponse = this.cacheRepositories.get(this.repository).slice();
    }
  }

  getRepositoryData(threshold): void {
    this.showSpinner = true;
    this.coreService.getRepositories(threshold).pipe(
      takeUntil(this.subs$),
    ).subscribe(
      (res: Array<any>) => this.manageRepoData(res["items"]),
      (err => this.manageError(err)));
  }

  getCommits(authorRepoName: string) {
    this.showSpinner = true;
    this.authorRepoName = authorRepoName;
    if (authorRepoName && authorRepoName.trim().length > 0) {
      if (this.cacheCommits.get(this.authorRepoName)) {
        this.commitsResponse = this.cacheCommits.get(this.authorRepoName).slice();
        this.manageCommits(this.commitsResponse);
      } else {
        this.coreService.getCommits(authorRepoName).pipe(
          takeUntil(this.subs$),
        ).subscribe(
          (res: Array<any>) => this.manageCommits(res["items"]),
          (err => this.manageError(err)));
      }
    }

  }

  manageRepoData(items) {
    this.showSpinner = false;
    if (items && items.length) {
      this.setFormCardHeightClass = "search-box-submit-height";
      this.repoResponse = items;
      this.isRepositoriesOnScreen = true;
      this.toggleSearchbox = true;
      this.cacheRepositories.set(this.repository, this.repoResponse);
    } else {
      this.openDialog(appConstants.NO_RECORD_FOUND + this.repository);
    }
  }

  manageCommits(commitsData: Array<unknown>) {
    this.showSpinner = false;
    if (commitsData && commitsData.length) {
      this.commitsResponse = commitsData;
      this.isRepositoriesOnScreen = false;
      this.toggleSearchbox = false;

      this.setFormCardHeightClass = "search-box-submit-height";
      this.cacheCommits.set(this.authorRepoName, this.commitsResponse);
    } else {
      this.openDialog(appConstants.NO_RECORD_FOUND + this.authorRepoName);
    }
  }

  manageError(error: HttpErrorResponse) {
    this.showSpinner = false;
    this.openDialog(error);
  }

  openDialog(error) {
    let data = typeof error === "string" ? error : error?.error?.message || error?.error?.errors[0]?.message
    this.dialog.open(ErrorDialogComponent, {
      width: "400px",
      height: "250px",
      data
    });
  }

  backButtonClicked() {
    this.isRepositoriesOnScreen = true;
    this.toggleSearchbox = true;
  }

  ngOnDestroy() {
    this.subs$.next();
    this.subs$.complete();
  }
}
