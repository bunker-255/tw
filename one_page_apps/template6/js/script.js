// Template 6 - Premium Product Showcase JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Hide loading spinner when page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            const spinner = document.getElementById('loadingSpinner');
            if (spinner) {
                spinner.style.opacity = '0';
                setTimeout(function() {
                    spinner.style.display = 'none';
                }, 300);
            }
        }, 500);
    });
    
    // Product filtering
    const filterButtons = document.querySelectorAll('#productFilter .nav-link');
    const productItems = document.querySelectorAll('.product-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Trigger AOS animation
                    AOS.refresh();
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-product');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('.product-title').textContent;
            
            // Create a toast notification
            showToast('Product Added', `"${productName}" has been added to your cart.`);
            
            // Add animation to button
            this.innerHTML = '<i class="fas fa-check me-2"></i>Added';
            this.style.backgroundColor = '#10b981';
            
            // Update cart count (if cart count element exists)
            updateCartCount(1);
            
            setTimeout(() => {
                this.innerHTML = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.action-btn[title="Add to Wishlist"]');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const productName = this.closest('.product-card').querySelector('.product-title').textContent;
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.backgroundColor = '#ef4444';
                showToast('Added to Wishlist', `"${productName}" has been added to your wishlist.`);
                
                // Update wishlist count (if wishlist count element exists)
                updateWishlistCount(1);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.backgroundColor = '';
                showToast('Removed from Wishlist', `"${productName}" has been removed from your wishlist.`);
                
                // Update wishlist count (if wishlist count element exists)
                updateWishlistCount(-1);
            }
        });
    });
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.action-btn[title="Quick View"]');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productDescription = productCard.querySelector('.product-description').textContent;
            
            // Create modal for quick view
            createQuickViewModal(productName, productPrice, productImage, productDescription);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Create a toast notification
            showToast('Subscription Successful', `Thank you for subscribing with ${email}!`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Search functionality
    const searchForm = document.querySelector('.search-bar form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('searchInput').value;
            
            if (searchTerm.trim() !== '') {
                showToast('Search', `Searching for "${searchTerm}"...`);
                
                // Filter products based on search term
                filterProductsBySearch(searchTerm);
                
                // Clear search input
                document.getElementById('searchInput').value = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.transform = 'scale(0.98)';
            header.style.opacity = '0.95';
        } else {
            header.style.transform = 'scale(1)';
            header.style.opacity = '1';
        }
    });
    
    // Initialize cart and wishlist counts from localStorage
    initializeCounts();
});

// Toast notification function
function showToast(title, message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// Update cart count
function updateCartCount(change) {
    let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    cartCount += change;
    localStorage.setItem('cartCount', cartCount.toString());
    
    // Update cart count display if it exists
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Add animation
        cartCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Update wishlist count
function updateWishlistCount(change) {
    let wishlistCount = parseInt(localStorage.getItem('wishlistCount') || '0');
    wishlistCount += change;
    localStorage.setItem('wishlistCount', wishlistCount.toString());
    
    // Update wishlist count display if it exists
    const wishlistCountElement = document.getElementById('wishlistCount');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlistCount;
        
        // Add animation
        wishlistCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            wishlistCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Initialize cart and wishlist counts
function initializeCounts() {
    const cartCount = localStorage.getItem('cartCount') || '0';
    const wishlistCount = localStorage.getItem('wishlistCount') || '0';
    
    const cartCountElement = document.getElementById('cartCount');
    const wishlistCountElement = document.getElementById('wishlistCount');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlistCount;
    }
}

// Filter products by search term
function filterProductsBySearch(searchTerm) {
    const productItems = document.querySelectorAll('.product-item');
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    productItems.forEach(item => {
        const title = item.querySelector('.product-title').textContent.toLowerCase();
        const description = item.querySelector('.product-description').textContent.toLowerCase();
        const category = item.querySelector('.product-category').textContent.toLowerCase();
        
        if (title.includes(lowerCaseSearchTerm) || 
            description.includes(lowerCaseSearchTerm) || 
            category.includes(lowerCaseSearchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update active filter to "all"
    const filterButtons = document.querySelectorAll('#productFilter .nav-link');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('#productFilter .nav-link[data-filter="all"]').classList.add('active');
}

// Create quick view modal
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

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .modal-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .modal-content {
        background-color: white;
        border-radius: 20px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    
    @media (max-width: 768px) {
        .modal-body {
            flex-direction: column;
        }
        
        .product-image-container {
            max-width: 100%;
        }
    }
`;
document.head.appendChild(style);
