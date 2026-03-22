import { Component } from '@angular/core';
import { State } from '../../services/state';

@Component({
  selector: 'app-home2',
  imports: [],
  templateUrl: './home2.html',
  styleUrl: './home2.scss',
})
export class Home2 {
  constructor(public stateService: State){}
}
