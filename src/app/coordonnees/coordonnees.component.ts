import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoordonneesPolaires} from './CoordonneesPolaires';

@Component({
  selector: 'app-coordonnees',
  templateUrl: './coordonnees.component.html',
  styleUrls: ['./coordonnees.component.scss']
})
export class CoordonneesComponent implements OnInit {

  @Input() coordonneesPolaires;
  @Output() changementDeCoordonnees = new EventEmitter<CoordonneesPolaires>();

  constructor() {
  }

  pointCardinal = 'N';
  pointCardinalPrecis = 0;

  static convertirPointCardinalEnDegrees(pointCardinal: string): number {
    switch (pointCardinal) {
      case 'N':
        return 90;
      case 'NE':
        return 45;
      case 'E':
        return 0;
      case 'SE':
        return -45;
      case 'S':
        return -90;
      case 'SO':
        return -135;
      case 'O':
        return 180;
      case 'NO':
        return 135;
      default:
        return 0;
    }
  }

  ngOnInit() {
  }

  setPointCardinal() {
    const pointCardinalEnDegrees = CoordonneesComponent.convertirPointCardinalEnDegrees(this.pointCardinal);
    const signeAjustementPrecisPointCardinalEnDegrees = pointCardinalEnDegrees <= 180 ? -1 : 1;
    this.coordonneesPolaires.theta.enDegres = pointCardinalEnDegrees
      + signeAjustementPrecisPointCardinalEnDegrees * this.pointCardinalPrecis * 45 / 6;
    this.onChangementDeCoordonnees();
  }

  onChangementDeCoordonnees() {
    this.changementDeCoordonnees.emit(this.coordonneesPolaires);
  }
}
