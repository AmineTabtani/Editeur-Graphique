// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ConfigDataFiles } from './config.data';
// import { Graph } from './graph';
 
// @Injectable({
//   providedIn: 'root'
// })
// export class ConfigDataService {
 
//   constructor(private http: HttpClient) { }
 
//   public getDataServer(): Observable<ConfigDataFiles[]>
//   {
//     const url = 'http://localhost:8080/api/v1/transformation';
 
//     return this.http.get<ConfigDataFiles[]>(url);
//   }

//   /** POST: add a new hero to the database */
//   //  sendRoot (graph: Graph): Observable<Graph> {
//   // return this.http.post<Graph>('http://localhost:8080/api/v1/transformation', graph, httpOptions)
//   //   .pipe(
//   //     catchError(this.handleError('addHero', hero))
//   //   );
//   // }
// }