import { createAction, props } from '@ngrx/store';

// Action to search for gifs using the provided query and offset values
export const searchGifs = createAction(
  '[Gif] Search Gifs',
  props<{ query: string; offset: number, replace: boolean }>()
);

// Action to handle a successful search for gifs
export const searchGifsSuccess = createAction(
  '[Gif] Search Gifs Success',
  props<{ gifs: any[] }>()
);

// Action to handle a failed search for gifs
export const searchGifsFailure = createAction(
  '[Gif] Search Gifs Failure',
  props<{ error: any }>()
);
