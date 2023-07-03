import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { FhirService } from './demo/service/fhir.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {

    return new TranslateHttpLoader(http,
  
      './assets/i18n/',
  
      '.json');
  
  }

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TranslateModule.forRoot({
            isolate: false,
            defaultLanguage: 'en',
      
            loader: {
      
              provide: TranslateLoader,
      
              useFactory: HttpLoaderFactory,
      
              deps: [HttpClient],
      
            },
      
          }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        FhirService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
