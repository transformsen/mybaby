import { Component, OnInit, Input } from '@angular/core';
import { NameDetail } from '../model/name-detail';

@Component({
  selector: 'app-name-details-item',
  templateUrl: './name-details-item.component.html',
  styleUrls: ['./name-details-item.component.scss'],
})
export class NameDetailsItemComponent implements OnInit {

  @Input() nameDetail: NameDetail;
  @Input() field: string;
  public value: string = '';
  constructor() { }

  ngOnInit() {
    this.value = this.nameDetail[this.field]
  }

}
