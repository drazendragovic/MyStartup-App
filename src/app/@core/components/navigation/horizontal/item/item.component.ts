import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-horizontal-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class NavHorizontalItemComponent implements OnInit {
  @HostBinding('class') classes = 'nav-item';
  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
