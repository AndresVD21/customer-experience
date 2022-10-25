import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StatusPillComponent } from './components/status-pill/status-pill.component';


@NgModule({
  declarations: [
    HeaderComponent,
    StatusPillComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    StatusPillComponent
  ]
})
export class SharedModule { }
