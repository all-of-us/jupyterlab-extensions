import {
  ErrorHandler,
  NgModule,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ClarityModule} from '@clr/angular';

import {AppErrorHandler} from './app-error-handler';
import {AppComponent} from './app.component';

import {ConceptsService} from '../generated/api/concepts.service';

import {
  ApiModule,
  Configuration,
} from '../generated';
import {AllOfUsConfigService} from '../services/config.service';
import {ErrorHandlingService} from '../services/error-handling.service';
import {
  CohortConceptsComponent
} from '../widgets/concepts/cohort-concepts/cohort-concepts.component';
import {
  ConceptSearchComponent
} from '../widgets/concepts/concept-search/concept-search.component';
import {InterceptedHttp} from './intercepted-http';

function getBasePath() {
  return AllOfUsConfigService.configSubject.getValue().apiHost;
}

// "Configuration" means Swagger API Client configuration.
export function getConfiguration(): Configuration {
  return new Configuration({
    basePath: getBasePath()
    // accessToken: () => signInService.currentAccessToken
  });
}

@NgModule({
  declarations: [
    AppComponent,
    CohortConceptsComponent,
    ConceptSearchComponent
  ],
  entryComponents: [AppComponent],
  providers: [
    {
      provide: Configuration,
      useFactory: getConfiguration
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    ErrorHandlingService,
    {
      provide: Http,
      useClass: InterceptedHttp,
      deps: [XHRBackend, RequestOptions, ErrorHandlingService]
    },
    ConceptsService,
  ],
  imports: [
    ApiModule,
    BrowserModule,
    ClarityModule,
    FormsModule,
    HttpModule,
  ],
  exports: [
    AppComponent
  ]
})
export class AppModule {
}
