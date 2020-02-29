import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrondi'
})
export class ArrondiPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return (+value).toFixed(0);
  }

}
