import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ArtistState} from '../artist.reducer';

const artistFeatureState = createFeatureSelector<ArtistState>('artist');

export const Default = createSelector(
    artistFeatureState,
    (state: ArtistState): any => null
)
