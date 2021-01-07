import { createFeatureSelector, createSelector } from "@ngrx/store"
import { PlaylistState} from '../Playlist.reducer';

const playlistFeatureState = createFeatureSelector<PlaylistState>('playlist');

export const Default = createSelector(
    playlistFeatureState,
    (state: PlaylistState): any => null
)
