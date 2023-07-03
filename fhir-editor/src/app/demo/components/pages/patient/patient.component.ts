import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BundleEntry, Patient } from 'fhir/r4';
import { FhirService } from 'src/app/demo/service/fhir.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './patient.component.html',
    providers: [MessageService]
})
export class PatientComponent implements OnInit {

    patients: BundleEntry<Patient>[] = [];

    selectedPatients: Patient[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    patientCols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private fhirService: FhirService, 
        private router: Router,
        private translate: TranslateService,
        private messageService: MessageService) {
            translate.setDefaultLang('en');
            translate.addLangs(['en', 'pt']);
            translate.use('en');
         }

    ngOnInit() {
        this.fhirService.getAllPatients().subscribe(data => this.patients = data.entry!);

        this.patientCols = [
            { field: 'resource.identifier.2.value', header: this.translate.instant("app.number") },
            { field: 'resource.birthDate', header: this.translate.instant("app.birthdate") },
            { field: 'resource.gender', header: this.translate.instant("app.gender") },
            { field: 'patient.resource.name[0].given[0]', header: this.translate.instant("app.name") },
            { field: 'patient.resource.name[0].family[0]', header: 'app.family.name' }
        ];

    }

    openNew() {
        this.submitted = false;
    }

    getRecord(patientId: number) {
        this.router.navigate(['/pages/record', patientId]);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
