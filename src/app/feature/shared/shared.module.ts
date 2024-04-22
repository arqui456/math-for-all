import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Material
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [IonicModule, FormsModule, HttpClientModule, MatProgressSpinnerModule]
})
export class SharedModule { }
