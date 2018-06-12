export class AllOfUsConfig {

  public workspaceNamespace: string;
  public workspaceId: string;
  public apiHost: string;
  public cdrVersionBigqueryDataset: string;
  public cdrVersionCloudProject: string;
  public bucketName: string;

  public setJson(jsonString: string): void {
    const obj = JSON.parse(jsonString);
    this.workspaceNamespace = obj['WORKSPACE_NAMESPACE'];
    this.workspaceId = obj['WORKSPACE_ID'];
    this.apiHost = obj['API_HOST'];
    this.cdrVersionBigqueryDataset = obj['CDR_VERSION_BIGQUERY_DATASET'];
    this.cdrVersionCloudProject = obj['CDR_VERSION_CLOUD_PROJECT'];
    this.bucketName = obj['bucket_name'];
  }
}
