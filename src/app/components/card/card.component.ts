import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardCSS: string;
  @Input() description: string;
  @Input() avatar: string;
  @Input() title: string;
  @Input() buttonText: string;
  alt: string;
  altMainImage: string;
  constructor() {
    this.alt = "Alternate text for " + this.avatar;
    this.altMainImage = "Main image alt text " + this.avatar;
  }

  ngOnInit(): void {
  }

}
