import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class MaterialModule { }

// @NgModule({
//   declarations: [
//     AppComponent,
//     SearchBoxComponent
//   ],
//   imports: [
//     FormsModule,
//     HttpClientModule,
//     BrowserModule,
//     NoopAnimationsModule,
//     ReactiveFormsModule,
//     MaterialModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }