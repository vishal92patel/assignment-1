import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userInfo = { userName: null };
    constructor(private commonService: CommonService) { }

    ngOnInit(): void {
        this.commonService.getUserInfo().subscribe((res: Response) => {
            this.userInfo.userName = res.headers.get('username');
        });
        // var req = new XMLHttpRequest();
        // req.open('GET', this.commonService.getUrl(), false);
        // req.send(null);
        // var headers = req.getAllResponseHeaders().toLowerCase();
        // console.log(headers);
    }

}
