document.addEventListener('DOMContentLoaded', () => {
    // Проверка авторизации
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        window.location.href = 'index.html';
        return;
    }

    // Получение элементов DOM
    const logoutBtn = document.getElementById('logoutBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const profileForm = document.getElementById('profileForm');
    const linksTableBody = document.getElementById('linksTableBody');

    // Обработка переключения вкладок
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Активация кнопки
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Показ содержимого
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Обработка выхода
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = 'index.html';
    });

    // Загрузка данных профиля
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    document.getElementById('profileName').value = userData.name || '';
    document.getElementById('profileEmail').value = userData.email || '';

    // Обработка сохранения профиля
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const password = document.getElementById('profilePassword').value;
        const passwordConfirm = document.getElementById('profilePasswordConfirm').value;

        if (password && password !== passwordConfirm) {
            alert('Пароли не совпадают');
            return;
        }

        // Сохранение данных
        const updatedUserData = {
            ...userData,
            name,
            email
        };

        if (password) {
            updatedUserData.password = password;
        }

        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        alert('Профиль успешно обновлен');
    });

    // Загрузка списка ссылок
    const loadLinks = () => {
        const links = JSON.parse(localStorage.getItem('userLinks') || '[]');
        linksTableBody.innerHTML = '';

        links.forEach(link => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${link.id}</td>
                <td><a href="${link.shortUrl}" target="_blank">${link.shortUrl}</a></td>
                <td><a href="${link.originalUrl}" target="_blank">${link.originalUrl}</a></td>
                <td>${link.clicks || 0}</td>
                <td>${new Date(link.createdAt).toLocaleDateString()}</td>
                <td>${link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : 'Бессрочно'}</td>
                <td>
                    <button class="action-btn" onclick="deleteLink('${link.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            linksTableBody.appendChild(row);
        });
    };

    // Функция удаления ссылки
    window.deleteLink = (linkId) => {
        if (confirm('Вы уверены, что хотите удалить эту ссылку?')) {
            const links = JSON.parse(localStorage.getItem('userLinks') || '[]');
            const updatedLinks = links.filter(link => link.id !== linkId);
            localStorage.setItem('userLinks', JSON.stringify(updatedLinks));
            loadLinks();
        }
    };

    // Загрузка ссылок при открытии страницы
    loadLinks();
}); 