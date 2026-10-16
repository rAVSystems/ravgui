import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';
import * as noUiSlider from 'nouislider';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderRef', { static: true }) sliderEl!: ElementRef<HTMLElement>;

  vertical = input<boolean>(true);
  levelfb  = output<number>();
  percent  = signal(0);
  showTag  = signal(false);

  private slider!: noUiSlider.API;
  private hideTagTimeout: ReturnType<typeof setTimeout> | null = null;
  private tagEl: HTMLElement | null = null;

  ngAfterViewInit(): void {
    noUiSlider.create(this.sliderEl.nativeElement, {
      start: [70],
      range: { min: 0, max: 100 },
      orientation: this.vertical() ? 'vertical' : 'horizontal',
      direction: this.vertical() ? 'rtl' : 'ltr',
      connect: 'lower',
    });

    this.slider = (this.sliderEl.nativeElement as noUiSlider.target).noUiSlider!;

    // Inject tag into the origin element so it moves with the handle
    const handle = this.sliderEl.nativeElement.querySelector('.noUi-handle') as HTMLElement;
    this.tagEl = document.createElement('div');
    this.tagEl.className = 'noui-tag';
    this.tagEl.textContent = '0%';
    handle.appendChild(this.tagEl);

    this.slider.on('update', (values) => {
      const val = parseFloat(values[0] as string);
      this.percent.set(val / 100);
      this.levelfb.emit(val);
      if (this.tagEl) this.tagEl.textContent = `${Math.round(val)}%`;
    });

    this.slider.on('start', () => {
      if (this.hideTagTimeout) {
        clearTimeout(this.hideTagTimeout);
        this.hideTagTimeout = null;
      }
      if (this.tagEl) this.tagEl.classList.add('noui-tag-visible');
    });

    this.slider.on('change', () => {
      if (this.tagEl) this.tagEl.classList.add('noui-tag-visible');
      if (this.hideTagTimeout) clearTimeout(this.hideTagTimeout);
      this.hideTagTimeout = setTimeout(() => {
        if (this.tagEl) this.tagEl.classList.remove('noui-tag-visible');
        this.hideTagTimeout = null;
      }, 1500);
    });

    this.slider.on('end', () => {
      if (this.hideTagTimeout) clearTimeout(this.hideTagTimeout);
      this.hideTagTimeout = setTimeout(() => {
        if (this.tagEl) this.tagEl.classList.remove('noui-tag-visible');
        this.hideTagTimeout = null;
      }, 1500);
    });
  }

  ngOnDestroy(): void {
    this.slider?.destroy();
  }
}
