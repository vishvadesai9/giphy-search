import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifViewComponent } from './gif-view/gif-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/giphy-view' },
  { path: 'giphy-view', component: GifViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
