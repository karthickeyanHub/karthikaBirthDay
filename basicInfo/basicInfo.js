import { LightningElement, track } from 'lwc';
import getRecordId1 from '@salesforce/apex/GetUserDetails.getRecordId1';
import getCertificationDetails from '@salesforce/apex/GetUserDetails.getCertificationDetails';

export default class BasicInfo extends LightningElement {
    @track isLoading = false;
    MAX_FILE_SIZE = 5000000; //Max file size 5.0 MB
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    content;

    @track stepValueInteger = 1;
    @track stepValue='1';
    @track screenOne=true;
    @track screenTwo=false;
    @track screenThree=false;
    @track screenFour=false;
    @track screenFive=false;
    @track screenSix=false;
    @track isNextButtonDisabled=false;
    @track isPrevButtonDisabled=true;
    get acceptedFormats() {
        return ['.jpg', '.png'];
    }
    constructor() {
        super();
        getCertificationDetails({}).then(result => {
            this.certificationName=result.Names;
            this.certifications = result.certificationList;
            this.error = undefined;
            if(this.certifications !== undefined  ) {
                this.certifications = result.certificationList;
                this.certificationName= result.Names;
               // eslint-disable-next-line no-console
               console.log("this.recordId1 "+this.recordId1);
            }
        })
        .catch(error => {
            this.message = undefined;
            this.error = error;
            // eslint-disable-next-line no-console
            console.log("error constructor", JSON.stringify(this.error));
       });
        getRecordId1({}).then(result => {
            this.message = result.recordId;
            this.checkBoxTrue1= result.checkBox;
            this.error = undefined;
            if(this.message !== undefined  ) {
               this.recordId1=this.message;
               // eslint-disable-next-line no-console
               console.log("this.recordId1 "+this.recordId1);
            }
        })
        .catch(error => {
            this.message = undefined;
            this.error = error;
            // eslint-disable-next-line no-console
            console.log("error 1", JSON.stringify(this.error));
       });
    }
    handleNext(){
        
        this.screenOne=false;
            this.screenTwo=false;
            this.screenThree=false;
            this.screenFour=false;
            this.screenFive=false;
            this.screenSix=false;
            this.isNextButtonDisabled=false;
            this.isPrevButtonDisabled=false;
        // eslint-disable-next-line no-console
        console.log("Next");
        if(this.stepValue==='1'){
            this.screenTwo=true;
        }
        else if(this.stepValue==='2'){
            this.screenThree=true;
        }
        else if(this.stepValue==='3'){
            this.screenFour=true;
        }
        else if(this.stepValue==='4'){
            this.screenFive=true;
        }
        else if(this.stepValue==='5'){
            this.screenSix=true;
            this.isNextButtonDisabled=true;
        }
        else if(this.stepValue==='6'){
            this.screenSix=true;
            this.isNextButtonDisabled=true;
        }
        else if(this.stepValueInteger<6){
            this.stepValueInteger=this.stepValueInteger+1;
            this.stepValue=this.stepValueInteger.toString();
        }
    }
    handlePrevious(){
        this.screenOne=false;
            this.screenTwo=false;
            this.screenThree=false;
            this.screenFour=false;
            this.screenFive=false;
            this.screenSix=false;
            this.isNextButtonDisabled=false;
            this.isPrevButtonDisabled=false;
        // eslint-disable-next-line no-console
        console.log("Previous");
        
        if(this.stepValue==='1'){
            this.screenOne=true;
            this.isPrevButtonDisabled=true;
        }
        else if(this.stepValue==='2'){
            this.screenOne=true;
            this.isPrevButtonDisabled=true;
        }
        else if(this.stepValue==='3'){
            this.screenTwo=true;
        }
        else if(this.stepValue==='4'){
            this.screenThree=true;
        }
        else if(this.stepValue==='5'){
            this.screenFour=true;
        }
        else if(this.stepValue==='6'){
            this.screenFive=true;
        }
        if(this.stepValueInteger>1){
            this.stepValueInteger=this.stepValueInteger-1;
            this.stepValue=this.stepValueInteger.toString();
        }
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        // eslint-disable-next-line no-alert
        alert("No. of files uploaded : " + uploadedFiles.length);
    }
   
}