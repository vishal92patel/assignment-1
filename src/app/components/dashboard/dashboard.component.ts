import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from "moment";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;
    api: GridApi;
    gridOptions: GridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true,
        },
        pagination: true,
        paginationPageSize: 20,
        rowModelType: "clientSide",
        onGridReady: this.onGridReady,
        sideBar: true,
        columnDefs: [
            { headerName: "Description", field: 'description', pivot: true, cellRenderer: 'descriptionCellRenderer', pinned: "left" },
            { headerName: "Instructment Type", field: 'instructmentType', pivot: true },
            { headerName: "Record Info.", field: 'recordInfo', pivot: true, cellRenderer: 'recordInfoCellRenderer' },
            { headerName: "Final Source", field: 'finalSource', pivot: true, cellRenderer: 'finalSourceCellRenderer' },
            { headerName: "Final Source Base MV", field: 'finalSourceBaseMV', pivot: true },
            { headerName: "Comments", field: 'comments', pivot: true, pinned: "right" }
        ],

        components: {
            'descriptionCellRenderer': this.descriptionCellRenderer,
            'recordInfoCellRenderer': this.recordInfoCellRenderer,
            finalSourceCellRenderer: this.finalSourceCellRenderer
        },
    }
    rowData = [
        {
            "description": "http://dummyimage.com/140x195.jpg/dddddd/000000",
            "instructmentType": "solo",
            "recordInfo": false,
            "finalSource": 23,
            "finalSourceBaseMV": 38,
            "comments": "932 Merchant Street"
        }, {
            "description": "http://dummyimage.com/205x168.png/5fa2dd/ffffff",
            "instructmentType": "visa-electron",
            "recordInfo": false,
            "finalSource": 37,
            "finalSourceBaseMV": 79,
            "comments": "567 Pawling Crossing"
        }, {
            "description": "http://dummyimage.com/231x167.jpg/cc0000/ffffff",
            "instructmentType": "maestro",
            "recordInfo": true,
            "finalSource": 47,
            "finalSourceBaseMV": 2,
            "comments": "28886 Hanson Trail"
        }, {
            "description": "http://dummyimage.com/125x210.jpg/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 74,
            "finalSourceBaseMV": 2,
            "comments": "910 Vahlen Alley"
        }, {
            "description": "http://dummyimage.com/116x114.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 21,
            "finalSourceBaseMV": 47,
            "comments": "36765 Huxley Place"
        }, {
            "description": "http://dummyimage.com/103x141.jpg/ff4444/ffffff",
            "instructmentType": "visa-electron",
            "recordInfo": false,
            "finalSource": 51,
            "finalSourceBaseMV": 5,
            "comments": "5841 Coolidge Park"
        }, {
            "description": "http://dummyimage.com/102x159.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 4,
            "finalSourceBaseMV": 17,
            "comments": "315 Nelson Place"
        }, {
            "description": "http://dummyimage.com/161x236.png/dddddd/000000",
            "instructmentType": "switch",
            "recordInfo": false,
            "finalSource": 95,
            "finalSourceBaseMV": 59,
            "comments": "06 Ludington Avenue"
        }, {
            "description": "http://dummyimage.com/205x182.png/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 22,
            "finalSourceBaseMV": 5,
            "comments": "541 Granby Parkway"
        }, {
            "description": "http://dummyimage.com/186x236.png/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 22,
            "finalSourceBaseMV": 9,
            "comments": "5 Surrey Trail"
        }, {
            "description": "http://dummyimage.com/165x240.png/5fa2dd/ffffff",
            "instructmentType": "maestro",
            "recordInfo": true,
            "finalSource": 14,
            "finalSourceBaseMV": 50,
            "comments": "38 Sundown Crossing"
        }, {
            "description": "http://dummyimage.com/149x217.jpg/5fa2dd/ffffff",
            "instructmentType": "mastercard",
            "recordInfo": true,
            "finalSource": 42,
            "finalSourceBaseMV": 1,
            "comments": "749 Burning Wood Road"
        }, {
            "description": "http://dummyimage.com/246x243.jpg/dddddd/000000",
            "instructmentType": "solo",
            "recordInfo": true,
            "finalSource": 90,
            "finalSourceBaseMV": 79,
            "comments": "2 Lien Terrace"
        }, {
            "description": "http://dummyimage.com/121x105.jpg/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 36,
            "finalSourceBaseMV": 8,
            "comments": "3613 Hovde Hill"
        }, {
            "description": "http://dummyimage.com/175x105.bmp/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 88,
            "finalSourceBaseMV": 33,
            "comments": "90 Ramsey Drive"
        }, {
            "description": "http://dummyimage.com/227x148.bmp/dddddd/000000",
            "instructmentType": "maestro",
            "recordInfo": false,
            "finalSource": 29,
            "finalSourceBaseMV": 55,
            "comments": "0384 Esch Terrace"
        }, {
            "description": "http://dummyimage.com/158x229.jpg/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 31,
            "finalSourceBaseMV": 77,
            "comments": "2592 Buell Drive"
        }, {
            "description": "http://dummyimage.com/202x228.jpg/cc0000/ffffff",
            "instructmentType": "americanexpress",
            "recordInfo": false,
            "finalSource": 39,
            "finalSourceBaseMV": 1,
            "comments": "0444 Tomscot Street"
        }, {
            "description": "http://dummyimage.com/192x120.bmp/ff4444/ffffff",
            "instructmentType": "solo",
            "recordInfo": false,
            "finalSource": 15,
            "finalSourceBaseMV": 74,
            "comments": "6 Green Hill"
        }, {
            "description": "http://dummyimage.com/130x115.jpg/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 28,
            "finalSourceBaseMV": 62,
            "comments": "9047 Springview Street"
        }, {
            "description": "http://dummyimage.com/165x236.jpg/cc0000/ffffff",
            "instructmentType": "maestro",
            "recordInfo": true,
            "finalSource": 36,
            "finalSourceBaseMV": 83,
            "comments": "11690 Bobwhite Hill"
        }, {
            "description": "http://dummyimage.com/238x189.bmp/cc0000/ffffff",
            "instructmentType": "mastercard",
            "recordInfo": false,
            "finalSource": 68,
            "finalSourceBaseMV": 17,
            "comments": "78 Helena Hill"
        }, {
            "description": "http://dummyimage.com/176x117.png/dddddd/000000",
            "instructmentType": "maestro",
            "recordInfo": false,
            "finalSource": 87,
            "finalSourceBaseMV": 55,
            "comments": "341 Memorial Road"
        }, {
            "description": "http://dummyimage.com/222x138.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 5,
            "finalSourceBaseMV": 4,
            "comments": "8 Brickson Park Avenue"
        }, {
            "description": "http://dummyimage.com/184x174.bmp/cc0000/ffffff",
            "instructmentType": "mastercard",
            "recordInfo": true,
            "finalSource": 75,
            "finalSourceBaseMV": 22,
            "comments": "7 Green Point"
        }, {
            "description": "http://dummyimage.com/122x152.bmp/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 32,
            "finalSourceBaseMV": 52,
            "comments": "5 Golf View Alley"
        }, {
            "description": "http://dummyimage.com/168x240.jpg/5fa2dd/ffffff",
            "instructmentType": "switch",
            "recordInfo": false,
            "finalSource": 74,
            "finalSourceBaseMV": 48,
            "comments": "7 Rieder Junction"
        }, {
            "description": "http://dummyimage.com/135x192.bmp/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 30,
            "finalSourceBaseMV": 54,
            "comments": "6683 Acker Lane"
        }, {
            "description": "http://dummyimage.com/198x211.png/5fa2dd/ffffff",
            "instructmentType": "americanexpress",
            "recordInfo": true,
            "finalSource": 74,
            "finalSourceBaseMV": 64,
            "comments": "28822 Sage Center"
        }, {
            "description": "http://dummyimage.com/117x118.bmp/5fa2dd/ffffff",
            "instructmentType": "diners-club-carte-blanche",
            "recordInfo": true,
            "finalSource": 60,
            "finalSourceBaseMV": 84,
            "comments": "638 Pleasure Trail"
        }, {
            "description": "http://dummyimage.com/226x248.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 46,
            "finalSourceBaseMV": 26,
            "comments": "22370 Judy Circle"
        }, {
            "description": "http://dummyimage.com/107x110.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 18,
            "finalSourceBaseMV": 41,
            "comments": "32228 Manley Center"
        }, {
            "description": "http://dummyimage.com/211x207.png/cc0000/ffffff",
            "instructmentType": "diners-club-enroute",
            "recordInfo": false,
            "finalSource": 29,
            "finalSourceBaseMV": 35,
            "comments": "79768 Buhler Hill"
        }, {
            "description": "http://dummyimage.com/210x182.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 77,
            "finalSourceBaseMV": 46,
            "comments": "284 Nelson Hill"
        }, {
            "description": "http://dummyimage.com/107x218.jpg/cc0000/ffffff",
            "instructmentType": "americanexpress",
            "recordInfo": true,
            "finalSource": 33,
            "finalSourceBaseMV": 36,
            "comments": "67 Ridgeview Alley"
        }, {
            "description": "http://dummyimage.com/247x244.bmp/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 8,
            "finalSourceBaseMV": 16,
            "comments": "334 Randy Point"
        }, {
            "description": "http://dummyimage.com/115x108.png/ff4444/ffffff",
            "instructmentType": "laser",
            "recordInfo": false,
            "finalSource": 85,
            "finalSourceBaseMV": 98,
            "comments": "2 Marcy Drive"
        }, {
            "description": "http://dummyimage.com/201x116.png/dddddd/000000",
            "instructmentType": "diners-club-enroute",
            "recordInfo": false,
            "finalSource": 98,
            "finalSourceBaseMV": 3,
            "comments": "3 Golf Course Center"
        }, {
            "description": "http://dummyimage.com/167x214.bmp/ff4444/ffffff",
            "instructmentType": "china-unionpay",
            "recordInfo": true,
            "finalSource": 73,
            "finalSourceBaseMV": 12,
            "comments": "388 Hermina Parkway"
        }, {
            "description": "http://dummyimage.com/105x205.jpg/dddddd/000000",
            "instructmentType": "bankcard",
            "recordInfo": true,
            "finalSource": 74,
            "finalSourceBaseMV": 20,
            "comments": "086 Bellgrove Terrace"
        }, {
            "description": "http://dummyimage.com/199x145.png/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 54,
            "finalSourceBaseMV": 39,
            "comments": "09 Ramsey Place"
        }, {
            "description": "http://dummyimage.com/182x194.bmp/dddddd/000000",
            "instructmentType": "bankcard",
            "recordInfo": true,
            "finalSource": 69,
            "finalSourceBaseMV": 91,
            "comments": "63650 Sachtjen Point"
        }, {
            "description": "http://dummyimage.com/200x135.bmp/dddddd/000000",
            "instructmentType": "americanexpress",
            "recordInfo": false,
            "finalSource": 46,
            "finalSourceBaseMV": 43,
            "comments": "879 Village Court"
        }, {
            "description": "http://dummyimage.com/102x132.bmp/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 77,
            "finalSourceBaseMV": 36,
            "comments": "67 Derek Place"
        }, {
            "description": "http://dummyimage.com/196x217.png/ff4444/ffffff",
            "instructmentType": "americanexpress",
            "recordInfo": true,
            "finalSource": 75,
            "finalSourceBaseMV": 76,
            "comments": "01 Utah Road"
        }, {
            "description": "http://dummyimage.com/208x105.png/ff4444/ffffff",
            "instructmentType": "visa",
            "recordInfo": false,
            "finalSource": 40,
            "finalSourceBaseMV": 10,
            "comments": "76 Buena Vista Circle"
        }, {
            "description": "http://dummyimage.com/187x113.png/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 96,
            "finalSourceBaseMV": 57,
            "comments": "479 Emmet Trail"
        }, {
            "description": "http://dummyimage.com/153x207.bmp/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 36,
            "finalSourceBaseMV": 94,
            "comments": "00 Almo Junction"
        }, {
            "description": "http://dummyimage.com/128x161.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 88,
            "finalSourceBaseMV": 32,
            "comments": "3402 Vidon Alley"
        }, {
            "description": "http://dummyimage.com/182x103.png/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 17,
            "finalSourceBaseMV": 95,
            "comments": "20065 Fallview Drive"
        }, {
            "description": "http://dummyimage.com/127x110.bmp/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 36,
            "finalSourceBaseMV": 19,
            "comments": "297 Scott Park"
        }, {
            "description": "http://dummyimage.com/172x144.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 92,
            "finalSourceBaseMV": 23,
            "comments": "0417 Sutteridge Pass"
        }, {
            "description": "http://dummyimage.com/189x250.bmp/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 62,
            "finalSourceBaseMV": 41,
            "comments": "39407 Victoria Hill"
        }, {
            "description": "http://dummyimage.com/187x122.bmp/5fa2dd/ffffff",
            "instructmentType": "diners-club-enroute",
            "recordInfo": false,
            "finalSource": 11,
            "finalSourceBaseMV": 63,
            "comments": "721 Monica Center"
        }, {
            "description": "http://dummyimage.com/108x249.jpg/dddddd/000000",
            "instructmentType": "solo",
            "recordInfo": true,
            "finalSource": 8,
            "finalSourceBaseMV": 4,
            "comments": "5 Crescent Oaks Road"
        }, {
            "description": "http://dummyimage.com/115x127.png/cc0000/ffffff",
            "instructmentType": "visa-electron",
            "recordInfo": true,
            "finalSource": 62,
            "finalSourceBaseMV": 26,
            "comments": "9987 Garrison Center"
        }, {
            "description": "http://dummyimage.com/215x179.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 44,
            "finalSourceBaseMV": 11,
            "comments": "2 Hermina Crossing"
        }, {
            "description": "http://dummyimage.com/144x187.jpg/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 49,
            "finalSourceBaseMV": 40,
            "comments": "68 North Plaza"
        }, {
            "description": "http://dummyimage.com/174x125.png/cc0000/ffffff",
            "instructmentType": "mastercard",
            "recordInfo": false,
            "finalSource": 62,
            "finalSourceBaseMV": 61,
            "comments": "1233 Bluestem Alley"
        }, {
            "description": "http://dummyimage.com/220x162.jpg/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 8,
            "finalSourceBaseMV": 55,
            "comments": "1206 Jay Road"
        }, {
            "description": "http://dummyimage.com/172x217.bmp/cc0000/ffffff",
            "instructmentType": "americanexpress",
            "recordInfo": false,
            "finalSource": 17,
            "finalSourceBaseMV": 74,
            "comments": "60512 Glacier Hill Park"
        }, {
            "description": "http://dummyimage.com/156x246.bmp/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 43,
            "finalSourceBaseMV": 37,
            "comments": "31 Anhalt Trail"
        }, {
            "description": "http://dummyimage.com/206x140.bmp/cc0000/ffffff",
            "instructmentType": "mastercard",
            "recordInfo": false,
            "finalSource": 22,
            "finalSourceBaseMV": 9,
            "comments": "90639 Utah Circle"
        }, {
            "description": "http://dummyimage.com/220x196.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 61,
            "finalSourceBaseMV": 82,
            "comments": "2517 Mayfield Lane"
        }, {
            "description": "http://dummyimage.com/113x116.bmp/cc0000/ffffff",
            "instructmentType": "maestro",
            "recordInfo": false,
            "finalSource": 33,
            "finalSourceBaseMV": 98,
            "comments": "3 Ilene Lane"
        }, {
            "description": "http://dummyimage.com/122x126.bmp/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 71,
            "finalSourceBaseMV": 13,
            "comments": "6 Nobel Point"
        }, {
            "description": "http://dummyimage.com/242x106.jpg/cc0000/ffffff",
            "instructmentType": "china-unionpay",
            "recordInfo": true,
            "finalSource": 92,
            "finalSourceBaseMV": 39,
            "comments": "98 Delaware Hill"
        }, {
            "description": "http://dummyimage.com/223x222.bmp/dddddd/000000",
            "instructmentType": "maestro",
            "recordInfo": true,
            "finalSource": 56,
            "finalSourceBaseMV": 51,
            "comments": "4 Holmberg Terrace"
        }, {
            "description": "http://dummyimage.com/188x109.bmp/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 76,
            "finalSourceBaseMV": 76,
            "comments": "694 Amoth Avenue"
        }, {
            "description": "http://dummyimage.com/238x232.bmp/dddddd/000000",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 16,
            "finalSourceBaseMV": 15,
            "comments": "1 Lighthouse Bay Circle"
        }, {
            "description": "http://dummyimage.com/153x123.bmp/ff4444/ffffff",
            "instructmentType": "switch",
            "recordInfo": true,
            "finalSource": 37,
            "finalSourceBaseMV": 40,
            "comments": "58980 Lukken Junction"
        }, {
            "description": "http://dummyimage.com/150x120.bmp/ff4444/ffffff",
            "instructmentType": "bankcard",
            "recordInfo": false,
            "finalSource": 95,
            "finalSourceBaseMV": 65,
            "comments": "7056 Claremont Junction"
        }, {
            "description": "http://dummyimage.com/189x229.bmp/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 65,
            "finalSourceBaseMV": 60,
            "comments": "04870 Larry Place"
        }, {
            "description": "http://dummyimage.com/143x138.png/dddddd/000000",
            "instructmentType": "visa-electron",
            "recordInfo": true,
            "finalSource": 82,
            "finalSourceBaseMV": 61,
            "comments": "530 Swallow Drive"
        }, {
            "description": "http://dummyimage.com/200x144.jpg/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 18,
            "finalSourceBaseMV": 29,
            "comments": "670 Bellgrove Park"
        }, {
            "description": "http://dummyimage.com/223x155.bmp/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 96,
            "finalSourceBaseMV": 24,
            "comments": "602 Dahle Drive"
        }, {
            "description": "http://dummyimage.com/122x173.png/cc0000/ffffff",
            "instructmentType": "laser",
            "recordInfo": false,
            "finalSource": 89,
            "finalSourceBaseMV": 7,
            "comments": "0857 Luster Parkway"
        }, {
            "description": "http://dummyimage.com/113x169.bmp/ff4444/ffffff",
            "instructmentType": "maestro",
            "recordInfo": true,
            "finalSource": 70,
            "finalSourceBaseMV": 22,
            "comments": "6 Florence Circle"
        }, {
            "description": "http://dummyimage.com/201x113.png/dddddd/000000",
            "instructmentType": "diners-club-carte-blanche",
            "recordInfo": false,
            "finalSource": 37,
            "finalSourceBaseMV": 68,
            "comments": "48 Lukken Road"
        }, {
            "description": "http://dummyimage.com/217x148.jpg/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 73,
            "finalSourceBaseMV": 11,
            "comments": "1831 Green Ridge Place"
        }, {
            "description": "http://dummyimage.com/250x178.jpg/cc0000/ffffff",
            "instructmentType": "bankcard",
            "recordInfo": false,
            "finalSource": 100,
            "finalSourceBaseMV": 37,
            "comments": "456 Dapin Plaza"
        }, {
            "description": "http://dummyimage.com/238x241.bmp/5fa2dd/ffffff",
            "instructmentType": "visa",
            "recordInfo": true,
            "finalSource": 26,
            "finalSourceBaseMV": 62,
            "comments": "698 Valley Edge Court"
        }, {
            "description": "http://dummyimage.com/218x132.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 10,
            "finalSourceBaseMV": 17,
            "comments": "9692 Crescent Oaks Drive"
        }, {
            "description": "http://dummyimage.com/229x145.bmp/dddddd/000000",
            "instructmentType": "bankcard",
            "recordInfo": false,
            "finalSource": 96,
            "finalSourceBaseMV": 83,
            "comments": "8248 Pepper Wood Terrace"
        }, {
            "description": "http://dummyimage.com/181x143.bmp/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 84,
            "finalSourceBaseMV": 66,
            "comments": "68405 Hauk Road"
        }, {
            "description": "http://dummyimage.com/136x201.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 99,
            "finalSourceBaseMV": 9,
            "comments": "65865 Huxley Point"
        }, {
            "description": "http://dummyimage.com/162x209.bmp/5fa2dd/ffffff",
            "instructmentType": "switch",
            "recordInfo": false,
            "finalSource": 59,
            "finalSourceBaseMV": 80,
            "comments": "3 Roxbury Plaza"
        }, {
            "description": "http://dummyimage.com/129x134.bmp/cc0000/ffffff",
            "instructmentType": "diners-club-international",
            "recordInfo": false,
            "finalSource": 59,
            "finalSourceBaseMV": 32,
            "comments": "3 Commercial Center"
        }, {
            "description": "http://dummyimage.com/228x196.png/5fa2dd/ffffff",
            "instructmentType": "jcb",
            "recordInfo": true,
            "finalSource": 6,
            "finalSourceBaseMV": 47,
            "comments": "00 Coolidge Court"
        }, {
            "description": "http://dummyimage.com/175x196.jpg/dddddd/000000",
            "instructmentType": "diners-club-enroute",
            "recordInfo": true,
            "finalSource": 59,
            "finalSourceBaseMV": 21,
            "comments": "3047 Kedzie Way"
        }, {
            "description": "http://dummyimage.com/168x128.png/cc0000/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 6,
            "finalSourceBaseMV": 56,
            "comments": "1334 Sullivan Court"
        }, {
            "description": "http://dummyimage.com/100x122.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 12,
            "finalSourceBaseMV": 98,
            "comments": "70 Corry Lane"
        }, {
            "description": "http://dummyimage.com/103x196.png/ff4444/ffffff",
            "instructmentType": "bankcard",
            "recordInfo": false,
            "finalSource": 83,
            "finalSourceBaseMV": 78,
            "comments": "50 Mayfield Junction"
        }, {
            "description": "http://dummyimage.com/131x249.bmp/cc0000/ffffff",
            "instructmentType": "maestro",
            "recordInfo": false,
            "finalSource": 27,
            "finalSourceBaseMV": 26,
            "comments": "79346 Steensland Center"
        }, {
            "description": "http://dummyimage.com/131x175.png/ff4444/ffffff",
            "instructmentType": "jcb",
            "recordInfo": false,
            "finalSource": 35,
            "finalSourceBaseMV": 76,
            "comments": "843 Kennedy Junction"
        }, {
            "description": "http://dummyimage.com/212x149.jpg/dddddd/000000",
            "instructmentType": "bankcard",
            "recordInfo": true,
            "finalSource": 99,
            "finalSourceBaseMV": 100,
            "comments": "6251 Badeau Center"
        }, {
            "description": "http://dummyimage.com/189x108.jpg/5fa2dd/ffffff",
            "instructmentType": "diners-club-carte-blanche",
            "recordInfo": false,
            "finalSource": 33,
            "finalSourceBaseMV": 58,
            "comments": "6213 Kings Point"
        }, {
            "description": "http://dummyimage.com/195x208.jpg/ff4444/ffffff",
            "instructmentType": "diners-club-carte-blanche",
            "recordInfo": false,
            "finalSource": 90,
            "finalSourceBaseMV": 61,
            "comments": "6 Esch Center"
        }, {
            "description": "http://dummyimage.com/138x107.jpg/ff4444/ffffff",
            "instructmentType": "visa",
            "recordInfo": false,
            "finalSource": 74,
            "finalSourceBaseMV": 24,
            "comments": "4 Golden Leaf Street"
        }, {
            "description": "http://dummyimage.com/210x175.bmp/ff4444/ffffff",
            "instructmentType": "mastercard",
            "recordInfo": false,
            "finalSource": 16,
            "finalSourceBaseMV": 78,
            "comments": "39389 Bunting Circle"
        }
    ];

    myControl = new FormControl();
    options: string[] = ['Onshore growth fund lP',
        'Offshore Growth Funds LLC',
        'Event Driven Fund UK LLC',
        "Event Driven Fund US LP",
        "Opportunistic Fund LP",
        "What the Fund LP",
        "Statistical Arb Fund LP",
        "Venator Fund LP",
        "Venless LLC",
        "VenRad LP",
        "Infiltrator Fund LLC",
        "Supremacy fund LLC",
        "Tantive IV Fund LP",
        "Tydirium Fund LLC",
        "Razor Crest Fund LP",
        "Corvus Fund LP",
        "Finalizer fund LP",
        "Adjudicator Fund LP",
    ];
    filteredOptions: Observable<string[]>;

    selectedDate;
    locale;
    ranges
    constructor() { }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value))
        );
        this.selectedDate = { startDate: moment(), endDate: moment() };
        this.locale = {
            format: 'MM/DD/YYYY', // could be 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
            displayFormat: 'MM/DD/YYYY', // default is format value
            direction: 'ltr', // could be rtl
            weekLabel: 'W',
            separator: ' - ', // default is ' - '
            cancelLabel: 'Cancel', // detault is 'Cancel'
            applyLabel: 'Apply', // detault is 'Apply'
            clearLabel: 'Clear', // detault is 'Clear'
            customRangeLabel: 'Custom range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: 1 // first day is monday
        }
        this.ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }
    onGridReady(obj: GridReadyEvent) {
        this.api = obj.api;
        this.api.sizeColumnsToFit();
    }
    descriptionCellRenderer(params) {
        if (params && params.value) {
            return `<a href="${params.value}">${params.value}</a>`;
        }
        return "";
    }
    recordInfoCellRenderer(params) {
        if (params && params.value) {
            return `<img src="assets/new-icons/trending_down.svg">`;
        }
        return `<img src="assets/new-icons/trending_up.svg">`;
    }
    finalSourceCellRenderer(params) {
        return `<img src="assets/new-icons/help_center.svg" color="blue">`;
    }

    filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
    ngAfterViewInit() { }

}
