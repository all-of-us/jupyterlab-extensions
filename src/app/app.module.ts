import {
  ApplicationRef,
  ErrorHandler,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  imports: [
    BrowserModule,
  ],
  exports: [
    AppComponent,
  ]
})
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {}
}
