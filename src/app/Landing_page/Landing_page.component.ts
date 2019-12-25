import { Component } from '@angular/core';

import { FormDataService } from '../data/formdata.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceInvoker } from '../services/service.invoker.service';
import { serviceConfigurations } from '../services/configurations';
import { cValidators } from '../custom.validator';
import { ElectronService } from 'ngx-electron';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'Landing_page',
  templateUrl: './Landing_page.component.html',
  styleUrls: ['./Landing_page.component.css']
})
export class Landing_pageComponent{



  Landing_page_form1:FormGroup;
  Landing_page_form1_submitted=false;
  serviceResData:any;
  configs:any;
  response:any;
	onlineFlag: boolean;
	version: any;

  constructor(private formDataService: FormDataService, private fb: FormBuilder, private router: Router, private service: ServiceInvoker, private as: ApplicationService, private es: ElectronService) {

	this.Landing_page_form1 = fb.group({
	});

	this.formDataService.setFormData(this.Landing_page_form1);
	this.configs = new serviceConfigurations();
  }
	

  get formRef1() { return this.Landing_page_form1.controls; }

  Landing_page_form1_onSubmit() {
	this.navigateToComponent(null);
  }

// No services available

  navigateToComponent(navigatePath: string) {
	this.Landing_page_form1_submitted=true;
	if (this.Landing_page_form1.valid) {
		// Save the form data
		this.formDataService.saveFormData(this.Landing_page_form1.value);
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

	const notification = document.getElementById('notification');
   
    const restartButton = document.getElementById('install-Upd');
    this.checkVersion();
    if (navigator.onLine) {
      this.onlineFlag = true;
      this.es.ipcRenderer.on('update_available', (event) => {
        const message = document.getElementById('message');
        console.log('avail-triggered');
        this.es.ipcRenderer.removeAllListeners('update_available');
        message.innerText = 'A new update is available. Downloading now...';
        notification.classList.remove('hidden');
        console.log(event);
      });
      this.es.ipcRenderer.on('update-not-available', (event) => {
        const message = document.getElementById('message');
        this.es.ipcRenderer.removeAllListeners('update-not-available');
        message.innerText = 'your application is upto date';
        notification.classList.remove('hidden');
        console.log('not-avail-triggered');
        console.log(event);
      });
      this.es.ipcRenderer.on('download-progress', (event, progress) => {
        const message = document.getElementById('message');
        console.log('progress')
        console.log("progggg=====>" + progress.percent);
        this.es.ipcRenderer.removeAllListeners('download-progress');
        message.innerText = 'Downloading';
        notification.classList.remove('hidden');
      });
      this.es.ipcRenderer.on('update_downloaded', (event) => {
        const message = document.getElementById('message');
        console.log('downtriggered')
        this.es.ipcRenderer.removeAllListeners('update_downloaded');
        message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
        restartButton.classList.remove('hidden');
        notification.classList.remove('hidden');
        console.log(event);
      });
      this.es.ipcRenderer.on('error', () => {
        console.log('error')
      });
    }

	try{
		document.querySelector("select[name='language']").dispatchEvent(new Event('change'));
	}catch(e){
		console.error(e);
	}
  }
  checkVersion() {
    this.as.getVersion().subscribe((data) => {
      this.version = data.version;
	})
}
restart() {
	this.es.ipcRenderer.send('restart_app');
	
  }
}
