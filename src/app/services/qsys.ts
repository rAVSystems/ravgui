import { Injectable } from '@angular/core';
import { Qrwc } from '@q-sys/qrwc';

type Controls = {
  ProgramAudio: 'gain' | 'mute';
};

@Injectable({
  providedIn: 'root'
})
export class Qsys {
  public qrwc: Promise<Qrwc<Controls>>;

  constructor() {
    this.qrwc = this.initQrwc();
  }

  private async initQrwc(): Promise<Qrwc<Controls>> {
    const socket = new WebSocket('ws://10.248.105.174/qrc-public-api/v0');
    const qrwc = await Qrwc.createQrwc<Controls>({
      socket,
      pollingInterval: 350,
    });

    qrwc.on('disconnected', (reason: string) => {
      console.warn('Q-SYS disconnected:', reason);
      // reconnect strategy
    });

    qrwc.on('error', () => {
      console.warn('Q-SYS connenction error:');
      // reconnect strategy
    });
  
    return qrwc;
  }
}
