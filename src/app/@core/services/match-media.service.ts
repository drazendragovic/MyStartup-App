import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MatchMediaService
{
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');


    constructor(private _mediaObserver: MediaObserver) {
        this.activeMediaQuery = '';
        this._init();
    }

    private _init(): void
    {
        this._mediaObserver.asObservable()
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((changes: MediaChange[]) => {
              const currentMediaChange = changes[0];
                if ( this.activeMediaQuery !== currentMediaChange.mqAlias )
                {
                    this.activeMediaQuery = currentMediaChange.mqAlias;
                    this.onMediaChange.next(currentMediaChange.mqAlias);
                }
            });
    }

}
