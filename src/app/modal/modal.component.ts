import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from '../chart';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() chart: Chart;

  @Output() save: EventEmitter<Chart> = new EventEmitter<Chart>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      0: this.chart.data[0].value,
      1: this.chart.data[1].value,
      2: this.chart.data[2].value,
      type: this.chart.type
    });
  }

  submit(data: any) {
    this.chart.type = data.type;
    this.chart.data = ['Red', 'Blue', 'Violet'].map((key, index) => {
      return {
        name: key,
        value: data[index]
      };
    });
    this.save.emit(this.chart);
  }

  cancel() {
    this.close.emit();
  }

}
