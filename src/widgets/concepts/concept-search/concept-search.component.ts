import {Component} from '@angular/core';

import * as htmlTemplate from 'html-loader!./concept-search.component.html';
import './concept-search.component.css';

import {AllOfUsConfig} from '../../../config';
import {ConceptsService} from '../../../generated/api/concepts.service';
import {Concept} from '../../../generated/model/concept';
import {AllOfUsConfigService} from '../../../services/config.service';

const template = '' + htmlTemplate;

@Component({
  selector: 'concept-search',
  template: template
})
export class ConceptSearchComponent {

  private config: AllOfUsConfig;
  enabled = false;
  conceptsTableVisible = false;
  conceptsLoading = false;
  concepts: Array<Concept>;
  query = '';

  constructor(private conceptsService: ConceptsService) {
    AllOfUsConfigService.configObservable.subscribe((config) => {
      this.config = config;
      this.enabled = true;
    });
  }

  searchConcepts(): void {
    this.conceptsTableVisible = true;
    this.conceptsLoading = true;
    const request = { 'query': this.query };
    this.conceptsService.searchConcepts(this.config.workspaceNamespace,
        this.config.workspaceId, request).subscribe((response) => {
          this.concepts = response.items;
          this.conceptsLoading = false;
    });
  }
}
