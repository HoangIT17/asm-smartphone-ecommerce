document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerFormElement');
  const passwordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const emailInput = document.getElementById('registerEmail');
  const togglePassword = document.getElementById('togglePassword');

  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password visibility toggle
  togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
  });

  // Real-time validation for all inputs
  const inputs = registerForm.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      validateInput(this);
    });

    input.addEventListener('blur', function () {
      validateInput(this);
    });
  });

  // Validate individual input
  function validateInput(input) {
    if (input.id === 'registerEmail') {
      if (!validateEmail(input.value)) {
        input.setCustomValidity('Please enter a valid email address.');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
      } else {
        input.setCustomValidity('');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    }

    if (input.id === 'registerPassword') {
      const value = input.value;
      if (value.length < 8) {
        input.setCustomValidity('Password must be at least 8 characters long.');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        input.setCustomValidity('Password must contain at least one special character.');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
      }
      if (!/[A-Z]/.test(value)) {
        input.setCustomValidity('Password must contain at least one uppercase letter.');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
      }
      if (!/[a-z]/.test(value)) {
        input.setCustomValidity('Password must contain at least one lowercase letter.');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
      }
      if (!/\d/.test(value)) {
        input.setCustomValidity('Password must contain at least one number.');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
      }
      // If all conditions are met
      input.setCustomValidity('');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }

    // Special handling for password confirmation
    if (input.id === 'confirmPassword') {
      validatePasswordMatch();
    }
  }

  // Password validation
  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  }

  // Password match validation
  function validatePasswordMatch() {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Passwords do not match.');
      confirmPasswordInput.classList.add('is-invalid');
      confirmPasswordInput.classList.remove('is-valid');
    } else {
      confirmPasswordInput.setCustomValidity('');
      if (confirmPasswordInput.value) {
        confirmPasswordInput.classList.add('is-valid');
        confirmPasswordInput.classList.remove('is-invalid');
      }
    }
  }

  // Form submission
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Remove any existing alerts
    const existingAlerts = registerForm.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Validate all inputs
    let isValid = true;
    inputs.forEach(input => {
      validateInput(input);
      if (!input.validity.valid) {
        isValid = false;
      }
    });

    // Special check for password match
    validatePasswordMatch();
    if (confirmPasswordInput.value !== passwordInput.value) {
      isValid = false;
    }

    // Check email format
    if (!validateEmail(emailInput.value)) {
      isValid = false;
      emailInput.classList.add('is-invalid');
      emailInput.classList.remove('is-valid');
    }

    if (!isValid) {
      // Show error message at the top of the form
      const errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-danger mb-3 animate__animated animate__fadeIn';
      errorAlert.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        Please check your registration information and try again.
      `;
      registerForm.insertBefore(errorAlert, registerForm.firstChild);
      return;
    }

    // Show success message
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
    successAlert.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fas fa-check-circle me-2 fa-2x"></i>
        <div>
          <h5 class="mb-1">Registration successful!</h5>
          <p class="mb-0">Redirecting to the login page...</p>
        </div>
      </div>
    `;
    registerForm.insertBefore(successAlert, registerForm.firstChild);

    // Disable form inputs and show loading state
    inputs.forEach(input => input.disabled = true);
    const submitButton = registerForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Processing...
    `;

    // Redirect to login page after 0.8 second
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
  });
}); 