import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecordComponent } from './record.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RecordComponent }
	])],
	exports: [RouterModule]
})
export class RecordRoutingModule { }
