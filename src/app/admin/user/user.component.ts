import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  errorMessage: string;
  showDetail = false;
  detailInfo = {
    id: '',
    username: '',
    email: '',
    detail: '',
    enabled: false
  };
  inscrits = [];
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
      email: {
        title: 'Email'
      },
      detail: {
        title: 'Detail'
      },
      enabled: {
        title: 'Enabled',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'true', title: 'Enabled' },
              { value: 'false', title: 'Disabled' },
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
  constructor(private authenticationService: AuthService, private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authenticationService.getUsers().subscribe(
      data => {
        this.inscrits = data.result;
      },
      (error) => this.errorMessage = error
    );
  }
  detailInscrit(event) {
    this.showDetail = true;
    this.detailInfo.id = event.data.id;
    this.detailInfo.username = event.data.username;
    this.detailInfo.email = event.data.email;
    this.detailInfo.detail = event.data.detail;
    this.detailInfo.enabled = event.data.enabled;
  }

  deleteInscrit(event) {
    this.authenticationService.deleteUser(event.data.id).subscribe(
      result => {
        this.getUsers();
        this.snotifyService.success('Utilisateur supprimé', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });



      }
    );
  }
  enable(id) {
    this.authenticationService.enable(id).subscribe(
      result => {
        this.getUsers();
        this.snotifyService.success('Utilisateur activé', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        this.showDetail = false;
        this.getUsers();

      }
    );
  }

}
