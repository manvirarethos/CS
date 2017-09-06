import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'SearchBy'
})
export class SearchPipe implements PipeTransform {

    transform(value: any[], filterBy: any): any[] {
     //  console.log("Data and Filter", value, filterBy);

        if (value == undefined)
            return value;
        //  var res = value;
        
        if (filterBy.field != undefined && filterBy.data!=undefined) {
            value = value.filter(data =>
                data[filterBy.field].toLowerCase() .indexOf(filterBy.data.toLowerCase()) !== -1);
                
                
        }
     
        return value;
    }
}

