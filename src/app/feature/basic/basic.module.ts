import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { InitialComponent } from './components/initial/initial.component';
import { LevelOneComponent } from './components/level-one/level-one.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [InitialComponent, LevelOneComponent, HomePage],
  imports: [
    CommonModule,
    BasicRoutingModule,
    MatProgressSpinnerModule,
    FormsModule,
    IonicModule
  ],
  exports: [InitialComponent, LevelOneComponent, HomePage],
})
export class BasicModule { }
