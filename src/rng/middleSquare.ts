import { RandomGenerator } from "../types";

// https://en.wikipedia.org/wiki/Middle-square_method
export default class MiddleSquareGenerator implements RandomGenerator {
  private realSeed = '0';
  get seed() {
    return +this.realSeed;
  }
  set seed(n: number) {
    this.realSeed = String(n);
  }
  get min() {
    return 0;
  }
  get max() {
    return +'9'.repeat(this.length);
  }
  get length() {
    return this.realSeed.length;
  }

  next(): number {
    const num = this.seed ** 2;
    const len = this.length;
    const str = String(num).padStart(len * 2, '0');
    const res = str.substring(len * 0.5, len * 1.5);
    this.realSeed = res;
    return this.seed;
  }
}
