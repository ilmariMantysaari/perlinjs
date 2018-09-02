

// Simple random number generator with seed
// NOT IN ANY WAY SECURE OR WELL DISTRIBUTED
// This is a simple implementation of the park-miller PRNG
// chosen solely for its simplicity
export default class Random{
    readonly maxValue: number = 2147483647;
    readonly multiplier: number = 16807;
    seed: number;

    constructor(seed: number){
        this.seed = seed % this.maxValue;
        if (this.seed <= 0) this.seed += (this.maxValue -1);
    }

    // returns a value between 0 and 1
    next = (): number => {
        // advance the generator
        this.seed = this.seed * this.multiplier % this.maxValue;
        return (this.seed - 1) / (this.maxValue - 1);
    }
}