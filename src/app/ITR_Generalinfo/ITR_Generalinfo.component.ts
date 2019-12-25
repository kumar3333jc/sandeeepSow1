import { Component } from '@angular/core';
import { FormDataService } from '../data/formdata.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceInvoker } from '../services/service.invoker.service';
import { serviceConfigurations } from '../services/configurations';
import { cValidators } from '../custom.validator';

@Component({
	selector: 'ITR_Generalinfo',
	templateUrl: './ITR_Generalinfo.component.html',
	styleUrls: ['./ITR_Generalinfo.component.css']
})
export class ITR_GeneralinfoComponent {



	ITR_Generalinfo_form1: FormGroup;
	ITR_Generalinfo_form1_submitted = false;
	serviceResData: any;
	configs: any;
	response: any;

	constructor(private formDataService: FormDataService, private fb: FormBuilder, private router: Router, private service: ServiceInvoker) {

		this.ITR_Generalinfo_form1 = fb.group({
			General_validation_PAN: [null, [cValidators('General_validation_PAN')]],
			General_validation_First_Name: [null, [cValidators('General_validation_First_Name')]],
			General_validation_Last_Name: [null, [cValidators('General_validation_Last_Name')]]
		});

		this.formDataService.setFormData(this.ITR_Generalinfo_form1);
		this.configs = new serviceConfigurations();
	}


	get formRef1() { return this.ITR_Generalinfo_form1.controls; }

	ITR_Generalinfo_form1_onSubmit() {
		this.navigateToComponent(null);
	}
	// No services available
	navigateToComponent(navigatePath: string) {
		this.ITR_Generalinfo_form1_submitted = true;
		if (this.ITR_Generalinfo_form1.valid) {
			// Save the form data
			this.formDataService.saveFormData(this.ITR_Generalinfo_form1.value);
			// Navigate to the component
			if (navigatePath) {
				this.router.navigate([navigatePath]);
			} else {
				this.response = this.service.postRequest(this.configs.baseUrl + this.configs.serviceUrl, this.formDataService.getFormData(), null);
				this.response.subscribe(data => {
					swal.fire({
						type: 'success',
						title: 'success',
						text: data.message
					});
				});
			}
		}

	}

	ngOnInit() {
		try {
			document.querySelector("select[name='language']").dispatchEvent(new Event('change'));
		} catch (e) {
			console.error(e);
		}
	}
	draft() {
		this.service.saveDraft('ITR_Generalinfo_form1', this.ITR_Generalinfo_form1.value)
	}
	getDraft() {
		this.service.getDraft('ITR_Generalinfo_form1')
		console.log(this.service.getDraft('ITR_Generalinfo_form1'))
		this.ITR_Generalinfo_form1.setValue(this.service.getDraft('ITR_Generalinfo_form1'))
	}
}