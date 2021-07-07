import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  thresholdForm: FormGroup;
  @Input() matError: string;
  @Input() matLabel: string;
  @Output() formValue: EventEmitter<any> = new EventEmitter;
  @Input() searchBoxCSS: string;
  @Input() hint: string;
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");

  constructor(private formBuilder: FormBuilder) {

    this.createForm();
  }

  createForm(): void {
    this.thresholdForm = this.formBuilder.group({
      'threshold': ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]]
    });
  }

  onSubmit(value: string) {
    this.thresholdForm.markAllAsTouched();
    if (this.thresholdForm.valid) {
      this.formValue.emit(value);
    }
  }

}
