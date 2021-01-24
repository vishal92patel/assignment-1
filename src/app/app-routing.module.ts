import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'help',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'help',
                component: HelpComponent
            },
            {
                path: 'reports',
                component: ReportsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
