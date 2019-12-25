import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';

import { PageNotFoundComponent } from './page_not_found/page_not_found.component';
import { Landing_pageComponent } from './Landing_page/Landing_page.component';
import { Index_PageComponent } from './Index_Page/Index_Page.component';
import { DraftComponent } from './Draft/Draft.component';
import { ITR_InstructionsComponent } from './ITR_Instructions/ITR_Instructions.component';
import { ITR_GeneralinfoComponent } from './ITR_Generalinfo/ITR_Generalinfo.component';
import { ComputationITComponent } from './ComputationIT/ComputationIT.component';
import { tax_detailsComponent } from './tax_details/tax_details.component';
import { TP_VerificationComponent } from './TP_Verification/TP_Verification.component';
import { Donation80gComponent } from './Donation80g/Donation80g.component';
import { donation80ggaComponent } from './donation80gga/donation80gga.component';
import { preview_pageComponent } from './preview_page/preview_page.component';
import { login_pageComponent } from './login_page/login_page.component';
import { End_ScreenComponent } from './End_Screen/End_Screen.component';


const appRoutes: Routes = [{path:'',redirectTo:'Landing_page',pathMatch:'full'},{path:'',redirectTo:'Index_Page',pathMatch:'full'},{path:'Draft',component:DraftComponent},{path:'ITR_Instructions',component:ITR_InstructionsComponent},{path:'ITR_Generalinfo',component:ITR_GeneralinfoComponent},{path:'ComputationIT',component:ComputationITComponent},{path:'tax_details',component:tax_detailsComponent},{path:'TP_Verification',component:TP_VerificationComponent},{path:'Donation80g',component:Donation80gComponent},{path:'preview_page',component:preview_pageComponent},{path:'End_Screen',component:End_ScreenComponent},{path:'login_page',component:login_pageComponent},{path:'donation80gga',component:donation80ggaComponent},{path:'Index_Page',component:Index_PageComponent},{path:'Landing_page',component:Landing_pageComponent},{'path':'**',component:PageNotFoundComponent}];

@NgModule({
  declarations: [
	PageNotFoundComponent,
	Landing_pageComponent,
	Index_PageComponent,
	DraftComponent,
	ITR_InstructionsComponent,
	ITR_GeneralinfoComponent,
	ComputationITComponent,
	tax_detailsComponent,
	TP_VerificationComponent,
	Donation80gComponent,
	donation80ggaComponent,
	preview_pageComponent,
	login_pageComponent,
	End_ScreenComponent
	],
  imports: [
	ReactiveFormsModule, 
	CommonModule, 
	NgxScrollToFirstInvalidModule,
	RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
