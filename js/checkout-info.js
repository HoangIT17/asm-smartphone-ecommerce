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
      data: districts.map(d => ({ id: d.code, text: d.name }))
    });
  });
  // Init empty district
  $('#selectDistrict').select2({ placeholder: 'Select district' });
  // Form submit
  $('#customerInfoForm').on('submit', function (e) {
    e.preventDefault();
    $('#confirmationMessage').removeClass('d-none').html('<i class="fas fa-check-circle me-2"></i>Your order has been placed successfully! Thank you for shopping with us.');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    localStorage.removeItem('cart');
    $('#cartBadge').text(0);
  });

  // Render cart items table & order summary
  function renderCartTableAndSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let html = '';
    let subtotal = 0;
    const shipping = cart.length > 0 ? 30000 : 0;
    cart.forEach(item => {
      const price = typeof item.price === 'string' ? parseInt(item.price.replace(/[^\d]/g, '')) : item.price;
      const itemTotal = item.quantity * (price || 0);
      subtotal += itemTotal;
      html += `<tr>
        <td><img src="${item.image || ''}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"></td>
        <td>${item.name}</td>
        <td>${(price || 0).toLocaleString()} ₫</td>
        <td>${item.quantity}</td>
        <td class="fw-bold text-danger">${itemTotal.toLocaleString()} ₫</td>
      </tr>`;
    });
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;
    $('#cartItemsTable').html(html);
    $('#grandTotal').text(total.toLocaleString() + ' ₫');
    $('#orderSubtotal').text(subtotal.toLocaleString() + ' ₫');
    $('#orderShipping').text(shipping.toLocaleString() + ' ₫');
    $('#orderTax').text(tax.toLocaleString() + ' ₫');
    $('#orderTotal').text(total.toLocaleString() + ' ₫');

    // Ẩn/hiện nếu cart rỗng
    if (cart.length === 0) {
      $('.cart-table, .order-summary-card, .card:has(#customerInfoForm), .card:has(#cartItemsTable)').hide();
      $('.container').prepend('<div id="emptyCartMessage" class="empty-cart-message card shadow border-0 p-4 mb-4 text-center" style="background: #fff;"><i class="fas fa-shopping-cart fa-3x text-warning mb-3"></i><h3 class="fw-bold">Your cart is empty</h3><p class="text-muted">Please add products to your cart to continue shopping</p><a href="products.html" class="btn btn-continue-shopping btn-outline-warning rounded-pill px-4 fw-bold"><i class="fas fa-shopping-bag me-2"></i>Continue Shopping</a></div>');
    }
  }
  renderCartTableAndSummary();
});

function renderCheckoutItemsInfo() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const checkoutItemsDiv = document.getElementById('checkoutItems');
  if (!checkoutItemsDiv) return;
  if (cart.length === 0) {
    checkoutItemsDiv.innerHTML = '<div class="text-center py-4">Your cart is empty.</div>';
    return;
  }
  let html = '';
  html += `<table class="table mb-0 align-middle">
    <thead>
      <tr>
        <th class="text-center">Product</th>
        <th class="text-center">Quantity</th>
        <th class="text-center">Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody>`;
  cart.forEach((item, index) => {
    const price = typeof item.price === 'string' ? parseInt(item.price.replace(/[^\d]/g, '')) : item.price;
    const itemTotal = item.quantity * (price || 0);
    html += `<tr>
      <td>
        <div class="d-flex align-items-center gap-3">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="product-image-checkout flex-shrink-0" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">` : ''}
          <div>
            <div class="fw-bold" style="font-size:1.13rem;">${item.name}</div>
            ${item.category ? `<div class="text-muted small mb-1">${item.category}</div>` : ''}
            <div class="product-price text-primary small">${(price || 0).toLocaleString()} ₫</div>
          </div>
        </div>
      </td>
      <td class="text-center">
        <div class="quantity-controls justify-content-center">
          <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantityInfo(${index}, -1)">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantityInfo(${index}, 1)">+</button>
        </div>
      </td>
      <td class="text-center align-middle">
        <span class="fw-bold text-danger" style="font-size:1.15rem;">${itemTotal.toLocaleString()} ₫</span>
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCartInfo(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  checkoutItemsDiv.innerHTML = html;
}
function updateQuantityInfo(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCheckoutItemsInfo();
    renderCartTableAndSummary();
    updateCartBadgeInfo();
  }
}
function removeFromCartInfo(index) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCheckoutItemsInfo();
  renderCartTableAndSummary();
  updateCartBadgeInfo();
}
function updateCartBadgeInfo() {
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }
}
// Gọi khi load trang
renderCheckoutItemsInfo();

fetch('footer.html')
  .then(res => res.text())
  .then(html => document.getElementById('footerContainer').innerHTML = html);

function updateCartDisplay() {
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }
}
updateCartDisplay();