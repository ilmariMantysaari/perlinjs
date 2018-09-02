import Random from './Random';
import Noise from './Noise';

export interface PerlinArrayOptions {
    seed?: number;
    // remember to use fat arrow when your RNG has state
    nextRandom?: Function;
}

export default class PerlinArray {
    array: number[][];
    seed: number;
    nextRandom: Function;

    /**
     * 
     */
    constructor(options?: PerlinArrayOptions){
        // Random seed when no seed given
        this.seed = options && options.seed || Math.random();
        // if no random function is given, use the default RNG
        this.nextRandom = options && options!.nextRandom || new Random(this.seed).next
    }

    /**
     * Generated a width * height array of noise
     */
    // TODO: REFACTOR THIS CLASS HEAVILY
    generateArray(width: number, height: number): number[][] {

        // const random = new Random(seed);

        this.array = PerlinArray.zeroArray(width, height);
        const octaves: number = 1;
        let amplitude: number = 1;
        const persistence: number = 1;
        let frequency: number = 1;
        // emphasis /= 50;
        const permutation = Noise.permutation(this.nextRandom);
        const gradients = Noise.gradients(this.nextRandom);

        // This could be done in parallel
        for (let octave = 0; octave < octaves; octave++) {
            for (let x: number = 0; x < width; x++) {
                this.array[x] = new Array();
                for (let y: number = 0; y < height; y++) {
                    let noise = Noise.generateNoise(
                        x * frequency / width, 
                        y * frequency / height, 
                        permutation, gradients);
                    noise *= amplitude;
                    // noise += emphasis;
                    this.array[x][y] = noise;
                }
            }
            frequency *= 2;
            amplitude *= persistence;
        }
        return this.array;
    }

    /**
     * Creates an array with values initialized with zeros
     */
    private static zeroArray(width: number, height: number): number[][]{
        const arr: number[][] = new Array()
        for (let i = 0; i < width; i++) {
            arr[i] = new Array(height).fill(0);
        }
        return arr;
    }
}