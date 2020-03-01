import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoordonneesCylindriques} from './CoordonneesCylindriques';

const POINTS_CARDINAUX = ['E', 'NE', 'N', 'NO', 'O', 'SO', 'S', 'SE', 'E'];
const POINT_CARDINAL_EN_DEGRE = 45;
/** Équivalent en dégré d'un ajustement précis de "+1" */
const AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES = POINT_CARDINAL_EN_DEGRE / 6;
const AJUSTEMENT_PRECIS_EN_DEGRES_MAXIMUM = POINT_CARDINAL_EN_DEGRE / 2;

/**
 * Si un ajustement calculé en degré est supérieur à 45°/2 (angle entre deux points cardinaux) on applique un modulo 360.
 * Le calcul conserve le signe.
 */
function normaliserAjustementPrecisEnDegres(ajustementPrecisEnDegres: number): number {
  if (ajustementPrecisEnDegres < -AJUSTEMENT_PRECIS_EN_DEGRES_MAXIMUM) {
    return ajustementPrecisEnDegres + 360;
  }
  if (ajustementPrecisEnDegres > AJUSTEMENT_PRECIS_EN_DEGRES_MAXIMUM) {
    return ajustementPrecisEnDegres - 360;
  }
  return ajustementPrecisEnDegres;
}

@Component({
  selector: 'app-coordonnees',
  templateUrl: './coordonnees.component.html',
  styleUrls: ['./coordonnees.component.scss']
})
export class CoordonneesComponent implements OnInit {

  constructor() {
  }

  get pointCardinal(): string {
    const pointCardinalChiffre = Math.round(this.coordonneesCylindriques.theta.enDegres / POINT_CARDINAL_EN_DEGRE);
    return POINTS_CARDINAUX[pointCardinalChiffre];
  }

  set pointCardinal(pointCardinal: string) {
    this.setPointCardinalPrecis(pointCardinal, +this.ajustementPrecisPointCardinal);
  }

  get ajustementPrecisPointCardinal(): string {
    const pointCardinalEnDegres = CoordonneesComponent.convertirPointCardinalEnDegres(this.pointCardinal);
    const ajustementPrecisEnDegres = normaliserAjustementPrecisEnDegres(
      pointCardinalEnDegres - this.coordonneesCylindriques.theta.enDegres);
    return '' + Math.round(ajustementPrecisEnDegres / AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES);
  }

  set ajustementPrecisPointCardinal(pointCardinalPrecis: string) {
    this.setPointCardinalPrecis(this.pointCardinal, +pointCardinalPrecis);
  }

  @Input() coordonneesCylindriques: CoordonneesCylindriques;
  @Output() coordonneesCylindriquesChange = new EventEmitter<CoordonneesCylindriques>();

  static convertirPointCardinalEnDegres(pointCardinal: string): number {
    return POINTS_CARDINAUX.indexOf(pointCardinal) * 45;
  }

  private setPointCardinalPrecis(pointCardinal: string, ajustementPrecisPointCardinal: number) {
    const pointCardinalEnDegrees = CoordonneesComponent.convertirPointCardinalEnDegres(pointCardinal);
    this.coordonneesCylindriques.theta.enDegres = pointCardinalEnDegrees - ajustementPrecisPointCardinal * AJUSTEMENT_PRECIS_UNITAIRE_EN_DEGRES;
    this.coordonneesCylindriquesChange.emit(this.coordonneesCylindriques);
  }

  ngOnInit() {
  }

  onChangementDeCoordonnees() {
    this.coordonneesCylindriquesChange.emit(this.coordonneesCylindriques);
  }

  seRetourner() {
    this.coordonneesCylindriques.theta.enDegres += 180;
  }
}
