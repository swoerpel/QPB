import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private authURL: string = 'https://accounts.spotify.com/authorize';

  private baseURL: string = 'https://api.spotify.com';

  private client_id = 'b19a7584004e4484bd36d5d7aca9eae5';
  private client_secret = 'aa565a5a7faa47ba8f111ff21fd7ea39';

  private redirect_uri = 'http://localhost:4200/'

  private token_url = 'https://accounts.spotify.com/api/token';

  private searchUrl: string;// = 'https://api.spotify.com/v1/search';
  constructor(
    private http: HttpClient,
  ) { }

  public authorize(){
    let str = 'ratatat'
    let type = 'artist';
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    let rawParams = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'client_credentials',
    }
    let params = new HttpParams({fromObject: rawParams});
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded' ,
      }),
    };
    this.http.post(this.token_url,params.toString(), httpOptions).pipe(
      first(),
      switchMap((res: any) => {
        console.log("res.token",res)
        let httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${res.access_token}`}),
        };
        return this.http.get(this.searchUrl,httpOptions);
      }),
      tap(console.log),
      catchError(err=>{console.log("err",err);return EMPTY})
    ).subscribe()


    // let params = new HttpParams({
    //   // client_id: this.client_id,
    //   response_type: 'code',
    //   redirect_uri: 'localhost:4200/'
    // })
    // Access-Control-Allow-Origin:*
    // Access-Control-Allow-Methods: 'HEAD, GET, POST, PUT, PATCH, DELETE'
    // Access-Control-Allow-Headers: 'Origin, Content-Type, X-Auth-Token';
    // let params = new HttpParams();
    // params = params.append('client_id', this.client_id);
    // params = params.append('response_type','code');
    // params = params.append('redirect_uri', this.redirect_uri);
    // let headers = new HttpHeaders()
    // headers.set('Access-Control-Allow-Origin','*');
    // headers.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    // headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    // this.http.get(this.authURL,{headers}).pipe(
    //   first(),
    //   tap((res)=> console.log("res")),
    //   catchError(err => {
    //     console.log("err",err)
    //     return EMPTY
    //   })
    // ).subscribe();
  }
}
