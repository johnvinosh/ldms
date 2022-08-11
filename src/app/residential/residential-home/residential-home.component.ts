import { DataType } from 'src/app/enums/data-type';
import { AttributeManager } from './../interface/attribute-manager';
import { TableName } from 'src/app/enums/table-name';
import { LDMSGridService } from './../services/ldms-grid.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ColumnModel,
  ContextMenuItem,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  EditSettingsModel,
  FilterSettingsModel,
  GridComponent,
  PageSettingsModel,
  SelectionSettingsModel,
  ToolbarItem,
} from '@syncfusion/ej2-angular-grids';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-residential-home',
  templateUrl: './residential-home.component.html',
  styleUrls: ['./residential-home.component.scss'],
})
export class ResidentialHomeComponent implements OnInit, OnDestroy {
  @ViewChild('grid') public grid!: GridComponent;
  readonly TableName = TableName;

  public data: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public toolbar: ToolbarItem[];
  public contextMenuItems: ContextMenuItem[];
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
  public editSettings: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;

  // public tableDDList: { [key: string]: Object }[] = [
  //   { value: 'material', text: 'Material' },
  //   { value: 'energy_guide', text: 'Energy Guide' },
  // ];
  public tableDDList: string[] = ['material', 'energy_guide'];
  resiForm: FormGroup;

  public columns: ColumnModel[];

  private subs: SubSink;

  constructor(
    private ldmsGridService: LDMSGridService,
    private fb: FormBuilder
  ) {
    this.resiForm = this.fb.group({
      tableName: ['', Validators.required],
    });
    this.subs = new SubSink();
    this.data = ldmsGridService;
    this.pageSettings = { pageSizes: true, pageSize: 5, pageCount: 5 };
    this.filterSettings = { type: 'FilterBar' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
    };
    this.toolbar = [
      ToolbarItem.ColumnChooser,
      ToolbarItem.Search,
      ToolbarItem.ExcelExport,
      ToolbarItem.PdfExport,
      ToolbarItem.CsvExport,
      ToolbarItem.Print,
      ToolbarItem.Add,
      ToolbarItem.Edit,
      ToolbarItem.Update,
      ToolbarItem.Delete,
      ToolbarItem.Cancel,
    ];
    this.contextMenuItems = [
      'AutoFit',
      'AutoFitAll',
      'SortAscending',
      'SortDescending',
      'Copy',
      'Edit',
      'Delete',
      'Save',
      'Cancel',
      'PdfExport',
      'ExcelExport',
      'CsvExport',
      'FirstPage',
      'PrevPage',
      'LastPage',
      'NextPage',
    ];
    this.state = {
      skip: 0,
      take: this.pageSettings.pageSize,
    };
    this.selectionOptions = { type: 'Multiple' };
    this.columns = [];
  }

  ngOnInit(): void {}

  dataBound() {
    this.grid.autoFitColumns();
  }

  public dataStateChanged(state: DataStateChangeEventArgs): void {
    this.ldmsGridService.execute(state, this.resiForm.get('tableName')?.value);
  }

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state?.action === 'add') {
      this.ldmsGridService
        .add(state, this.resiForm.get('tableName')?.value)
        .subscribe(() => {
          if (state.endEdit) state.endEdit();
        });
    } else if (state?.action === 'edit') {
      this.ldmsGridService
        .update(state, this.resiForm.get('tableName')?.value)
        .subscribe(() => {
          if (state.endEdit) state.endEdit();
        });
    } else if (state?.requestType === 'delete') {
      this.ldmsGridService
        .delete(state, this.resiForm.get('tableName')?.value)
        .subscribe(() => {
          if (state.endEdit) state.endEdit();
        });
    }
  }

  getData(): void {
    this.getColumns().subscribe((res: any) => {
      if ((res?.result || []).length) {
        let atts: AttributeManager[] = res.result;

        atts = atts.sort((a, b) =>
          +a.displayOrder > +b.displayOrder ? 1 : -1
        );

        let cols: ColumnModel[] = atts.map((col: AttributeManager) => {
          let column: ColumnModel = {
            field: col.field,
            headerText: col.displayName,
            allowEditing: col.allowEditing,
            allowFiltering: col.allowFiltering,
            allowReordering: col.allowReordering,
            allowResizing: col.allowResizing,
            allowSearching: col.allowSearching,
            allowSorting: col.allowSorting,
            isPrimaryKey: col.primaryKey,
            visible: col.showByDefault,
            displayAsCheckBox: col.dataType === DataType.BOOLEAN,
            editType:
              col.dataType === DataType.BOOLEAN
                ? 'booleanedit'
                : col.dataType === DataType.DATE
                ? 'datepickeredit'
                : col.dataType === DataType.NUMBER
                ? 'numericedit'
                : 'stringedit',
            // format:
            //   col.dataType === DataType.DATE
            //     ? { type: 'dateTime', format: 'dd/MM/yyyy hh:mm a' }
            //     : undefined,
          };
          return column;
        });

        this.columns = [{ type: 'checkbox' }, ...cols];

        this.grid.autoFitColumns();
      }

      this.ldmsGridService.execute(
        this.state,
        this.resiForm.get('tableName')?.value
      );
    });
  }

  getColumns(): Observable<DataStateChangeEventArgs> {
    return this.ldmsGridService.getData(
      undefined,
      this.resiForm.get('tableName')?.value,
      true
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
