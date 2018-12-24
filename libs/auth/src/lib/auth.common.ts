// app
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserActivateComponent } from './components/user-activate/user-activate.component';

import { AuthGuard } from './guards';
import { AuthenticationService, ApiService, TokenService } from './services';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.token;
    },
    whitelistedDomains: ['localhost:4000', '192.168.1.132:4000'],
    blacklistedRoutes: [],
    authScheme: 'JWT '
  };
}

export const SHARED_MODULES: any[] = [
  AuthRoutingModule,
  // TranslateModule.forChild(),
  JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [TokenService]
    }
  })
];

export const COMPONENT_PROVIDERS: any[] = [
  JwtHelperService,
  AuthGuard,
  AuthenticationService,
  ApiService,
  TokenService,
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
];

export const MODULE_EXPORTS: any[] = [JwtModule];

export const COMPONENT_DECLARATIONS: any[] = [
  LoginComponent,
  PasswordResetConfirmComponent,
  UserDeleteComponent,
  ChangeUsernameComponent,
  ChangePasswordComponent,
  UserActivateComponent
];
