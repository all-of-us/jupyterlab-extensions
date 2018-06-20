import {
  Widget
} from '@phosphor/widgets';

import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';
import {ConceptsService} from '../services/concepts.service';

export class ConceptsWidget extends Widget {

  private queryInput: HTMLInputElement;
  private searchInput: HTMLInputElement;

  constructor(configObservable: Observable<AllOfUsConfig>,
              conceptsService: ConceptsService) {
    super();
    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;

    const conceptsWidgetDiv = document.createElement('div');
    conceptsWidgets.id = 'concepts-widgets';

    ReactDOM.render(<ConceptSearchForm />, document.getElementById("concepts-widgets"));

    /*
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'button';
    this.searchInput.value = 'Search';
    this.searchInput.addEventListener('click', (event) => {
      console.log('You entered: ' + this.queryInput.value);
      conceptsService.searchConcepts({query: this.queryInput.value})
          .then((concepts) => {
            console.log('concepts = ' + concepts);
          });
    });
    this.searchInput.disabled = true;

    const tbl = document.createElement('table');
    const tbody = tbl.createTBody();
    const queryInputRow = tbody.insertRow(0);
    const queryInputCell = queryInputRow.insertCell(0);
    queryInputCell.colSpan = 2;
    queryInputCell.appendChild(this.queryInput);

    const searchInputRow = tbody.insertRow(1);
    const searchInputCell = searchInputRow.insertCell(0);
    searchInputCell.appendChild(this.searchInput);

    this.node.appendChild(tbl);

    configObservable.subscribe((config) => {
      this.queryInput.disabled = false;
      this.searchInput.disabled = false;
      console.log('Workspace ID is now: ' + config.workspaceId);
    });
    */
  }
}
