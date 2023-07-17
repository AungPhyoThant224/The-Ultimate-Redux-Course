const numbers = [1, 2, 3];

//Adding
const index = numbers.indexOf(2);
const add = [...numbers.slice(0, index), 4, ...numbers.slice(index)];
console.log('Add', add);

//Removing
const remove = numbers.filter(n => n !== 2);
console.log('Remove', remove);

//Updating
const update = numbers.map(n => (n === 2 ? 20 : n));
console.log('Update', update);