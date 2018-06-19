import {Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';
import {Concept, ConceptsApi, SearchConceptsRequest} from '../generated/api';
import {AuthService} from './auth.service';

export class ConceptsService {

  private authService: AuthService;
  private apiHost: string;
  private workspaceNamespace: string;
  private workspaceId: string;

  constructor(authService: AuthService,
              configObservable: Observable<AllOfUsConfig>) {
    this.authService = authService;
    configObservable.subscribe((config) => {
      this.apiHost = config.apiHost;
      this.workspaceNamespace = config.workspaceNamespace;
      this.workspaceId = config.workspaceId;
    });
  }

  private conceptsApi(): ConceptsApi {
    return new ConceptsApi({ basePath: 'https://' + this.apiHost,
        accessToken: this.authService.currentAccessToken});
  }

  public searchConcepts(request: SearchConceptsRequest)
      : Promise<Array<Concept>> {
    return this.conceptsApi().searchConcepts(this.workspaceNamespace,
        this.workspaceId, request)
        .then((res) => {
          return res.items;
        });
  }

}
