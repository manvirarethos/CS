import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModalComponent } from './alert/shared-modal.component';

import { SearchPipe } from './search/search.pipe';
import { HighlightSearch } from './highlight/highlight.pipe';

@NgModule({
  declarations: [SidebarComponent, SharedModalComponent, SearchPipe, HighlightSearch

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([])

  ],
  providers: [],
  exports: [SharedModalComponent, SidebarComponent, SearchPipe, HighlightSearch]
})
export class SharedModule { }
