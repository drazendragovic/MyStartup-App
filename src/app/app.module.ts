import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CoreModule, ProgressBarModule } from './@core';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SharedModule } from './@shared';
import { FeaturesModule } from './@features/features.module';
import { appConfig } from './@core/configuration';
import { SidebarModule } from './@shared/components';
import { LayoutModule } from './@core/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SnotifyModule,
    CoreModule.forRoot(appConfig),
    ModalModule.forRoot(),
    SharedModule,
    ProgressBarModule,
    FeaturesModule,
    SidebarModule,
    LayoutModule
  ],
  providers: [
    {
      provide: 'SnotifyToastConfig',
      useValue: ToastDefaults
    },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
