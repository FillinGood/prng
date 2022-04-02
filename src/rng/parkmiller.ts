import { RandomGenerator } from "../types";

const M = 0x7fffffff;
const A = 48271;
const Q = Math.floor(M / A);
const R = M % A;

// https://en.wikipedia.org/wiki/Lehmer_random_number_generator
// Schrage's method
export default class ParkMillerGenerator implements RandomGenerator {
  seed = 0;
  get min() {
    return 0;
  }
  get max() {
    return 0x7fffffff;
  }

  next() {
    const div = Math.floor(this.seed / Q);
    const rem = this.seed % Q;

    const s = rem * A;
    const t = div * R;
    let result = s - t;

    if(result < 0) result += M;

    return this.seed = result;
  }
}