import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Artist, ArtistRobust } from "src/app/models/artist.model";
import { SpotifyApiService } from "src/app/services/spotify-api.service";
import { PlaylistActions } from "../playlist/actions";
import { ArtistActions } from "./actions";
import { ArtistState } from "./artist.reducer";
import { ArtistSelectors } from "./selectors";

@Injectable({
    providedIn: 'root'
})
export class ArtistEffects {
    constructor( 
        private actions$: Actions,
        public spotifyApiService: SpotifyApiService,
        private artistStore:  Store<ArtistState>
    ){ 
 
    }

    authorizeSpotify$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => this.spotifyApiService.authorize().pipe(
                map((token: string)=> ArtistActions.AuthorizeSuccessful({token: `Bearer ${token}`})),
                    catchError((err)=>of(ArtistActions.AuthorizeFailed({err})))
                )
            )
        )   
    });

    searchArtists$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ArtistActions.SearchArtist),
            withLatestFrom(this.artistStore.select(ArtistSelectors.GetAccessToken)),
            switchMap(([{searchText}, accessToken]: [any,string]) => 
                this.spotifyApiService.searchArtists(searchText,accessToken).pipe(
                    map((artists: Artist[])=> ArtistActions.SearchArtistSuccess({artists})),
                        catchError((err)=>of(ArtistActions.SearchArtistFailed({err})))
                    )
                )
            )   
    });

    searchArtist$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ArtistActions.SetSelectedArtist),
            withLatestFrom(this.artistStore.select(ArtistSelectors.GetAccessToken)),
            switchMap(([{artist}, accessToken]: [any,string]) => {
                return this.spotifyApiService.getArtist(artist.id,accessToken).pipe(
                    map((artist: ArtistRobust)=> ArtistActions.SetSelectedArtistSuccess({artist})),
                        catchError((err)=>of(ArtistActions.SetSelectedArtistFailed({err})))
                    )
            })
        );
    });

    populateSelectedArtistTracks$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ArtistActions.SetSelectedArtistSuccess),
            map(() => PlaylistActions.PopulateSelectedArtistTracks())
        );
    });

    getRelatedArtists$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ArtistActions.SetSelectedArtistSuccess),
            withLatestFrom(
                this.artistStore.select(ArtistSelectors.GetSelectedArtistId),
                this.artistStore.select(ArtistSelectors.GetAccessToken)
            ),
            switchMap(([_,artistId,accessToken])=>{
                return this.spotifyApiService.getRelatedArtists(artistId,accessToken).pipe(
                    map((relatedArtists: ArtistRobust[]) => ArtistActions.GetRelatedArtistsSuccess({relatedArtists}))
                )
            }),
            
        );
    });


    

};



