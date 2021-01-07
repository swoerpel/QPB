import { Injectable } from "@angular/core";
import { Actions, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArtistEffects {
    constructor( 
        private actions$: Actions,
    ){ 
 
    }

    // defaultEffect$ = createEffect((): any => {
        // return this.actions$.pipe(
        //     ofType(ExplicitMapActions.UpdateSelectedMapBySearch),
        //     switchMap(({address,lat,lng}) => [
        //         ExplicitMapActions.SetSelectedMapLocation({
        //             location: {
        //                 lat,
        //                 lng,
        //                 bounds: null,
        //                 zoom: DEFAULT_MAP_ZOOM,
        //             }
        //         }),
        //         ExplicitMapActions.SetSelectedMapTitleText({
        //             titleText: address,
        //         }),
        //     ])
        // )   
    // });

};



