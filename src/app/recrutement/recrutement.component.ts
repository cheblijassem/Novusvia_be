import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RecrutementService } from '../service/recrutement.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.css']
})
export class RecrutementComponent implements OnInit {
  closeResult: string;
  clicked = false;
  op1 = false;
  op2 = false;
  c = {
    jobs: [],
    id: '',
    label: ''
  };
  isOpen = false;
  @Input() placeHolder = 'Pays';
  selectedGenre = '';

  ads: any[];
  category: any[];
  show = false;
  show2 = false;
  errors = [];
  chosenPost: any;
  posteName: string;
  errorMessage: string;
  form: FormGroup;
  loading = true;
  loaderButton = false;
  resolvedCaptcha = false;
  constructor(private modalService: NgbModal, private ref: ChangeDetectorRef,
    public fb: FormBuilder,
    private _recrutementService: RecrutementService,
    private router: Router,
    private snotifyService: SnotifyService) {
    this.form = this.fb.group({
      genre: [''],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      code_postal: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      sujet: [''],
      motivation: ['', Validators.required],
      cv: [null, Validators.required]

    });
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      cv: file
    });
    this.form.get('cv').updateValueAndValidity()
  }


  addRecrutement() {
    this.loaderButton = true;
    const formData: any = new FormData();
    formData.append('genre', this.form.get('genre').value);
    formData.append('prenom', this.form.get('prenom').value);
    formData.append('nom', this.form.get('nom').value);
    formData.append('pays', this.form.get('pays').value);
    formData.append('ville', this.form.get('ville').value);
    formData.append('adresse', this.form.get('adresse').value);
    formData.append('code_postal', this.form.get('code_postal').value);
    formData.append('email', this.form.get('email').value);
    formData.append('telephone', this.form.get('telephone').value);
    formData.append('sujet', this.chosenPost.id);
    formData.append('motivation', this.form.get('motivation').value);
    formData.append('cv', this.form.get('cv').value);

    this._recrutementService.addRecrutement(formData).subscribe((result => {
      this.show = false;
      this.form.reset();
      this.snotifyService.success('votre demande à été bien envoyé, nous vous contactons dans le plus bref délais', 'Merci', {
        timeout: 0,
        showProgressBar: false,
        closeOnClick: false,
        position: SnotifyPosition.centerCenter,
        buttons: [
          { text: 'Fermer', action: (toast) => { console.log('Clicked: No'); this.snotifyService.remove(toast.id); }, bold: true },
        ]
      });
      this.loaderButton = false;
    }), addError => { this.errors = addError; console.log(this.errors); });
  }
  addRecrutement2() {
    this.loaderButton = true;
    const formData: any = new FormData();
    formData.append('genre', this.form.get('genre').value);
    formData.append('prenom', this.form.get('prenom').value);
    formData.append('nom', this.form.get('nom').value);
    formData.append('pays', this.form.get('pays').value);
    formData.append('ville', this.form.get('ville').value);
    formData.append('adresse', this.form.get('adresse').value);
    formData.append('code_postal', this.form.get('code_postal').value);
    formData.append('email', this.form.get('email').value);
    formData.append('telephone', this.form.get('telephone').value);
    formData.append('sujet', 0);
    formData.append('motivation', this.form.get('motivation').value);
    formData.append('cv', this.form.get('cv').value);

    this._recrutementService.addRecrutement(formData).subscribe((result => {
      this.show2 = false;
      this.form.reset();
      this.snotifyService.success('votre demande à été bien envoyé, nous vous contactons dans le plus bref délais', 'Merci', {
        timeout: 0,
        showProgressBar: false,
        closeOnClick: false,
        position: SnotifyPosition.centerCenter,
        buttons: [
          { text: 'Fermer', action: (toast) => { console.log('Clicked: No'); this.snotifyService.remove(toast.id); }, bold: true },
        ]
      });
      this.loaderButton = false;
    }), addError => { this.errors = addError; console.log(this.errors); });
  }

  getAds() {
    this._recrutementService.getAds().subscribe(
      data => {
        this.ads = data.result;
      },
      (error) => this.errorMessage = error
    );
  }

  getCategory() {
    this._recrutementService.getCategory().subscribe(
      data => {
        this.loading = false;
        this.category = data.result;
        console.log(this.category);
      },
      (error) => this.errorMessage = error
    );
  }
  openmodal(ad) {
    this.chosenPost = ad;
    this.posteName = ad.label;
    this.show = true;
  }
  openmodal2() {
    this.show2 = true;
  }
  onCountrySelected($event: Country) {
    this.form.controls['pays'].setValue($event.name);
    console.log(this.form.controls['pays'].value);
  }
  expend(cat) {
    this.c.id = cat.id;
    this.c.jobs = cat.jobs;
    this.c.label = this.c.label;
    this.isOpen = true;
  }
  close() {
    this.c.id = null;
    this.c.jobs = [];
    this.c.label = null;
    this.isOpen = false;
  }
  paysSelected() {
    this.form.controls['pays'].markAsTouched();
  }
  fileSelected() {
    this.form.controls['cv'].markAsTouched();
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.resolvedCaptcha = true;
  }
  ngOnInit() {
    this.getAds();
    this.getCategory();
  }
  option1() {
    this.clicked = true;
    this.op1 = true;
    this.op2 = false;
  }
  option2() {
    this.clicked = true;
    this.op2 = true;
    this.op1 = false;
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === 'lg' && type === '') {
      this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
