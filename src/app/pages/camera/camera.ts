import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PressDirective } from '../../directives/press';

@Component({
  selector: 'app-camera',
  imports: [PressDirective],
  templateUrl: './camera.html',
  styleUrl: './camera.scss',
})
export class Camera {
  autotrack = signal(false);
  privacy   = signal(false);
  activeCamera = signal('cam1');
  activePreset = signal('preset-wide');

  toggleAutotrack(): void { this.autotrack.update(v => !v); }
  togglePrivacy(): void { this.privacy.update(v => !v); }
  selectCamera(id: string): void { this.activeCamera.set(id); }
  selectPreset(id: string): void { this.activePreset.set(id); }

  constructor(private router: Router) {}

  goBack(): void {
    setTimeout(() => this.router.navigate(['/home']), 300);
  }
}
