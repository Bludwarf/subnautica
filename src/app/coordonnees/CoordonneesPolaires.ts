import {Angle} from './Angle';
import {CoordonneesCartesiennes} from './CoordonneesCartesiennes';

export class CoordonneesPolaires {

  constructor(public r: number, public theta: Angle) {
  }

  get coordonneesCartesiennes(): CoordonneesCartesiennes {
    return new CoordonneesCartesiennes(
      this.r * Math.cos(this.theta.enRadians),
      this.r * Math.sin(this.theta.enRadians));
  }
}
