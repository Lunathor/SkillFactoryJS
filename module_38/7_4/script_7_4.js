const person = {
    name: "John",
    age: 30,
    city: "New York"
};

function setFullName(fullName) {
    this.fullName = fullName;
    return this;
}

const setPersonFullName = setFullName.bind(person);

setPersonFullName("John Smith");

console.log(person);

