import * as _ from 'underscore';

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
}

export default class PerlinArray {

    array: [number];

    /**
     * Generated a width * height array of noise
     */
    static generateArray(seed: number, width: number, height: number): number[] {

        let perlinArray = new Array[width][height];
        let octaves: number = 1;
        let amplitude: number = 1;
        let persistence: number = 1;
        let frequency: number = 1;
        // emphasis /= 50;
        let permutation = PerlinArray.permutation();
        let gradients = PerlinArray.gradients();

        for (let octave = 0; octave < octaves; octave++) {
            // TODO: do this in parallel if you can
            for (var i: number = 0; i < width * height; i++) {
                let x = i % width;
                let y = i / width;
                let noise = PerlinArray.generateNoise(x * frequency / width, y * frequency / height, 
                                                      permutation, gradients);
                noise *= amplitude;
                // noise += emphasis;
                perlinArray[x][y] += noise;
            }
            frequency *= 2;
            amplitude *= persistence;
        }
        return perlinArray;
    }


    /**
     * Generates one tile of noise
     */
    static generateNoise(x: number, y: number, permutation: number[], gradient: Vector2D[]): number {
        let cell = new Vector2D(Math.floor(x), Math.floor(y));
        let total = 0;
        let corners = [new Vector2D(0, 0).add(cell), new Vector2D(0, 1).add(cell),
        new Vector2D(1, 0).add(cell), new Vector2D(1, 1).add(cell)];

        for (let corner of corners) {
            var substract = new Vector2D(x - corner.x, y - corner.y);
            var index = permutation[Math.floor(corner.x) % permutation.length];
            index = permutation[(index + Math.floor(corner.y)) % permutation.length];

            var grad = gradient[index % gradient.length];

            total += FadeVector(substract) * Vector2.Dot(grad, substract);
        }

        return total;
    }

    private static permutation(): number[] {
        // creates a random permutation of numbers 0-256
        // TODO: seed
        return _.shuffle(_.range(0, 256));
    }

    private static gradients(): Vector2D[] {
        var gradients: Vector2D[] = []; // new Vector2[256];

        for (var i = 0; i < 256; i++) {
            var grad = new Vector2D((Math.random() * 2 - 1), 
                                    (Math.random() * 2 - 1)); // Does this even work like intended?
            grad.normalize();
            gradients.push(grad);
        }
        return gradients;
    }

}