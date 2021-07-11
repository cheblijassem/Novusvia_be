import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterAdminComponent implements OnInit {
  test: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
