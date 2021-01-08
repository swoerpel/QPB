import {createAction, props} from '@ngrx/store';
import { Artist } from 'src/app/models/artist.model';

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

