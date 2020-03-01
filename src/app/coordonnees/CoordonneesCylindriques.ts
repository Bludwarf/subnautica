import {Angle} from './Angle';
import {CoordonneesCartesiennes} from './CoordonneesCartesiennes';

export class CoordonneesCylindriques {

  /**
   * @param r distance depuis l'origine à la surface
   * @param theta angle avec l'est
   * @param profondeur distance de la surface à la verticale (positif)
   */
  constructor(public r = 0, public theta = new Angle(0), public profondeur = 0) {
  }

  get coordonneesCartesiennes(): CoordonneesCartesiennes {
    return new CoordonneesCartesiennes(
      this.r * Math.cos(this.theta.enRadians),
      this.r * Math.sin(this.theta.enRadians),
      this.profondeur);
  }

  /**
   * @param distance distance depuis l'origine en ligne droite
   */
  set distance(distance: number) {
    if (distance >= this.profondeur) {
      this.r = Math.sqrt(distance * distance - this.profondeur * this.profondeur);
    } else {
      console.warn(`Modification de la distance ignoré car ${distance} < ${this.profondeur} (profondeur)`);
    }
  }

  /**
   * @return distance distance depuis l'origine en ligne droite
   */
  get distance(): number {
    return Math.sqrt(this.r * this.r + this.profondeur * this.profondeur);
  }

  translation(coordonnees: CoordonneesCylindriques) {
    const coordonneesCartesiennesOrigine = this.coordonneesCartesiennes;
    const coordonneesCartesiennesTranslation = coordonnees.coordonneesCartesiennes;
    const coordonneesCartesiennesCible = new CoordonneesCartesiennes(
      coordonneesCartesiennesOrigine.x + coordonneesCartesiennesTranslation.x,
      coordonneesCartesiennesOrigine.y + coordonneesCartesiennesTranslation.y);
    return coordonneesCartesiennesCible.coordonneesPolaires;
  }
}
