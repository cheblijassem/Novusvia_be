import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from '../service/local.service';

@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
})
export class MetierComponent implements OnInit {

  img = 'url(assets/img/theme/metier.png)';
  bg = 'bgstandar';
  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  constructor(private localService: LocalService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'fr']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    } else {
      localStorage.setItem('locale', 'fr');
      this.translate.setDefaultLang('fr');
    }
    const lang = localStorage.getItem('locale');
    this.localService.watchStorage().subscribe((data: string) => {
      if (localStorage.getItem('locale')) {
        const browserLang = localStorage.getItem('locale');
        this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
      } else {
        localStorage.setItem('locale', 'fr');
        this.translate.setDefaultLang('fr');
      }
    })
  }
  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }
  reset() {
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
  }
  resetAll() {
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.img = 'url(assets/img/theme/metier.png)';
    this.bg = 'bgstandar';
  }
  changeImg() {
    if (this.show1 === true) {
      this.img = 'url(assets/img/theme/handshake.svg)';
      this.bg = 'bg-gradient-success';
    } else if (this.show2 === true) {
      this.img = 'url(assets/img/theme/group_presentation.svg)';
      this.bg = 'bg-gradient-primary';
    } else if (this.show3 === true) {
      this.img = 'url(assets/img/theme/architect.svg)';
      this.bg = 'bg-gradient-warning';
    } else if (this.show4 === true) {
      this.img = 'url(assets/img/theme/social_media.svg)';
      this.bg = 'bg-gradient-info';
    }

  }
}
