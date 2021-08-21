import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mdi-icon',
  templateUrl: './mdi-icon.component.html',
  styleUrls: ['./mdi-icon.component.scss'],
})
export class MdiIconComponent {
  @Input() icon: string = '';
}
