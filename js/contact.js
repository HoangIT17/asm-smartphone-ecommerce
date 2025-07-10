// Animation on scroll
function animateOnScroll() {
  $('.animate-on-scroll').each(function () {
    var position = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scroll + windowHeight > position + 100) {
      $(this).addClass('animate');
    }
  });
}

$(window).scroll(animateOnScroll);
$(document).ready(function () {
  $(window).trigger('scroll');
  updateCartBadge();
});

// Form submission
$('#contactForm').submit(function (e) {
  e.preventDefault();

  // Validate form
  const name = $('#name').val();
  const phone = $('#phone').val();
  const email = $('#email').val();
  const message = $('#message').val();

  if (!name || !phone || !email || !message) {
    showToast('Please fill in all required information!', 'danger');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Invalid email!', 'danger');
    return;
  }

  // Phone validation (Vietnamese phone number)
  const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone)) {
    showToast('Invalid phone number!', 'danger');
    return;
  }

  // Simulate form submission
  const submitBtn = $('#submitBtn');
  const originalText = submitBtn.html();

  submitBtn.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...');
  submitBtn.prop('disabled', true);

  // Simulate API call
  setTimeout(() => {
    submitBtn.html(originalText);
    submitBtn.prop('disabled', false);

    // Show success message
    showToast('Thank you for contacting us! We will respond as soon as possible.', 'success');

    // Reset form
    $('#contactForm')[0].reset();
  }, 2000);
});

// Show toast notification
function showToast(message, type) {
  const toast = $('#successToast');
  const toastMessage = $('#toastMessage');

  toast.removeClass('bg-success bg-danger');
  toast.addClass(type === 'success' ? 'bg-success' : 'bg-danger');
  toastMessage.text(message);

  const bsToast = new bootstrap.Toast(toast[0]);
  bsToast.show();
}

// Initialize cart badge
function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  $('#cartBadge').text(cartItems.length);
}

// function updateCartDisplay() {
//   const cartBadge = document.getElementById('cartBadge');
//   if (cartBadge) {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     cartBadge.textContent = totalItems;
//   }
// }
// updateCartDisplay();

fetch('footer.html')
  .then(res => res.text())
  .then(html => document.getElementById('footerContainer').innerHTML = html);