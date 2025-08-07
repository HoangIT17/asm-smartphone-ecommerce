document.addEventListener('DOMContentLoaded', function () {
  // Wait for auth service to load users
  setTimeout(() => {
    authService.loadUsers();
  }, 100);

  const registerForm = document.getElementById('registerFormElement');
  const passwordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const emailInput = document.getElementById('registerEmail');
  const togglePassword = document.getElementById('togglePassword');
  
  // --- Real-time Password Validation Elements ---
  const passwordRequirementsContainer = document.getElementById('password-requirements');
  const req = {
    length: document.getElementById('req-length'),
    uppercase: document.getElementById('req-uppercase'),
    lowercase: document.getElementById('req-lowercase'),
    number: document.getElementById('req-number'),
    special: document.getElementById('req-special'),
  };

  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Enhanced error display functions
  function showError(input, message) {
    input.setCustomValidity(message);
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    // Optional: Show custom error message if available
    const formField = input.closest('.mb-3') || input.closest('.form-group');
    if (formField) {
      let errorElement = formField.querySelector('.invalid-feedback') || formField.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }
  }

  function clearError(input) {
    input.setCustomValidity('');
    input.classList.remove('is-invalid');
    
    const formField = input.closest('.mb-3') || input.closest('.form-group');
    if (formField) {
      let errorElement = formField.querySelector('.invalid-feedback') || formField.querySelector('.error-message');
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }
  }

  // Password visibility toggle
  if (togglePassword) {
    togglePassword.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }

  // --- Real-time Password Checker ---
  if (passwordInput && passwordRequirementsContainer) {
    passwordInput.addEventListener('focus', () => {
      passwordRequirementsContainer.classList.remove('hidden');
      passwordRequirementsContainer.style.display = 'block';
    });

    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      
      // Check length
      updateRequirement(req.length, password.length >= 8);
      // Check uppercase
      updateRequirement(req.uppercase, /[A-Z]/.test(password));
      // Check lowercase
      updateRequirement(req.lowercase, /[a-z]/.test(password));
      // Check number
      updateRequirement(req.number, /[0-9]/.test(password));
      // Check special character
      updateRequirement(req.special, /[!@#$%^&*(),.?":{}|<>]/.test(password));
    });
    
    function updateRequirement(element, isValid) {
      if (element) {
        if (isValid) {
          element.classList.remove('text-gray-400', 'text-muted');
          element.classList.add('text-success');
          const iconElement = element.querySelector('.req-icon');
          if (iconElement) {
            iconElement.innerHTML = `<i class="fas fa-check-circle"></i>`;
          }
        } else {
          element.classList.add('text-muted');
          element.classList.remove('text-success');
          const iconElement = element.querySelector('.req-icon');
          if (iconElement) {
            iconElement.innerHTML = `<i class="fas fa-minus-circle"></i>`;
          }
        }
      }
    }
  }

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
    // Clear previous errors
    clearError(input);
    
    if (input.id === 'registerEmail') {
      if (!input.value || !validateEmail(input.value)) {
        showError(input, 'Please enter a valid email address.');
        return;
      } else {
        input.setCustomValidity('');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    }

    if (input.id === 'registerPassword') {
      const passwordError = validatePassword(input.value);
      if (passwordError) {
        showError(input, passwordError);
        return;
      } else {
        input.setCustomValidity('');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    }

    // Handle other input fields
    if (input.id === 'firstName' || input.id === 'lastName') {
      if (!input.value || input.value.trim() === '') {
        showError(input, 'Please enter your ' + (input.id === 'firstName' ? 'first' : 'last') + ' name.');
        return;
      } else {
        input.setCustomValidity('');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    }

    // Handle terms checkbox
    if (input.id === 'agreeTerms') {
      if (!input.checked) {
        showError(input, 'You must agree to the terms and conditions.');
        return;
      } else {
        input.setCustomValidity('');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    }

    // Special handling for password confirmation
    if (input.id === 'confirmPassword') {
      validatePasswordMatch();
    }
  }

  // Enhanced password validation function
  function validatePassword(password) {
    const errors = [];
    if (password.length < 8) errors.push('length');
    if (!/[A-Z]/.test(password)) errors.push('uppercase');
    if (!/[a-z]/.test(password)) errors.push('lowercase');
    if (!/[0-9]/.test(password)) errors.push('number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('special');
    return errors.length === 0 ? '' : 'Password does not meet all requirements.';
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

    // Special validation checks
    validatePasswordMatch();
    if (confirmPasswordInput.value !== passwordInput.value) {
      isValid = false;
    }

    // Final email validation
    if (!emailInput.value || !validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    // Final password validation
    const passwordError = validatePassword(passwordInput.value);
    if (passwordError) {
      showError(passwordInput, passwordError);
      isValid = false;
    }

    // Check required fields
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const agreeTermsInput = document.getElementById('agreeTerms');

    if (!firstNameInput.value || firstNameInput.value.trim() === '') {
      showError(firstNameInput, 'Please enter your first name.');
      isValid = false;
    }

    if (!lastNameInput.value || lastNameInput.value.trim() === '') {
      showError(lastNameInput, 'Please enter your last name.');
      isValid = false;
    }

    if (!agreeTermsInput.checked) {
      showError(agreeTermsInput, 'You must agree to the terms and conditions.');
      isValid = false;
    }

    // If form is invalid, just return without showing general error message
    if (!isValid) {
      return;
    }

    // Prepare user data for registration
    const userData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value
    };

    // Attempt registration
    const registerResult = authService.register(userData);

    if (registerResult.success) {
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
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Processing...
        `;
      }

      // Redirect to login page after 1.5 seconds
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);

    } else {
      // Show error message
      const errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-danger mt-3 animate__animated animate__fadeIn';
      errorAlert.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        ${registerResult.message}
      `;
      registerForm.insertBefore(errorAlert, registerForm.firstChild);
    }
  });
}); 