import {
  VDomModel, VDomRenderer
} from '@jupyterlab/apputils';
import {INotebookTracker} from '@jupyterlab/notebook';

import * as React from 'react';

import {AllOfUsConfig} from '../config';
import {Concept} from '../generated';
import {ConceptsService} from '../services/concepts.service';

import {Observable} from 'rxjs/Rx';

export class ConceptsWidgetModel extends VDomModel {

  public initialized: boolean;
  public conceptsLoaded: boolean;
  public conceptsLoading: boolean;
  public query = '';
  public concepts: Array<Concept>;
  public selectedConcept: Concept;

}

export class ConceptsWidgetRenderer extends VDomRenderer<ConceptsWidgetModel> {


  constructor(configObservable: Observable<AllOfUsConfig>,
              private conceptsService: ConceptsService,
              private notebooks: INotebookTracker) {
    super();

    this.id = 'allofus-concepts';
    this.title.label = 'Concepts';
    this.title.closable = true;
    configObservable.subscribe((config) => {
      if (!this.model.initialized) {
        this.model.initialized = true;
        this.update();
      }
    });
  }

  protected render(): React.ReactElement<any> {
    const handleQueryChange = (event) => {
      this.model.query = event.target.value;
      this.update();
    };

    const searchConcepts = () => {
      this.model.conceptsLoading = true;
      this.update();
      this.conceptsService.searchConcepts({query: this.model.query})
          .then((concepts) => {
            this.model.conceptsLoading = false;
            this.model.concepts = concepts;
            this.model.conceptsLoaded = true;
            this.update();
          });
    };
    return (
        <div>
          <input value={this.model.query} onChange={handleQueryChange}
                 disabled={!this.model.initialized}/>
          <br/>
          <input value='Search' type='button' onClick={searchConcepts}
                 disabled={!this.model.initialized || this.model.query == null
                     || this.model.query === ''}/>
          <br/>
          {this.loadingImage()}
          {this.conceptsTable()}
        </div>
    );
  }

  protected loadingImage(): React.ReactElement<any> {
    if (!this.model.conceptsLoading) {
      return null;
    }
    const img_src = 'https://vignette.wikia.nocookie.net/epicrapbattlesofhistory/'
      + 'images/c/c2/Peanut-butter-jelly-time.gif/revision/latest?cb=20141129150614';
    return (
        <img src={img_src}/>
    );
  }

  protected conceptsTable(): React.ReactElement<any> {
    if (!this.model.conceptsLoaded) {
      return null;
    }
    const selectRow = (concept) => {
      this.model.selectedConcept = concept;
      this.update();
    };

    const generateCode = () => {
      const model = this.notebooks.currentWidget.model;
      const cell = model.contentFactory.createCodeCell({});
      cell.value.text = '# Code for ' +
          this.model.selectedConcept.conceptName + ' goes here';
      model.cells.push(cell);
    };
    const selectedConceptId =
        (this.model.selectedConcept == null ? null : this.model.selectedConcept.conceptId);
    return (
      <div>
        <table className='conceptsTable'>
          <thead>
            <tr>
              <th>ID</th>
              <th style={{textAlign: 'left'}}>Name</th>
              <th style={{textAlign: 'left'}}>Code</th>
              <th style={{textAlign: 'left'}}>Domain</th>
              <th style={{textAlign: 'left'}}>Vocabulary</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
          {this.model.concepts.map(function(concept) {
            return (
                <tr key={concept.conceptId} onClick={() =>
                    selectRow(concept)}
                    className={selectedConceptId === concept.conceptId ? 'selected' : ''}>
                  <td>{concept.conceptId}</td>
                  <td style={{textAlign: 'left'}}>{concept.conceptName}</td>
                  <td style={{textAlign: 'left'}}>{concept.conceptCode}</td>
                  <td style={{textAlign: 'left'}}>{concept.domainId}</td>
                  <td style={{textAlign: 'left'}}>{concept.vocabularyId}</td>
                  <td style={{textAlign: 'left'}}>{concept.countValue}</td>
                </tr>
            );
           })}
          </tbody>
        </table>
        <input value='Generate code' type='button' onClick={generateCode}
               disabled={selectedConceptId == null}/>
      </div>
    );
  }

}


