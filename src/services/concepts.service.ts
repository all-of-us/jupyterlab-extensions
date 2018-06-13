import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';
import {
  Concept,
  ConceptsApi,
  SearchConceptsRequest
} from '../generated/api';

import Promise = require('bluebird');

export class ConceptsService {

  private conceptsApi = new ConceptsApi();
  private workspaceNamespace: string;
  private workspaceId: string;

  constructor(configObservable: Observable<AllOfUsConfig>) {
    configObservable.subscribe((config) => {
      this.conceptsApi.basePath = config.apiHost;
      this.workspaceNamespace = config.workspaceNamespace;
      this.workspaceId = config.workspaceId;
    });
  }

  public searchConcepts(request: SearchConceptsRequest)
      : Promise<Array<Concept>> {
    return this.conceptsApi.searchConcepts(this.workspaceNamespace,
        this.workspaceId, request)
        .then((res) => {
          return res.body.items;
        });
  }

}
