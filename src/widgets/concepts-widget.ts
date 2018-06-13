import {AngularWrapperWidget} from './phosphor-angular-loader';

import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';

export class ConceptsWidget extends AngularWrapperWidget {

  constructor(configObservable: Observable<AllOfUsConfig>) {
    super();
    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;

    const tbl = document.createElement('table');
    const tbody = tbl.createTBody();
    const workspaceIdRow = tbody.insertRow(0);
    const workspaceIdLabelCell = workspaceIdRow.insertCell(0);
    workspaceIdLabelCell.textContent = 'Workspace ID:';
    const workspaceIdValueCell = workspaceIdRow.insertCell(1);
    this.node.appendChild(tbl);

    configObservable.subscribe((config) => {
      workspaceIdValueCell.textContent = 'now: ' + config.workspaceId;
    });
  }
}
