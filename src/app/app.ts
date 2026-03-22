import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Qsys } from './services/qsys';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('HUX');

  constructor(private qsys: Qsys) {}

  async ngOnInit() {
    const qrwc = await this.qsys.qrwc;
    const audioMute = qrwc.components.ProgramAudio.controls.mute;
    const audioGain = qrwc.components.ProgramAudio.controls.gain;
    audioMute.on('update', ({ Bool }) => {
    console.log(
      `Control updated with new values: ${Bool}`
    )
    })

    audioGain.on('update', ({ Value }) => {
    console.log(
      `Control updated with new values: ${Value}`
    )
    })

  }

  ngOnDestroy() {

  }
}
