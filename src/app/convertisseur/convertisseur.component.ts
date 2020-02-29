import {Component, OnInit} from '@angular/core';
import {CoordonneesPolaires} from '../coordonnees/CoordonneesPolaires';

@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrls: ['./convertisseur.component.scss']
})
export class ConvertisseurComponent implements OnInit {
  position = new CoordonneesPolaires();
  observeRelatif = new CoordonneesPolaires();

  constructor() {
  }

  ngOnInit() {
  }

  get observeAbsolu(): CoordonneesPolaires {
    return this.position.translation(this.observeRelatif);
  }
}
