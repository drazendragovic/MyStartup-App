import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { animations } from '@app/@shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [animations]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
