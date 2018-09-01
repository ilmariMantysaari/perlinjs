

// Simple random number generator with seed
// NOT IN ANY WAY SECURE OR UNIFORM
export default class PerlinArray {
    
    seed: number;
    constructor(seed: number){
        this.seed = seed % 2147483647;
        if (this.seed <= 0) this.seed += 2147483646;
    }

    // returns a value between 0 and 1
    next(){
        // advance the generator
        this.seed = this.seed * 16807 % 2147483647;
        console.log((this.seed - 1) / 2147483646);
        return (this.seed - 1) / 2147483646;
    }
}