export class Angle {
  constructor(public enRadians: number) {
    this.enRadians = enRadians;
  }

  /**
   * @return de 0 à 360
   */
  get enDegres(): number {
    return this.enRadians * 180 / Math.PI;
  }

  /**
   * @param degrees de 0 à 360
   */
  set enDegres(degrees: number) {
    this.enRadians = degrees % 360 * Math.PI / 180;
  }

  get oppose(): Angle {
    const oppose = new Angle(this.enRadians);
    oppose.enDegres += 180;
    return oppose;
  }

  set oppose(oppose: Angle) {
    this.enDegres = oppose.enDegres + 180;
  }
}
