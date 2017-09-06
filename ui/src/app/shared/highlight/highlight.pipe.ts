import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'HighLight'
})
export class HighlightSearch implements PipeTransform {
    transform(value: any, args: any): any {
        var re = new RegExp(args, 'i'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
      if(args==undefined)
        return value;
        return value.replace(re, "<strong>" + args + "</strong>");
    }
}