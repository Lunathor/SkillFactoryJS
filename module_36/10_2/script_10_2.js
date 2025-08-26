let promoCode = prompt("Введите промокод:");

if (promoCode && promoCode.toLowerCase() === "скидка") {
    alert("Промокод применён");
} else {
    alert("Промокод не работает");
}
