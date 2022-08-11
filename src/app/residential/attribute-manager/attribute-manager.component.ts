import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ContextMenuItem,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  EditSettingsModel,
  GridComponent,
  IEditCell,
  PageSettingsModel,
  SelectionSettingsModel,
  ToolbarItem,
} from '@syncfusion/ej2-angular-grids';
import { TableName } from 'src/app/enums/table-name';
import { LDMSGridService } from '../services/ldms-grid.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attribute-manager',
  templateUrl: './attribute-manager.component.html',
  styleUrls: ['./attribute-manager.component.scss'],
})
export class AttributeManagerComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  readonly TableName = TableName;

  public data: Observable<DataStateChangeEventArgs>;
  public editSettings: EditSettingsModel;
  public pageSettings: PageSettingsModel;
  public toolbar: ToolbarItem[];
  public contextMenuItems: ContextMenuItem[];

  public selectionOptions: SelectionSettingsModel;

  public state: DataStateChangeEventArgs;

  public attForm!: FormGroup;

  public displayOrderParams: IEditCell;
  public tableparams: IEditCell;

  constructor(
    private ldmsGridService: LDMSGridService,
    private fb: FormBuilder
  ) {
    this.data = ldmsGridService;
    this.pageSettings = {};
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      showDeleteConfirmDialog: true,
    };
    this.toolbar = [
      ToolbarItem.ColumnChooser,
      ToolbarItem.Search,
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
    ];

    this.selectionOptions = { type: 'Multiple' };

    this.state = {};

    this.displayOrderParams = {
      params: { decimals: 0, format: 'N', validateDecimalOnType: true },
    };

    this.tableparams = {
      params: {
        dataSource: [{ field: TableName.MATERIAL, display: 'Material' }],
        fields: { value: 'field', text: 'display' },
      },
    };
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.attForm = this.fb.group({
      tableName: [''],
    });
  }

  dataBound() {
    this.grid.autoFitColumns();
  }

  public dataStateChanged(state: DataStateChangeEventArgs): void {
    this.ldmsGridService.execute(
      state,
      this.attForm.get('tableName')?.value,
      true
    );
  }

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state?.action === 'add') {
      this.ldmsGridService
        .add(state, this.attForm.get('tableName')?.value, true)
        .subscribe(() => {
          if (state.endEdit) state.endEdit();
        });
    } else if (state?.action === 'edit') {
      this.ldmsGridService
        .update(state, this.attForm.get('tableName')?.value, true)
        .subscribe(() => {
          if (state.endEdit) state.endEdit();
        });
    } else if (state?.requestType === 'delete') {
      this.ldmsGridService
        .delete(state, this.attForm.get('tableName')?.value, true)
        .subscribe(() => {
          if (state.endEdit) state.endEdit();
        });
    }
  }

  getData() {
    this.ldmsGridService.execute(
      this.state,
      this.attForm.get('tableName')?.value,
      true
    );
  }
}
