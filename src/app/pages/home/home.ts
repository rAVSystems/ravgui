import { Component, computed, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ElementModel } from '../../models/element.model';
import { State } from '../../services/state';
import { Source } from '../../components/source/source';
import { PressDirective } from '../../directives/press';
import { Button } from '../../components/button/button';
import { SliderComponent } from '../../components/slider/slider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Source, Button, PressDirective, SliderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  sources: Signal<ElementModel[]> = computed(() => {
    const unorderedSources = this.stateService.elements().filter(x => x.component === "sourcebar" && x.isEnabled === true);
    return unorderedSources.sort((a, b) => a.position - b.position);;
  });

  masterMuted = signal(false);
  toggleMasterMute(): void { this.masterMuted.update(v => !v); }

  constructor(public stateService: State, private router: Router) {}

  goToSettings(): void {
    setTimeout(() => this.router.navigate(['/settings']), 300);
  }

  goToAudio(): void {
    setTimeout(() => this.router.navigate(['/audio']), 300);
  }

  goToCamera(): void {
    setTimeout(() => this.router.navigate(['/camera']), 300);
  }
}
