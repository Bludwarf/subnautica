import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Angle} from '../coordonnees/Angle';

const POINTS_CARDINAUX = ['E', 'NE', 'N', 'NO', 'O', 'SO', 'S', 'SE', 'E'];
const POINT_CARDINAL_EN_DEGRE = 45;

/** Équivalent en dégré d'un ajustement précis de "+1" */
const AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES = POINT_CARDINAL_EN_DEGRE / 6;
const AJUSTEMENT_PRECIS_EN_DEGRES_MAXIMUM = POINT_CARDINAL_EN_DEGRE / 2;

/** Équivalent en dégré d'un ajustement très précis de "+1/4" */
const AJUSTEMENT_TRES_PRECIS_UNITAIRE_EN_DEGRES = AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES / 4;

@Component({
  selector: 'app-boussole',
  templateUrl: './boussole.component.html',
  styleUrls: ['./boussole.component.scss']
})
export class BoussoleComponent implements OnInit {

  @Input() theta: Angle = new Angle(0);
  @Output() thetaChange = new EventEmitter<Angle>();
  pointsCardinaux: string[];
  _pointCardinalTresPrecis: string; // TODO à normaliser

  ngOnInit() {
    this.centrerSurPointCardinal(BoussoleComponent.convertirDegresEnPointCardinal(this.theta.enDegres));
  }

  get pointCardinal(): string {
    const pointCardinalChiffre = Math.round(this.theta.enDegres / POINT_CARDINAL_EN_DEGRE);
    return POINTS_CARDINAUX[pointCardinalChiffre];
  }

  set pointCardinal(pointCardinal: string) {
    this.setPointCardinalPrecis(pointCardinal, 0, 0);
    this.centrerSurPointCardinal(pointCardinal);
  }

  get ajustementPrecisPointCardinal(): string {
    const pointCardinalEnDegres = BoussoleComponent.convertirPointCardinalEnDegres(this.pointCardinal);
    const ajustementPrecisEnDegres = BoussoleComponent.normaliserAjustementPrecisEnDegres(
      pointCardinalEnDegres - this.theta.enDegres);
    return '' + Math.round(ajustementPrecisEnDegres / AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES);
  }

  set ajustementPrecisPointCardinal(pointCardinalPrecis: string) {
    this.setPointCardinalPrecis(this.pointCardinal, +pointCardinalPrecis, 0);
  }

  get ajustementTresPrecisPointCardinal(): string {
    return this._pointCardinalTresPrecis;
  }

  set ajustementTresPrecisPointCardinal(pointCardinalTresPrecis: string) {
    this._pointCardinalTresPrecis = pointCardinalTresPrecis;
    this.setPointCardinalPrecis(this.pointCardinal, +this.ajustementPrecisPointCardinal, +pointCardinalTresPrecis);
  }

  static convertirPointCardinalEnDegres(pointCardinal: string): number {
    return POINTS_CARDINAUX.indexOf(pointCardinal) * 45;
  }

  static convertirDegresEnPointCardinal(degres): string {
    return POINTS_CARDINAUX[(degres + 360) % 360 / 45];
  }

  /**
   * Si un ajustement calculé en degré est supérieur à 45°/2 (angle entre deux points cardinaux) on applique un modulo 360.
   * Le calcul conserve le signe.
   */
  static normaliserAjustementPrecisEnDegres(ajustementPrecisEnDegres: number): number {
    if (ajustementPrecisEnDegres < -AJUSTEMENT_PRECIS_EN_DEGRES_MAXIMUM) {
      return ajustementPrecisEnDegres + 360;
    }
    if (ajustementPrecisEnDegres > AJUSTEMENT_PRECIS_EN_DEGRES_MAXIMUM) {
      return ajustementPrecisEnDegres - 360;
    }
    return ajustementPrecisEnDegres;
  }

  private centrerSurPointCardinal(pointCardinal: string) {
    const degres = BoussoleComponent.convertirPointCardinalEnDegres(pointCardinal);
    const oppose = BoussoleComponent.convertirDegresEnPointCardinal(degres + 180);
    this.pointsCardinaux = [
      oppose,
      BoussoleComponent.convertirDegresEnPointCardinal(degres + 135),
      BoussoleComponent.convertirDegresEnPointCardinal(degres + 90),
      BoussoleComponent.convertirDegresEnPointCardinal(degres + 45),
      BoussoleComponent.convertirDegresEnPointCardinal(degres),
      BoussoleComponent.convertirDegresEnPointCardinal(degres - 45),
      BoussoleComponent.convertirDegresEnPointCardinal(degres - 90),
      BoussoleComponent.convertirDegresEnPointCardinal(degres - 135),
      oppose,
    ];
  }

  private setPointCardinalPrecis(pointCardinal: string, ajustementPrecisPointCardinal: number, ajustementTresPrecisPointCardinal: number) {
    const pointCardinalEnDegrees = BoussoleComponent.convertirPointCardinalEnDegres(pointCardinal);
    this.theta.enDegres = pointCardinalEnDegrees
      - ajustementPrecisPointCardinal * AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES
      - ajustementTresPrecisPointCardinal * AJUSTEMENT_TRES_PRECIS_UNITAIRE_EN_DEGRES;
    this.thetaChange.emit(this.theta);
  }

}
