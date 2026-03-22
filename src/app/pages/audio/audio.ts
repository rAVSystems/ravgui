import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PressDirective } from '../../directives/press';
import { SliderComponent } from '../../components/slider/slider';
@Component({
  selector: 'app-audio',
  imports: [PressDirective, SliderComponent],
  templateUrl: './audio.html',
  styleUrl: './audio.scss',
})
export class Audio {
  muted = {
    podium:    signal(false),
    lav1:      signal(false),
    lav2:      signal(false),
    handheld1: signal(false),
    handheld2: signal(false),
    program:   signal(false),
  };

  constructor(private router: Router) {}

  toggleMute(channel: keyof typeof this.muted): void {
    this.muted[channel].update(v => !v);
  }

  goBack(): void {
    setTimeout(() => this.router.navigate(['/home']), 300);
  }
}
