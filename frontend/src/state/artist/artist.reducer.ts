import { createReducer, on } from "@ngrx/store";
import { Artist, ArtistRobust } from "src/app/models/artist.model";
import { ArtistActions } from "./actions";

export interface ArtistState {
    accessToken: string;
    autoCompleteArtists: Artist[];
    selectedArtist: ArtistRobust;
    error: any;
}

const initialState: ArtistState = {
    accessToken: '',
    autoCompleteArtists: [],
    selectedArtist: null,
    error: null,
}

export const artistReducer = createReducer<ArtistState>(
    initialState,
    on(ArtistActions.AuthorizeSuccessful, (state, action): ArtistState => {
        return {
            ...state,
            accessToken: action.token,
            error: null,
        }
    }),
    on(ArtistActions.AuthorizeFailed, (state, action): ArtistState => {
        return {
            ...state,
            error: action.err,
        }
    }),
    on(ArtistActions.SearchArtistSuccess, (state, action): ArtistState => {
        return {
            ...state,
            autoCompleteArtists: action.artists,
            error: null,
        }
    }),
    on(ArtistActions.SearchArtistFailed, (state, action): ArtistState => {
        return {
            ...state,
            autoCompleteArtists: [],
            error: action.err
        }
    }),
    on(ArtistActions.SetSelectedArtistSuccess, (state, action): ArtistState => {
        return {
            ...state,
            selectedArtist: action.artist,
            autoCompleteArtists: [],
            error: null,
        }
    }),
    on(ArtistActions.SetSelectedArtistFailed, (state, action): ArtistState => {
        return {
            ...state,
            error: action.err,
        }
    }),
);
