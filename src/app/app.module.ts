import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { MaterialModule } from './modules/matertial.module';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    CardComponent,
    ErrorDialogComponent,
    ErrorDialogComponent,
    SpinnerComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
