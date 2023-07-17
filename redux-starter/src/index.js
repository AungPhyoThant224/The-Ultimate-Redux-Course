let input = " JavaScript ";

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`
const toLowerCase = str => str.toLowerCase();

console.log(wrapInDiv(toLowerCase(trim(input))));