import { NgModule } from '@angular/core';
import {
  ColumnChooserService,
  ColumnMenuService,
  ContextMenuService,
  EditService,
  ExcelExportService,
  FilterService,
  GridModule,
  PageService,
  PdfExportService,
  ReorderService,
  ResizeService,
  RowDDService,
  SortService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

const SyncfusionComponents = [GridModule, DropDownListModule, ButtonModule];

@NgModule({
  imports: [SyncfusionComponents],
  exports: [SyncfusionComponents],
  providers: [
    PageService,
    SortService,
    FilterService,
    ColumnChooserService,
    ReorderService,
    ToolbarService,
    ContextMenuService,
    ResizeService,
    ColumnMenuService,
    RowDDService,
    ExcelExportService,
    PdfExportService,
    EditService,
  ],
})
export class SyncfusionModule {}
