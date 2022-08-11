import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentialRoutingModule } from './residential-routing.module';

@NgModule({
  declarations: [ResidentialRoutingModule.components],
  imports: [CommonModule, ResidentialRoutingModule, SharedModule],
})
export class ResidentialModule {}
