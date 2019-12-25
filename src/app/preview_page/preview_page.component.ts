import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from '../data/formdata.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceInvoker } from '../services/service.invoker.service';
import { serviceConfigurations } from '../services/configurations';
import { cValidators } from '../custom.validator';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake'
@Component({
	selector: 'preview_page',
	templateUrl: './preview_page.component.html',
	styleUrls: ['./preview_page.component.css']
})
export class preview_pageComponent {

	@ViewChild('genPDF') genPDF: ElementRef;
	preview_page_form1: FormGroup;
	preview_page_form1_submitted = false;
	serviceResData: any;
	configs: any;
	response: any;

	constructor(private formDataService: FormDataService, private fb: FormBuilder, private router: Router, private service: ServiceInvoker) {

		this.preview_page_form1 = fb.group({
		});

		this.formDataService.setFormData(this.preview_page_form1);
		this.configs = new serviceConfigurations();
	}


	get formRef1() { return this.preview_page_form1.controls; }

	preview_page_form1_onSubmit() {
		this.navigateToComponent(null);
	}

	// No services available

	navigateToComponent(navigatePath: string) {
		this.preview_page_form1_submitted = true;
		if (this.preview_page_form1.valid) {
			// Save the form data
			this.formDataService.saveFormData(this.preview_page_form1.value);
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
	pdf() {
		const html = htmlToPdfmake(this.genPDF.nativeElement.innerHTML);
		const docDefinition = {
		  content: [
			html
		  ]
		};
		console.log(docDefinition)
		pdfMake.createPdf(docDefinition).download();
	  }
	
	
	  print() {
		const html = htmlToPdfmake(this.genPDF.nativeElement.innerHTML);
		const docDefinition = {
		  content: [
			html
		  ]
		};
		const pdfDocGenerator = pdfMake.createPdf(docDefinition);
		console.log(pdfDocGenerator);
		const iframe = document.createElement('iframe');
		  iframe.style.display = 'none';
		  iframe.src = pdfDocGenerator;
		  document.body.appendChild(iframe);
		  iframe.contentWindow.print();
	  }
}
