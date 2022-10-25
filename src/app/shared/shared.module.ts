import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StatusPillComponent } from './components/status-pill/status-pill.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/header/nav/nav.component';


@NgModule({
  declarations: [
    HeaderComponent,
    StatusPillComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    StatusPillComponent
  ]
})
export class SharedModule { }
