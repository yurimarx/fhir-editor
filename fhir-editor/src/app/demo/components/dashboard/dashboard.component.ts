import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {


    date = new Date();

    constructor(public layoutService: LayoutService) {
        
    }

    ngOnInit() {
        
    }

    
    ngOnDestroy() {
    }
}
