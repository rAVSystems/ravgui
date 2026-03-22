import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PressDirective } from '../../directives/press';

@Component({
  selector: 'app-settings',
  imports: [PressDirective],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  readonly PIN = '9470';

  entry   = signal('');
  unlocked = signal(false);
  shake   = signal(false);

  constructor(private router: Router) {}

  goBack(): void {
    setTimeout(() => this.router.navigate(['/home']), 300);
  }

  press(digit: string): void {
    if (this.entry().length >= 4) return;
    this.entry.update(v => v + digit);
    if (this.entry().length === 4) {
      if (this.entry() === this.PIN) {
        this.unlocked.set(true);
      } else {
        this.shake.set(true);
        setTimeout(() => {
          this.shake.set(false);
          this.entry.set('');
        }, 600);
      }
    }
  }

  clear(): void {
    this.entry.set('');
  }

  exitAdvanced(): void {
    this.unlocked.set(false);
    this.entry.set('');
  }
}
