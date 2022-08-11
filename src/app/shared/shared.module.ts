import { MaterialModule } from './../material/material.module';
import { SyncfusionModule } from './../syncfusion/syncfusion.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  CommonModule,
  MaterialModule,
  SyncfusionModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
  declarations: [],
})
export class SharedModule {}
