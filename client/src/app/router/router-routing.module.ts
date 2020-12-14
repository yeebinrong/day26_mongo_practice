import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { DetailComponent } from '../components/detail.component';
import { MainComponent } from '../components/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path:'country/:country', component: DetailComponent},
  {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
