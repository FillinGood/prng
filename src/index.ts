import Img from "./img";
import LinearCongruentialGenerator from "./rng/linearCongruential";
import MiddleSquareGenerator from "./rng/middleSquare";
import ParkMillerGenerator from "./rng/parkmiller";
import { RandomGenerator } from "./types";

const seeds = new Array<number>(8)
  .fill(0)
  .map((x, i) => +"12345678".substring(0, i + 1));
const size = 100;
const generators: Record<string, RandomGenerator> = {
  MiddleSquare: new MiddleSquareGenerator(),
  ParkMiller: new ParkMillerGenerator(),
  LinearCongruential: new LinearCongruentialGenerator()
};

function generatePixelRow(rng: RandomGenerator, size: number) {
  return new Array<number>(size).fill(0).map(() => rng.next());
}
function generatePixels(rng: RandomGenerator, size: number) {
  return new Array<number[]>(size)
    .fill([])
    .map(() => generatePixelRow(rng, size));
}

(async () => {
  for (const seed of seeds) {
    console.log('Seed:', seed);
    for (const name in generators) {
      generators[name].seed = seed;
    }

    for (const name in generators) {
      console.log('RNG:', name);
      const gen = generators[name];
      const img = new Img(size, size);
      const pixels = generatePixels(gen, size);
      const range = gen.max - gen.min;

      for (let y = 0; y < size; ++y) {
        for (let x = 0; x < size; ++x) {
          const v = (pixels[x][y] - gen.min) / range;
          const c = Math.floor(255 * v);
          img.set(x, y, [c, c, c]);
        }
      }

      await img.save(`results/${name}-${seed}.png`);
    }
  }
})();
