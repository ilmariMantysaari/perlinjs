import PerlinArray from './PerlinArray'

const format = (arr: number[]) => arr.map(
    (e: number) => e.toFixed(2)
)


const res =  new PerlinArray({seed: 1}).generateArray(5, 5).map(format);
const res2 = new PerlinArray({seed: 2}).generateArray(5, 5).map(format);
const res3 = new PerlinArray({seed: 3}).generateArray(5, 5).map(format);
const res4 = new PerlinArray({seed: 5}).generateArray(5, 5).map(format);


console.log(res);
console.log(res2);
console.log(res3);
console.log(res4);
