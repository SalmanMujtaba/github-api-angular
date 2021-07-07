import { Component } from '@angular/core';
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

  constructor(private coreService: CoreService) {
    // this.apiService.getRepositories();
  }

  formValue({ threshold }) {
    this.coreService.getRepositories(threshold);
  }
}
