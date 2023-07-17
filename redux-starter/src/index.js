import { compose, pipe } from "lodash/fp"

let input = " JavaScript ";

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`
const toLowerCase = str => str.toLowerCase();

let transformC = compose(wrapInDiv, toLowerCase, trim);
console.log(transformC(input));

let transformP = pipe(trim, toLowerCase, wrapInDiv);
console.log(transformP(input));