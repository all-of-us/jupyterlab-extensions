import {AngularWrapperWidget} from '../phosphor-angular-loader';

export class ConceptsWidget extends AngularWrapperWidget {

  constructor() {
    super();
    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;
  }
}
