import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, SkipSelf } from '@angular/core';
import { Optional } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from './authentication/auth.module';
import { LoaderOverlayModule } from './components/loader/loader-overlay/loader-overlay.module';

import { AuthGuard } from './guards/auth.guard';
import { EnsureModuleLoadedOnceGuard } from './guards/ensureModuleLoadedOnceGuard';
import { LoaderInterceptor } from './interceptors';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { APP_CONFIG, JwtService, ProgressBarService } from './services';
import { AccountService } from './services/account.service';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
    AuthModule,
    OverlayModule,
    LoaderOverlayModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    NotificationService,
    JwtService,
    ApiService,
    AccountService,
    ProgressBarService,
    AuthGuard
  ],
  exports: [
  ]
})

export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

  static forRoot(config: any): ModuleWithProviders<CoreModule>
    {
        return {
            ngModule : CoreModule,
            providers: [
                {
                    provide : APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
