import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppConfigService } from '@app/@core/services';
import { animations } from '@app/@shared/animations';
import { SidebarService } from '@app/@shared/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: animations
})
export class SettingsPanelComponent implements OnInit, OnDestroy {
  appConfig: any;
  form: FormGroup | any;
  @HostBinding('class.bar-closed') barClosed: boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _formBuilder: FormBuilder,
    private _configService: AppConfigService,
    private _sidebarService: SidebarService,
    private _renderer: Renderer2
  ) {
    this.barClosed = true;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      colorTheme: new FormControl(),
      customScrollbars: new FormControl(),
      layout: this._formBuilder.group({
        style: new FormControl(),
        width: new FormControl(),
        navbar: this._formBuilder.group({
          primaryBackground: new FormControl(),
          secondaryBackground: new FormControl(),
          folded: new FormControl(),
          hidden: new FormControl(),
          position: new FormControl(),
          variant: new FormControl()
        }),
        toolbar: this._formBuilder.group({
          background: new FormControl(),
          customBackgroundColor: new FormControl(),
          hidden: new FormControl(),
          position: new FormControl()
        }),
        footer: this._formBuilder.group({
          background: new FormControl(),
          customBackgroundColor: new FormControl(),
          hidden: new FormControl(),
          position: new FormControl()
        }),
        sidepanel: this._formBuilder.group({
          hidden: new FormControl(),
          position: new FormControl()
        })
      })
    });

    this._configService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {

        this.appConfig = config;
        this.form.setValue(config, { emitEvent: false });
      });

    this.form.get('layout.style').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value: any) => {
        this._resetFormValues(value);
      });

    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {
        this._configService.config = config;
      });

    const customFunctionNavItem = {
      id: 'custom-function',
      title: 'Custom Function',
      type: 'group',
      icon: 'settings',
      children: [
        {
          id: 'customize',
          title: 'Customize',
          type: 'item',
          icon: 'settings',
          function: () => {
            this.toggleSidebarOpen('themeOptionsPanel');
          }
        }
      ]
    };
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private _resetFormValues(value: any): void {
    switch (value) {

      case 'vertical-layout':
        {
          this.form.patchValue({
            layout: {
              width: 'fullwidth',
              navbar: {
                primaryBackground: 'broadcast-orange-700',
                secondaryBackground: 'broadcast-orange-900',
                folded: false,
                hidden: false,
                position: 'left',
                style: 'vertical-style'
              },
              toolbar: {
                background: 'broadcast-orange-500',
                customBackgroundColor: false,
                hidden: false,
                position: 'below-static'
              },
              footer: {
                background: 'broadcast-orange-700',
                customBackgroundColor: true,
                hidden: false,
                position: 'below-static'
              },
              sidepanel: {
                hidden: false,
                position: 'right'
              }
            }
          });

          break;
        }

      case 'horizontal-layout':
        {
          this.form.patchValue({
            layout: {
              width: 'fullwidth',
              navbar: {
                primaryBackground: 'broadcast-orange-700',
                secondaryBackground: 'broadcast-orange-900',
                folded: false,
                hidden: false,
                position: 'top',
                style: 'vertical-style'
              },
              toolbar: {
                background: 'broadcast-white-500',
                customBackgroundColor: false,
                hidden: false,
                position: 'above'
              },
              footer: {
                background: 'broadcast-orange-900',
                customBackgroundColor: true,
                hidden: false,
                position: 'above-fixed'
              },
              sidepanel: {
                hidden: false,
                position: 'right'
              }
            }
          });

          break;
        }
    }
  }

  toggleSidebarOpen(key: any): void {
    this._sidebarService.getSidebar(key).toggleOpen();
  }

}
