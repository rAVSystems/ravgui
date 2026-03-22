import { Component, input } from '@angular/core';
import { PressDirective } from '../../directives/press';

@Component({
  selector: 'app-button',
  imports: [PressDirective],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  icon = input<string>('gear-six');
  color = input<string>('rgb(0, 0, 0)');
  buttonId = input<string>('');
}
