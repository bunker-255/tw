// Template 6 - Content Loader

// Content data for the template
const templateContent = {
    products: [
        {
            id: 1,
            category: 'electronics',
            name: 'Premium Wireless Headphones',
            description: 'Experience crystal-clear audio with our noise-cancelling wireless headphones. Perfect for music lovers and professionals.',
            price: 199.99,
            originalPrice: 249.99,
            badge: 'New',
            image: 'https://picsum.photos/seed/product1/600/400.jpg'
        },
        {
            id: 2,
            category: 'fashion',
            name: 'Luxury Designer Watch',
            description: 'Elegant timepiece crafted with precision and style. A perfect blend of functionality and sophistication.',
            price: 299.99,
            originalPrice: 399.99,
            badge: 'Sale',
            image: 'https://picsum.photos/seed/product2/600/400.jpg'
        },
        {
            id: 3,
            category: 'home',
            name: 'Smart Home Hub',
            description: 'Control your entire home with voice commands or smartphone app. Compatible with all major smart devices.',
            price: 149.99,
            originalPrice: null,
            badge: null,
            image: 'https://picsum.photos/seed/product3/600/400.jpg'
        },
        {
            id: 4,
            category: 'electronics',
            name: '4K Action Camera',
            description: 'Capture your adventures in stunning 4K resolution. Waterproof design perfect for extreme sports.',
            price: 249.99,
            originalPrice: null,
            badge: 'Hot',
            image: 'https://picsum.photos/seed/product4/600/400.jpg'
        },
        {
            id: 5,
            category: 'fashion',
            name: 'Designer Leather Bag',
            description: 'Handcrafted from premium leather. Spacious interior with multiple compartments for organization.',
            price: 189.99,
            originalPrice: null,
            badge: null,
            image: 'https://picsum.photos/seed/product5/600/400.jpg'
        },
        {
            id: 6,
            category: 'home',
            name: 'Aromatherapy Diffuser',
            description: 'Create a relaxing atmosphere with essential oils. Ultrasonic technology for silent operation.',
            price: 59.99,
            originalPrice: null,
            badge: null,
            image: 'https://picsum.photos/seed/product6/600/400.jpg'
        },
        {
            id: 7,
            category: 'beauty',
            name: 'Premium Skincare Set',
            description: 'Complete skincare routine with natural ingredients. Nourish and rejuvenate your skin.',
            price: 89.99,
            originalPrice: 119.99,
            badge: 'Bestseller',
            image: 'https://picsum.photos/seed/product7/600/400.jpg'
        },
        {
            id: 8,
            category: 'electronics',
            name: 'Smart Fitness Watch',
            description: 'Track your health and fitness goals with advanced sensors. Long battery life and water resistant.',
            price: 199.99,
            originalPrice: null,
            badge: null,
            image: 'https://picsum.photos/seed/product8/600/400.jpg'
        },
        {
            id: 9,
            category: 'beauty',
            name: 'Luxury Perfume',
            description: 'Exquisite fragrance with top notes of floral and musk. Perfect for special occasions.',
            price: 129.99,
            originalPrice: null,
            badge: 'Limited',
            image: 'https://picsum.photos/seed/product9/600/400.jpg'
        }
    ],
    
    featuredProduct: {
        name: 'Smart Fitness Tracker',
        description: 'Introducing our latest innovation - the Smart Fitness Tracker. Monitor your health, track your workouts, and achieve your fitness goals with this advanced wearable technology.',
        price: 199.99,
        discount: 20,
        image: 'https://picsum.photos/seed/featured/800/600.jpg'
    },
    
    testimonials: [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Verified Buyer',
            avatar: 'https://picsum.photos/seed/person1/120/120.jpg',
            text: 'The quality of products is outstanding and the customer service is exceptional. I\'ve been a loyal customer for years!',
            rating: 5
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Verified Buyer',
            avatar: 'https://picsum.photos/seed/person2/120/120.jpg',
            text: 'Fast shipping and exactly as described. The wireless headphones have completely changed my music experience!',
            rating: 5
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Verified Buyer',
            avatar: 'https://picsum.photos/seed/person3/120/120.jpg',
            text: 'The smart home hub is a game-changer. Setting up my connected devices was so easy and everything works seamlessly.',
            rating: 5
        }
    ],
    
    categories: [
        { id: 'all', name: 'All Products', icon: 'fas fa-th' },
        { id: 'electronics', name: 'Electronics', icon: 'fas fa-laptop' },
        { id: 'fashion', name: 'Fashion', icon: 'fas fa-tshirt' },
        { id: 'home', name: 'Home & Living', icon: 'fas fa-home' },
        { id: 'beauty', name: 'Beauty', icon: 'fas fa-spa' }
    ]
};

// Function to load products dynamically
function loadProducts(category = 'all') {
    const productsContainer = document.querySelector('#all .row') || 
                            document.querySelector('#electronics .row') || 
                            document.querySelector('#fashion .row') || 
                            document.querySelector('#home .row') || 
                            document.querySelector('#beauty .row');
    
    if (!productsContainer) return;
    
    // Clear existing products
    productsContainer.innerHTML = '';
    
    // Filter products by category
    const filteredProducts = category === 'all' 
        ? templateContent.products 
        : templateContent.products.filter(product => product.category === category);
    
    // Create product cards
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsContainer.appendChild(productCard);
    });
    
    // Reinitialize animations
    AOS.refresh();
}

// Function to create a product card element
function createProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 product-item';
    col.setAttribute('data-category', product.category);
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', index * 100);
    
    const badgeHTML = product.badge 
        ? `<span class="product-badge">${product.badge}</span>` 
        : '';
    
    const priceHTML = product.originalPrice 
        ? `$${product.price} <span class="original-price">$${product.originalPrice}</span>` 
        : `$${product.price}`;
    
    col.innerHTML = `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badgeHTML}
                <div class="product-actions">
                    <button class="action-btn" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-content">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">${priceHTML}</div>
                    <button class="btn btn-product">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Function to load featured product
function loadFeaturedProduct() {
    const featuredContent = document.querySelector('.featured-content');
    const featuredImage = document.querySelector('.featured-image');
    
    if (!featuredContent || !featuredImage) return;
    
    const product = templateContent.featuredProduct;
    
    featuredContent.innerHTML = `
        <h2>Featured Product of the Month</h2>
        <p>${product.description}</p>
        <button class="btn btn-featured">Shop Now</button>
    `;
    
    featuredImage.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="img-fluid">
        <div class="featured-badge">-${product.discount}% OFF</div>
    `;
}

// Function to load testimonials
function loadTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials .row');
    
    if (!testimonialsContainer) return;
    
    testimonialsContainer.innerHTML = '';
    
    templateContent.testimonials.forEach((testimonial, index) => {
        const testimonialCard = createTestimonialCard(testimonial, index);
        testimonialsContainer.appendChild(testimonialCard);
    });
    
    // Reinitialize animations
    AOS.refresh();
}

// Function to create a testimonial card element
function createTestimonialCard(testimonial, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', index * 100);
    
    const starsHTML = Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('');
    
    col.innerHTML = `
        <div class="testimonial-card">
            <div class="rating">${starsHTML}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Function to initialize category tabs
function initializeCategoryTabs() {
    const filterButtons = document.querySelectorAll('#productFilter .nav-link');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            loadProducts(category);
        });
    });
}

// Function to initialize search functionality
function initializeSearch() {
    const searchForm = document.querySelector('.search-bar form');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.getElementById('searchInput').value.trim();
        
        if (searchTerm) {
            searchProducts(searchTerm);
        }
    });
}

// Function to search products
function searchProducts(searchTerm) {
    const products = templateContent.products;
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Update active filter to "all"
    document.querySelectorAll('#productFilter .nav-link').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('#productFilter .nav-link[data-filter="all"]').classList.add('active');
    
    // Display search results
    displaySearchResults(filteredProducts, searchTerm);
}

// Function to display search results
function displaySearchResults(products, searchTerm) {
    const allContainer = document.querySelector('#all .row');
    
    if (!allContainer) return;
    
    // Clear existing products
    allContainer.innerHTML = '';
    
    if (products.length === 0) {
        allContainer.innerHTML = `
            <div class="col-12 text-center" data-aos="fade-up">
                <h3>No products found</h3>
                <p>We couldn't find any products matching "${searchTerm}". Please try a different search term.</p>
            </div>
        `;
        return;
    }
    
    // Create product cards for search results
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        allContainer.appendChild(productCard);
    });
    
    // Reinitialize animations
    AOS.refresh();
}

// Function to initialize newsletter subscription
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            // Store email in localStorage
            localStorage.setItem('newsletterEmail', email);
            
            // Show success message
            showToast('Subscription Successful', `Thank you for subscribing with ${email}!`);
            
            // Reset form
            this.reset();
        }
    });
}

// Function to initialize quick view modals
function initializeQuickView() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn[title="Quick View"]')) {
            const button = e.target.closest('.action-btn[title="Quick View"]');
            const productCard = button.closest('.product-card');
            
            if (productCard) {
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productImage = productCard.querySelector('.product-image img').src;
                const productDescription = productCard.querySelector('.product-description').textContent;
                
                createQuickViewModal(productName, productPrice, productImage, productDescription);
            }
        }
    });
}

// Function to create quick view modal
function createQuickViewModal(title, price, image, description) {
    // Remove existing modal if any
    const existingModal = document.getElementById('quickViewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'quickViewModal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 20px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.style.cssText = `
        padding: 20px 30px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Quick View';
    modalTitle.style.cssText = `
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--dark-color);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #94a3b8;
        transition: color 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.style.cssText = `
        padding: 30px;
        display: flex;
        gap: 30px;
    `;
    
    // Product image
    const productImageContainer = document.createElement('div');
    productImageContainer.className = 'product-image-container';
    productImageContainer.style.cssText = `
        flex: 1;
        max-width: 50%;
    `;
    
    const productImg = document.createElement('img');
    productImg.src = image;
    productImg.alt = title;
    productImg.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 15px;
        object-fit: cover;
    `;
    
    productImageContainer.appendChild(productImg);
    
    // Product details
    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';
    productDetails.style.cssText = `
        flex: 1;
        display: flex;
        flex-direction: column;
    `;
    
    const productTitle = document.createElement('h2');
    productTitle.textContent = title;
    productTitle.style.cssText = `
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 15px;
        color: var(--dark-color);
    `;
    
    const productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.textContent = price;
    productPrice.style.cssText = `
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: 20px;
    `;
    
    const productDesc = document.createElement('p');
    productDesc.textContent = description;
    productDesc.style.cssText = `
        color: #64748b;
        margin-bottom: 30px;
        flex-grow: 1;
        line-height: 1.6;
    `;
    
    // Add to cart button
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'btn btn-product';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.style.cssText = `
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 30px;
        font-weight: 600;
        transition: var(--transition);
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        align-self: flex-start;
    `;
    
    addToCartBtn.addEventListener('click', function() {
        showToast('Product Added', `"${title}" has been added to your cart.`);
        this.innerHTML = '<i class="fas fa-check me-2"></i>Added';
        this.style.backgroundColor = '#10b981';
        updateCartCount(1);
        
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.style.backgroundColor = '';
        }, 2000);
    });
    
    productDetails.appendChild(productTitle);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(productDesc);
    productDetails.appendChild(addToCartBtn);
    
    modalBody.appendChild(productImageContainer);
    modalBody.appendChild(productDetails);
    
    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.style.cssText = `
        padding: 20px 30px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
    `;
    
    const wishlistBtn = document.createElement('button');
    wishlistBtn.className = 'btn btn-wishlist';
    wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
    wishlistBtn.style.cssText = `
        background: none;
        border: 2px solid #e2e8f0;
        color: var(--text-color);
        padding: 10px 20px;
        border-radius: 30px;
        font-weight: 600;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.borderColor = '#ef4444';
            this.style.color = '#ef4444';
            showToast('Added to Wishlist', `"${title}" has been added to your wishlist.`);
            updateWishlistCount(1);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.borderColor = '#e2e8f0';
            this.style.color = 'var(--text-color)';
            showToast('Removed from Wishlist', `"${title}" has been removed from your wishlist.`);
            updateWishlistCount(-1);
        }
    });
    
    modalFooter.appendChild(wishlistBtn);
    
    // Assemble modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    
    modalOverlay.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modalOverlay);
    
    // Show modal with animation
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay) {
            closeModal();
        }
    });
    
    // Function to close modal
    function closeModal() {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    }
}

// Initialize all content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load initial content
    loadProducts();
    loadFeaturedProduct();
    loadTestimonials();
    
    // Initialize functionality
    initializeCategoryTabs();
    initializeSearch();
    initializeNewsletter();
    initializeQuickView();
    
    // Initialize animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Export functions for external use
window.Template6ContentLoader = {
    loadProducts,
    loadFeaturedProduct,
    loadTestimonials,
    searchProducts,
    createQuickViewModal
};
