import {createAction, props} from '@ngrx/store';
import { Track } from 'src/app/models/track.model';

export const PopulateSelectedArtistTracks = createAction(
    '[Playlist] Populate Selected Artist Tracks',
    // props<{backgroundSizeRatio: number}>()
)
export const PopulateSelectedArtistTracksSuccess = createAction(
    '[Playlist] Populate Selected Artist Tracks Success',
    props<{tracks: any[]}>()
)

export const PopulateSelectedArtistTracksFailed = createAction(
    '[Playlist] Populate Selected Artist Tracks Failed',
    // props<{backgroundSizeRatio: number}>()
)