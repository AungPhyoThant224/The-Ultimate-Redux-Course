import { compose, pipe } from "lodash/fp"

let input = " JavaScript ";

const trim = str => str.trim();
const wrap = type => str => `<${type}>${str}</${type}>`
const toLowerCase = str => str.toLowerCase();

let transformC = compose(wrap("div"), toLowerCase, trim);
console.log(transformC(input));

let transformP = pipe(trim, toLowerCase, wrap("span"));
console.log(transformP(input));