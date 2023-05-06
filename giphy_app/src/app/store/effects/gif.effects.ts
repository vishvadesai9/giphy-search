import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as GifActions from '../actions/gif.actions';
import { GiphyService } from '../../services/giphy.service';
import { Store } from '@ngrx/store';

@Injectable()
export class GifEffects {

  constructor(private actions$: Actions, private giphyService: GiphyService, private store: Store<any>) {}

  // Effect to handle the searchGifs action
  searchGifs$ = createEffect(() =>
    this.actions$.pipe(
      // Filter actions by type
      ofType(GifActions.searchGifs),
      // Combine the action with the latest value from the gifs state
      withLatestFrom(this.store.select('gifs')),
      // Merge the action and state into a single observable
      mergeMap(([action, { query, offset }]) =>
        // Call the searchGifs method on the GiphyService with the provided query and offset values
        this.giphyService.searchGifs(action.query, action.offset).pipe(
          // Map the response to a searchGifsSuccess action
          map((gifs) => GifActions.searchGifsSuccess({ gifs })),
          // Catch any errors and map them to a searchGifsFailure action
          catchError((error) => of(GifActions.searchGifsFailure({ error })))
        )
      )
    )
  );
}
