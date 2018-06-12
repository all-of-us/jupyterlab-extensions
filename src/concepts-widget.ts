import {
  Widget
} from '@phosphor/widgets';

import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from './config';

export class ConceptsWidget extends Widget {

  constructor(allOfUsConfig: AllOfUsConfig, configObservable: Observable<AllOfUsConfig>) {
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
    workspaceIdValueCell.textContent = allOfUsConfig.workspaceId;
    this.node.appendChild(tbl);

    configObservable.subscribe((config) => {
      workspaceIdValueCell.textContent = 'now: ' + config.workspaceId;
    }, (e) => {}, () => {});
  }
}
