const users = [
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 17, city: "London" },
    { name: "Bob", age: 30, city: "Paris" },
    { name: "Emma", age: 16, city: "Berlin" },
    { name: "Mike", age: 22, city: "Tokyo" },
    { name: "Sarah", age: 19, city: "Moscow" },
    { name: "David", age: 35, city: "Rome" },
    { name: "Lisa", age: 15, city: "Madrid" }
];

const adultUsers = users.filter(user => user.age >= 18);

const adultUserNames = adultUsers.map(user => user.name);

console.log(adultUserNames);
