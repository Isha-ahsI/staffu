document.addEventListener('DOMContentLoaded', function () {
    // State management
    let state = {
        currentPassword: '012345678',
        newPassword: 'Joyce#012',
        isLoading: false,
        errors: {},
        showCurrentPsw: false,
        showNewPsw: false,
        passwordStrength: 0
    };

    // DOM elements
    const form = document.querySelector('.auth-form');
    const currentPswInput = document.getElementById('currentPassword');
    const newPswInput = document.getElementById('newPassword');
    const submitBtn = form.querySelector('button[type="submit"]');
    const togglePasswordBtn = document.querySelectorAll('.toggle-password');
    const passwordValidText = document.getElementById('passwordValid');

    // password toggle 
    togglePasswordBtn.forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            const inputId = this.getAttribute("data-target");
            const input = document.getElementById(inputId);
            const icon = this.querySelector("i");

            if (!input) return;

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

    // Password requirements
    const passwordRequirements = [
        { text: 'A minimum of 8 characters.', validate: (pwd) => pwd.length >= 8 },
        { text: 'At least 1 number.', validate: (pwd) => /[0-9]/.test(pwd) },
        { text: 'At least 1 special character.', validate: (pwd) => /[^A-Za-z0-9]/.test(pwd) },
        { text: 'At least 1 uppercase letter.', validate: (pwd) => /[A-Z]/.test(pwd) },
    ];

    // Initialize form
    initializeForm();

    function initializeForm() {
        if (currentPswInput) {
            currentPswInput.value = state.currentPassword;
            currentPswInput.addEventListener('input', handleCurrentPasswordChange);
        }

        if (newPswInput) {
            newPswInput.value = state.newPassword;
            newPswInput.addEventListener('input', handleNewPasswordChange);
        }

        updatePasswordRequirements();
    }

    // Handle password input change
    function handleNewPasswordChange(e) {
        state.newPassword = e.target.value;
        validatePassword(state.newPassword);
        updatePasswordRequirements();
        clearFieldError('newPassword');
    }

    // Handle confirm password input change
    function handleCurrentPasswordChange(e) {
        state.currentPassword = e.target.value;
        clearFieldError('currentPassword');
    }

    // Validate password strength
    function validatePassword(newPassword) {
        const requirements = passwordRequirements.map(req => req.validate(newPassword));
        const metRequirements = requirements.filter(Boolean).length;
        state.passwordStrength = (metRequirements / requirements.length) * 100;

        // Clear password error if requirements are met
        if (newPassword.length >= 8) {
            delete state.errors.newPassword;
        }

        return metRequirements === requirements.length;
    }

    // Update password requirements display
    function updatePasswordRequirements() {
        const requirementsList = document.querySelectorAll('.psw-required-option');

        requirementsList.forEach((item, index) => {
            const requirement = passwordRequirements[index];
            const isValid = requirement.validate(state.newPassword);

            // Update icon
            const icon = item.querySelector('i');
            if (icon) {
                icon.className = `bi bi-check2-circle text-${isValid ? 'success' : 'light text-opacity-50'} me-1 fs-18`;
            }

            const description = item.querySelector('p');
            if (description) {
                description.className = `mb-0 text-light ${isValid ? '' : 'text-opacity-50'}  text-start `
            }
        });
    }

    // Clear field error
    function clearFieldError(fieldName) {
        delete state.errors[fieldName];

        const input = document.getElementById(fieldName);
        if (input) {
            input.classList.remove('is-invalid');
            const errorElement = input.parentNode.querySelector('.text-danger');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    // function updateSubmitButton() {
    //     submitBtn.disabled = Object.keys(state.errors).length > 0
    //         || !state.currentPassword
    //         || !state.newPassword
    // }

    // function validatePasswordField(input, key) {
    //     const met = passwordRequirements.map(req => req.validate(input.value)).filter(Boolean).length;
    //     const valid = met === passwordRequirements.length;

    //     if (valid) {
    //         delete state.errors[key];
    //     } else {
    //         state.errors[key] = 'Password does not meet requirements';
    //     }

    //     // Show “Password is valid” only for new password
    //     if (valid) {
    //         passwordValidText.classList.remove('d-none');
    //         passwordValidText.classList.add('d-inline'); // or d-block if you want it on a separate line
    //     } else {
    //         passwordValidText.classList.add('d-none');
    //         passwordValidText.classList.remove('d-inline');
    //     }

    //     updateSubmitButton();
    //     return valid;
    // }

    function validatePasswordField(input, key) {
        if (!input.value) {
            state.errors[key] = 'Password is required';
        } else if (input.value.length < 8) {
            state.errors[key] = 'Password must be at least 8 characters';
        } else {
            delete state.errors[key];
        }

        updateSubmitButton();
    }

    function updateSubmitButton() {
        submitBtn.disabled = Object.keys(state.errors).length > 0
            || !state.currentPassword
            || !state.newPassword;
    }

    // Input events
    currentPswInput.addEventListener('input', (e) => {
        state.currentPassword = e.target.value;
        validatePasswordField(currentPswInput, 'currentPassword');
    });

    newPswInput.addEventListener('input', (e) => {
        state.newPassword = e.target.value;
        validatePasswordField(newPswInput, 'newPassword');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Final validation
        validatePasswordField(currentPswInput, 'currentPassword');
        validatePasswordField(newPswInput, 'newPassword');

        if (Object.keys(state.errors).length === 0) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Updating...
            `;
            setTimeout(() => {
                // Create success alert
                const alert = document.createElement('div');
                alert.className = 'alert alert-success text-white small mb-3 fs-6 align-items-start';
                alert.innerHTML = `
                    <i class="bi bi-check-circle me-2 text-success"></i>
                    Password reset successfully! Redirecting to login...
                `;

                form.insertBefore(alert, form.firstChild);
                // No errors → redirect
                setTimeout(() => {
                    window.location.href = '/signin.html';
                }, 2000)
            }, 1500)
        }
    });

});