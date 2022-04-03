import { RandomGenerator } from "../types";

// glibc const
const m = 2 ** 31;
const a = 1103515245;
const c = 12345;

// https://en.wikipedia.org/wiki/Linear_congruential_generator
export default class LinearCongruentialGenerator implements RandomGenerator {
  seed = 0;
  get min() {
    return 0;
  }
  get max() {
    return m;
  }
  next() {
    return (this.seed = (a * this.seed + c) % m);
  }
}
