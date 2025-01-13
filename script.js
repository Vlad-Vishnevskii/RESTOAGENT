document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const progressBarFill = document.getElementById("progressBarFill");
    const progressPercentage = document.getElementById("progressPercentage");

    let progress = 0;

    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            progressBarFill.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
        } else {
            clearInterval(interval);
            preloader.classList.add("hidden");
        }
    }, 25);
});


// Открытие модального окна
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');

// Текст для эффекта печати
const text = [
    "Activating Reservation System: Tables are being prepared...",
"Connecting Kitchen Operations: Chef commands online...",
"Loading Customer Insights: Preferences detected...",
"Calibrating Atmosphere Settings: Ambience adjusted...",
"Activating Feedback Collector: Ready to gather reviews...",
"Syncing Payment Systems: Secure transactions enabled...",
"Updating Inventory Module: Stock levels checked...",
"Finalizing Staff Coordination: Shift schedules confirmed...",
"System Ready: Welcome to your ultimate restaurant assistant!",
];

let intervalId; // Идентификатор для очистки цикла

openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
    startTypingCycle(modalText, text);
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalText.textContent = ""; // Очистка текста при закрытии
    clearInterval(intervalId); // Остановка цикла
});

// Закрытие окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalText.textContent = ""; // Очистка текста при закрытии
        clearInterval(intervalId); // Остановка цикла
    }
});

// Функция для зацикленного эффекта печати текста построчно
function startTypingCycle(element, lines, lineDelay = 500, typingSpeed = 10) {
    function cycle() {
        typeTextByLine(element, lines, lineDelay, typingSpeed, () => {
            setTimeout(() => {
                element.textContent = ""; // Очистка перед началом нового цикла
                cycle(); // Запуск нового цикла
            }, lineDelay);
        });
    }
    cycle();
}

// Функция для печати текста построчно
function typeTextByLine(element, lines, lineDelay, typingSpeed, onComplete) {
    let currentLine = 0;

    function typeLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            const lineElement = document.createElement('p');
            lineElement.textContent = ""; // Создаем пустую строку

            element.appendChild(lineElement);
            typeCharacters(line, lineElement, typingSpeed, () => {
                currentLine++;
                setTimeout(typeLine, lineDelay); // Задержка перед следующей строкой
            });
        } else if (onComplete) {
            onComplete(); // Вызываем callback после завершения всех строк
        }
    }

    // Запускаем печать строк
    typeLine();
}

// Функция для печати символов в строке
function typeCharacters(text, element, speed, callback) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); // После завершения строки вызываем callback
        }
    }

    type();
}
