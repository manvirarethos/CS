import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MenuService ,StorageService} from '../../_services/_index';
// import { Menu } from '../../_models/_index.model'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',


    providers: [MenuService]
})
export class SidebarComponent {
    Menus: any;
    CurrentUser: any;
    constructor(private _menuService: MenuService,private service:StorageService) {
      //  this.Menus = [];
      //  console.log("Sidebar");
    }
    ngOnInit() {
        let Self = this;
        this.CurrentUser = this.service.get("csmsuser")['user'];

       Self._menuService.GetDBMenu().subscribe(m => {
            Self.Menus = m.lstData;
           console.log("DB Menu",m);
        });

    }

}
