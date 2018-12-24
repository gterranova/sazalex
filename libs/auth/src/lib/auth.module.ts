import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SHARED_MODULES,
  COMPONENT_DECLARATIONS,
  COMPONENT_PROVIDERS,
  MODULE_EXPORTS
} from './auth.common';

import { UiModule } from '@sazalex/ui';

import { ForgotPasswordDialog } from './components/login/login.component';

@NgModule({
  imports: [CommonModule, FormsModule, UiModule, ...SHARED_MODULES],
  declarations: [...COMPONENT_DECLARATIONS, ForgotPasswordDialog],
  entryComponents: [ForgotPasswordDialog],
  exports: [...MODULE_EXPORTS]
})
export class AuthModule {
  /*
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. It should only be imported in your application\'s main module.');
    }
  }*/
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [...COMPONENT_PROVIDERS]
    };
  }
}
