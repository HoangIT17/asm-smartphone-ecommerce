// Checkout Page JavaScript
class CheckoutManager {
  constructor() {
    this.init();
  }

  init() {
    this.updateCartBadge();
    this.renderCheckoutItems();
    this.setupEventListeners();
  }

  // Setup event listeners
  setupEventListeners() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));
    }
  }

  // Handle checkout form submission
  handleCheckout(e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const spinner = document.getElementById('checkoutSpinner');
    const originalText = submitBtn.innerHTML;
    if (spinner) spinner.classList.remove('d-none');
    submitBtn.disabled = true;

    // Validate form
    if (!this.validateForm()) {
      if (spinner) spinner.classList.add('d-none');
      submitBtn.disabled = false;
      return;
    }

    // Process order
    const cart = this.getCart();
    if (cart.length === 0) {
      this.showMessage('Your cart is empty!', 'warning');
      if (spinner) spinner.classList.add('d-none');
      submitBtn.disabled = false;
      return;
    }

    // Simulate processing delay
    setTimeout(() => {
      this.processOrder();
      // Reset button
      if (spinner) spinner.classList.add('d-none');
      submitBtn.disabled = false;
      // Redirect to order confirmation after 3 seconds
      setTimeout(() => {
        alert('Thank you for your purchase! We will contact you soon.');
        window.location.href = 'index.html';
      }, 3000);
    }, 2000);
  }

  // Validate form
  validateForm() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const province = $('#selectProvince').find('option:selected').text() || '';
    const district = $('#selectDistrict').find('option:selected').text() || '';
    const address = document.getElementById('customerAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;

    if (!name || !phone || !email || !province || !district || !address || !payment) {
      this.showMessage('Please fill in all required fields!', 'danger');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage('Invalid email address!', 'danger');
      return false;
    }

    // Validate phone format
    const phoneRegex = /^[0-9]{9,12}$/;
    if (!phoneRegex.test(phone)) {
      this.showMessage('Invalid phone number!', 'danger');
      return false;
    }

    return true;
  }

  // Process order
  processOrder() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const province = $('#selectProvince').find('option:selected').text() || '';
    const district = $('#selectDistrict').find('option:selected').text() || '';
    const address = document.getElementById('customerAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;

    const cart = this.getCart();
    const subtotal = this.calculateSubtotal();
    const shipping = 30000;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;

    // Create order object
    const order = {
      customerInfo: {
        name: name,
        phone: phone,
        email: email,
        province: province,
        district: district,
        address: address
      },
      paymentMethod: payment,
      items: cart,
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      orderDate: new Date().toISOString(),
      orderId: 'ORD-' + Date.now()
    };

    // Save order to localStorage (in real app, this would be sent to server)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');
    this.updateCartBadge();

    // Show success message
    this.showMessage(`Order placed successfully! Your order ID: <strong>${order.orderId}</strong>`, 'success');

    // Reset form
    document.getElementById('checkoutForm').reset();

    // Update display
    this.renderCheckoutItems();
  }

  // Show message
  showMessage(message, type) {
    const messageDiv = document.getElementById('checkoutMessage');
    const icon = type === 'success' ? 'check-circle' :
      type === 'danger' ? 'exclamation-triangle' :
        type === 'warning' ? 'exclamation-triangle' : 'info-circle';

    messageDiv.innerHTML = `<div class="alert alert-${type}"><i class="fas fa-${icon} me-2"></i>${message}</div>`;
  }

  // Calculate subtotal
  calculateSubtotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.quantity * (item.price || 0)), 0);
  }

  // Get cart from localStorage
  getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Update cart badge
  updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
      const cart = this.getCart();
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems;
    }
  }

  // Render checkout items
  renderCheckoutItems() {
    const cart = this.getCart();
    const checkoutItemsDiv = document.getElementById('checkoutItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const checkoutContent = document.getElementById('checkoutContent');

    if (cart.length === 0) {
      emptyCartMessage.innerHTML = `<i class="fas fa-shopping-cart fa-3x"></i>
      <h3>Your cart is empty
      </h3>
      <p>Add products to your cart to continue shopping</p>
      <a 
      href="products.html" class="btn btn-continue-shopping">
      <i class="fas fa-shopping-bag me-2"></i>
      Continue Shopping
      </a>`;
      emptyCartMessage.style.display = 'block';
      checkoutContent.style.display = 'none';
      return;
    }

    emptyCartMessage.style.display = 'none';
    checkoutContent.style.display = 'flex';

    let html = '';
    let subtotal = 0;

    html += `<div class="table-responsive"><table class="table align-middle mb-0 cart-table">
      <thead>
        <tr class="table-header-custom">
          <th class="text-center text-white fw-bold py-3">Image</th>
          <th class="text-center text-white fw-bold py-3">Product Name</th>
          <th class="text-center text-white fw-bold py-3">Price</th>
          <th class="text-center text-white fw-bold py-3">Quantity</th>
          <th class="text-center text-white fw-bold py-3">Total</th>
          <th class="text-center text-white fw-bold py-3"></th>
        </tr>
      </thead>
      <tbody>`;

    cart.forEach((item, index) => {
      const price = typeof item.price === 'string' ? parseInt(item.price.replace(/[^\d]/g, '')) : item.price;
      const itemTotal = item.quantity * (price || 0);
      subtotal += itemTotal;

      html += `<tr>
        <td class="text-center">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="product-image-checkout flex-shrink-0">` : ''}
        </td>
        <td class="text-center">
          <div class="fw-bold" style="font-size:1.13rem;">${item.name}</div>
          ${item.category ? `<div class="text-muted small mb-1">${item.category}</div>` : ''}
        </td>
        <td class="text-center">
          <div class="product-price text-primary small">${(price || 0).toLocaleString()} ₫</div>
        </td>
        <td class="text-center">
          <div class="quantity-controls justify-content-center">
            <button class="btn btn-outline-secondary" onclick="checkoutManager.updateQuantity(${index}, -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="btn btn-outline-secondary" onclick="checkoutManager.updateQuantity(${index}, 1)">+</button>
          </div>
        </td>
        <td class="text-center align-middle">
          <span class="fw-bold text-danger" style="font-size:1.15rem;">${itemTotal.toLocaleString()} ₫</span>
        </td>
        <td class="text-center">
          <button class="btn btn-outline-danger" onclick="checkoutManager.removeFromCart(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>`;
    });

    html += '</tbody></table></div>';
    checkoutItemsDiv.innerHTML = html;

    // Update order summary
    this.updateOrderSummary(subtotal);
  }

  // Update order summary
  updateOrderSummary(subtotal) {
    const shipping = 30000;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;

    document.getElementById('orderSubtotal').textContent = subtotal.toLocaleString() + ' ₫';
    document.getElementById('orderShipping').textContent = shipping.toLocaleString() + ' ₫';
    document.getElementById('orderTax').textContent = tax.toLocaleString() + ' ₫';
    document.getElementById('orderTotal').textContent = total.toLocaleString() + ' ₫';
  }

  // Update quantity
  updateQuantity(index, change) {
    const cart = this.getCart();
    if (cart[index]) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateCartBadge();
      this.renderCheckoutItems();
    }
  }

  // Remove from cart
  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartBadge();
    this.renderCheckoutItems();
  }
}

// Global checkout manager instance
let checkoutManager;

// Initialize checkout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  checkoutManager = new CheckoutManager();
});

// Global functions for backward compatibility
function calculateSubtotal() {
  if (checkoutManager) {
    return checkoutManager.calculateSubtotal();
  }
  return 0;
}

function renderCheckoutItems() {
  if (checkoutManager) {
    checkoutManager.renderCheckoutItems();
  }
}

function updateQuantity(index, change) {
  if (checkoutManager) {
    checkoutManager.updateQuantity(index, change);
  }
}

function removeFromCart(index) {
  if (checkoutManager) {
    checkoutManager.removeFromCart(index);
  }
}

function getCart() {
  if (checkoutManager) {
    return checkoutManager.getCart();
  }
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartBadge() {
  if (checkoutManager) {
    checkoutManager.updateCartBadge();
  } else {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems;
    }
  }
}

// === Dynamic Province/District Select2 ===
$(document).ready(function () {
  // Khởi tạo Select2
  $('#selectProvince, #selectDistrict').select2({
    placeholder: 'Select an option',
    allowClear: true,
    width: '100%'
  });

  // Load province options
  function loadProvinces() {
    var provinceOptions = '<option value="">Select Province/City</option>';
    VN_PROVINCES.forEach(function (p) {
      provinceOptions += `<option value="${p.code}">${p.name}</option>`;
    });
    $('#selectProvince').html(provinceOptions).trigger('change');
  }

  // Load district options theo province code
  function loadDistricts(provinceCode) {
    console.log('Province code:', provinceCode);
    var districts = [];
    var province = VN_PROVINCES.find(function (p) {
      return String(p.code) === String(provinceCode);
    });
    if (province && province.districts) {
      districts = province.districts;
    }
    console.log('Districts:', districts);
    var districtOptions = '<option value="">Select District</option>';
    districts.forEach(function (d) {
      districtOptions += `<option value="${d.code}">${d.name}</option>`;
    });
    console.log('districtOptions:', districtOptions);
    $('#selectDistrict').html(districtOptions).val('').trigger('change');
  }

  // Khi chọn province thì load lại district
  $('#selectProvince').on('change', function () {
    var provinceCode = $(this).val();
    loadDistricts(provinceCode);
  });

  // Khởi tạo ban đầu
  loadProvinces();
});

$(document).ready(function () {
  // Load provinces
  $('#selectProvince').select2({
    placeholder: 'Select province/city',
    data: VN_PROVINCES.map(p => ({ id: p.code, text: p.name }))
  });
  // Load districts when province changes
  $('#selectProvince').on('change', function () {
    const provinceCode = $(this).val();
    const province = VN_PROVINCES.find(p => String(p.code) === String(provinceCode));
    const districts = province ? province.districts : [];
    $('#selectDistrict').empty().select2({
      placeholder: 'Select district',
      data: districts.map(d => ({ id: d.name, text: d.name }))
    });
  });
  // Init empty district
  $('#selectDistrict').select2({ placeholder: 'Select district' });
});

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('proceedToCheckoutBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      window.location.href = 'checkout-info.html';
    });
  }
});

fetch('footer.html')
  .then(res => res.text())
  .then(html => document.getElementById('footerContainer').innerHTML = html);