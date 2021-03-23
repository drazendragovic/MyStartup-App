import { NgModule } from '@angular/core';

import { SharedModule } from '@app/@shared/shared.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { ContentComponent } from './content.component';


@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule {
}
