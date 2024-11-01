import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {  }

  getData(): Observable<any> {
    return this.http.get<any>('elements.json').pipe(delay(2000));
  }
  
}
