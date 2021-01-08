import { createReducer, on } from "@ngrx/store";
import { Track } from "src/app/models/track.model";
import { PlaylistActions } from "./actions";

export interface PlaylistState {
    artistTracks: Track[];
}

const initialState: PlaylistState = {
    artistTracks: [],
}

export const playlistReducer = createReducer<PlaylistState>(
    initialState,
    on(PlaylistActions.PopulateSelectedArtistSongsSuccess, (state,action): PlaylistState => {
        return {
            ...state,
            artistTracks: action.tracks,
        }
    }),
);
