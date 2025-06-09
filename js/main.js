// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Product card hover effect
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('animate__animated', 'animate__pulse');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('animate__animated', 'animate__pulse');
    });
});

// Cart quantity controls
document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        let value = parseInt(input.value);
        
        if (this.classList.contains('minus')) {
            value = value > 1 ? value - 1 : 1;
        } else {
            value = value + 1;
        }
        
        input.value = value;
        updateCartTotal();
    });
});

function updateCartTotal() {
    // This function would update the cart total based on quantities and prices
    // Implementation depends on your specific needs
}

// Form validation for login and register
function validateForm(formId) {
    const form = document.getElementById(formId);
    let isValid = true;
    
    // Validate each required field
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'Trường này là bắt buộc');
            isValid = false;
        } else {
            hideError(field);
        }
        
        // Special validation for email
        if (field.type === 'email' && field.value) {
            if (!validateEmail(field.value)) {
                showError(field, 'Email không hợp lệ');
                isValid = false;
            }
        }
        
        // Special validation for password
        if (field.id === 'password' && field.value) {
            if (field.value.length < 6) {
                showError(field, 'Mật khẩu phải có ít nhất 6 ký tự');
                isValid = false;
            }
        }
        
        // Confirm password validation
        if (field.id === 'confirmPassword' && field.value) {
            const password = document.getElementById('password').value;
            if (field.value !== password) {
                showError(field, 'Mật khẩu không khớp');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showError(field, message) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.classList.add('is-invalid');
    }
}

function hideError(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
        field.classList.remove('is-invalid');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            if (!validateForm('loginForm')) {
                e.preventDefault();
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            if (!validateForm('registerForm')) {
                e.preventDefault();
            }
        });
    }
});

      