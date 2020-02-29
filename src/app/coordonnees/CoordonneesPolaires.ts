import {Angle} from './Angle';
import {CoordonneesCartesiennes} from './CoordonneesCartesiennes';

export class CoordonneesPolaires {

  constructor(public r = 0, public theta = new Angle(0)) {
  }

  get coordonneesCartesiennes(): CoordonneesCartesiennes {
    return new CoordonneesCartesiennes(
      this.r * Math.cos(this.theta.enRadians),
      this.r * Math.sin(this.theta.enRadians));
  }

  translation(coordonnees: CoordonneesPolaires) {
    const coordonneesCartesiennesOrigine = this.coordonneesCartesiennes;
    const coordonneesCartesiennesTranslation = coordonnees.coordonneesCartesiennes;
    const coordonneesCartesiennesCible = new CoordonneesCartesiennes(
      coordonneesCartesiennesOrigine.x + coordonneesCartesiennesTranslation.x,
      coordonneesCartesiennesOrigine.y + coordonneesCartesiennesTranslation.y);
    return coordonneesCartesiennesCible.coordonneesPolaires;
  }
}
