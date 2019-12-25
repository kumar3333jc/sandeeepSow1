import { Component } from '@angular/core';

import { FormDataService } from '../data/formdata.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceInvoker } from '../services/service.invoker.service';
import { serviceConfigurations } from '../services/configurations';
import { cValidators } from '../custom.validator';
import * as CryptoJS from 'crypto-js';
import { environment } from "../../environments/environment.prod"
import { ApplicationService } from '../services/application.service';

@Component({
	selector: 'donation80gga',
	templateUrl: './donation80gga.component.html',
	styleUrls: ['./donation80gga.component.css']
})
export class donation80ggaComponent {


	token: string = environment.key;
	donation80gga_form1: FormGroup;
	donation80gga_form1_submitted = false;
	serviceResData: any;
	configs: any;
	response: any;

	constructor(private formDataService: FormDataService, private fb: FormBuilder, private router: Router, private service: ServiceInvoker, private applicationService: ApplicationService) {

		this.donation80gga_form1 = fb.group({
		});

		this.formDataService.setFormData(this.donation80gga_form1);
		this.configs = new serviceConfigurations();
	}


	get formRef1() { return this.donation80gga_form1.controls; }

	donation80gga_form1_onSubmit() {
		this.navigateToComponent(null);
	}


	//encrypt
	encryptUsingAES256(data: any) {
		let _key = CryptoJS.enc.Utf8.parse(this.token);
		let _iv = CryptoJS.enc.Utf8.parse(this.token);
		let encrypted = CryptoJS.AES.encrypt(
			JSON.stringify(data), _key, {
				keySize: 16,
				iv: _iv,
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
		return encrypted.toString();
	}

	// No services available

	navigateToComponent(navigatePath: string) {
		this.donation80gga_form1_submitted = true;
		if (this.donation80gga_form1.valid) {
			// Save the form data
			this.formDataService.saveFormData(this.donation80gga_form1.value);
			// Navigate to the component
			if (navigatePath) {
				this.router.navigate([navigatePath]);
			} else {
				this.response = this.formDataService.getFormData()
				this.service.dataEncryption(this.response)


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
	decrypt()
	{
		this.service.dataDcrypt()
	}
}
