const person = {
    name: "John",
    address: {
        country: "USA",
        city: "San Francisco"
    }
}

const updated = {
    ...person, name: "Bob", address: {
        ...person.address,
        city: "New Yor"
    }
};
updated.address.city = "New York";
console.log(person);
console.log(updated);