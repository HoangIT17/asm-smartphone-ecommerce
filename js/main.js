 // Auto banner carousel
(function () {
    let current = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    function showSlide(idx) {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === idx);
            if (dots[i]) dots[i].classList.toggle('active', i === idx);
        });
        current = idx;
    }
    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }
    window.changeSlide = function (dir) {
        let idx = (current + dir + slides.length) % slides.length;
        showSlide(idx);
    }
    window.currentSlide = function (idx) {
        showSlide(idx);
    }
    setInterval(nextSlide, 4000);
})();

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function () {
    // Cart manager is already initialized in cart.js
    // No need for additional initialization here
    // Gán sự kiện cho các sản phẩm ở các section
    document.querySelectorAll('.product-card').forEach(function (card) {
        // Click vào ảnh sẽ mở modal chi tiết
        const img = card.querySelector('img');
        if (img) {
            img.style.cursor = 'pointer';
            img.onclick = function (e) {
                const name = card.querySelector('.product-title').textContent;
                const price = card.querySelector('.product-price').textContent;
                const product = { name, price, image: img ? img.src : '' };
                showProductModal(product);
                e.stopPropagation();
            };
        }
        // Nút Add to Cart vẫn hoạt động như cũ
        const btn = card.querySelector('.btn-add-cart');
        if (btn) {
            btn.onclick = function (e) {
                e.stopPropagation();
                const name = card.querySelector('.product-title').textContent;
                const price = card.querySelector('.product-price').textContent;
                const image = img ? img.src : '';
                // Tạo id duy nhất cho mỗi sản phẩm (nên lấy từ data-id nếu có)
                let id = card.getAttribute('data-id');
                if (!id) id = name + '-' + price;
                const product = { id, name, price, image, quantity: 1 };
                addToCartWithQty(product, 1);
                updateCartDisplay();
                if (typeof showToast === 'function') {
                    showToast('', 'success', name);
                }
            };
        }
    });
});

// Lấy giỏ hàng từ localStorage
function getCartCookie() {
    const value = localStorage.getItem('cart');
    return value ? JSON.parse(value) : [];
}

function updateCartBadge() {
    const cart = getCartCookie();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = total;
}

function renderCheckoutItems() {
    const cart = getCartCookie();
    // ... code render như cũ ...
}

function updateCartDisplay() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }
}

// // Gán lại sự kiện cho nút Add to Cart để gọi updateCartDisplay
// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
//         // Xóa mọi .onclick cũ nếu có
//         btn.onclick = null;
//         btn.addEventListener('click', function () {
//             setTimeout(updateCartDisplay, 100);
//             if (typeof showToast === 'function') {
//                 showToast('Product added to cart successfully!', 'success');
//             }
//         });
//     });
// });

window.scrollToCategories = function () {
    const section = document.getElementById('categories');
    if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({ top: y - offset - 0, behavior: 'smooth' });
    }
}