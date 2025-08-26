function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                return "Ошибка: деление на ноль";
            }
            return a / b;
        default:
            return "Ошибка: неизвестный оператор";
    }
}
const params = {
    a: 2,
    b: 3,
    operator: "+"
};

const result = calculate.apply(null, [params.a, params.b, params.operator]);
console.log("Результат операции:", result);
