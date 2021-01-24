import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
    isExpanded: boolean = false;
    menus = [
        {
            icon: "dashboard",
            lable: "Dashboard",
            url: "/dashboard",
            isSelected: false
        },
        {
            icon: "search",
            lable: "Menu Item 1 - No Routes",
            url: null,
            isSelected: false
        },
        {
            icon: "menu_book",
            lable: "Menu Item 2 - No Routes",
            url: null,
            isSelected: false
        },
        {
            icon: "receipt",
            lable: "Menu Item 2 - No Routes",
            url: null,
            isSelected: false
        },
        {
            icon: "support",
            lable: "Help",
            url: "/help",
            isSelected: true
        },
        {
            icon: "moving",
            lable: "Reports",
            url: "/reports",
            isSelected: false
        }
    ]
    constructor(private router: Router) { }

    ngOnInit(): void {
        this.checkDefault(this.router.url);
    }
    toggle() {
        this.isExpanded = !this.isExpanded;
    }
    onMenuClick(menu) {
        if (menu && menu.url) {
            this.unCheckAll();
            menu.isSelected = true;
            this.router.navigate([menu.url]);
        } else {
            alert("Oops, No route configured, Try another menu");
        }
    }
    unCheckAll() {
        this.menus.map((menu) => menu.isSelected = false);
    }
    checkDefault(routeName: string) {
        this.menus.map((menu) => {
            if (routeName == menu.url) {
                menu.isSelected = true
            } else {
                menu.isSelected = false
            }
        });
    }
}
