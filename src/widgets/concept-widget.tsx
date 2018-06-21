import {
  VDomModel, VDomRenderer
} from '@jupyterlab/apputils';

import * as React from 'react';

import {AllOfUsConfig} from '../config';
import {Concept} from '../generated';
import {ConceptsService} from '../services/concepts.service';

import {Observable} from 'rxjs/Rx';


export class ConceptsWidgetModel extends VDomModel {

  public initialized: boolean;
  public conceptsLoaded: boolean;
  public query: string;
  public concepts: Array<Concept>;

}

export class ConceptsWidgetRenderer extends VDomRenderer<ConceptsWidgetModel> {


  constructor(configObservable: Observable<AllOfUsConfig>,
              private conceptsService: ConceptsService) {
    super();

    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;
    configObservable.subscribe((config) => {
      this.model.initialized = true;
      this.model.stateChanged.emit(void 0);
      this.update();
    });
  }

  protected render(): React.ReactElement<any> {
    const handleQueryChange = (event) => {
      this.model.query = event.target.value;
    };

    const searchConcepts = () => {
      this.conceptsService.searchConcepts({query: this.model.query})
          .then((concepts) => {
            this.model.concepts = concepts;
            this.model.conceptsLoaded = true;
            this.update();
          });
    };

    return (
        <div>
          <input value={this.model.query} onChange={handleQueryChange}
                 disabled={this.model.initialized}/>
          <br/>
          <input value='Search' type='button' onClick={searchConcepts}
                 disabled={this.model.initialized && this.model.query !== ''}/>
          {this.conceptsTable()}
        </div>
    );
  }

  protected conceptsTable(): React.ReactElement<any> {
    if (!this.model.conceptsLoaded) {
      return null;
    }
    return (
        <table>
          {this.model.concepts.map(function(concept) {
            return (
                <tr>
                  <td>{concept.conceptId}</td>
                </tr>
            );
           })}
        </table>
    );
  }

}


