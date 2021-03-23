import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProgressBarService } from '@app/@core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  bufferValue!: number;
  mode!: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value!: number;
  visible!: boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(private _progressBarService: ProgressBarService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Buffer value
    this._progressBarService.bufferValue
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((bufferValue) => {
        this.bufferValue = bufferValue;
      });

    // Mode
    this._progressBarService.mode
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((mode) => {
        this.mode = mode;
      });

    // Value
    this._progressBarService.value
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.value = value;
      });

    // Visible
    this._progressBarService.visible
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((visible) => {
        this.visible = visible;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
