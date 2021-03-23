import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { APP_CONFIG } from './services/config.service';

@NgModule()
export class ConfigModule
{
    constructor(@Optional() @SkipSelf() parentModule: ConfigModule)
    {
        if ( parentModule )
        {
            throw new Error('ConfigModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config: any): ModuleWithProviders<ConfigModule>
    {
        return {
            ngModule : ConfigModule,
            providers: [
                {
                    provide : APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
