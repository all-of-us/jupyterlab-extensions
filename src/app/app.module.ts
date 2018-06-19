import {ErrorHandlingService} from './services/error-handling.service';

import {AllOfUsConfigService} from '../services/config.service';

import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationRef,
  ErrorHandler,
  NgModule,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ClarityModule} from '@clr/angular';

import {AppErrorHandler} from './app-error-handler';
import {AppComponent} from './app.component';

import {
//  ApiModule,
  Configuration,
  ConfigurationParameters
} from '../generated';


import {
  CohortConceptsComponent
} from '../widgets/concepts/cohort-concepts/cohort-concepts.component';
import {
  ConceptSearchComponent
} from '../widgets/concepts/concept-search/concept-search.component';


function getBasePath() {
  return AllOfUsConfigService.configSubject.getValue().apiHost;
}

// "Configuration" means Swagger API Client configuration.
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: getBasePath()
    // accessToken: () => signInService.currentAccessToken
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    CohortConceptsComponent,
    ConceptSearchComponent
  ],
  entryComponents: [AppComponent],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    ErrorHandlingService
  ],
  imports: [
    // ApiModule.forRoot(apiConfigFactory),
    BrowserModule,
    ClarityModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AppComponent
  ]
})
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {}
}
