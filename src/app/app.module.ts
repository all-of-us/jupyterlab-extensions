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

import {ConceptsModule} from '../widgets/concepts/concepts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [AppComponent],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    ConceptsModule,
    FormsModule
  ],
  exports: [
    AppComponent
  ]
})
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {}
}
