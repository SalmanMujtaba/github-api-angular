import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent implements OnInit {
  thresholdForm: FormGroup;
  @Input() matError: string;
  @Input() matLabel: string;
  @Output() formValue: EventEmitter<any> = new EventEmitter;

  validPattern = "^[a-zA-Z0-9]{10}$";
  constructor(private formBuilder: FormBuilder) {

    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.thresholdForm = this.formBuilder.group({
      'threshold': ['', Validators.required]
    });
  }

  onSubmit(value: string) {
    this.thresholdForm.markAllAsTouched();
    if (this.thresholdForm.valid) {
      this.formValue.emit(value);
    }
  }

}
