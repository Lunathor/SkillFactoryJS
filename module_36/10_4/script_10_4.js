let userName = prompt("Введите ваше имя:");
let birthYear = prompt("Введите ваш год рождения:");

if (!userName || isNaN(birthYear) || birthYear === null) {
    alert("год не число или пустое имя");
} else {
    let currentYear = new Date().getFullYear();
    let age = currentYear - birthYear;


    let remainder = age % 10;

    let ending;
    if (remainder === 1 && age !== 11) {
        ending = "год";
    } else if ((remainder === 2 || remainder === 3 || remainder === 4) && (age < 12 || age > 14)) {
        ending = "года";
    }else {
        ending = "лет";
    }
    alert(`${userName} ${age} ${ending}`);
}