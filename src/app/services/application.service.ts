import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root' 
})
export class ApplicationService {

  constructor(private electronService: ElectronService) { }

  addItem(item: any): Observable<any> {
    return of(
      this.electronService.ipcRenderer.sendSync('save-data', item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }



  addItemById(item: any,value:any): Observable<any> {

const val={'item':item,'value':value}
    console.log('save-data-Id   >>   ', item,value)
    return of(
      this.electronService.ipcRenderer.sendSync('save-data-Id', val)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }
  getItem(): Observable<any> {
    return of(
      this.electronService.ipcRenderer.sendSync('get-items')).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }
  getItemById(item:any): Observable<any> {

    console.log("item   >    "+item)

    console.log('save-data-Id   >>   ', item )
    return of(this.electronService.ipcRenderer.sendSync('get-items-Id',item)).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }
  getVersion(): Observable<any> {
    return of(
      this.electronService.ipcRenderer.sendSync('app_version')).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }
}