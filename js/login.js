// Form validation and handling
document.addEventListener('DOMContentLoaded', function () {
  // Get form elements
  const loginForm = document.getElementById('loginFormElement');
  const registerForm = document.getElementById('registerFormElement');

  // Toggle between login and register forms
  window.toggleForms = function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm.style.display === 'none') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    }
  };

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      // Validate form
      if (!validateLoginForm(email, password)) {
        return;
      }

      // Here you would typically make an API call to verify credentials
      // For demo purposes, we'll just redirect to home page
      window.location.href = 'index.html';
    });
  }

  // Handle register form submission
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Validate form
      if (!validateRegisterForm(name, email, password, confirmPassword)) {
        return;
      }

      // Here you would typically make an API call to register the user
      // For demo purposes, we'll just show success message and redirect
      alert('Registration successful! Please login.');
      toggleForms();
    });
  }

  // Form validation functions
  function validateLoginForm(email, password) {
    let isValid = true;

    // Email validation
    if (!email || !isValidEmail(email)) {
      showError('loginEmail', 'Please enter a valid email address.');
      isValid = false;
    }

    // Password validation
    if (!password) {
      showError('loginPassword', 'Please enter your password.');
      isValid = false;
    }

    return isValid;
  }

  function validateRegisterForm(name, email, password, confirmPassword) {
    let isValid = true;

    // Name validation
    if (!name) {
      showError('registerName', 'Please enter your full name.');
      isValid = false;
    }

    // Email validation
    if (!email || !isValidEmail(email)) {
      showError('registerEmail', 'Please enter a valid email address.');
      isValid = false;
    }

    // Password validation
    if (!password || password.length < 6) {
      showError('registerPassword', 'Password must be at least 6 characters long.');
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      showError('confirmPassword', 'Passwords do not match.');
      isValid = false;
    }

    return isValid;
  }

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const feedback = element.nextElementSibling;

    element.classList.add('is-invalid');
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = message;
    }
  }

  // Clear validation errors on input
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      this.classList.remove('is-invalid');
    });
  });
}); 