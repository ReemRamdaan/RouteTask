import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './customer';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(filteredCustomers:any[], searchTerm:string): any[] {
    return filteredCustomers.filter((customer)=>customer.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

}
