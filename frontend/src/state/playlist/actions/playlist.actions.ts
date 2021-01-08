import {createAction, props} from '@ngrx/store';
import { Track } from 'src/app/models/track.model';

export const PopulateSelectedArtistSongs = createAction(
    '[Playlist] Populate Selected Artist Songs',
    // props<{backgroundSizeRatio: number}>()
)
export const PopulateSelectedArtistSongsSuccess = createAction(
    '[Playlist] Populate Selected Artist Songs Success',
    props<{tracks: Track[]}>()
)

export const PopulateSelectedArtistSongsFailed = createAction(
    '[Playlist] Populate Selected Artist Songs Failed',
    // props<{backgroundSizeRatio: number}>()
)