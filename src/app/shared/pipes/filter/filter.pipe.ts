import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
// TODO: Implement fuzzy search (case insensitive, partial matches, recursive search when the property is an object)
  constructor(private sanitizer: DomSanitizer) {}
  // Pass the type of sanitization you want as a parameter {{ data | sanitize:'html' }}
  transform(collection: any[], criteria: any): any {
    if (collection == null) { return; };
    if (criteria == null) { return collection; };

    // TODO: Implement negative criteria with '!'

    // If the criteria is an object, the item has to exactly match the exact value
    // for every property of the criteria
    if (typeof criteria === 'object') {
      const keys = Object.keys(criteria);
      return collection
                .filter(item => {
                    let match = true;
                    keys.forEach(key => {
                      if (item[key] !== criteria[key]) {
                        match = false;
                      }
                    });
                    return match;
                });
    } else {
    // Criteria is an string or a number, any property of the item containing the exact string/number
    // will be consider a match
      return collection
                .filter(item => {
                    return Object.keys(item).find(key => {
                      if (item[key] == null) { return; };
                      if (Array.isArray(item[key])) {
                        return item[key].indexOf(criteria) !== -1;
                      } else if (typeof item[key] === 'object') {
                        // TODO: Implement recursive search when the property is an object.
                        return false;
                      } else {
                        return item[key] === criteria;
                      }
                    });
                });
    }
  }

}
