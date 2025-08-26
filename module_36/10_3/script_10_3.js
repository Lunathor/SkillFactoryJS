let userName = prompt("Введите ваше имя:");

let birthYear = prompt("Введите год вашего рождения:");

if (!userName || isNaN(birthYear) || birthYear === null) {
    alert("Год не число или пустое имя.");
} else {
    let currentYear = new Date().getFullYear();
    let age = currentYear - birthYear;
    alert(`${userName}: ${age}`);
}
