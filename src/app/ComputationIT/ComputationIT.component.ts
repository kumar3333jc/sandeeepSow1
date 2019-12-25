import { Component } from '@angular/core';

import { FormDataService } from '../data/formdata.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceInvoker } from '../services/service.invoker.service';
import { serviceConfigurations } from '../services/configurations';
import { cValidators } from '../custom.validator';

@Component({
  selector: 'ComputationIT',
  templateUrl: './ComputationIT.component.html',
  styleUrls: ['./ComputationIT.component.css']
})
export class ComputationITComponent{



  ComputationIT_form1:FormGroup;
  ComputationIT_form1_submitted=false;
  serviceResData:any;
  configs:any;
  response:any;

  constructor(private formDataService: FormDataService, private fb: FormBuilder, private router: Router, private service: ServiceInvoker) {

	this.ComputationIT_form1 = fb.group({
	});

	this.formDataService.setFormData(this.ComputationIT_form1);
	this.configs = new serviceConfigurations();
  }
	

  get formRef1() { return this.ComputationIT_form1.controls; }

  ComputationIT_form1_onSubmit() {
	this.navigateToComponent(null);
  }

// No services available

  navigateToComponent(navigatePath: string) {
	this.ComputationIT_form1_submitted=true;
	if (this.ComputationIT_form1.valid) {
		// Save the form data
		this.formDataService.saveFormData(this.ComputationIT_form1.value);
		// Navigate to the component
		if(navigatePath){
			this.router.navigate([navigatePath]);
		}else{
			this.response=this.service.postRequest(this.configs.baseUrl+this.configs.serviceUrl,this.formDataService.getFormData(),null);
			this.response.subscribe(data=>{
				swal.fire({
					type: 'success',
					title: 'success',
					text:data.message
				});
			});
		}
	}

  }

  ngOnInit() {

	try{
		document.querySelector("select[name='language']").dispatchEvent(new Event('change'));
	}catch(e){
		console.error(e);
	}
  }
}
