import {createAction, props} from '@ngrx/store';
import { Artist, ArtistRobust } from 'src/app/models/artist.model';

export const AuthorizeSuccessful = createAction(
    '[Spotify API] Authorize Successful',
    props<{token: string}>()
)

export const AuthorizeFailed = createAction(
    '[Spotify API] Authorize Failed',
    props<{err: any}>()
)

export const SearchArtist = createAction(
    '[Spotify API] Search Artist',
    props<{searchText: string}>()
)

export const SearchArtistSuccess = createAction(
    '[Spotify API] Search Artist Success',
    props<{artists: Artist[]}>()
)

export const SearchArtistFailed = createAction(
    '[Spotify API] Search Artist Failed',
    props<{err: any}>()
)

export const SetSelectedArtist = createAction(
    '[Spotify API] Set Selected Artist',
    props<{artist: Artist}>()
)
export const SetSelectedArtistSuccess = createAction(
    '[Spotify API] Set Selected Artist Success',
    props<{artist: ArtistRobust}>()
)
export const SetSelectedArtistFailed = createAction(
    '[Spotify API] Set Selected Artist Failed',
    props<{err: any}>()
)

export const GetRelatedArtists = createAction(
    '[Spotify API] Get Related Artists',
)
export const GetRelatedArtistsSuccess = createAction(
    '[Spotify API] Get Related Artists Success',
    props<{relatedArtists: ArtistRobust[]}>()
)
export const GetRelatedArtistsFailed = createAction(
    '[Spotify API] Get Related Artists Failed',
    props<{err: any}>()
)

