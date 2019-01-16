import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EditorNodeComponent } from './editor-node/editor-node.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigWindowSelectComponent } from './config-window-select/config-window-select.component';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatGridListModule, MatListModule, MatSidenavModule, MatInputModule } from '@angular/material';
import { ConfigWindowCombineComponent } from './config-window-combine/config-window-combine.component';
import { ConfigWindowGroupbyComponent } from './config-window-groupby/config-window-groupby.component';
import { ListColumnsSelectComponent } from './config-window-select/list-columns-select/list-columns-select.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { ListColumnsCombineComponent } from './config-window-combine/list-columns-combine/list-columns-combine.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorNodeComponent,
    ConfigWindowSelectComponent,
    ConfigWindowCombineComponent,
    ConfigWindowGroupbyComponent,
    ListColumnsSelectComponent,
    ListColumnsCombineComponent
  ],
  entryComponents: [ConfigWindowSelectComponent,ConfigWindowCombineComponent,ConfigWindowGroupbyComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatInputModule,
    HttpClientModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
