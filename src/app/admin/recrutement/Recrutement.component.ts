import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../../service/recrutement.service';
import { Recrutement } from '../../recrutement/Recrutement';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';


declare interface Rowlist {
  value: string;
  title: string;
}
@Component({
  providers: [SidebarComponent],
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.scss']
})


export class RecrutementComponent implements OnInit {
  untreated = 0;
  categorySelected = false;
  categoryid = '';
  label: string;
  recrutements: Array<Recrutement> = [];
  category: [];
  ads: any[];
  /* adslist: [{ value: '', title: 'all' }]; */

  adslist: Array<Rowlist> = [];
  showCat = false;
  showDetail = false;
  errorMessage: string;
  selectedCategory = 'Selectioner une catégorie';
  detailInfo = {
    id: '',
    genre: '',
    prenom: '',
    nom: '',
    pays: '',
    ville: '',
    adresse: '',
    code_postal: '',
    email: '',
    telephone: '',
    sujet: '',
    motivation: '',
    cv: '',
    approved: null,
    profiles: []
  };
  settings = {
    delete: {
      deleteButtonContent: '<i class="fas fa-trash btn-sm btn-danger"></i>',
      /* saveButtonContent: '<i class="fas fa-check btn-sm btn-success"></i>',
      cancelButtonContent: '<i class="fas fa-close btn-sm btn-danger"></i>', */
      confirmDelete: true
    },
    columns: {
      nom: {
        title: 'Nom'
      },
      prenom: {
        title: 'Prenom'
      },
      email: {
        title: 'Email'
      },
      pays: {
        title: 'Pays'
      },
      genre: {
        title: 'Genre',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Mr', title: 'Mr' },
              { value: 'Mme', title: 'Mme' },
            ],
          },
        }
      },
      ad: {
        title: 'Poste',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: []
          },
        }
      },
      etat: {
        title: 'disponibilité',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: false, title: 'disponible' },
              { value: true, title: 'affecté' },
            ],
          },
        }
      },
      approved: {
        title: 'approuvé',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: true, title: 'approuvé' },
              { value: false, title: 'réfusé' },
              { value: 'en attente', title: 'en attente' },
            ],
          },
        }
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'detail',
          title: '<i class="fas fa-edit btn-sm btn-info"></i>'
        }
      ],
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 5
    },
    attr: {
      class: 'table table-bordered'
    },
  };
  settingsc = {
    delete: {
      deleteButtonContent: '<i class="fas fa-trash btn-sm btn-danger"></i>',
      /* saveButtonContent: '<i class="fas fa-check btn-sm btn-success"></i>',
      cancelButtonContent: '<i class="fas fa-close btn-sm btn-danger"></i>', */
      confirmDelete: true
    },
    columns: {
      label: {
        title: 'Label'
      },
      description: {
        title: 'Description'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 5
    },
    attr: {
      class: 'table table-bordered'
    },
  };
  settings2 = {
    delete: {
      deleteButtonContent: '<i class="btn-sm btn-danger">Refuser</i>',
      /* saveButtonContent: '<i class="fas fa-check btn-sm btn-success"></i>',
      cancelButtonContent: '<i class="fas fa-close btn-sm btn-danger"></i>', */
      confirmDelete: true
    },
    columns: {
      clientName: {
        title: 'Nom'
      },
      clientEmail: {
        title: 'Email'
      },
      status: {
        title: 'Etat',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'pending', title: 'en attente' },
              { value: 'accepted', title: 'accepté' },
              { value: 'refused', title: 'refusé' },
            ],
          },
        }
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'Accepter',
          title: '<i class="btn-sm btn-info">Accepter</i>'
        }
      ],
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 4
    },
    attr: {
      class: 'table table-bordered'
    },
  };
  active;
  errors = [];
  form: FormGroup;
  form2: FormGroup;
  formCategory: FormGroup;
  del: FormGroup;
  show = false;
  loaderButton = false;
  constructor(public sidebarComponent: SidebarComponent,
    public fb: FormBuilder,
    private _recrutementService: RecrutementService,
    private snotifyService: SnotifyService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      entreprise: ['', Validators.required],
      adresse: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
    this.form2 = this.fb.group({
      profile: [''],
    });
    this.formCategory = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
    this.del = this.fb.group({
      name: [''],
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
  }
  uploadFileCategory(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formCategory.patchValue({
      image: file
    });
    this.formCategory.get('image').updateValueAndValidity();
  }

  getRecrutements() {
    this.untreated = 0;
    this._recrutementService.getRecrutements().subscribe(
      data => {
        this.recrutements = data.result;
        this.recrutements.forEach(element => {
          element.ad = element.ad.label;
          if (!element.approved && element.approved !== false) {
            element.approved = 'en attente';

            this.untreated++;
          }
        });
        this.sidebarComponent.getNewRecrutements(this.untreated);
      },
      (error) => this.errorMessage = error
    );
  }
  getCategory() {
    this._recrutementService.getCategory().subscribe(
      data => {
        this.category = data.result;
      },
      (error) => this.errorMessage = error
    );
  }
  getAds() {
    this._recrutementService.getAds().subscribe(
      data => {
        this.ads = data.result;
        this.settings.columns.ad.filter.config.list = [];
        this.ads.forEach(element => {
          const row: Rowlist = {
            value: element.label,
            title: element.label
          };
          this.settings.columns.ad.filter.config.list.push(row);
          this.settings = Object.assign({}, this.settings);


        });
      },
      (error) => this.errorMessage = error
    );
  }
  addCategory() {
    this.loaderButton = true;
    const formData: any = new FormData();
    formData.append('label', this.formCategory.get('label').value);
    formData.append('image', this.formCategory.get('image').value);
    formData.append('description', this.formCategory.get('description').value);

    this._recrutementService.addCategory(formData).subscribe((result => {
      this.getCategory();
      this.showCat = false;
      this.formCategory.reset();
      this.snotifyService.success('Category d\'Annance ajouté', {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.loaderButton = false;
    }), addError => {
      this.errors = addError; console.log(this.errors); this.loaderButton = false; this.formCategory.reset(); this.snotifyService.warning('demande erronée', {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.showCat = false;
    });
  }
  addAd() {
    this.loaderButton = true;
    const formData: any = new FormData();
    formData.append('label', this.form.get('title').value);
    formData.append('entreprise', this.form.get('entreprise').value);
    formData.append('category', this.form.get('category').value);
    formData.append('adresse', this.form.get('adresse').value);
    formData.append('image', this.form.get('image').value);
    formData.append('description', this.form.get('description').value);

    this._recrutementService.addAd(formData).subscribe((result => {
      this.getAds();
      this.show = false;
      this.form.reset();
      this.snotifyService.success('Annance ajouté', {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.loaderButton = false;
    }), addError => {
      this.errors = addError; console.log(this.errors); this.loaderButton = false; this.form.reset(); this.snotifyService.warning('demande erronée', {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    });
  }

  ngOnInit() {
    this.getRecrutements();
    this.getAds();
    this.getCategory();
  }
  deleteRecrutement(event) {
    this._recrutementService.deleteRecrutement(event.data.id).subscribe(
      result => {
        this.getRecrutements();
        this.snotifyService.success('Recrutement supprimé', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });


      }
    );
  }
  acceptRecrutementRequest(id) {
    this._recrutementService.acceptRecrutement(id).subscribe(
      result => {
        this.getRecrutements();
        this.detailInfo.approved = true;
        this.snotifyService.success('Recrutement accepté', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });


      }
    );
  }
  refuseRecrutementRequest(id) {
    this._recrutementService.refuseRecrutement(id).subscribe(
      result => {
        this.getRecrutements();
        this.detailInfo.approved = false;
        this.snotifyService.success('Recrutement réfusé', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });


      }
    );
  }

  acceptRecrutement(event) {
    this._recrutementService.accept(event.data.id).subscribe(
      result => {
        this.getRecrutements();
        this.snotifyService.success('demande d\'acces accepté ', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        const newdata = event.data;
        newdata.status = 'accepted';
        event.source.update(event.data, newdata);
      }
    );
  }

  refuseRecrutement(event) {
    this._recrutementService.refuse(event.data.id).subscribe(
      result => {
        this.getRecrutements();
        this.snotifyService.success('demande d\'acces refusé ', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        const newdata = event.data;
        newdata.status = 'refused';
        event.source.update(event.data, newdata);
      }
    );
  }
  detailRecrutement(event) {
    this.showDetail = true;
    this.detailInfo.id = event.data.id;
    this.detailInfo.genre = event.data.genre;
    this.detailInfo.prenom = event.data.prenom;
    this.detailInfo.nom = event.data.nom;
    this.detailInfo.pays = event.data.pays;
    this.detailInfo.ville = event.data.ville;
    this.detailInfo.adresse = event.data.adresse;
    this.detailInfo.code_postal = event.data.code_postal;
    this.detailInfo.email = event.data.email;
    this.detailInfo.telephone = event.data.telephone;
    this.detailInfo.sujet = event.data.sujet;
    this.detailInfo.motivation = event.data.motivation;
    this.detailInfo.cv = event.data.cv;
    this.detailInfo.approved = event.data.approved;
    this.detailInfo.profiles = event.data.profiles;
    this.detailInfo.profiles.forEach(pr => {
      pr.clientName = pr.user.username;
      pr.clientEmail = pr.user.email;
      pr.recrutementId = event.data.id;
    });
  }
  deleteAd(id) {
    this._recrutementService.deleteAd(id).subscribe(
      result => {
        this.getAds();
        this.snotifyService.success('Annance supprimé', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    );
  }
  deleteCategory(event) {
    this._recrutementService.deleteCategory(event.data.id).subscribe(
      result => {
        this.getCategory();
        this.snotifyService.success('Categorie supprimé', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    );
  }
  openCV(cv) {
    window.open('http://localhost/post-Rest-symfony-master/web/uploads/' + cv, '_blank')
    /* window.open('https://testinghost.yj.fr/web/uploads/' + cv, '_blank'); */
    /* window.open('https://novusvia.be/web/uploads/' + cv, '_blank'); */
  }
  categoryTouched() {
    this.form.controls['category'].markAsTouched();
  }

  affectpost(cat) {
    this.categoryid = cat.id;
    this.form.controls['category'].setValue(cat.id);
    this.categorySelected = true;
    this.selectedCategory = cat.label;

  }
}

