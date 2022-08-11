import { DataType } from 'src/app/enums/data-type';

export interface AttributeManager {
  id: number;
  tableName: string;
  columnName: string;
  allowEditing: boolean;
  allowFiltering: boolean;
  allowReordering: boolean;
  allowResizing: boolean;
  allowSearching: boolean;
  allowSorting: boolean;
  allowDataType: boolean;
  dataType: DataType;
  field: string;
  displayName: string;
  displayOrder: number;
  primaryKey: boolean;
  showByDefault: boolean;
}
