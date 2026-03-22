import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Qsys } from '../services/qsys';


@Directive({
  selector: '[ButtonId]',
  standalone: true
})
export class PressDirective implements AfterViewInit, OnDestroy {
  @Input() ButtonId: string = '';

  private pressTimeout: any;
  private isPressTriggered = false;
  private readonly pressDuration = 1200;

  private startX = 0;
  private startY = 0;
  private readonly moveTolerance = 10;

  constructor(private el: ElementRef, private qsys: Qsys) {}

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;

    el.addEventListener('pointerdown', this.onPointerDown);
    el.addEventListener('pointerup', this.onPointerUp);
    el.addEventListener('pointermove', this.onPointerMove);
    el.addEventListener('pointerleave', this.onPointerLeave);
  }

  ngOnDestroy(): void {
    const el = this.el.nativeElement;

    el.removeEventListener('pointerdown', this.onPointerDown);
    el.removeEventListener('pointerup', this.onPointerUp);
    el.removeEventListener('pointermove', this.onPointerMove);
    el.removeEventListener('pointerleave', this.onPointerLeave);
  }

  private onPointerDown = (e: PointerEvent) => {
    this.isPressTriggered = false;

    // record starting touch position
    this.startX = e.clientX;
    this.startY = e.clientY;

    this.pressTimeout = setTimeout(() => {
      this.isPressTriggered = true;
      this.trigger('press');
    }, this.pressDuration);
  };

  private onPointerMove = (e: PointerEvent) => {
    const dx = Math.abs(e.clientX - this.startX);
    const dy = Math.abs(e.clientY - this.startY);

    // cancel if moved too far
    if (dx > this.moveTolerance || dy > this.moveTolerance) {
      clearTimeout(this.pressTimeout);
    }
  };

  private onPointerUp = () => {
    clearTimeout(this.pressTimeout);

    if (!this.isPressTriggered) {
      this.trigger('tap');
    }
  };

  private onPointerLeave = () => {
    clearTimeout(this.pressTimeout);
  };

  private trigger(type: 'press' | 'tap') {
    const el = this.el.nativeElement;

    el.classList.add('pressed');
    console.log(`button id: ${this.ButtonId} ${type}`);
    //this.signalr.Send('OnButtonAction', this.ButtonId, type);
    
    setTimeout(() => el.classList.remove('pressed'), 300);
  }
}
