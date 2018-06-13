import {
  ApplicationRef,
  ErrorHandler,
  NgModule,
} from '@angular/core';
import { AppErrorHandler } from './app-error-handler';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [AppComponent],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  exports: [
    AppComponent,
  ]
})
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {}
}
