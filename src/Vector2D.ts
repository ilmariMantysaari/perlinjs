/**
 * Simple 2D vector implementation, with only the methods needed for
 * Perlin noise generation
 */
export default class Vector2D {
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