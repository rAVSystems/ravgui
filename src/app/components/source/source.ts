import { Component, input } from '@angular/core';
import { State } from '../../services/state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-source',
  imports: [CommonModule],
  templateUrl: './source.html',
  styleUrl: './source.scss'
})
export class Source {
  id = input<string>('');
  pinned = input<boolean>(false);
  icon = input<string>('');
  label = input<string>('');
  detected = input<boolean>(false);
  selected = input<boolean>(false);
  constructor(public stateService: State) {}
}
