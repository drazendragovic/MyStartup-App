import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/@shared';
import { SidebarModule } from '@app/@shared/components';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { SettingsOptionsModule } from '../components/settings-panel/settings.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { VerticalLayoutComponent } from './vertical.component';

@NgModule({
  declarations: [
    VerticalLayoutComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    SidebarModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    ToolbarModule,
    SettingsOptionsModule
  ],
  exports: [
    VerticalLayoutComponent
  ]
})
export class VerticalLayoutModule {
}
