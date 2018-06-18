import {Observable, Subject} from 'rxjs/Rx';
import {AllOfUsConfig} from '../config';

export class AllOfUsConfigService {

  public static configSubject = new Subject<AllOfUsConfig>();
  public static configObservable: Observable<AllOfUsConfig> =
      AllOfUsConfigService.configSubject.asObservable();
}
