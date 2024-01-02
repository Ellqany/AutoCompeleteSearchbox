import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, search: string): any {
    if (!search) { return value; }
    const solution = value.filter((v: any) => {
      if (!v) { return; }
      return v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return solution;
  }
}
