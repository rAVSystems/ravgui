import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PressDirective } from '../../directives/press';

const MEDIAMTX = `http://${window.location.hostname}:8889`;

@Component({
  selector: 'app-camera',
  imports: [PressDirective],
  templateUrl: './camera.html',
  styleUrl: './camera.scss',
})
export class Camera implements AfterViewInit, OnDestroy {
  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  autotrack    = signal(false);
  privacy      = signal(false);
  activeCamera = signal('cam1');
  activePreset = signal('preset-wide');

  private pc: RTCPeerConnection | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.startStream('test/cam1');
  }

  ngOnDestroy(): void {
    this.pc?.close();
    this.pc = null;
  }

  private async startStream(path: string): Promise<void> {
    this.pc?.close();

    const pc = new RTCPeerConnection();
    this.pc = pc;

    pc.addTransceiver('video', { direction: 'recvonly' });
    pc.addTransceiver('audio', { direction: 'recvonly' });

    pc.ontrack = (e) => {
      const video = this.videoEl.nativeElement;
      if (!video.srcObject) video.srcObject = new MediaStream();
      (video.srcObject as MediaStream).addTrack(e.track);
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const res = await fetch(`${MEDIAMTX}/${path}/whep`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/sdp' },
      body: offer.sdp,
    });

    const answer = await res.text();
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });
  }

  toggleAutotrack(): void { this.autotrack.update(v => !v); }
  togglePrivacy(): void   { this.privacy.update(v => !v); }
  selectCamera(id: string): void { this.activeCamera.set(id); }
  selectPreset(id: string): void { this.activePreset.set(id); }

  goBack(): void {
    setTimeout(() => this.router.navigate(['/home']), 300);
  }
}
