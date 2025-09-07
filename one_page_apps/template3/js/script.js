document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Align to the top of the target element
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


    // Only initialize observer if there are elements to observe
    if (animatedElements.length > 0 || counterElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Handle general animations (non-counter elements)
                    if (entry.target.dataset.animation && !entry.target.classList.contains('stat-number')) {
                        const animationType = entry.target.dataset.animation;
                        entry.target.classList.add(`animate-${animationType}`);
                        entry.target.classList.add('animation-triggered');
                        // Unobserve general animated elements once triggered
                        observerInstance.unobserve(entry.target);
                    }

                    // Handle counter animations specifically for the stats section container
                    // We observe the section itself to trigger all counters at once
                    if (entry.target.id === 'stats' && !countersAnimated && counterElements.length > 0) {
                        counterElements.forEach(counter => {
                            const targetValue = parseInt(counter.dataset.target, 10);
                            if (!isNaN(targetValue)) {
                                // Start the counter animation
                                animateCounter(counter, targetValue);
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
        }, {
            threshold: 0.3 // Trigger when 30% of the element is visible
        });

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
                        }
                        // Stop observing the image once loaded
                        observerInstance.unobserve(lazyImage);
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% is visible
                // rootMargin: '0px 0px 100px 0px' // Load images slightly before they enter viewport
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

            // Optional: Toggle body scroll lock when menu is open
            // document.body.classList.toggle('no-scroll', mainNavContent.classList.contains('is-open'));
        });

        // Close menu when a link inside it is clicked
        mainNavContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavContent.classList.contains('is-open')) {
                    burgerMenuButton.classList.remove('is-active');
                    mainNavContent.classList.remove('is-open');
                    burgerMenuButton.setAttribute('aria-expanded', 'false');
                    // document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Add other JS functionalities as needed ---
    // Example: Mobile menu toggle, form validation, etc.

});
