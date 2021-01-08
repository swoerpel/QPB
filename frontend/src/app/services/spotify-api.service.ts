import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Artist, ArtistRobust } from '../models/artist.model';
import { Track } from '../models/track.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private token_url = 'https://accounts.spotify.com/api/token';
  private artist_base_url = 'https://api.spotify.com/v1/artists/'

  constructor(
    private http: HttpClient,
  ) { }

  public authorize():Observable<string>{
    let params = new HttpParams({fromObject: {
      client_id: environment.client_id,
      client_secret: environment.client_secret,
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
    const url = `${this.artist_base_url}${artistId}`
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
    const url = `${this.artist_base_url}${artistId}/top-tracks?market=US`
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
