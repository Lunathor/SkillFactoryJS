// Функция для проверки, является ли слово палиндромом
function isPalindrome(word) {
    const cleanWord = word.toLowerCase().replace(/\s/g, '');
    
    return cleanWord === cleanWord.split('').reverse().join('');
}

function checkPalindrome(word) {
    if (isPalindrome(word)) {
        console.log(`Слово "${word}" является палиндромом`);
        alert(`Слово "${word}" является палиндромом`);
    } else {
        console.log(`Слово "${word}" не является палиндромом`);
        alert(`Слово "${word}" не является палиндромом`);
    }
}

function checkUserPalindrome() {

    const userWord = prompt("Введите слово для проверки на палиндром:");
    
    if (userWord === null) {
        alert("Проверка отменена пользователем");
        return;
    }
    
    if (userWord.trim() === "") {
        alert("Пожалуйста, введите слово!");
        return;
    }
    
    checkPalindrome(userWord);
}

console.log("=== Проверка палиндромов ===");
console.log("Программа запущена. Введите слово в появившемся окне.");
checkUserPalindrome();
