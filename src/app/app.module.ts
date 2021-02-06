import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { HelpComponent } from './components/help/help.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        SidebarMenuComponent,
        HelpComponent,
        ReportsComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatExpansionModule,
        AgGridModule.withComponents([]),
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgxDaterangepickerMd.forRoot(),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() { }
}
