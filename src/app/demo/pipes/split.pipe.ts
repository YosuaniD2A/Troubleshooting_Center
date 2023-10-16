import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/,/g, ', ').slice(0, 100)+ "...";
  }

}
