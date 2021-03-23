import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss']
})
export class LoaderOverlayComponent implements OnInit {
  @Input() public message: string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
