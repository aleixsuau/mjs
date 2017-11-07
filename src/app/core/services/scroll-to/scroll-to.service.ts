import { Injectable } from '@angular/core';

@Injectable()
export class ScrollToService {

    constructor() {}

    public scrollTo(duration: number = 500, offset: number = 0, element?: string | HTMLElement | Window) {
      if (typeof element === 'string') {
        const el = document.querySelector(element as string);
        this.scrollToElement(duration, offset, el as HTMLElement);
      } else if (element instanceof HTMLElement) {
        this.scrollToElement(duration, offset, element);
      } else {
        this.scrollToElement(duration, offset, document.documentElement);
      }
    }

    private scrollToElement(duration: number, offset: number, el: HTMLElement) {
      if (el) {
        this.doScrolling(el.offsetTop + offset, duration);
      } else {
        throw new Error('I don\'t find element');
      }
    }

    private doScrolling(elementY, duration) {
      const startingY = window.pageYOffset;
      const diff = elementY - startingY;
      let start;

      window.requestAnimationFrame(function step(timestamp) {
        start = (!start) ? timestamp : start;

        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);

        window.scrollTo(0, startingY + diff * percent);

        if (time < duration) {
            window.requestAnimationFrame(step);
        }
      });
    }
}
