import { createReducer, on } from "@ngrx/store";
import { PlaylistActions } from "./actions";

export interface PlaylistState {
}

const initialState: PlaylistState = {
}

export const playlistReducer = createReducer<PlaylistState>(
    initialState,
    on(PlaylistActions.Default, (state, action): PlaylistState => {
        return {
            ...state,
        }
    }),
);
