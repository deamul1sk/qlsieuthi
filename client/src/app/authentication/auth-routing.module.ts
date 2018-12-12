import { SsoProcessingComponent } from './sso-processing/sso-processing.component';
import { SsoComponent } from './sso/sso.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../i18n-setting';
import { HttpClient } from '@angular/common/http';


const routes: Routes = [
    { path: '', component: SsoComponent },
    { path: 'processing', component: SsoProcessingComponent }
];

@NgModule({
    declarations: [SsoComponent, SsoProcessingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        HttpModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            },
            missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
            isolate: false
        })
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
