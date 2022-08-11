import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeManagerComponent } from './attribute-manager/attribute-manager.component';
import { ResidentialHomeComponent } from './residential-home/residential-home.component';
import { ResidentialComponent } from './residential.component';

const routes: Routes = [
  {
    path: '',
    component: ResidentialComponent,
    children: [
      {
        path: '',
        component: ResidentialHomeComponent,
      },
      {
        path: 'att-manager',
        component: AttributeManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentialRoutingModule {
  static components = [
    ResidentialComponent,
    ResidentialHomeComponent,
    AttributeManagerComponent,
  ];
}
