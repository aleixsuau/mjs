import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaser'
})
export class UppercaserPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    } else if (typeof value === 'number') {
      return value;
    } else {
      return value.toUpperCase();
    }
  }

}
