import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  panelOpenState = false;
  @Input() url: string;
  @Input() comment: string;
  @Input() date: string;
  @Input() authorName: string;
  @Input() authorEmail: string;
  // @Input() fullName: string;
  // @Output() commits: EventEmitter<string> = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

}
