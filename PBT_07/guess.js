const randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;

let guessedNumbers = [];

while (attempts < 7) {

    let input = prompt("Nhập số từ 1-100");

    let guess = Number(input);

    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        alert("Vui lòng nhập số hợp lệ từ 1-100");
        continue;
    }

    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);

    attempts++;

    if (guess === randomNumber) {
        alert(`Bạn đoán đúng sau ${attempts} lần!`);
        break;
    }

    else if (guess < randomNumber) {
        alert("Cao hơn");
    }

    else {
        alert("Thấp hơn");
    }

    if (attempts === 7) {
        alert(`Bạn đã thua! Đáp án là ${randomNumber}`);
    }
}