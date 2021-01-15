import { Component, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styles: [
  ]
})
export class CircularComponent {

  // Todo lo configurado en los inputs son valores por defecto en caso que el padre no envíe datos.

  @Input() title = 'Sin titulo';

  // tslint:disable-next-line: no-input-rename
  @Input('labels') doughnutChartLabels: Label[];
  // tslint:disable-next-line: no-input-rename
  @Input('data') doughnutChartData: MultiDataSet = [
       [350, 450, 100],
     ];
}
