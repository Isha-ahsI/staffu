document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper("#authSignUpSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        allowTouchMove: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    })

    // Form data object to track state
    const formData = {
        userName: "Joyce Neal",
        emailId: "joyce.neal@example.com",
        password: "012345678",
        confirmPsw: "012345678",
        termsAccepted: true
    };

    // Get form elements
    const form = document.querySelector('.auth-form');
    const userNameInput = document.getElementById('authUsername');
    const emailInput = document.getElementById('authEmail');
    const passwordInput = document.getElementById('authPassword');
    const confirmPasswordInput = document.getElementById('authConfirmPsw');
    const termsCheckbox = document.getElementById('checkTerms&Condition');
    const submitButton = form.querySelector('button[type="submit"]');
    const togglePsw = document.querySelectorAll('.toggle-password');
    const googleButton = document.querySelector('.btn-google');


    // Initialize form with default values
    function initializeForm() {
        userNameInput.value = formData.userName;
        emailInput.value = formData.emailId;
        passwordInput.value = formData.password;
        confirmPasswordInput.value = formData.confirmPsw;
        termsCheckbox.checked = formData.termsAccepted;
        updateSubmitButton();
    }


    // Handle input changes
    function handleInputChange(e) {
        const { name, value, type, checked } = e.target;
        formData[name] = type === 'checkbox' ? checked : value;

        if (name === 'termsAccepted') {
            updateSubmitButton();
        }
    }

    // Update submit button state
    function updateSubmitButton() {
        submitButton.disabled = !formData.termsAccepted;
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        // Redirect to dashboard or home page
        window.location.href = './index.html';

    }

    // Add event listeners
    userNameInput.addEventListener('input', handleInputChange);
    emailInput.addEventListener('input', handleInputChange);
    passwordInput.addEventListener('input', handleInputChange);
    confirmPasswordInput.addEventListener('input', handleInputChange);
    termsCheckbox.addEventListener('change', handleInputChange);
    form.addEventListener('submit', handleSubmit);

    // Initialize the form
    initializeForm();

    // Handle google Signup buttons
    if (googleButton) {
        googleButton.addEventListener('click', function () {
            // Implement Google OAuth here
            alert('Google login functionality would be implemented here');
        });
    }

    //  Add some visual feedback for password strength
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        const helpText = this.parentElement.nextElementSibling;

        if (password.length >= 8) {
            helpText.className = 'text-success small form-text';
            helpText.textContent = 'Password strength: Good';
        } else if (password.length >= 6) {
            helpText.className = 'text-warning small form-text';
            helpText.textContent = 'Password strength: Fair (need 8+ characters)';
        } else if (password.length > 0) {
            helpText.className = 'text-danger small form-text';
            helpText.textContent = 'Password strength: Weak (need 8+ characters)';
        } else {
            helpText.className = 'text-secondary small form-text';
            helpText.textContent = 'Must be at least 8 characters';
        }
    });

    // Add confirm password validation
    confirmPasswordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        const confirmPassword = this.value;

        if (confirmPassword.length > 0) {
            if (password === confirmPassword) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        } else {
            this.classList.remove('is-valid', 'is-invalid');
        }
    });

    // password toggle
    togglePsw.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const inputId = this.getAttribute("data-target");
            const input = document.getElementById(inputId);
            const icon = this.querySelector("i");

            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("bi-eye-slash-fill");
                icon.classList.add("bi-eye-fill");
            } else {
                input.type = "password";
                icon.classList.remove("bi-eye-fill");
                icon.classList.add("bi-eye-slash-fill");
            }
        });
    });

});