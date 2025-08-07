// Cart Management System
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.shippingCost = 30000; // 30.000₫
    this.init();
  }

  init() {
    this.updateCartBadge();
    this.setupEventListeners();
    this.setupCartLinkHandler();
  }

  // Setup cart link handler
  setupCartLinkHandler() {
    // Handle cart link clicks in navigation
    document.addEventListener('click', (e) => {
      const cartLink = e.target.closest('a[href*="checkout"], a[href*="cart"]');
      if (cartLink && (cartLink.querySelector('.fa-shopping-cart') || cartLink.textContent.includes('Cart'))) {
        e.preventDefault();

        // Check if cart is empty
        if (this.cart.length === 0) {
          this.showEmptyCartNotification();
          return;
        }

        // Redirect to checkout page
        window.location.href = 'checkout.html';
      }
    });
  }

  // Show empty cart notification
  showEmptyCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification animate__animated animate__fadeInDown';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="d-flex align-items-center">
                <i class="fas fa-shopping-cart text-warning me-2" style="font-size: 18px;"></i>
                <span class="fw-bold">Cart is empty!</span>
            </div>
            <div class="mt-1">
                <small class="text-warning">Please add products to cart first!</small>
            </div>
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        background: white;
        border: 2px solid #ffc107;
        border-radius: 12px;
        padding: 15px 20px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        max-width: 350px;
        font-size: 14px;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.remove('animate__fadeInDown');
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 500);
      }
    }, 3000);
  }

  // Add product to cart with success notification
  addToCart(product) {
    try {
      const existingItem = this.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          color: 'Default'
        });
      }

      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartBadge();
      this.showSuccessNotification(product.name);

      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showErrorNotification();
      return false;
    }
  }

  // Update cart badge on all pages
  updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      const previousTotal = parseInt(cartBadge.textContent) || 0;

      cartBadge.textContent = totalItems;

      // Add animation if badge value increased
      if (totalItems > previousTotal) {
        cartBadge.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
          cartBadge.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
      }
    }
  }

  // Show success notification
  showSuccessNotification(productName) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification animate__animated animate__fadeInDown';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="d-flex align-items-center">
                <i class="fas fa-check-circle text-success me-2" style="font-size: 18px;"></i>
                <span class="fw-bold">${productName}</span>
            </div>
            <div class="mt-1">
                <small class="text-success">Added to cart successfully!</small>
            </div>
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        background: white;
        border: 2px solid #28a745;
        border-radius: 12px;
        padding: 15px 20px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        max-width: 350px;
        font-size: 14px;
        backdrop-filter: blur(10px);
    `;

    // Add styles for notification content
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
        .cart-notification .btn-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #6c757d;
            padding: 0;
            margin-left: 10px;
        }
        .cart-notification .btn-close:hover {
            color: #000;
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.remove('animate__fadeInDown');
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 500);
      }
    }, 4000);
  }

  // Show error notification
  showErrorNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification animate__animated animate__fadeInDown';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-circle text-danger me-2" style="font-size: 18px;"></i>
                <span class="fw-bold">Lỗi!</span>
            </div>
            <div class="mt-1">
                <small class="text-danger">Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!</small>
            </div>
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        background: white;
        border: 2px solid #dc3545;
        border-radius: 12px;
        padding: 15px 20px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        max-width: 350px;
        font-size: 14px;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.remove('animate__fadeInDown');
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 500);
      }
    }, 4000);
  }

  // Setup event listeners for Add to Cart buttons
  setupEventListeners() {
    // Listen for dynamically added buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-add-cart')) {
        let product = null;

        // Check if button has data-product attribute
        if (e.target.hasAttribute('data-product')) {
          try {
            product = JSON.parse(e.target.getAttribute('data-product'));
          } catch (error) {
            console.error('Error parsing product data:', error);
          }
        } else {
          // Fallback to DOM parsing for buttons without data-product
          const productCard = e.target.closest('.product-card');
          if (productCard) {
            product = {
              id: Math.random().toString(36).substr(2, 9), // Generate random ID
              name: productCard.querySelector('.product-title').textContent,
              price: productCard.querySelector('.product-price').textContent,
              image: productCard.querySelector('.product-image img').src,
              quantity: 1,
              color: 'Default'
            };
          }
        }

        if (product) {
          this.addToCart(product);
        }
      }
    });
  }

  // Get cart items
  getCart() {
    return this.cart;
  }

  // Update cart item quantity
  updateQuantity(index, change) {
    this.cart[index].quantity = Math.max(1, this.cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartBadge();
    // Update cart display if on cart page
    if (typeof updateCart === 'function') {
      updateCart();
    }
  }

  // Set cart item quantity
  setQuantity(index, value) {
    this.cart[index].quantity = Math.max(1, parseInt(value) || 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartBadge();
    // Update cart display if on cart page
    if (typeof updateCart === 'function') {
      updateCart();
    }
  }

  // Remove item from cart
  removeItem(index) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartBadge();
    // Update cart display if on cart page
    if (typeof updateCart === 'function') {
      updateCart();
    }
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartBadge();
  }

  // Calculate cart totals
  calculateTotals() {
    let subtotal = 0;
    this.cart.forEach(item => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      subtotal += price * item.quantity;
    });

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + this.shippingCost + tax;

    return {
      subtotal,
      tax,
      total,
      shipping: this.shippingCost
    };
  }
}

// Global cart manager instance
let cartManager;

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  cartManager = new CartManager();
});

// Global function for Add to Cart (for backward compatibility)
function addToCart(product) {
  if (cartManager) {
    return cartManager.addToCart(product);
  } else {
    // If cartManager is not initialized yet, wait a bit and try again
    setTimeout(() => addToCart(product), 100);
    return false;
  }
}

// Global function for updating cart display (for cart.html)
function updateCart() {
  if (!cartManager) {
    // If cartManager is not initialized yet, wait a bit and try again
    setTimeout(updateCart, 100);
    return;
  }

  const cartItems = document.getElementById('cartItems');
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');

  if (!cartItems) return;

  cartItems.innerHTML = '';
  const cart = cartManager.getCart();

  cart.forEach((item, index) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    const itemTotal = price * item.quantity;

    cartItems.innerHTML += `
    <div class="card mb-3">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                </div>
                <div class="col-md-4">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text text-muted">Color: ${item.color || 'Default'}</p>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" onclick="cartManager.updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="cartManager.setQuantity(${index}, this.value)">
                        <button class="btn btn-outline-secondary" onclick="cartManager.updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <p class="card-text">${item.price}</p>
                </div>
                <div class="col-md-2 text-end">
                    <button class="btn btn-danger" onclick="cartManager.removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
  });

  const totals = cartManager.calculateTotals();

  if (subtotalElement) subtotalElement.textContent = `${totals.subtotal.toLocaleString()} ₫`;
  if (taxElement) taxElement.textContent = `${totals.tax.toLocaleString()} ₫`;
  if (totalElement) totalElement.textContent = `${totals.total.toLocaleString()} ₫`;
}

// Global function for checkout
function proceedToCheckout() {
  if (!cartManager || cartManager.getCart().length === 0) {
    alert('Your cart is empty!');
    return;
  }
  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
}

// Global function for placing order
function placeOrder() {
  const form = document.getElementById('checkoutForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  alert('Order placed successfully! Thank you for your purchase.');
  if (cartManager) {
    cartManager.clearCart();
  }
  updateCart();
  const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
  checkoutModal.hide();
}

// Global functions for checkout page
function getCart() {
  if (cartManager) {
    return cartManager.getCart();
  }
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartBadge() {
  if (cartManager) {
    cartManager.updateCartBadge();
  } else {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems;
    }
  }
} 

fetch('footer.html')
        .then(res => res.text())
        .then(html => document.getElementById('footerContainer').innerHTML = html);

      document.addEventListener('DOMContentLoaded', function () {
        updateCartBadge();
        renderCheckoutItems();
        document.getElementById('checkoutForm').addEventListener('submit', function (e) {
          e.preventDefault();
          // Validate
          const name = document.getElementById('customerName').value.trim();
          const phone = document.getElementById('customerPhone').value.trim();
          const email = document.getElementById('customerEmail').value.trim();
          const address = document.getElementById('customerAddress').value.trim();
          const payment = document.getElementById('paymentMethod').value;
          if (!name || !phone || !email || !address || !payment) {
            document.getElementById('checkoutMessage').innerHTML = '<div class="alert alert-danger">Vui lòng điền đầy đủ thông tin bắt buộc!</div>';
            return;
          }
          // Xử lý đặt hàng thành công
          localStorage.removeItem('cart');
          updateCartBadge();
          renderCheckoutItems();
          document.getElementById('checkoutMessage').innerHTML = '<div class="alert alert-success">Đặt hàng thành công! Cảm ơn bạn đã mua hàng.</div>';
          document.getElementById('checkoutForm').reset();
        });
      });

      // Hiển thị sản phẩm trong giỏ hàng
      function renderCheckoutItems() {
        const cart = getCart();
        const checkoutItemsDiv = document.getElementById('checkoutItems');
        let html = '';
        let subtotal = 0;
        if (cart.length === 0) {
          checkoutItemsDiv.innerHTML = '<div class="p-3">Your cart is empty.</div>';
          document.getElementById('orderSubtotal').textContent = '0 ₫';
          document.getElementById('orderTax').textContent = '0 ₫';
          document.getElementById('orderTotal').textContent = '0 ₫';
          document.getElementById('orderShipping').textContent = '0 ₫';
          document.getElementById('checkoutForm').style.display = 'none';
          return;
        }
        html += `<table class="table mb-0 align-middle">
          <thead><tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr></thead><tbody>`;
        cart.forEach(item => {
          let price = typeof item.price === 'string' ? Number(item.price.replace(/[^\d]/g, '')) : item.price;
          subtotal += item.quantity * (price || 0);
          html += `<tr>
            <td>${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;object-fit:cover;">` : ''}</td>
            <td>
              ${item.name}
              ${item.color ? `<div class='text-muted small'>Màu: ${item.color}</div>` : ''}
              ${item.size ? `<div class='text-muted small'>Size: ${item.size}</div>` : ''}
            </td>
            <td>${(price || 0).toLocaleString()} ₫</td>
            <td>${item.quantity}</td>
            <td>${(item.quantity * (price || 0)).toLocaleString()} ₫</td>
          </tr>`;
        });
        html += '</tbody></table>';
        checkoutItemsDiv.innerHTML = html;
        // Tổng kết đơn hàng
        const shipping = 30000;
        const tax = Math.round(subtotal * 0.1);
        const total = subtotal + shipping + tax;
        document.getElementById('orderSubtotal').textContent = subtotal.toLocaleString() + ' ₫';
        document.getElementById('orderShipping').textContent = shipping.toLocaleString() + ' ₫';
        document.getElementById('orderTax').textContent = tax.toLocaleString() + ' ₫';
        document.getElementById('orderTotal').textContent = total.toLocaleString() + ' ₫';
        document.getElementById('checkoutForm').style.display = '';
      }

      // SỬA HÀM getCart để dùng localStorage
      function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
      }