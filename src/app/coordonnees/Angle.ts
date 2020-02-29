export class Angle {
  constructor(public enRadians: number) {
    this.enRadians = enRadians;
  }

  /**
   * Angle en degrés de 0 à 360
   */
  get enDegres(): number {
    return this.enRadians * 180 / Math.PI;
  }

  set enDegres(degrees: number) {
    this.enRadians = mod(degrees, 360) * Math.PI / 180;
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
