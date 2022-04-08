import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: [
    `
      p {
        font-size: 100px;
        color: white;
      }
    `,
  ],
})
export class ErrorPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
