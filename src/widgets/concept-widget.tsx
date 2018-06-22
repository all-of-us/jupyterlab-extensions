import {
  VDomModel, VDomRenderer
} from '@jupyterlab/apputils';
import {INotebookTracker} from '@jupyterlab/notebook';

import * as React from 'react';

import {AllOfUsConfig} from '../config';
import {Concept} from '../generated';
import {ConceptsService} from '../services/concepts.service';

import {Observable} from 'rxjs/Rx';

export enum LoadingStatus {
  UNSET,
  LOADING,
  LOADED
}

export class ConceptsWidgetModel extends VDomModel {

  public initialized: boolean;
  public loadingStatus = LoadingStatus.UNSET;
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
      this.model.loadingStatus = LoadingStatus.LOADING;
      this.update();
      this.conceptsService.searchConcepts({query: this.model.query})
          .then((concepts) => {
            this.model.concepts = concepts;
            this.model.loadingStatus = LoadingStatus.LOADED;
            this.update();
          });
    };
    return (
        <div>
          <input value={this.model.query} onChange={handleQueryChange}
                 disabled={!this.model.initialized}/>
          <br/>
          <input value='Search' type='button' onClick={searchConcepts}
                 disabled={!this.model.initialized || !this.model.query}/>
          <br/>
          {this.loadingImage()}
          {this.conceptsTable()}
        </div>
    );
  }

  protected loadingImage(): React.ReactElement<any> {
    if (this.model.loadingStatus !== LoadingStatus.LOADING) {
      return null;
    }
    // Three divs inside the inner div makes three balls in the spinner.
    // See: https://github.com/ConnorAtherton/loaders.css
    return (
        <div className='loaderWrapper'>
          <div className='loader-inner ball-pulse'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
    );
  }

  protected conceptsTable(): React.ReactElement<any> {
    if (this.model.loadingStatus !== LoadingStatus.LOADED) {
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
              <th className='stringField'>Name</th>
              <th className='stringField'>Code</th>
              <th className='stringField'>Domain</th>
              <th className='stringField'>Vocabulary</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
          {this.model.concepts.map((concept) => {
            return (
                <tr key={concept.conceptId} onClick={() => selectRow(concept)}
                    className={selectedConceptId === concept.conceptId ? 'selected' : ''}>
                  <td>{concept.conceptId}</td>
                  <td className='stringField'>{concept.conceptName}</td>
                  <td className='stringField'>{concept.conceptCode}</td>
                  <td className='stringField'>{concept.domainId}</td>
                  <td className='stringField'>{concept.vocabularyId}</td>
                  <td>{concept.countValue}</td>
                </tr>
            );
           })}
          </tbody>
        </table>
        <input value='Generate code' type='button' onClick={generateCode}
               disabled={!selectedConceptId}/>
      </div>
    );
  }
}
