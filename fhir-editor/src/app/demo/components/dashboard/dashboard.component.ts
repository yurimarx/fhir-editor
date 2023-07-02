import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GoogleFitService } from '../../service/googlefit.service';
import { DatasetResponse } from '../../googlefitmodel/datasetresponse';
import { DatapointResponse } from '../../googlefitmodel/datapointresponse';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    steps!: string;

    activeMinutes!: string;

    distance!: number;

    calories!: number;

    heartCurrent!: number;
    
    heartHigh!: number;

    heartMin!: number;

    height!: number;

    weight!: number;

    date = new Date();

    constructor(private googlefitService: GoogleFitService, private productService: ProductService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initGoogleFit();
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    getFormattedDate() {
        const year = this.date.toLocaleString('default', {year: 'numeric'});
        const month = this.date.toLocaleString('default', {month: '2-digit'});
        const day = this.date.toLocaleString('default', {day: '2-digit'});

        var formattedDate = [year, month, day].join('-');
        return formattedDate;
    }

    onSelectDate() {
        this.initGoogleFit();
    }

    initGoogleFit() {
        this.googlefitService.getSteps(this.getFormattedDate()).subscribe((data: DatasetResponse) => this.steps = data.bucket[0].dataset[0].point[0].value[0].stringVal);
        this.googlefitService.getActiveMinutes(this.getFormattedDate()).subscribe((data: DatasetResponse) => this.activeMinutes = data.bucket[0].dataset[0].point[0].value[0].stringVal);
        this.googlefitService.getDistance(this.getFormattedDate()).subscribe((data: DatasetResponse) => this.distance = data.bucket[0].dataset[0].point[0].value[0].fpVal);
        this.googlefitService.getCaloriesExpended(this.getFormattedDate()).subscribe((data: DatasetResponse) => this.calories = data.bucket[0].dataset[0].point[0].value[0].fpVal);
        this.googlefitService.getHeartValues(this.getFormattedDate()).subscribe((data: DatasetResponse) => {
            this.heartCurrent = data.bucket[0].dataset[0].point[0].value[0].fpVal;
            this.heartHigh = data.bucket[0].dataset[0].point[0].value[1].fpVal;
            this.heartMin = data.bucket[0].dataset[0].point[0].value[2].fpVal;
        });
        this.googlefitService.getHeight().subscribe((data: DatapointResponse) => this.height = data.insertedDataPoint[0].value[0].fpVal);
        this.googlefitService.getWeight().subscribe((data: DatapointResponse) => this.weight = data.insertedDataPoint[0].value[0].fpVal);
        
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    round(val: number) {
        return Math.round(100 * val) / 100;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
