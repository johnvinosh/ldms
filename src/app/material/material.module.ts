import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

const MaterialComponents = [MatRippleModule];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
