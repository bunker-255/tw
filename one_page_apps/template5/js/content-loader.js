// Функция для загрузки контента из JSON файла
async function loadContent() {
    try {
        // Загружаем JSON файл
        const response = await fetch('template5-content.json');
        const content = await response.json();
        
        // Применяем контент к странице
        applyContent(content);
        
    } catch (error) {
        console.error('Ошибка загрузки контента:', error);
    }
}

// Функция для применения контента к странице
function applyContent(content) {
    // Применяем общую информацию о сайте
    if (content.siteInfo) {
        document.title = content.siteInfo.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && content.siteInfo.description) {
            metaDescription.setAttribute('content', content.siteInfo.description);
        }
        
        // Применяем изображения
        if (content.siteInfo.images) {
            applyImages(content.siteInfo.images);
        }
    }
    
    // Применяем навигацию
    if (content.navigation) {
        applyNavigation(content.navigation);
    }
    
    // Применяем hero секцию
    if (content.heroSection) {
        applyHeroSection(content.heroSection);
    }
    
    // Применяем преимущества
    if (content.features) {
        applyFeatures(content.features);
    }
    
    // Применяем тренировки
    if (content.workouts) {
        applyWorkouts(content.workouts);
    }
    
    // Применяем футер
    if (content.footer) {
        applyFooter(content.footer);
    }
}

// Функция для применения навигации
function applyNavigation(nav) {
    // Обновляем логотип
    const logoElement = document.querySelector('.logo');
    if (logoElement && nav.logo) {
        logoElement.textContent = nav.logo.text;
    }
    
    // Обновляем ссылки навигации
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks && nav.links) {
        navLinks.forEach((link, index) => {
            if (nav.links[index]) {
                link.textContent = nav.links[index].text;
                link.setAttribute('href', nav.links[index].href);
            }
        });
    }
}

// Функция для применения hero секции
function applyHeroSection(hero) {
    // Обновляем статическую часть заголовка
    const heroTitleStatic = document.querySelector('.hero h1');
    if (heroTitleStatic && hero.title.static) {
        heroTitleStatic.innerHTML = hero.title.static + '<span id="typed-text"></span><span class="cursor">&nbsp;</span>';
    }
    
    // Обновляем подзаголовок
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle && hero.subtitle) {
        heroSubtitle.textContent = hero.subtitle;
    }
    
    // Обновляем описание
    const heroDescription = document.querySelector('.hero p:nth-child(3)');
    if (heroDescription && hero.description) {
        heroDescription.textContent = hero.description;
    }
    
    // Обновляем кнопку
    const heroButton = document.querySelector('.hero .btn');
    if (heroButton && hero.button) {
        heroButton.textContent = hero.button.text;
        heroButton.setAttribute('href', hero.button.href);
        if (hero.button.class) {
            heroButton.className = hero.button.class;
        }
    }
    
    // Инициализируем Typed.js для динамического текста
    if (hero.title.dynamic) {
        var typed = new Typed('#typed-text', {
            strings: hero.title.dynamic,
            typeSpeed: 70,
            backSpeed: 40,
            loop: true
        });
    }
}

// Функция для применения преимуществ
function applyFeatures(features) {
    const featuresTitle = document.querySelector('#features h2');
    if (featuresTitle && features.title) {
        featuresTitle.textContent = features.title;
    }
    
    const featureItems = document.querySelectorAll('.feature-card');
    if (featureItems && features.items) {
        featureItems.forEach((item, index) => {
            if (features.items[index]) {
                const icon = item.querySelector('i');
                if (icon && features.items[index].icon) {
                    icon.className = features.items[index].icon;
                }
                
                const title = item.querySelector('h3');
                if (title && features.items[index].title) {
                    title.textContent = features.items[index].title;
                }
                
                const description = item.querySelector('p');
                if (description && features.items[index].description) {
                    description.textContent = features.items[index].description;
                }
            }
        });
    }
}

// Функция для применения тренировок
function applyWorkouts(workouts) {
    const workoutsTitle = document.querySelector('#workouts h2');
    if (workoutsTitle && workouts.title) {
        workoutsTitle.textContent = workouts.title;
    }
    
    const workoutItems = document.querySelectorAll('.workout-card');
    if (workoutItems && workouts.items) {
        workoutItems.forEach((item, index) => {
            if (workouts.items[index]) {
                const title = item.querySelector('h3');
                if (title && workouts.items[index].title) {
                    title.textContent = workouts.items[index].title;
                }
                
                const description = item.querySelector('p');
                if (description && workouts.items[index].description) {
                    description.textContent = workouts.items[index].description;
                }
                
                const exercisesList = item.querySelector('ul');
                if (exercisesList && workouts.items[index].exercises) {
                    exercisesList.innerHTML = '';
                    workouts.items[index].exercises.forEach(exercise => {
                        const li = document.createElement('li');
                        li.textContent = exercise;
                        exercisesList.appendChild(li);
                    });
                }
            }
        });
    }
}

// Функция для применения футера
function applyFooter(footer) {
    // Обновляем логотип
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo && footer.logo) {
        footerLogo.textContent = footer.logo.text;
    }
    
    // Обновляем социальные ссылки
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks && footer.socialLinks) {
        socialLinks.forEach((link, index) => {
            if (footer.socialLinks[index]) {
                const icon = link.querySelector('i');
                if (icon && footer.socialLinks[index].icon) {
                    icon.className = footer.socialLinks[index].icon;
                }
                link.setAttribute('href', footer.socialLinks[index].href);
            }
        });
    }
    
    // Обновляем копирайт
    const copyright = document.querySelector('.copyright');
    if (copyright && footer.copyright) {
        copyright.textContent = footer.copyright;
    }
    
    // Обновляем информацию о разработчике
    const developerCredit = document.querySelector('.developer-credit');
    if (developerCredit && footer.developer) {
        developerCredit.innerHTML = footer.developer.text + 
            '<a href="' + footer.developer.link + '" target="_blank" rel="noopener noreferrer">' + 
            footer.developer.name + '</a>';
    }
}

// Функция для применения изображений
function applyImages(images) {
    // Применяем фоновое изображение для hero секции
    const heroSection = document.querySelector('.hero');
    if (heroSection && images.hero) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(13, 17, 23, 0.7), rgba(13, 17, 23, 1)), url('${images.hero}')`;
    }
}

// Загружаем контент при загрузке страницы
document.addEventListener('DOMContentLoaded', loadContent);
