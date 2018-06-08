import {Observable, Subject} from 'rxjs/Rx';

export class AllOfUsConfig {

  private config = new Subject<AllOfUsConfig>();
  public config$:Observable<AllOfUsConfig> = this.config.asObservable();

  private workspaceNamespace:string;
  private workspaceId:string;
  private apiHost:string;
  private cdrVersionBigqueryDataset:string;
  private cdrVersionCloudProject:string;
  private bucketName:string;

  public setJson(jsonString:string):void
  {
    let obj = JSON.parse(jsonString);
    this.workspaceNamespace = obj['WORKSPACE_NAMESPACE'];
    this.workspaceId = obj['WORKSPACE_ID'];
    this.apiHost = obj['API_HOST'];
    this.cdrVersionBigqueryDataset = obj['CDR_VERSION_BIGQUERY_DATASET'];
    this.cdrVersionCloudProject = obj['CDR_VERSION_CLOUD_PROJECT'];
    this.bucketName = obj['bucket_name'];
    this.config.next(this);
  }

  public getWorkspaceId(): string
  {
    return this.workspaceId;
  }

  public getWorkspaceNamespace(): string
  {
    return this.workspaceNamespace;
  }

  public getApiHost(): string
  {
    return this.apiHost;
  }

  public getCdrVersionBigqueryDataset(): string
  {
    return this.cdrVersionBigqueryDataset;
  }

  public getCdrVersionCloudProject(): string
  {
    return this.cdrVersionCloudProject;
  }

  public getBucketName(): string
  {
    return this.bucketName;
  }
}
