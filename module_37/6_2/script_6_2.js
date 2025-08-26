const arr = [1, 2, 3, 1, 5, 4, 2, 3, 5, 'they', 'don\'t', 'know', 'that', 'we', 'know', 'that', 'they', 'know'];

const uniqueArray1 = [...new Set(arr)];

const uniqueArray2 = arr.filter((item, index) => arr.indexOf(item) === index);

const uniqueArray3 = arr.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
}, []);

console.log("Исходный массив:");
console.log(arr);
console.log("Длина исходного массива:", arr.length);

console.log("\nМассив без дубликатов:");
console.log(uniqueArray1);
console.log("Длина массива без дубликатов:", uniqueArray1.length);

console.log("\n=== Сравнение всех способов ===");
console.log("Способ 1 (Set):", uniqueArray1);
console.log("Способ 2 (filter):", uniqueArray2);
console.log("Способ 3 (reduce):", uniqueArray3);

console.log("\nВсе способы дают одинаковый результат:", 
    JSON.stringify(uniqueArray1) === JSON.stringify(uniqueArray2) && 
    JSON.stringify(uniqueArray2) === JSON.stringify(uniqueArray3)
);
