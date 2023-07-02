import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
        { path: 'record/:patientId', loadChildren: () => import('./record/record.module').then(m => m.RecordModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
