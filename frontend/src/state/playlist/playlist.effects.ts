import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Track } from "src/app/models/track.model";
import { SpotifyApiService } from "src/app/services/spotify-api.service";
import { ArtistActions } from "../artist/actions";
import { ArtistState } from "../artist/artist.reducer";
import { ArtistSelectors } from "../artist/selectors";
import { PlaylistActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class PlaylistEffects {
    constructor( 
        private actions$: Actions,
        public spotifyApiService: SpotifyApiService,
        private artistStore:  Store<ArtistState>,
    ){ 
 
    }

    populateSelectedArtistSongs$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(PlaylistActions.PopulateSelectedArtistSongs),
            withLatestFrom(
                this.artistStore.select(ArtistSelectors.GetAccessToken),
                this.artistStore.select(ArtistSelectors.GetSelectedArtistId),
            ),
            switchMap(([_,accessToken,artistId]) => {
                // return of(null);
                return this.spotifyApiService.getTracksByArtist(artistId,accessToken).pipe(
                    map((tracks: Track[]) => PlaylistActions.PopulateSelectedArtistSongsSuccess({tracks})),
                )
            })  
        )   
    });

};



