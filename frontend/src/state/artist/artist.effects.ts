import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Artist } from "src/app/models/artist.model";
import { SpotifyApiService } from "src/app/services/spotify-api.service";
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

    searchArtist$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ArtistActions.SearchArtist),
            withLatestFrom(this.artistStore.select(ArtistSelectors.GetAccessToken)),
            switchMap(([{searchText}, accessToken]: [any,string]) => 
                this.spotifyApiService.searchArtist(searchText,accessToken).pipe(
                    map((artists: Artist[])=> ArtistActions.SearchArtistSuccess({artists})),
                        catchError((err)=>of(ArtistActions.SearchArtistFailed({err})))
                    )
                )
            )   
    });

};



