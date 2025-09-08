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
        },
        {
            name: {
                ru: 'ModernShop',
                en: 'ModernShop',
                he: 'ModernShop'
            },
            path: 'one_page_apps/template6/index.html',
            preview: 'one_page_apps/template6/preview.png'
        }
    ];

    // Тексты интерфейса на разных языках
    const translations = {
        ru: {
            title: "Просмотрщик шаблонов",
            templates_title: "Шаблоны",
            desktop_view: "Десктоп",
            mobile_view: "Мобильный",
            whatsapp_btn: "WhatsApp",
            phone_btn: "Позвонить"
        },
        en: {
            title: "Template Viewer",
            templates_title: "Templates",
            desktop_view: "Desktop",
            mobile_view: "Mobile",
            whatsapp_btn: "WhatsApp",
            phone_btn: "Call"
        },
        he: {
            title: "מציג תבניות",
            templates_title: "תבניות",
            desktop_view: "שולחן עבודה",
            mobile_view: "נייד",
            whatsapp_btn: "וואטסאפ",
            phone_btn: "התקשרו"
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

    // Переключатели режима просмотра - только для десктопной версии
    function isDesktopView() {
        return window.innerWidth > 768;
    }
    
    desktopViewBtn.addEventListener('click', () => {
        if (isDesktopView()) {
            setViewMode('desktop');
        }
    });
    
    mobileViewBtn.addEventListener('click', () => {
        if (isDesktopView()) {
            setViewMode('mobile');
        }
    });
    
    // Обновляем состояние кнопок при изменении размера окна
    window.addEventListener('resize', () => {
        if (!isDesktopView()) {
            // В мобильной версии принудительно устанавливаем десктопный режим
            setViewMode('desktop');
        }
    });

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
    
    // Закрытие меню кликом вне его области
    document.addEventListener('click', (event) => {
        // Проверяем, что мы находимся в мобильной версии
        if (window.innerWidth <= 768) {
            // Проверяем, что клик был не по боковой панели и не по кнопке открытия/закрытия
            if (!sidebar.contains(event.target) && !toggleSidebarBtn.contains(event.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // --- Инициализация при загрузке страницы ---
    // Получаем сохраненный язык, язык браузера или используем 'en' по умолчанию
    const savedLang = localStorage.getItem('uiLang');
    let defaultLang = 'en'; // Язык по умолчанию
    
    if (!savedLang) {
        // Если сохраненного языка нет, проверяем язык браузера
        const browserLang = navigator.language || navigator.userLanguage;
        // Проверяем, поддерживаем ли мы язык браузера
        if (browserLang && translations[browserLang.substring(0, 2)]) {
            defaultLang = browserLang.substring(0, 2);
        }
    } else {
        defaultLang = savedLang;
    }
    
    langSelect.value = defaultLang;
    applyTranslations(defaultLang);

    // Загружаем первый шаблон из списка по умолчанию
    if (templates.length > 0) {
        loadTemplate(templates[0].path);
    }

    // Устанавливаем десктопный режим по умолчанию
    setViewMode('desktop');
});
