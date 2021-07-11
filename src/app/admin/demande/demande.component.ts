import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SnotifyService } from 'ng-snotify';
import { RecrutementService } from 'src/app/service/recrutement.service';
import { Recrutement } from 'src/app/recrutement/Recrutement';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@Component({
  providers: [SidebarComponent],
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  untreated = 0;
  errorMessage: string;
  showDetail = false;
  detailInfo = {
    id: '',
    username: '',
    profile: '',
    recrutement: {
      genre: '',
      prenom: '',
      nom: '',
      email: '',
    },
    status: ''
  };
  demandes = [];
  recrutements: Array<Recrutement> = [];
  settings = {
    delete: {
      deleteButtonContent: '<i class="fas fa-trash btn-sm btn-danger"></i>',
      /* saveButtonContent: '<i class="fas fa-check btn-sm btn-success"></i>',
      cancelButtonContent: '<i class="fas fa-close btn-sm btn-danger"></i>', */
      confirmDelete: true
    },
    columns: {
      username: {
        title: 'Username'
      },
      profile: {
        title: 'Profile'
      },
      status: {
        title: 'Status',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'en attente', title: 'en attente' },
              { value: 'réfusé', title: 'réfusé' },
              { value: 'accepté', title: 'accepté' }
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
          name: 'detail',
          title: '<i class="fas fa-edit btn-sm btn-info"></i>'
        }
      ],
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 10
    },
    attr: {
      class: 'table table-bordered'
    },
  };
  settings2 = {
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
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'detail',
          title: '<i class="fas fa-check btn-sm btn-info"></i>'
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

  constructor(public sidebarComponent: SidebarComponent,
    private snotifyService: SnotifyService,
    private _recrutementService: RecrutementService) { }

  ngOnInit(): void {
    this.getDemandes();
    this.getRecrutements();
  }

  getRecrutements() {
    this._recrutementService.getRecrutements().subscribe(
      data => {
        console.log(this.recrutements);
        this.recrutements = data.result;
        this.recrutements.forEach(element => {
          element.ad = element.ad.label;
        });
        console.log(this.recrutements);
      },
      (error) => this.errorMessage = error
    );
  }
  getDemandes() {
    this.untreated = 0;
    this._recrutementService.getDemandes().subscribe(
      data => {
        this.demandes = data.result;

        this.demandes.forEach(element => {
          element.username = element.user.username;
          element.profile = element.ad.label;
          if (element.status === 'en attente') {
            this.untreated++;
          }
        });
        this.sidebarComponent.getNewDemandes(this.untreated);
      },
      (error) => this.errorMessage = error
    );
  }
  detailDemande(event) {
    console.log(event.data)
    this.showDetail = true;
    this.detailInfo.id = event.data.id;
    this.detailInfo.username = event.data.username;
    this.detailInfo.profile = event.data.profile;
    this.detailInfo.status = event.data.status;
    this.detailInfo.recrutement.nom = event.data.recrutement.nom;
    this.detailInfo.recrutement.prenom = event.data.recrutement.prenom;
    this.detailInfo.recrutement.genre = event.data.recrutement.genre;
    this.detailInfo.recrutement.email = event.data.recrutement.email;
  }

  deleteDemande(event) {
    this._recrutementService.deleteDemande(event.data.id).subscribe(
      result => {
        this.getDemandes();
        this.snotifyService.success('demande supprimé', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });



      }
    );
  }
  affecterRecrutement(id, recrutement) {
    this._recrutementService.affecterRecrutement(id, recrutement.data.id).subscribe(
      result => {
        this.getDemandes();
        this.getRecrutements();
        this.detailInfo.status = 'accepté';
        this.snotifyService.success('employé affecté au client', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    );
  }

}
