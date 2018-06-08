import {
  Widget
} from '@phosphor/widgets';

import {AllOfUsConfig} from './config';

export class ConceptsWidget extends Widget {

  constructor(allOfUsConfig: AllOfUsConfig) {
    super();
    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;

    let tbl = document.createElement('table');
    let tbody = tbl.createTBody();
    let workspaceIdRow = tbody.insertRow(0);
    let workspaceIdLabelCell = workspaceIdRow.insertCell(0);
    workspaceIdLabelCell.innerHTML = 'Workspace ID:';
    let workspaceIdValueCell = workspaceIdRow.insertCell(1);
    workspaceIdValueCell.innerHTML = allOfUsConfig.getWorkspaceId();
    this.node.appendChild(tbl);

    allOfUsConfig.config$.subscribe((config) => { workspaceIdValueCell.innerHTML = 'now: ' + config.getWorkspaceId(); },
      (e) => {}, () => {});
  }
}