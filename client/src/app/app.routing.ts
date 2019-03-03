import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PumpingsComponent } from './components/pumpings/pumpings.component'

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: PumpingsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }