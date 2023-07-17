/** 1. Functional */
import { pipe } from 'lodash/fp'
let input = { tag: "JavaScript" }

const pick = obj => obj.tag;
const toLowerCase = str => str.toLowerCase();
const addBrackets = str => `(${str})`;

const update = pipe(pick, toLowerCase, addBrackets);
console.log('1. ', update(input));

/** 2. Recipe */
import { produce } from 'immer'
let recipe = {
    name: 'Spaghetti Bolognese',
    ingredients: ["egg", "salt"]
}

const addCream = (recipe) => produce(recipe, draftRecipe => {
    draftRecipe.ingredients.push("cream");
})

const whiteEgg = (recipe) => produce(recipe, draftRecipe => {
    let ingredients = draftRecipe.ingredients;
    let index = ingredients.indexOf("egg");
    ingredients[index] = "white egg"
})

recipe = addCream(recipe);
recipe = whiteEgg(recipe);
console.log('2. ', recipe);