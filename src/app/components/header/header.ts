import { Component, signal } from '@angular/core';
import { Qsys } from '../../services/qsys';
import { State } from '../../services/state';
import { DatePipe } from '@angular/common';
import { PressDirective } from '../../directives/press';

@Component({
  selector: 'app-header',
  imports: [DatePipe, PressDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header {
  DateTime$ = signal<Date>(new Date);
  updateDateId = setInterval(()=> this.DateTime$.update(() => new Date()), 1000);
  constructor(private qsys: Qsys, public stateService: State) {}
}
