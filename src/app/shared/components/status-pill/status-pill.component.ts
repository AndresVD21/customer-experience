import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'status-pill',
  templateUrl: './status-pill.component.html',
  styleUrls: ['./status-pill.component.scss']
})
export class StatusPillComponent implements OnInit {

  @Input() status: 'active' | 'pending' | 'inactive';

  constructor() { }

  ngOnInit(): void {
  }

}
