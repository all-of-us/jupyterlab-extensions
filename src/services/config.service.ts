import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';

export class AllOfUsConfigService {

  public static configSubject = new BehaviorSubject<AllOfUsConfig>(null);
  public static configObservable: Observable<AllOfUsConfig> =
      AllOfUsConfigService.configSubject.asObservable();
}
