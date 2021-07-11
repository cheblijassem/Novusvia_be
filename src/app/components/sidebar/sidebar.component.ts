import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecrutementService } from '../../service/recrutement.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  number: number;
}

let nbrRecrutement = 0;
let nbrDemandes = 0;
export const AdminROUTES: RouteInfo[] = [
  { path: '/admin/recrutement', title: 'Recrutement', icon: 'ni-bullet-list-67 text-red', class: '', number: nbrRecrutement },
  { path: '/admin/event', title: 'Evénenement', icon: 'ni-bullet-list-67 text-red', class: '', number: null },
  { path: '/admin/assistance', title: 'Assistance', icon: 'ni-bullet-list-67 text-red', class: '', number: null },
  { path: '/admin/users', title: 'Utilisateur', icon: 'ni-bullet-list-67 text-red', class: '', number: null },
  { path: '/admin/demande', title: 'Demande', icon: 'ni-bullet-list-67 text-red', class: '', number: nbrDemandes }

];
export const UserROUTES: RouteInfo[] = [
  { path: '/admin/profiles', title: 'Profiles', icon: 'ni-bullet-list-67 text-red', class: '', number: null },
  { path: '/admin/suivi', title: 'Mes demandes', icon: 'ni-bullet-list-67 text-red', class: '', number: null },
  { path: '/admin/accepted', title: 'mes employés', icon: 'ni-bullet-list-67 text-red', class: '', number: null }
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  role: string;
  errorMessage: string;

  constructor(private router: Router, private _recrutementService: RecrutementService) {
    this.role = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  ngOnInit() {
    if (this.role === 'admin') {
      this.menuItems = AdminROUTES.filter(menuItem => menuItem);
    } else {
      nbrRecrutement = null;
      this.menuItems = UserROUTES.filter(menuItem => menuItem);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.getRecrutementsNbr();
    this.getDemandsNbr();
  }

  getRecrutementsNbr() {
    this._recrutementService.getRecrutements().subscribe(
      data => {
        data.result.forEach(element => {
          if (!element.approved && element.approved !== false) {
            nbrRecrutement++;
          }
        });
        this.menuItems[0].number = nbrRecrutement;
      },
      (error) => this.errorMessage = error
    );
  }
  getDemandsNbr() {
    this._recrutementService.getDemandes().subscribe(
      data => {
        data.result.forEach(element => {
          if (element.status === 'pending') {
            nbrDemandes++;
          }
        });
        this.menuItems[4].number = nbrDemandes;
      },
      (error) => this.errorMessage = error
    );
  }
  getNewRecrutements(nbr) {
    if (this.role === 'admin') {
      this.menuItems = AdminROUTES.filter(menuItem => menuItem);
    } else {
      nbrRecrutement = null;
      this.menuItems = UserROUTES.filter(menuItem => menuItem);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    nbrRecrutement = nbr;
    this.menuItems[0].number = nbrRecrutement;


  }
  getNewDemandes(nbr) {
    if (this.role === 'admin') {
      this.menuItems = AdminROUTES.filter(menuItem => menuItem);
    } else {
      nbrRecrutement = null;
      this.menuItems = UserROUTES.filter(menuItem => menuItem);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    nbrDemandes = nbr;
    this.menuItems[4].number = nbrDemandes;

  }
}
