import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {

  handleError(error: any) {
    // TODO: display a message somewhere.
    console.log('THERE WAS AN ERROR!: ' + error);
    // delegate to the default handler
    super.handleError(error);
  }
}
