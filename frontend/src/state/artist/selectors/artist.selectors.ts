import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Artist, ArtistRobust } from "src/app/models/artist.model";
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

export const GetSelectedArtist = createSelector(
    artistFeatureState,
    (state: ArtistState): ArtistRobust => state?.selectedArtist
)
export const GetSelectedArtistId = createSelector(
    artistFeatureState,
    (state: ArtistState): string => state?.selectedArtist?.id
)

export const GetRelatedArtists = createSelector(
    artistFeatureState,
    (state: ArtistState): ArtistRobust[] => state?.relatedArtists.filter((_,i)=> i < 4)
)
