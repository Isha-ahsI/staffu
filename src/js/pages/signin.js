document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper("#authSignInSwiper", {
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

    // Form data state
    const formData = {
        emailId: "joyce.neal@example.com",
        password: "012345678",
    };


    // Get form elements
    const form = document.querySelector('.auth-form');
    const emailInput = document.getElementById('authVerifyEmail');
    const passwordInput = document.getElementById('authVerifyPassword');
    const togglePsw = document.querySelectorAll('.toggle-password');
    const googleButton = document.querySelector('.btn-google');


    // Initialize form with default values
    if (emailInput) emailInput.value = formData.emailId;
    if (passwordInput) passwordInput.value = formData.password;

    // Handle form input changes
    function handleInputChange(event) {
        const { name, value } = event.target; // only care about name and value
        formData[name] = value;
    }

    // Add event listeners to form inputs
    if (emailInput) {
        emailInput.addEventListener('input', handleInputChange);
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', handleInputChange);
    }

    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();

        formData.emailId = emailInput ? emailInput.value : '';
        formData.password = passwordInput ? passwordInput.value : '';

        if (formData.emailId && formData.password) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Signing In...';
            submitButton.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Redirect to dashboard or home page
                window.location.href = './index.html';
            }, 1500);
        }
    }

    // Add form submit event listener
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Handle google login buttons
    if (googleButton) {
        googleButton.addEventListener('click', function () {
            // Implement Google OAuth here
            alert('Google login functionality would be implemented here');
        });
    }


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

    // Add real-time validation if needed
    function addRealTimeValidation() {
        if (emailInput) {
            emailInput.addEventListener('blur', function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('blur', function () {
                if (this.value && this.value.length < 3) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        }
    }

    // Uncomment the line below if you want real-time validation
    // addRealTimeValidation();
})