import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Artist, ArtistRobust } from '../models/artist.model';
import { Track } from '../models/track.model';
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

  public authorize():Observable<string>{
    let params = new HttpParams({fromObject: {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'client_credentials',
    }});
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded' ,
      }),
    };
    return this.http.post(this.token_url,params.toString(), httpOptions).pipe(
      map((res: any)=>res.access_token),
    )
  }

  public searchArtists(
    searchText: string, 
    accessToken: string, 
    type: string = 'artist', 
    limit: number = 5
  ): Observable<Artist[]> {
    const url = `https://api.spotify.com/v1/search?query=${searchText}&offset=0&limit=${limit}&type=${type}&market=US`;
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': accessToken}),
    };
    return this.http.get(url,httpOptions).pipe(
      map((res: any) => res.artists.items),
      map((artistsRobust: any[])=>{
        return artistsRobust.map((artistRobust) => ({
          id: artistRobust.id,
          name: artistRobust.name
        }))
      })
    );
  }

  public getArtist(
    artistId: string, 
    accessToken: string, 
  ): Observable<ArtistRobust> {
    const url = `https://api.spotify.com/v1/artists/${artistId}`
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': accessToken}),
    };
    return this.http.get(url,httpOptions).pipe(
      map((artist: any)=>{
        let artistRobust: ArtistRobust = {
          id: artist.id,
          name: artist.name,
          popularity: artist.popularity,
          followers: artist.followers.total,
          images: [...artist.images],
          genres: [...artist.genres],
        };
        return artistRobust;
      })
    );
  }
  
  public getTracksByArtist(
    artistId: string, 
    accessToken: string, 
  ): Observable<Track[]> {
    const url = `	https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': accessToken}),
    };
    return this.http.get(url,httpOptions).pipe(
      map((res: any) => res.tracks),
      map((tracks: any)=>{
        return tracks.map((t)=>({
          id: t.id,
          name: t.name,
          popularity: t.popularity,
          albumImages: [...t.album.images]
        }))
      }),
      catchError((err)=> {return err;})
    );
  }
}
