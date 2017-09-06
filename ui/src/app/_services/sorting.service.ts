import { Injectable } from '@angular/core';
import { HttpClient } from './httpclient.service';



@Injectable()
export class SortingService {

    direction: number;
    key: any = {};
    lastIndex: number = -1;
    constructor() {
        //  this.direction = -1;

    }



    sort(key, data) {
        //  debugger;
     //   console.log(key);
        var name = key.name;
        this.direction = key.direction;
      //  console.log(this.direction, key.direction);
        if (this.key.name === undefined) {
            this.direction = this.direction * -1;

        }
        else if (this.key.name === name) {
            this.direction = this.direction * -1;
        }
        else {
            this.direction = 1;
        }

        data.sort((a, b) => {
            if (a[name] != null) {
                if (b[name] != null) {

                    if (a[name].toString().toLowerCase() === b[name].toString().toLowerCase()) {
                        return 0;
                    }
                    else if (a[name].toString().toLowerCase() > b[name].toString().toLowerCase()) {
                        return 1 * this.direction;
                    }
                    else {
                        return -1 * this.direction;
                    }
                }
                else {
                    return 1 * this.direction;
                }
            }
            else {
                return -1 * this.direction;
            }

        });
        if (this.key.name != undefined) {
            this.key.sorted = false;

        }


        if (this.key.name != undefined) {
            this.key.sorted = false;
            this.key.sortAs = "fa fa-sort-alpha-asc sortingIcon-disable";
        }
        this.key = key;
        key.sorted = true;

        key.direction = this.direction;
      //  console.log(key.direction);
        if (this.direction == 1) {
            key.sortAs = "fa fa-sort-alpha-asc ";
        }
        else {
            key.sortAs = "fa fa-sort-alpha-desc";
        }


     //   return data;

    }

}

