document.addEventListener('DOMContentLoaded', () => {
    // Получение элементов DOM
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const inputUrl = document.querySelector('input[type="url"]');
    const btnShorten = document.querySelector('.btn-shorten');
    const result = document.querySelector('.result');
    const shortenedUrl = document.querySelector('.shortened-url');

    // Обработка открытия модального окна
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Обработка закрытия модального окна
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Обработка отправки формы входа
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Здесь будет проверка учетных данных
        // В демо-версии просто сохраняем флаг авторизации
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify({ email, name: 'Пользователь' }));

        loginModal.style.display = 'none';
        loginBtn.style.display = 'none';
    });

    // Обработка сокращения URL
    btnShorten.addEventListener('click', () => {
        const url = inputUrl.value.trim();
        
        if (!url) {
            alert('Пожалуйста, введите URL');
            return;
        }

        // Генерация короткого URL
        const shortUrl = generateShortUrl(url);
        
        // Сохранение ссылки
        saveLink(url, shortUrl);
        
        // Отображение результата
        shortenedUrl.textContent = shortUrl;
        shortenedUrl.href = shortUrl;
        result.classList.add('show');
    });

    // Обработка нажатия Enter в поле ввода URL
    inputUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnShorten.click();
        }
    });

    // Функция генерации короткого URL
    function generateShortUrl(originalUrl) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let shortCode = '';
        for (let i = 0; i < 6; i++) {
            shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `http://short.url/${shortCode}`;
    }

    // Функция сохранения ссылки
    function saveLink(originalUrl, shortUrl) {
        const links = JSON.parse(localStorage.getItem('userLinks') || '[]');
        const newLink = {
            id: Date.now().toString(),
            originalUrl,
            shortUrl,
            clicks: 0,
            createdAt: new Date().toISOString(),
            expiresAt: null
        };
        links.push(newLink);
        localStorage.setItem('userLinks', JSON.stringify(links));
    }
}); 