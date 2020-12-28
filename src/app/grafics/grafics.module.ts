import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { CircularComponent } from './circular/circular.component';



@NgModule({
  declarations: [ CircularComponent ],
  exports: [
    CircularComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ]
})
export class GraficsModule { }
