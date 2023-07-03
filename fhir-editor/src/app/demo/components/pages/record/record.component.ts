import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AllergyIntolerance, BundleEntry, Condition, Encounter, Immunization, MedicationAdministration, MedicationDispense, MedicationRequest, MedicationStatement, Observation, Patient, Procedure } from 'fhir/r4';
import { FhirService } from 'src/app/demo/service/fhir.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const PATIENTID = 'patientId';

@Component({
    templateUrl: './record.component.html',
    providers: [MessageService]
})
export class RecordComponent implements OnInit {

    patients: BundleEntry<Patient>[] = [];

    encounters: BundleEntry<Encounter>[] = [];

    procedures: BundleEntry<Procedure>[] = [];

    medicationRequests: BundleEntry<MedicationRequest>[] = [];

    medicationStatements: BundleEntry<MedicationStatement>[] = [];

    allergies: BundleEntry<AllergyIntolerance>[] = [];

    immunizations: BundleEntry<Immunization>[] = [];

    conditions: BundleEntry<Condition>[] = [];

    observations: BundleEntry<Observation>[] = [];

    medicationDispenses: BundleEntry<MedicationDispense>[] = [];

    medicationAdministrations: BundleEntry<MedicationAdministration>[] = [];

    patient: Patient = {"resourceType":"Patient"};

    patientId: number = 0;

    submitted: boolean = false;

    cols: any[] = [];

    public sub: any;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private fhirService: FhirService, 
        private translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService) {
            translate.setDefaultLang('en');
            translate.addLangs(['en', 'pt']);
            translate.use('en');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.patientId = +params[PATIENTID];
            this.loadPatient();
        });

    }

    loadPatient() {
        this.fhirService.getPatientById(this.patientId).subscribe(data => {
            this.patient = data;
            this.getEncounters();
            this.getProcedures();
            this.getMedicationRequests();
            this.getAllergies();
            this.getImmunizations();
            this.getConditions();
            this.getObservations();
        });        
    }

    public previous() {
        this.router.navigate(['/pages/patient']);
    }

    getEncounters() {
        this.fhirService.getAllEncounters(this.patientId).subscribe(data => {
            this.encounters = data.entry!;
        });
    }

    getProcedures() {
        this.fhirService.getAllProcedures(this.patientId).subscribe(data => {
            this.procedures = data.entry!;
        });
    }

    getMedicationRequests() {
        this.fhirService.getAllMedicationRequests(this.patientId).subscribe(data => {
            this.medicationRequests = data.entry!;
        });
    }

    getMedicationAdministrations() {
        this.fhirService.getAllMedicationAdministrations(this.patientId).subscribe(data => {
            this.medicationAdministrations = data.entry!;
        });
    }

    getMedicationDispenses() {
        this.fhirService.getAllMedicationDispenses(this.patientId).subscribe(data => {
            this.medicationDispenses = data.entry!;
        });
    }

    getMedicationStatements() {
        this.fhirService.getAllMedicationStatements(this.patientId).subscribe(data => {
            this.medicationStatements = data.entry!;
        });
    }

    getAllergies() {
        this.fhirService.getAllAllergies(this.patientId).subscribe(data => {
            this.allergies = data.entry!;
        });
    }

    getImmunizations() {
        this.fhirService.getAllImmunizations(this.patientId).subscribe(data => {
            this.immunizations = data.entry!;
        });
    }

    getConditions() {
        this.fhirService.getAllConditions(this.patientId).subscribe(data => {
            this.conditions = data.entry!;
        });
    }

    getObservations() {
        this.fhirService.getAllObservations(this.patientId).subscribe(data => {
            this.observations = data.entry!;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
