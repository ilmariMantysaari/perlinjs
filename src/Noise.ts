import * as R from 'ramda';
import Vector2D from "./Vector2D";

export default class Noise {
    /**
     * Generates the noise for a point
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

            total += Noise.fadeVector(substract) * (grad.dot(substract));
        }

        return total;
    }

    static permutation(nextRandom: Function): number[] {
        // creates a random permutation of numbers 0-256
        const range = R.range(0, 256)
        return R.sortBy((e) => nextRandom(), range);
    }

    static gradients(nextRandom: Function): Vector2D[] {
        var gradients: Vector2D[] = [];

        for (var i = 0; i < 256; i++) {
            var grad = new Vector2D((nextRandom() * 2 - 1), 
                                    (nextRandom() * 2 - 1)); // Does this even work like intended?
            grad.normalize();
            gradients.push(grad);
        }
        return gradients;
    }

    static fadeVector(vec: Vector2D): number{
        return Noise.fade(vec.x) * Noise.fade(vec.y);;
    }

    //Ken Perlin's fade function
    static fade(d: number): number {
      const t = Math.abs(d);
      return 1 - t * t * t * (t * (t * 6 - 15) + 10);
    }
}

    