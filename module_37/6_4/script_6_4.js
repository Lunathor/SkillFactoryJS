// Создаем игровое поле 3x3 для крестиков-ноликов
const board = [
    ['x', 'o', 'x'],
    ['o', 'x', 'o'],
    ['x', 'o', 'x']
];

console.log("=== Игровое поле Крестики-нолики ===");

for (let i = 0; i < board.length; i++) {
    let row = '';
    for (let j = 0; j < board[i].length; j++) {
        row += board[i][j];
        if (j < board[i].length - 1) {
            row += ' ';
        }
    }
    console.log(row);
}
