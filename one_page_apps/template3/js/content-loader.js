// Функция для загрузки контента из JSON файла
async function loadContent() {
    try {
        // Загружаем JSON файл
        const response = await fetch('template3-content.json');
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
    
    // Применяем логотип
    if (content.logo) {
        applyLogo(content.logo);
    }
    
    // Применяем навигацию
    if (content.navigation) {
        applyNavigation(content.navigation);
    }
    
    // Применяем hero секцию
    if (content.heroSection) {
        applyHeroSection(content.heroSection);
    }
    
    // Применяем услуги
    if (content.services) {
        applyServices(content.services);
    }
    
    // Применяем статистику
    if (content.stats) {
        applyStats(content.stats);
    }
    
    // Применяем преимущества
    if (content.advantages) {
        applyAdvantages(content.advantages);
    }
    
    // Применяем отзывы
    if (content.reviews) {
        applyReviews(content.reviews);
    }
    
    // Применяем контактную информацию
    if (content.contact) {
        applyContact(content.contact);
    }
    
    // Применяем футер
    if (content.footer) {
        applyFooter(content.footer);
    }
    
    // Применяем мобильную кнопку звонка
    if (content.mobileCallButton) {
        applyMobileCallButton(content.mobileCallButton);
    }
}

// Функция для применения навигации
function applyNavigation(nav) {
    // Обновляем телефон в навигации
    const phoneElement = document.querySelector('.header-phone');
    if (phoneElement && nav.phone) {
        phoneElement.textContent = nav.phone;
        phoneElement.setAttribute('href', `tel:${nav.phone}`);
    }
    
    // Обновляем ссылки навигации
    const navLinks = document.querySelectorAll('.header-anchor-links a');
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
    // Обновляем название компании
    const companyNamePart1 = document.querySelector('.company-name-part1');
    if (companyNamePart1 && hero.companyName.part1) {
        companyNamePart1.textContent = hero.companyName.part1;
    }
    
    const companyNamePart2 = document.querySelector('.company-name-part2');
    if (companyNamePart2 && hero.companyName.part2) {
        companyNamePart2.textContent = hero.companyName.part2;
    }
    
    // Обновляем подзаголовок
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && hero.subtitle) {
        heroSubtitle.textContent = hero.subtitle;
    }
    
    // Обновляем описание
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription && hero.description) {
        heroDescription.textContent = hero.description;
    }
    
    // Обновляем кнопки
    const heroButtons = document.querySelectorAll('.hero-cta-buttons .btn');
    if (heroButtons && hero.buttons) {
        heroButtons.forEach((button, index) => {
            if (hero.buttons[index]) {
                button.textContent = hero.buttons[index].text;
                button.setAttribute('href', hero.buttons[index].href);
                
                // Обновляем атрибуты для разных типов кнопок
                if (hero.buttons[index].type === 'whatsapp') {
                    button.classList.add('btn-whatsapp');
                    button.setAttribute('target', '_blank');
                    button.setAttribute('rel', 'noopener noreferrer');
                } else if (hero.buttons[index].type === 'google') {
                    button.classList.add('btn-google');
                    button.setAttribute('target', '_blank');
                    button.setAttribute('rel', 'noopener noreferrer');
                }
            }
        });
    }
}

// Функция для применения услуг
function applyServices(services) {
    const servicesTitle = document.querySelector('#services h2');
    if (servicesTitle && services.title) {
        servicesTitle.textContent = services.title;
    }
    
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems && services.items) {
        serviceItems.forEach((item, index) => {
            if (services.items[index]) {
                const title = item.querySelector('h3');
                if (title && services.items[index].title) {
                    title.textContent = services.items[index].title;
                }
                
                const description = item.querySelector('p');
                if (description && services.items[index].description) {
                    description.textContent = services.items[index].description;
                }
            }
        });
    }
}

// Функция для применения статистики
function applyStats(stats) {
    const statsTitle = document.querySelector('#stats h2');
    if (statsTitle && stats.title) {
        statsTitle.textContent = stats.title;
    }
    
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems && stats.items) {
        statItems.forEach((item, index) => {
            if (stats.items[index]) {
                const description = item.querySelector('.stat-description');
                if (description && stats.items[index].description) {
                    description.textContent = stats.items[index].description;
                }
                
                const number = item.querySelector('.stat-number');
                if (number && stats.items[index].number) {
                    number.setAttribute('data-target', stats.items[index].number);
                }
            }
        });
    }
}

// Функция для применения преимуществ
function applyAdvantages(advantages) {
    const advantagesTitle = document.querySelector('#advantages h2');
    if (advantagesTitle && advantages.title) {
        advantagesTitle.textContent = advantages.title;
    }
    
    const advantageItems = document.querySelectorAll('.advantage-item');
    if (advantageItems && advantages.items) {
        advantageItems.forEach((item, index) => {
            if (advantages.items[index]) {
                const title = item.querySelector('h3');
                if (title && advantages.items[index].title) {
                    title.textContent = advantages.items[index].title;
                }
                
                const description = item.querySelector('p');
                if (description && advantages.items[index].description) {
                    description.textContent = advantages.items[index].description;
                }
            }
        });
    }
}

// Функция для применения отзывов
function applyReviews(reviews) {
    const reviewsTitle = document.querySelector('#reviews h2');
    if (reviewsTitle && reviews.title) {
        reviewsTitle.textContent = reviews.title;
    }
    
    const reviewItems = document.querySelectorAll('.review-item');
    if (reviewItems && reviews.items) {
        reviewItems.forEach((item, index) => {
            if (reviews.items[index]) {
                const text = item.querySelector('.review-text');
                if (text && reviews.items[index].text) {
                    text.textContent = reviews.items[index].text;
                }
                
                const author = item.querySelector('.review-author');
                if (author && reviews.items[index].author) {
                    author.textContent = reviews.items[index].author;
                }
            }
        });
    }
}

// Функция для применения контактной информации
function applyContact(contact) {
    const contactTitle = document.querySelector('#contact h2');
    if (contactTitle && contact.title) {
        contactTitle.textContent = contact.title;
    }
    
    const contactButtons = document.querySelectorAll('.btn-quick-contact');
    if (contactButtons && contact.buttons) {
        contactButtons.forEach((button, index) => {
            if (contact.buttons[index]) {
                const buttonText = button.querySelector('span');
                if (buttonText && contact.buttons[index].text) {
                    buttonText.textContent = contact.buttons[index].text;
                }
                
                button.setAttribute('href', contact.buttons[index].href);
                
                // Обновляем классы для разных типов кнопок
                button.className = 'btn btn-quick-contact';
                if (contact.buttons[index].type === 'whatsapp') {
                    button.classList.add('btn-whatsapp');
                } else if (contact.buttons[index].type === 'phone') {
                    button.classList.add('btn-phone');
                } else if (contact.buttons[index].type === 'google') {
                    button.classList.add('btn-google');
                }
                
                // Добавляем атрибуты для внешних ссылок
                if (contact.buttons[index].type === 'whatsapp' || contact.buttons[index].type === 'google') {
                    button.setAttribute('target', '_blank');
                    button.setAttribute('rel', 'noopener noreferrer');
                }
            }
        });
    }
}

// Функция для применения футера
function applyFooter(footer) {
    // Обновляем раздел "О нас"
    const aboutTitle = document.querySelector('.footer-about h4');
    if (aboutTitle && footer.about.title) {
        aboutTitle.textContent = footer.about.title;
    }
    
    const aboutText = document.querySelector('.footer-about p');
    if (aboutText && footer.about.text) {
        aboutText.textContent = footer.about.text;
    }
    
    // Обновляем раздел "Контакты"
    const contactTitle = document.querySelector('.footer-contact h4');
    if (contactTitle && footer.contact.title) {
        contactTitle.textContent = footer.contact.title;
    }
    
    const contactAddress = document.querySelector('.contact-info-list li:first-child span:last-child');
    if (contactAddress && footer.contact.address) {
        contactAddress.textContent = footer.contact.address;
    }
    
    const contactPhone = document.querySelector('.contact-info-list li:nth-child(2) a');
    if (contactPhone && footer.contact.phone) {
        contactPhone.textContent = footer.contact.phone;
        contactPhone.setAttribute('href', `tel:${footer.contact.phone}`);
    }
    
    // Обновляем копирайт
    const copyright = document.querySelector('.footer-bottom p:first-child');
    if (copyright && footer.copyright) {
        copyright.textContent = footer.copyright;
    }
    
    // Обновляем информацию о разработчике
    const developerLink = document.querySelector('.developer-credit a');
    if (developerLink && footer.developer) {
        developerLink.textContent = footer.developer.name;
        developerLink.setAttribute('href', footer.developer.link);
    }
}

// Функция для применения изображений
function applyImages(images) {
    // Применяем фоновое изображение для hero секции
    const heroSection = document.querySelector('.section-hero');
    if (heroSection && images.hero) {
        heroSection.style.backgroundImage = `url('${images.hero}')`;
    }
    
    // Применяем фоновое изображение для stats секции
    const statsSection = document.querySelector('.section-stats');
    if (statsSection && images.stats) {
        statsSection.style.backgroundImage = `url('${images.stats}')`;
    }
}

// Функция для применения мобильной кнопки звонка
function applyMobileCallButton(button) {
    const mobileButton = document.querySelector('.call-now-button');
    if (mobileButton) {
        const buttonSpan = mobileButton.querySelector('span');
        if (buttonSpan && button.text) {
            buttonSpan.textContent = button.text;
        }
        mobileButton.setAttribute('href', button.href);
    }
}

// Функция для применения логотипа
function applyLogo(logo) {
    const logoElement = document.querySelector('.logo a');
    if (logoElement && logo.text) {
        logoElement.textContent = logo.text;
    }
}

// Загружаем контент при загрузке страницы
document.addEventListener('DOMContentLoaded', loadContent);
