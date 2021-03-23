import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from '@app/@shared';
import { SidebarModule } from '@app/@shared/components';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { SettingsOptionsModule } from '../components/settings-panel/settings.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { HorizontalLayoutComponent } from './horizontal.component';


@NgModule({
  declarations: [
    HorizontalLayoutComponent
  ],
  imports: [
    MatSidenavModule,
    SharedModule,
    SidebarModule,
    SettingsOptionsModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    ToolbarModule
  ],
  exports: [
    HorizontalLayoutComponent
  ]
})
export class HorizontalLayoutModule {
}
