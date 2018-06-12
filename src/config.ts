export class AllOfUsConfig {

  public workspaceNamespace: string;
  public workspaceId: string;
  public apiHost: string;
  public cdrVersionBigqueryDataset: string;
  public cdrVersionCloudProject: string;
  public bucketName: string;

  public static fromJson(jsonString: string): AllOfUsConfig {
    const obj = JSON.parse(jsonString);
    const result = new AllOfUsConfig();
    result.workspaceNamespace = obj['WORKSPACE_NAMESPACE'];
    result.workspaceId = obj['WORKSPACE_ID'];
    result.apiHost = obj['API_HOST'];
    result.cdrVersionBigqueryDataset = obj['CDR_VERSION_BIGQUERY_DATASET'];
    result.cdrVersionCloudProject = obj['CDR_VERSION_CLOUD_PROJECT'];
    result.bucketName = obj['bucket_name'];
    return result;
  }
}
