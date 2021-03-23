import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { animations } from '@app/@shared/animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: animations
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
