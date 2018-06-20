import {
  Widget
} from '@phosphor/widgets';

import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';
import {Concept} from '../generated';
import {ConceptsService} from '../services/concepts.service';

export class ConceptsWidget extends Widget {

  private queryInput: HTMLInputElement;
  private searchInput: HTMLInputElement;
  private conceptsDiv: HTMLDivElement;
  private conceptsTable: HTMLTableElement;
  private conceptsTBody: HTMLTableSectionElement;
  private loadingImage: HTMLImageElement;

  constructor(configObservable: Observable<AllOfUsConfig>,
              conceptsService: ConceptsService) {
    super();
    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;

    this.queryInput = document.createElement('input');
    this.queryInput.type = 'text';
    this.queryInput.maxLength = 80;
    this.queryInput.size = 80;
    this.queryInput.disabled = true;

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'button';
    this.searchInput.value = 'Search';
    this.searchInput.addEventListener('click', (event) => {
      console.log('You entered: ' + this.queryInput.value);
      this.conceptsDiv.style.display = 'none';
      this.loadingImage.style.display = 'block';
      conceptsService.searchConcepts({query: this.queryInput.value})
          .then((concepts) => {
            this.displayConceptsTable(concepts);
          });
    });
    this.searchInput.disabled = true;

    const tbl = document.createElement('table');
    const tbody = tbl.createTBody();
    const queryInputRow = tbody.insertRow();
    const queryInputCell = queryInputRow.insertCell();
    queryInputCell.colSpan = 2;
    queryInputCell.appendChild(this.queryInput);

    const searchInputRow = tbody.insertRow();
    const searchInputCell = searchInputRow.insertCell();
    searchInputCell.appendChild(this.searchInput);

    this.conceptsDiv = document.createElement('div');
    this.conceptsTable = document.createElement('table');
    this.conceptsDiv.appendChild(this.conceptsTable);
    this.conceptsDiv.style.display = 'none';
    const conceptsHeaders = this.conceptsTable.createTHead();
    const headerRow = conceptsHeaders.insertRow(0);
    headerRow.insertCell().textContent = 'ID';
    headerRow.insertCell().textContent = 'Name';
    headerRow.insertCell().textContent = 'Code';
    headerRow.insertCell().textContent = 'Domain';
    headerRow.insertCell().textContent = 'Vocabulary';
    headerRow.insertCell().textContent = 'Count';
    this.conceptsTBody = this.conceptsTable.createTBody();

    this.loadingImage = document.createElement('img');
    this.loadingImage.src = 'https://vignette.wikia.nocookie.net/'
      + 'epicrapbattlesofhistory/images/c/c2/Peanut-butter-jelly-time.gif'
      + '/revision/latest?cb=20141129150614';
    this.loadingImage.style.display = 'none';

    this.node.appendChild(tbl);
    this.node.appendChild(this.conceptsDiv);
    this.node.appendChild(this.loadingImage);

    configObservable.subscribe((config) => {
      this.queryInput.disabled = false;
      this.searchInput.disabled = false;
      console.log('Workspace ID is now: ' + config.workspaceId);
    });
  }

  private displayConceptsTable(concepts: Array<Concept>): void {

    const newTBody = document.createElement('tbody');
    for (const concept of concepts) {
      const row = newTBody.insertRow();
      row.insertCell().textContent = String(concept.conceptId);
      row.insertCell().textContent = concept.conceptName;
      row.insertCell().textContent = concept.conceptCode;
      row.insertCell().textContent = concept.domainId;
      row.insertCell().textContent = concept.vocabularyId;
      row.insertCell().textContent = String(concept.countValue);
    }
    this.conceptsTable.replaceChild(newTBody, this.conceptsTBody);
    this.conceptsTBody = newTBody;
    this.loadingImage.style.display = 'none';
    this.conceptsDiv.style.display = 'block';
  }
}
