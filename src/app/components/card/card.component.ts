import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardCSS: string;
  @Input() description: string;
  @Input() avatar: string;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() fullName: string;
  @Output() commits: EventEmitter<string> = new EventEmitter;

  alt: string;
  altMainImage: string;

  constructor() {
    this.alt = "Alternate text for " + this.avatar;
    this.altMainImage = "Main image alt text " + this.avatar;
  }


}
