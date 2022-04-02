export interface RandomGenerator {
  seed: number;
  readonly min: number;
  readonly max: number;
  next(): number;
}