document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const mainNavContent = document.querySelector('.main-nav-content');
                const burgerMenu = document.querySelector('.burger-menu');
                if (mainNavContent && mainNavContent.classList.contains('is-open')) {
                    mainNavContent.classList.remove('is-open');
                    burgerMenu.classList.remove('is-active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Intersection Observer for Animations & Counters ---
    const animatedElements = document.querySelectorAll('[data-animation]');
    const counterElements = document.querySelectorAll('.section-stats .stat-number[data-target]');
    let countersAnimated = false; // Flag to ensure counters animate only once

    // Function to animate counters
    // Uses requestAnimationFrame for smoother animation
    const animateCounter = (element, target) => {
        const duration = 2000; // Animation duration in ms
        let startTimestamp = null;
        const startValue = 0; // Always start from 0

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (target - startValue) + startValue);

            // Format with commas for readability (using Hebrew locale)
            element.textContent = currentValue.toLocaleString('he-IL');

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure final value is exact and formatted
                element.textContent = target.toLocaleString('he-IL');
            }
        };
        window.requestAnimationFrame(step);
    };

    // Enhanced Intersection Observer with multiple options
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start triggering 50px before element comes into view
    };

    // Only initialize observer if there are elements to observe
    if (animatedElements.length > 0 || counterElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Handle general animations (non-counter elements)
                    if (entry.target.dataset.animation && !entry.target.classList.contains('stat-number')) {
                        const animationType = entry.target.dataset.animation;
                        
                        // Add animation class
                        entry.target.classList.add(`animate-${animationType}`);
                        entry.target.classList.add('animation-triggered');
                        
                        // Add stagger effect for elements with same animation type
                        const animatedSiblings = document.querySelectorAll(`[data-animation="${animationType}"]`);
                        animatedSiblings.forEach((sibling, index) => {
                            if (sibling !== entry.target && !sibling.classList.contains('animation-triggered')) {
                                setTimeout(() => {
                                    sibling.classList.add(`animate-${animationType}`);
                                    sibling.classList.add('animation-triggered');
                                }, 100 * index); // Stagger by 100ms
                            }
                        });
                        
                        // Unobserve general animated elements once triggered
                        observerInstance.unobserve(entry.target);
                    }

                    // Handle counter animations specifically for the stats section container
                    // We observe the section itself to trigger all counters at once
                    if (entry.target.id === 'stats' && !countersAnimated && counterElements.length > 0) {
                        counterElements.forEach((counter, index) => {
                            const targetValue = parseInt(counter.dataset.target, 10);
                            if (!isNaN(targetValue)) {
                                // Start the counter animation with delay
                                setTimeout(() => {
                                    animateCounter(counter, targetValue);
                                }, 200 * index); // Stagger counters by 200ms
                                
                                // Trigger the zoom animation on the parent item as well
                                const parentItem = counter.closest('.stat-item');
                                if (parentItem && parentItem.dataset.animation) {
                                    const animationType = parentItem.dataset.animation;
                                    parentItem.classList.add(`animate-${animationType}`);
                                    parentItem.classList.add('animation-triggered');
                                }
                            }
                        });
                        countersAnimated = true; // Set flag to true
                        // Unobserve the stats section after triggering counters
                        observerInstance.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe general animated elements (excluding those inside stats section initially)
        animatedElements.forEach(el => {
            // We observe the stat items via the section observer now
            if (!el.closest('.section-stats')) {
                observer.observe(el);
            }
        });

        // Observe the stats section container itself to trigger counter animation
        const statsSection = document.getElementById('stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // --- Lazy Loading for Images ---
    const lazyImages = document.querySelectorAll('img[loading="lazy"][data-src]');

    if (lazyImages.length > 0) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        if (lazyImage.dataset.src) {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.removeAttribute('data-src'); // Clean up
                            lazyImage.classList.add('lazy-loaded'); // Optional: for styling/debugging
                            
                            // Add fade-in animation
                            lazyImage.style.opacity = '0';
                            lazyImage.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => {
                                lazyImage.style.opacity = '1';
                            }, 10);
                        }
                        // Stop observing the image once loaded
                        observerInstance.unobserve(lazyImage);
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% is visible
                rootMargin: '0px 0px 100px 0px' // Load images slightly before they enter viewport
            });

            lazyImages.forEach(img => {
                lazyImageObserver.observe(img);
            });

        } else {
            // Fallback for browsers without IntersectionObserver (less efficient)
            console.warn('IntersectionObserver not supported, falling back to basic lazy load.');
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('lazy-loaded');
                }
            });
        }
    }

    // --- Mobile Navigation Toggle ---
    const burgerMenuButton = document.querySelector('.burger-menu');
    const mainNavContent = document.querySelector('.main-nav-content');

    if (burgerMenuButton && mainNavContent) {
        burgerMenuButton.addEventListener('click', () => {
            // Toggle classes for visual state
            burgerMenuButton.classList.toggle('is-active');
            mainNavContent.classList.toggle('is-open');

            // Update ARIA attribute for accessibility
            const isExpanded = burgerMenuButton.getAttribute('aria-expanded') === 'true';
            burgerMenuButton.setAttribute('aria-expanded', !isExpanded);

            // Toggle body scroll lock when menu is open
            document.body.classList.toggle('no-scroll', mainNavContent.classList.contains('is-open'));
        });

        // Close menu when a link inside it is clicked
        mainNavContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavContent.classList.contains('is-open')) {
                    burgerMenuButton.classList.remove('is-active');
                    mainNavContent.classList.remove('is-open');
                    burgerMenuButton.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Scroll to Top Button ---
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(scrollTopButton);

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Parallax Effect for Hero Section ---
    const heroSection = document.querySelector('.section-hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-bg-layer');
            if (parallax) {
                const speed = 0.5;
                parallax.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    }

    // --- Add interactive hover effects to cards and buttons ---
    const cards = document.querySelectorAll('.service-item, .advantage-item, .review-item, .card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('hover-glow');
    });

    // --- Form Validation Enhancement (if forms exist) ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation check
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add shake animation
                    field.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        field.style.animation = '';
                    }, 500);
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success';
                successAlert.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Form submitted successfully!';
                form.parentNode.insertBefore(successAlert, form);
                
                // Reset form
                form.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successAlert.remove();
                }, 3000);
            }
        });
    });

    // --- Add shake animation for invalid fields ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .error {
            border-color: #FF6B6B !important;
            box-shadow: 0 0 10px rgba(255, 107, 107, 0.3) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Dynamic Loading Animation for Content ---
    const contentSections = document.querySelectorAll('section');
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contentObserver.observe(section);
    });

    // --- Performance Optimization: Throttle scroll events ---
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll event listeners
    window.addEventListener('scroll', throttle(() => {
        // Parallax effects or other scroll-based animations can go here
    }, 16)); // ~60fps

    // --- Add other JS functionalities as needed ---
    // Example: Interactive charts, advanced animations, etc.
});
