import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'searchFilter',
   standalone: true
})
export class SearchFilterPipe implements PipeTransform {
   transform(value: any[], search: string | null) {
      if (!search) {
         return value;
      }

      return value.filter(v => v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
   }
}
