export class Angle {
  constructor(public enRadians: number) {
    this.enRadians = enRadians;
  }

  get enDegres(): number {
    return this.enRadians * 180 / Math.PI;
  }

  set enDegres(degrees: number) {
    this.enRadians = degrees * Math.PI / 180;
  }
}
