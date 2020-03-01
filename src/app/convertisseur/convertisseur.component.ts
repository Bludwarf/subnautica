import {Component, OnInit} from '@angular/core';
import {CoordonneesCylindriques} from '../coordonnees/CoordonneesCylindriques';

@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrls: ['./convertisseur.component.scss']
})
export class ConvertisseurComponent implements OnInit {
  position = new CoordonneesCylindriques();
  observeRelatif = new CoordonneesCylindriques();

  constructor() {
  }

  ngOnInit() {
  }

  get observeAbsolu(): CoordonneesCylindriques {
    return this.position.translation(this.observeRelatif);
  }
}
