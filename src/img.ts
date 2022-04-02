import Jimp from "jimp";

export default class Img {
  private jimp: Jimp;
  constructor(width: number, height: number) {
    this.jimp = new Jimp(width, height);
  }

  set(x: number, y: number, rgb: number): void;
  set(x: number, y: number, rgb: [number, number, number]): void;
  set(
    x: number,
    y: number,
    rgb: Record<"red" | "green" | "blue", number>
  ): void;
  set(
    x: number,
    y: number,
    rgb:
      | number
      | [number, number, number]
      | Record<"red" | "green" | "blue", number>
  ) {
    if (Array.isArray(rgb)) rgb = Jimp.rgbaToInt(rgb[0], rgb[1], rgb[2], 255);
    else if (typeof rgb === 'object') rgb = Jimp.rgbaToInt(rgb.red, rgb.blue, rgb.green, 255);
    this.jimp.setPixelColor(rgb, x, y);
  }

  async save(path: string) {
    await this.jimp.writeAsync(path);
  }
}
