import { NgModule }      from '@angular/core';

import {
  ONTIMIZE_MODULES,
  ONTIMIZE_DIRECTIVES,
  ontimizeProviders } from 'ontimize-web-ng2/ontimize';

import { OChartModule } from 'ontimize-web-ng2-charts/o-chart';

import { CONFIG } from './app.config';
import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { APP_DIRECTIVES } from './app.directives';
import { NavigationBarService, CustomOntimizeService } from './shared';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

// Standard providers...
let standardProviders = ontimizeProviders({
  'config': CONFIG
});
// Defining custom providers (if needed)...
let customProviders = [
  NavigationBarService,
  CustomOntimizeService
];

@NgModule({
  imports: [ ONTIMIZE_MODULES, routing, OChartModule, HighlightJsModule],
  declarations: [
    AppComponent,
    ONTIMIZE_DIRECTIVES,
    ...APP_DIRECTIVES
  ],
  bootstrap: [ AppComponent ],
  providers: [
    ...standardProviders,
    HighlightJsService,
    ...customProviders
  ]
})
export class AppModule { }

