import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private coordsMap:Map<number,[number,number]> = new Map();
  constructor(private http: HttpClient) {
      this.http.get<Map<number,[number,number]>>('layout.json').subscribe(data =>{this.coordsMap=data;});
    }

  getData(): Observable<any> {
    return this.http.get<any>('elements.json').pipe(delay(2000));
  }
  getCoords(pos:number):[number,number]{
    const rval = this.coordsMap.get(pos);
    if(rval)
      return rval;
    else return [-1,-1];
  }
}
