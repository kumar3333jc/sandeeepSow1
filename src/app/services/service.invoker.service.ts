import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { ApplicationService } from '../services/application.service';
import { environment } from "../../environments/environment.prod"
import { FormDataService } from '../data/formdata.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceInvoker {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient,private formDataService: FormDataService,private applicationService: ApplicationService) { }
  token: string = environment.key;
  public callApi(method: string,url: string,input: any,options: any){
    console.log("inside callApi")
    if(!options){
      options={
        headers: this.httpOptions,
        observe: 'body',
        responseType: 'json',
        async: false,
      }
    }
    if(options.async==undefined){
      options.async=true;
    }
    options.body=input;
    if (options.async == true) {
      return this.asyncService(method,url,options);
    }
    else {      
      return this.http.request(method,url,options)
        .pipe(
          map((res) => {
          return res;
        }),
        retry(options.retry|0),
          catchError(this.handleError)
        )
    }
  }

  async asyncService(method,url,options) {
    return await this.http.request(method,url,options)
      .pipe(map((res) => {
        return res
      }), catchError(this.handleError)).toPromise()
  }

  handleError(error: HttpErrorResponse) {
	  swal.fire({
		  type: 'error',
		  title: 'Oops...',
		  text: 'Server Not Found,Please try again!!',
		  });
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getRequest(url,input,options){
    return this.callApi("GET", url,input,options);
  }
  public postRequest(url,input,options){
    return this.callApi("POST", url,input,options);
  }
  public putRequest(url,input,options){
    return this.callApi("PUT", url,input,options);
  }  
  public deleteRequest(url,input,options){
    return this.callApi("DELETE", url,input,options);
  }

  dataEncryption(reponse:any)
  {
    const enc = this.encryptUsingAES256(reponse)
    this.applicationService.addItem(enc).subscribe((data) => {
      if (data.data) {
        swal.fire({
          type: 'success',
          title: 'success',
          text: 'Saved Sucessfully'
        });
      }
      else{
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
    }, (err) => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
    })
  }


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
      console.log("encrypted.toString()"+encrypted.toString());
		return encrypted.toString();
	}


  decryptUsingAES256(data: any) {
    console.log("decryptUsingAES256   >   "+data);
    let _key = CryptoJS.enc.Utf8.parse(this.token);
    let _iv = CryptoJS.enc.Utf8.parse(this.token);
    console.log("data[0].form_value"+data[0].form_value)
    const decrypted = CryptoJS.AES.decrypt(
      data[0].form_value, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
     console.log("decrypted"+decrypted)
      return decrypted
  }

  dataDcrypt()
  {
   console.log("dtatDecrypt");
    this.applicationService.getItem().subscribe((data) => {
      console.log("dataDcrypt   >      >>"+data+ "dta   <<"+data.data )
      const enc = this.decryptUsingAES256(data.data)
      if (data.data) {
        swal.fire({
          type: 'success',
          title: 'success',
          text: 'Saved Sucessfully'
        });
      }
      else{
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
    }, (err) => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
    })

  }


  saveDraft(formId,formValue)
  {
  const FormValue=  this.encryptUsingAES256(formValue)
    this.applicationService.addItemById(formId,FormValue).subscribe(data=>{
  console.log("SaveDraft  "+data.data)
})

  }

  getDraft(formValue)
  {
 
 return this.applicationService.getItemById(formValue).subscribe((data) => {

    return  this.decryptUsingAES256(data.data)
 
  })
  }
}