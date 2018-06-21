declare const gapi: any;

export class AuthService {

  public loadGapi(): void {
    // Get the gapi script from Google.
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/platform.js';
    gapiScript.type = 'text/javascript';
    gapiScript.onload = () => {
      // Load the specific client libraries we need.
      this.loadAuth2();
    };
    document.head.appendChild(gapiScript);
  }

  public signIn(): void {
    gapi.auth2.getAuthInstance().signIn({'prompt': 'select_account'});
  }

  private loadAuth2(): void {
    gapi.load('auth2', () => {
      const accessToken = this.currentAccessToken;
      if (!accessToken) {
        // TODO: don't hardcode the client ID, domain; get these from the config
        gapi.auth2.init({
          client_id: '602460048110-5uk3vds3igc9qo0luevroc2uc3okgbkt.apps.googleusercontent.com',
          hosted_domain: 'fake-research-aou.org',
          scope: 'https://www.googleapis.com/auth/plus.login openid profile'
        }).then(() => {
          if (!this.currentAccessToken) {
            this.signIn();
          }
        });
      }
    });
  }

  public get currentAccessToken() {
    if (!gapi.auth2 || !gapi.auth2.getAuthInstance()) {
      return null;
    }
    const authResponse = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true);
    if (authResponse !== null) {
      return authResponse.access_token;
    }
    return null;
  }
}
