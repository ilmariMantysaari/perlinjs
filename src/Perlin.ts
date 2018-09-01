import * as R from 'ramda';
import Random from './Random';

//TODO: testit

class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(vector: Vector2D): Vector2D {
        return new Vector2D(this.x + vector.x, this.y + vector.y)
    }
    normalize(){
        let length: number = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.x, 2));
        this.x = this.x / length
        this.y = this.y / length
    }
    dot(vec: Vector2D){
        return (this.x * vec.x) + (this.y * vec.y);
    }
}

export default class PerlinArray {
    /**
     * Generated a width * height array of noise
     */
    // TODO: REFACTOR THIS CLASS HEAVILY
    static generateArray(seed: number, width: number, height: number): number[][] {

        const random = new Random(3);
        const perlinArray: number[][] = PerlinArray.zeroArray(width, height);
        const octaves: number = 1;
        let amplitude: number = 1;
        const persistence: number = 1;
        let frequency: number = 1;
        // emphasis /= 50;
        const permutation = PerlinArray.permutation(random);
        const gradients = PerlinArray.gradients(random);

        // This could be done in parallel
        for (let octave = 0; octave < octaves; octave++) {
            for (let x: number = 0; x < width; x++) {
                perlinArray[x] = new Array();
                for (let y: number = 0; y < height; y++) {
                    let noise = PerlinArray.generateNoise(
                        x * frequency / width, 
                        y * frequency / height, 
                        permutation, gradients);
                    noise *= amplitude;
                    // noise += emphasis;
                    perlinArray[x][y] = noise;
                }
            }
            frequency *= 2;
            amplitude *= persistence;
        }
        return perlinArray;
    }

    private static zeroArray(width: number, height: number): number[][]{
        const arr: number[][] = new Array()
        for (let i = 0; i < width; i++) {
            arr[i] = new Array(height).fill(0);
        }
        console.log(arr);
        return arr;
    }

    /**
     * Generates one tile of noise
     */
    static generateNoise(x: number, y: number, permutation: number[], gradient: Vector2D[]): number {
        const cell = new Vector2D(Math.floor(x), Math.floor(y));
        let total = 0;
        const corners = [new Vector2D(0, 0).add(cell), new Vector2D(0, 1).add(cell),
                         new Vector2D(1, 0).add(cell), new Vector2D(1, 1).add(cell)];

        for (let corner of corners) {
            const substract = new Vector2D(x - corner.x, y - corner.y);
            const xIndex = permutation[Math.floor(corner.x) % permutation.length];
            const index = permutation[(xIndex + Math.floor(corner.y)) % permutation.length];

            const grad = gradient[index % gradient.length];

            total += PerlinArray.fadeVector(substract) * (grad.dot(substract));
        }

        return total;
    }

    private static permutation(random: Random): number[] {
        // creates a random permutation of numbers 0-256
        // TODO: seed
        const range = R.range(0, 256)
        return R.sortBy((e) => random.next(), range);
    }

    private static gradients(random: Random): Vector2D[] {
        var gradients: Vector2D[] = []; // new Vector2[256];

        for (var i = 0; i < 256; i++) {
            var grad = new Vector2D((random.next() * 2 - 1), 
                                    (random.next() * 2 - 1)); // Does this even work like intended?
            grad.normalize();
            gradients.push(grad);
        }
        return gradients;
    }

    private static fadeVector(vec: Vector2D): number{
        
        return PerlinArray.fade(vec.x) * PerlinArray.fade(vec.y);;
    }

    //Ken Perlin's fade function
    private static fade(d: number): number {
      const t = Math.abs(d);
      return 1 - t * t * t * (t * (t * 6 - 15) + 10);
    }

}