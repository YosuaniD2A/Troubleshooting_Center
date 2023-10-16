import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgDowloable'
})
export class ImgDowloablePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/dl=0/g,'dl=1');
  }

}
