import { TableName } from 'src/app/enums/table-name';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-residential-home',
  templateUrl: './residential-home.component.html',
  styleUrls: ['./residential-home.component.scss'],
})
export class ResidentialHomeComponent implements OnInit, OnDestroy {
  readonly TableName = TableName;

  // public tableDDList: { [key: string]: Object }[] = [
  //   { value: 'material', text: 'Material' },
  //   { value: 'energy_guide', text: 'Energy Guide' },
  // ];
  public tableDDList: string[] = ['material', 'energy_guide'];
  resiForm: FormGroup;

  private subs: SubSink;

  constructor(private fb: FormBuilder) {
    this.resiForm = this.fb.group({
      tableName: ['', Validators.required],
    });
    this.subs = new SubSink();
  }

  ngOnInit(): void {}

  getData(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
