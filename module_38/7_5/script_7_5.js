function getUniqueSortedNumbers(numbers) {
    const uniqueNumbers = [...new Set(numbers)];
    
    const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
    
    return sortedNumbers;
}

const testArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

console.log("Исходный массив:", testArray);
console.log("Результат:", getUniqueSortedNumbers(testArray));
