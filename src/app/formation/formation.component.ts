import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  img = 'url(assets/img/theme/formation.svg)';
  bg = 'bgstandar';
  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  constructor() { }

  ngOnInit(): void {
  }
  
}
