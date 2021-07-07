import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnChanges {
  panelOpenState = false;
  @Input() url: string;
  @Input() comment: string;
  @Input() date: string;
  @Input() authorName: string;
  @Input() authorEmail: string;
  constructor() { }

  ngOnChanges(change: SimpleChanges) {
    if (change && change.comment && change.comment.currentValue) {
      const currentComment = change.comment.currentValue;
      this.comment = currentComment.length > 250 ? change.comment.currentValue.substring(0, 250) + "..." : currentComment;
    }
  }



}
