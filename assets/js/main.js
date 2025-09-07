document.addEventListener('DOMContentLoaded', () => {
    // Список ваших шаблонов. Добавляйте новые сюда.
    const templates = [
        {
            // Название шаблона на разных языках
            name: {
                ru: 'Disonance',
                en: 'Disonance',
                he: 'Disonance'
            },
            // Путь к HTML файлу шаблона
            path: 'one_page_apps/template1/index.html',
            // Путь к изображению для предпросмотра
            preview: 'one_page_apps/template1/preview.png'
        },
        {
            name: {
                ru: 'SimplePurpleStore1',
                en: 'SimplePurpleStore1',
                he: 'SimplePurpleStore1'
            },
            path: 'one_page_apps/template2/index.html',
            preview: 'one_page_apps/template2/preview.png'
        },
        
        {
            name: {
                ru: 'LightCarDeal',
                en: 'LightCarDeal',
                he: 'LightCarDeal'
            },
            path: 'one_page_apps/template3/index.html',
            preview: 'one_page_apps/template3/preview.png'
        },
        
        {
            name: {
                ru: 'BlueFactory',
                en: 'BlueFactory',
                he: 'BlueFactory'
            },
            path: 'one_page_apps/template4/index.html',
            preview: 'one_page_apps/template4/preview.png'
        },
        {
            name: {
                ru: 'BlueGymClub',
                en: 'BlueGymClub',
                he: 'BlueGymClub'
            },
            path: 'one_page_apps/template5/index.html',
            preview: 'one_page_apps/template5/preview.png'
        }
    ];

    // Тексты интерфейса на разных языках
    const translations = {
        ru: {
            title: "Просмотрщик шаблонов",
            templates_title: "Шаблоны",
            desktop_view: "Десктоп",
            mobile_view: "Мобильный"
        },
        en: {
            title: "Template Viewer",
            templates_title: "Templates",
            desktop_view: "Desktop",
            mobile_view: "Mobile"
        },
        he: {
            title: "מציג תבניות",
            templates_title: "תבניות",
            desktop_view: "שולחן עבודה",
            mobile_view: "נייד"
        }
    };

    // Получаем элементы со страницы
    const templateList = document.getElementById('template-list');
    const templateFrame = document.getElementById('template-frame');
    const desktopViewBtn = document.getElementById('desktop-view');
    const mobileViewBtn = document.getElementById('mobile-view');
    const langSelect = document.getElementById('lang-select');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    // Функция применения переводов
    function applyTranslations(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        populateTemplateList(lang);
    }

    // Функция для заполнения списка шаблонов
    function populateTemplateList(lang) {
        templateList.innerHTML = ''; // Очищаем список перед заполнением
        templates.forEach(template => {
            const listItem = document.createElement('li');
            listItem.dataset.path = template.path;
            listItem.innerHTML = `
                <img src="${template.preview}" alt="${template.name[lang]}">
                <span>${template.name[lang]}</span>
            `;
            listItem.addEventListener('click', () => {
                loadTemplate(template.path);
                // На мобильных устройствах скрываем меню после выбора
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            });
            templateList.appendChild(listItem);
        });
    }

    // Функция загрузки шаблона в iframe
    function loadTemplate(path) {
        templateFrame.src = path;
    }

    // Переключатели режима просмотра
    function setViewMode(mode) {
        if (mode === 'desktop') {
            templateFrame.classList.remove('mobile-view');
            templateFrame.classList.add('desktop-view');
            desktopViewBtn.classList.add('active');
            mobileViewBtn.classList.remove('active');
        } else {
            templateFrame.classList.remove('desktop-view');
            templateFrame.classList.add('mobile-view');
            mobileViewBtn.classList.add('active');
            desktopViewBtn.classList.remove('active');
        }
    }

    desktopViewBtn.addEventListener('click', () => setViewMode('desktop'));
    mobileViewBtn.addEventListener('click', () => setViewMode('mobile'));

    // Переключатель языка интерфейса
    langSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        localStorage.setItem('uiLang', newLang); // Сохраняем выбор в браузере
        applyTranslations(newLang);
    });

    // Кнопка открытия/закрытия меню на мобильных
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // --- Инициализация при загрузке страницы ---
    // Получаем сохраненный язык или используем 'ru' по умолчанию
    const savedLang = localStorage.getItem('uiLang') || 'ru';
    langSelect.value = savedLang;
    applyTranslations(savedLang);

    // Загружаем первый шаблон из списка по умолчанию
    if (templates.length > 0) {
        loadTemplate(templates[0].path);
    }

    // Устанавливаем десктопный режим по умолчанию
    setViewMode('desktop');
});