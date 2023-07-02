import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BundleEntry, Patient } from 'fhir/r4';
import { FhirService } from 'src/app/demo/service/fhir.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './patient.component.html',
    providers: [MessageService]
})
export class PatientComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    patients: BundleEntry<Patient>[] = [];

    selectedPatients: Patient[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    patientCols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private fhirService: FhirService, 
        private router: Router,
        private messageService: MessageService) { }

    ngOnInit() {
        this.fhirService.getAllPatients().subscribe(data => this.patients = data.entry!);

        this.patientCols = [
            { field: 'resource.identifier.2.value', header: 'Número' },
            { field: 'resource.birthDate', header: 'Dt. Nascimento' },
            { field: 'resource.gender', header: 'Gênero' },
            { field: 'patient.resource.name[0].given[0]', header: 'Nome' },
            { field: 'patient.resource.name[0].family[0]', header: 'Sobrenome' }
        ];

    }

    openNew() {
        this.submitted = false;
    }

    getRecord(patientId: number) {
        this.router.navigate(['/pages/record', patientId]);
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
