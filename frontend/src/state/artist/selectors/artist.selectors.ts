import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Artist } from "src/app/models/artist.model";
import { ArtistState} from '../artist.reducer';

const artistFeatureState = createFeatureSelector<ArtistState>('artist');

export const GetAccessToken = createSelector(
    artistFeatureState,
    (state: ArtistState): any => state?.accessToken
)

export const GetAutoCompleteArtists = createSelector(
    artistFeatureState,
    (state: ArtistState): Artist[] => state?.autoCompleteArtists
)
