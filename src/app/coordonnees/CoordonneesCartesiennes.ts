import {CoordonneesPolaires} from './CoordonneesPolaires';
import {Angle} from './Angle';

export class CoordonneesCartesiennes {

  constructor(public x: number, public y: number) {
  }

  get coordonneesPolaires(): CoordonneesPolaires {
    const r = Math.sqrt(this.x * this.x + this.y * this.y);
    return new CoordonneesPolaires(
      r,
      new Angle(this.thetaEnRadians(r)));
  }

  // https://wikimedia.org/api/rest_v1/media/math/render/svg/35ae4f0aa943580761ff19eb52585227c26e728f
  private thetaEnRadians(r: number) {
    if (r === 0) {
      return 0;
    }

    if (this.x > 0) {
      if (this.y >= 0) {
        return Math.atan(this.y / this.x);
      } else {
        return Math.atan(this.y / this.x) + 2 * Math.PI;
      }
    } else if (this.x < 0) {
      return Math.atan(this.y / this.x) + Math.PI;
    } else {
      if (this.y === 0) {
        return 0;
      } else if (this.y > 0) {
        return Math.PI / 2;
      } else {
        return 3 * Math.PI / 2;
      }
    }
  }
}
