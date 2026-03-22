import { Component } from '@angular/core';
import { State } from '../../services/state';


@Component({
  selector: 'app-footer2',
  imports: [],
  templateUrl: './footer2.html',
  styleUrl: './footer2.scss',
})
export class Footer2 {
  constructor(public stateService: State){}
}
