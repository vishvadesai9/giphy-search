import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { gifReducer } from './reducers/gif.reducer';
import { GifEffects } from './effects/gif.effects';

// Array of imports for the NgRx store
export const StoreImports = [
  // Register the gifReducer with the store
  StoreModule.forRoot({ gifs: gifReducer }),
  // Register the GifEffects with the store
  EffectsModule.forRoot([GifEffects]),
  // Enable the StoreDevtools for debugging
  StoreDevtoolsModule.instrument(),
];
