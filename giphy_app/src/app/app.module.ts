import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreImports } from './store';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { GifViewComponent } from './gif-view/gif-view.component';

@NgModule({
  declarations: [AppComponent, GifViewComponent],
  imports: [BrowserModule, HttpClientModule, StoreImports, InfiniteScrollModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}