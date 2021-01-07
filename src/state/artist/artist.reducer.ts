import { createReducer, on } from "@ngrx/store";
import { ArtistActions } from "./actions";

export interface ArtistState {
}

const initialState: ArtistState = {
}

export const artistReducer = createReducer<ArtistState>(
    initialState,
    on(ArtistActions.Default, (state, action): ArtistState => {
        return {
            ...state,
        }
    }),
);
