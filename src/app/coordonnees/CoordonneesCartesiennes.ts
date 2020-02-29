import {CoordonneesPolaires} from './CoordonneesPolaires';
import {Angle} from './Angle';

export class CoordonneesCartesiennes {

  constructor(public x: number, public y: number) {
  }

  get coordonneesPolaires(): CoordonneesPolaires {
    this.thetaEnRadians();
    return new CoordonneesPolaires(
      Math.sqrt(this.x * this.x + this.y * this.y),
      new Angle(this.thetaEnRadians()));
  }

  // https://wikimedia.org/api/rest_v1/media/math/render/svg/35ae4f0aa943580761ff19eb52585227c26e728f
  private thetaEnRadians() {
    if (this.x > 0) {
      if (this.y >= 0) {
        return Math.atan(this.y / this.x);
      } else {
        return Math.atan(this.y / this.x) + 2 * Math.PI;
      }
    } else if (this.x < 0) {
      return Math.atan(this.y / this.x) + Math.PI;
    } else {
      if (this.y >= 0) {
        return Math.PI / 2;
      } else {
        return 3 * Math.PI / 2;
      }
    }
  }
}
