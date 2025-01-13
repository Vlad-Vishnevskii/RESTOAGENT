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

const modalPerson = document.getElementById('modalPerson');
const modalTitlePerson = modalPerson.querySelector('h2');
const modalTextPerson = modalPerson.querySelector('p');
const closeModalPerson = modalPerson.querySelector('.close-button');
const clickableElements = document.querySelectorAll('.clickable');

closeModalPerson.addEventListener('click', () => {
    modalPerson.style.display = 'none';
    modalTextPerson.textContent = "";
});


clickableElements.forEach(element => {
    element.addEventListener('click', () => {
        const personType = element.getAttribute('data-person');
        modalTitlePerson.textContent = personType.toUpperCase();
        // Устанавливаем текст модалки в зависимости от data-person
        switch (personType) {
            case 'cooker':
                modalTextPerson.textContent = 'This is the chef, the mastermind behind our delicious dishes. They bring creativity and skill to every plate, ensuring each bite is a memorable experience.';
                 break;
            case 'waiter':
                modalTextPerson.textContent = 'This is your friendly waiter, always ready to take your order and make your dining experience comfortable and enjoyable. They ensure everything runs smoothly from the kitchen to your table.';
                break;
            case 'bartender':
                modalTextPerson.textContent = 'This is our bartender, the expert in crafting your favorite drinks. Whether you prefer a classic cocktail or a modern mix, they have the skills to make your drink just right.';
                break;
            default:
                modalTextPerson.textContent = 'unknown';
        }

        // Показываем модалку
        modalPerson.style.display = 'flex';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modalPerson) {
        modalPerson.style.display = 'none';
        modalTitlePerson.textContent = ""; // Очистка текста при закрытии
        modalTextPerson.textContent = "";
    }
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
