import {Component} from '@angular/core';

import * as htmlTemplate from 'html-loader!./concept-search.component.html';
import './concept-search.component.css';

import {AllOfUsConfig} from '../../../config';
import {AllOfUsConfigService} from '../../../services/config.service';

const template = '' + htmlTemplate;

@Component({
  selector: 'concept-search',
  template: template
})
export class ConceptSearchComponent {

  private config: AllOfUsConfig;
  enabled = false;
  query = '';

  constructor() {
    AllOfUsConfigService.configObservable.subscribe((config) => {
      this.config = config;
      this.enabled = true;
    });

  }

  searchConcepts(): void {
    console.log('Search for: ' + this.query + ', ws = ' + this.config.workspaceId);
  }
}
