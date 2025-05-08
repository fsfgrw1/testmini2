const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем на весь экран

// Данные пользователя
const user = tg.initDataUnsafe.user;

// Заполняем профиль
document.getElementById('user-name').textContent = 
    user?.first_name || 'Аноним';

document.getElementById('user-username').textContent = 
    user?.username ? `@${user.username}` : 'нет username';

// Аватар
const avatar = document.getElementById('user-avatar');
if (user?.photo_url) {
    avatar.innerHTML = `<img src="${user.photo_url}" alt="Аватар">`;
} else {
    const letter = user?.first_name?.[0] || 'A';
    avatar.textContent = letter;
}

// Мини-игра
const secretNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 10;

document.getElementById('guess-btn').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guess-input').value);
    const resultElement = document.getElementById('game-result');

    if (isNaN(guess) || guess < 1 || guess > 10) {
        resultElement.textContent = 'Введите число от 1 до 10!';
        return;
    }

    attempts--;

    if (guess === secretNumber) {
        resultElement.textContent = '🎉 Поздравляю, вы угадали!';
        document.getElementById('guess-btn').disabled = true;
    } else if (attempts === 0) {
        resultElement.textContent = `😢 Вы проиграли! Число было ${secretNumber}.`;
        document.getElementById('guess-btn').disabled = true;
    } else {
        resultElement.textContent = `❌ Неверно! Осталось попыток: ${attempts}.`;
    }
});

// Кнопка закрыть
document.getElementById('close-btn').addEventListener('click', () => {
    tg.close();
});