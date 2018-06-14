import {AngularWrapperWidget} from '../phosphor-angular-loader';

import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../../config';

export class ConceptsWidget extends AngularWrapperWidget {

  constructor(configObservable: Observable<AllOfUsConfig>) {
    super();
    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;

    // TODO: make a form with a search textbox input and a button;
    // when clicked, make an API call and show the results.

    configObservable.subscribe((config) => {
      // TODO: enable the textbox and button
    });
  }
}
