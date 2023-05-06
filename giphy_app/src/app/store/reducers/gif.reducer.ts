import { createReducer, on } from '@ngrx/store';
import { searchGifs, searchGifsSuccess, searchGifsFailure } from '../actions/gif.actions';

// Interface for the GifState
export interface GifState {
  gifs: any[];
  loading: boolean;
  error: any;
  offset: number,
  searchResults: any[]
}

// Initial state for the GifState
export const initialState: GifState = {
  gifs: [],
  loading: false,
  error: null,
  offset: 0,
  searchResults: []
};

// Reducer function for the GifState
export const gifReducer = createReducer(
  initialState,
  // Handle the searchGifs action
  on(searchGifs, (state, { query, offset, replace }) => ({
    ...state,
    loading: true,
    gifs: replace ? [] : state.gifs,
    offset: replace ? 0 : offset
  })),
  // Handle the searchGifsSuccess action
  on(searchGifsSuccess, (state, { gifs }) => ({
    ...state,
    gifs: [...state.gifs, ...gifs],
    loading: false
  })),
  // Handle the searchGifsFailure action
  on(searchGifsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
