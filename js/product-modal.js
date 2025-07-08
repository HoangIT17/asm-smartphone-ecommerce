function showProductModal(product) {
  document.getElementById('productModalTitle').textContent = product.name;
  document.getElementById('productModalImage').src = product.image;
  document.getElementById('productModalImage').alt = product.name;
  document.getElementById('productModalName').textContent = product.name;
  document.getElementById('productModalPrice').textContent = product.price;
  document.getElementById('productModalDesc').innerHTML = product.desc || '';
  document.getElementById('productModalQty').value = 1;

  // Set additional product details
  if (product.oldPrice) {
    document.getElementById('productModalOldPrice').textContent = product.oldPrice;
    document.getElementById('productModalOldPrice').style.display = 'inline';
  } else {
    document.getElementById('productModalOldPrice').style.display = 'none';
  }

  if (product.discount) {
    document.getElementById('productModalDiscount').textContent = product.discount;
    document.getElementById('productModalDiscount').style.display = 'inline';
  } else {
    document.getElementById('productModalDiscount').style.display = 'none';
  }

  if (product.stock) {
    document.getElementById('productModalStock').textContent = product.stock;
  }

  if (product.sku) {
    document.getElementById('productModalSku').textContent = product.sku;
  }

  // Initialize color and size selection
  initializeColorSelection();
  initializeSizeSelection();

  // Add to Cart button
  document.getElementById('productModalAddCart').onclick = function () {
    const qty = parseInt(document.getElementById('productModalQty').value) || 1;
    const selectedColor = document.getElementById('selectedColor').textContent;
    const selectedSize = document.getElementById('selectedSize').textContent;
    addToCartWithQtyAndColor(product, qty, selectedColor, selectedSize);
    const modal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
    if (modal) modal.hide();
  };

  // Buy Now button
  document.getElementById('productModalBuyNow').onclick = function () {
    const qty = parseInt(document.getElementById('productModalQty').value) || 1;
    const selectedColor = document.getElementById('selectedColor').textContent;
    const selectedSize = document.getElementById('selectedSize').textContent;
    buyNow(product, qty, selectedColor, selectedSize);
    const modal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
    if (modal) modal.hide();
  };

  const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
  modal.show();
}

function initializeColorSelection() {
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorSpan = document.getElementById('selectedColor');

  // Remove existing event listeners
  colorOptions.forEach(option => {
    option.removeEventListener('click', handleColorSelection);
  });

  // Add event listeners
  colorOptions.forEach(option => {
    option.addEventListener('click', handleColorSelection);
  });

  // Set default selection
  if (colorOptions.length > 0) {
    colorOptions[0].style.border = '2px solid #000';
    selectedColorSpan.textContent = colorOptions[0].getAttribute('data-color');
  }
}

function initializeSizeSelection() {
  const sizeOptions = document.querySelectorAll('.size-option');
  const selectedSizeSpan = document.getElementById('selectedSize');

  // Remove existing event listeners
  sizeOptions.forEach(option => {
    option.removeEventListener('click', handleSizeSelection);
  });

  // Add event listeners
  sizeOptions.forEach(option => {
    option.addEventListener('click', handleSizeSelection);
  });

  // Set default selection
  if (sizeOptions.length > 0) {
    sizeOptions[1].classList.remove('btn-outline-secondary');
    sizeOptions[1].classList.add('btn-secondary');
    selectedSizeSpan.textContent = sizeOptions[1].getAttribute('data-size');
  }
}

function handleColorSelection(event) {
  const selectedOption = event.target;
  const selectedColorSpan = document.getElementById('selectedColor');

  // Remove selection from all options
  document.querySelectorAll('.color-option').forEach(option => {
    option.style.border = `2px solid ${option.style.backgroundColor}`;
  });

  // Add selection to clicked option
  selectedOption.style.border = '2px solid #000';
  selectedColorSpan.textContent = selectedOption.getAttribute('data-color');
}

function handleSizeSelection(event) {
  const selectedOption = event.target;
  const selectedSizeSpan = document.getElementById('selectedSize');

  // Remove selection from all options
  document.querySelectorAll('.size-option').forEach(option => {
    option.classList.remove('btn-secondary');
    option.classList.add('btn-outline-secondary');
  });

  // Add selection to clicked option
  selectedOption.classList.remove('btn-outline-secondary');
  selectedOption.classList.add('btn-secondary');
  selectedSizeSpan.textContent = selectedOption.getAttribute('data-size');
}

function addToCartWithQtyAndColor(product, qty, color, size) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItemId = `${product.id}-${color}-${size}`;
  const idx = cart.findIndex(item => item.cartItemId === cartItemId);
  if (idx > -1) {
    cart[idx].quantity += qty;
  } else {
    cart.push({
      ...product,
      quantity: qty,
      color: color,
      size: size,
      cartItemId: cartItemId
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  if (typeof updateCartBadge === 'function') updateCartBadge();
  if (typeof updateCartDisplay === 'function') updateCartDisplay();
  if (typeof showToast === 'function') showToast('', 'success', product.name);
}

function buyNow(product, qty, color, size) {
  // Add to cart first
  addToCartWithQtyAndColor(product, qty, color, size);

  // Redirect to checkout page
  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 500);
}

function showToast(_, type = 'success', productName = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  container.innerHTML = '';
  const toast = document.createElement('div');
  toast.className = 'custom-toast-success';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.innerHTML = `
    <div class="toast-flex">
      <div class="toast-left">
        <span class="toast-icon-success">
          <i class="fas fa-check"></i>
        </span>
        <span class="toast-product-name">${productName ? productName : ''}</span>
      </div>
      <div class="toast-right">
        has been added to your cart successfully!
      </div>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 2000);
  if (typeof updateCartDisplay === 'function') updateCartDisplay();
}

// CSS for custom toast
(function () {
  if (document.getElementById('custom-toast-style')) return;
  const style = document.createElement('style');
  style.id = 'custom-toast-style';
  style.innerHTML = `
    .toast-container-custom {
      position: fixed;
      top: 68px;
      right: 24px;
      left: auto;
      width: auto;
      display: flex;
      justify-content: flex-end;
      z-index: 99999;
      pointer-events: none;
    }
    .custom-toast-success {
      background: #fff;
      border: 2px solid #27ae60;
      border-radius: 18px;
      box-shadow: 0 4px 18px rgba(0,0,0,0.10);
      min-width: 340px;
      max-width: 520px;
      padding: 10px 28px;
      min-height: 38px;
      display: flex;
      align-items: center;
      font-size: 1.04rem;
      pointer-events: all;
      animation: fadeInToast .18s;
    }
    .toast-flex {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .toast-left {
      display: flex;
      align-items: center;
      min-width: 110px;
      max-width: 170px;
      margin-right: 10px;
      word-break: break-word;
      white-space: pre-line;
    }
    .toast-product-name {
      font-weight: 700;
      font-size: 1.04rem;
      margin-left: 8px;
      color: #222;
      max-width: 170px;
      word-break: break-word;
      white-space: pre-line;
      display: block;
      line-height: 1.18;
    }
    .toast-right {
      color: #219653;
      font-size: 0.97rem;
      font-weight: 400;
      text-align: left;
      line-height: 1.3;
      word-break: break-word;
      white-space: pre-line;
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      margin-left: 8px;
    }
    .toast-icon-success {
      width: 24px;
      height: 24px;
      background: #27ae60;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
      margin-right: 8px;
      flex-shrink: 0;
    }
    @keyframes fadeInToast {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();

// Keep the old function for backward compatibility
function addToCartWithQty(product, qty) {
  addToCartWithQtyAndColor(product, qty, 'Blue', 'M'); // Default color and size
} 