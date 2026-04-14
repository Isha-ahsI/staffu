document.addEventListener('DOMContentLoaded', function () {
    // State management
    let state = {
        otp: ['0', '0', '0', '0'],
        isLoading: false,
        error: '',
        resendTime: 30,
        isResending: false,
        isVerified: false
    };

    // DOM elements
    const form = document.querySelector('.auth-form');
    const otpInputs = document.querySelectorAll('input[maxlength="1"]');
    const submitBtn = document.querySelector('button[type="submit"]');
    const resendBtn = document.querySelector('.resend-btn');
    const resentCount = document.querySelector('.resend-text')

    // Initialize
    initializeOtpInputs();
    startResendCountdown();

    // Initialize OTP inputs
    function initializeOtpInputs() {
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => handleOtpChange(e, index));
            input.addEventListener('keydown', (e) => handleKeyDown(e, index));
            input.addEventListener('paste', handlePaste);
        });

        // Focus first input
        if (otpInputs[0]) {
            otpInputs[0].focus();
        }
    }


    // Handle OTP input change
    function handleOtpChange(e, index) {
        const value = e.target.value;

        // Only allow numbers
        if (value && !/^\d*$/.test(value)) {
            e.target.value = state.otp[index];
            return;
        }

        // Update state
        state.otp[index] = value.slice(-1);
        e.target.value = state.otp[index];

        // Auto focus to next input
        if (value && index < 3) {
            otpInputs[index + 1].focus();
        }

        // Clear error
        clearError();
        updateSubmitButton();
    }

    // Handle keydown events
    function handleKeyDown(e, index) {
        if (e.key === 'Backspace' && !state.otp[index] && index > 0) {
            otpInputs[index - 1].focus();
        }
    }

    // Handle paste event
    function handlePaste(e) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').slice(0, 4);

        digits.split('').forEach((digit, index) => {
            if (index < 4) {
                state.otp[index] = digit;
                otpInputs[index].value = digit;
            }
        });

        updateSubmitButton();
    }


    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        const code = state.otp.join('');
        if (code.length !== 4) {
            showError('Please enter a valid 4-digit code');
            return;
        }

        state.isLoading = true;
        updateSubmitButton();

        // Simulate API call
        setTimeout(() => {
            state.isLoading = false;

            // For demo, accept 1111 as valid code
            if (code === '0000') {
                state.isVerified = true;
                showSuccess();
                setTimeout(() => {
                    window.location.href = '/reset_password.html';
                }, 2000);
            } else {
                showError('Invalid verification code. Please try again.');
                updateSubmitButton();
            }
        }, 1500);
    }

    // Handle resend code
    function handleResendCode() {
        if (state.resendTime > 0 || state.isResending) return;

        state.isResending = true;
        updateResendButton();

        setTimeout(() => {
            state.resendTime = 30;
            state.isResending = false;
            startResendCountdown();
            showError('Verification code has been resent to your email.', 'success');

            // Clear success message after 5 seconds
            setTimeout(() => clearError(), 5000);
        }, 1000);
    }

    // Update submit button
    function updateSubmitButton() {
        const isComplete = state.otp.every(digit => digit !== '');

        if (state.isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm border-2 me-2" role="status" aria-hidden="true"></span>
                Verifying...
            `;
        } else {
            submitBtn.disabled = !isComplete;
            submitBtn.innerHTML = 'Confirm Code';
        }
    }

    // Update resend button
    function updateResendButton() {
        if (state.isResending) {
            resentCount.innerHTML = 'Sending...';
            resendBtn.disabled = true;
        } else if (state.resendTime > 0) {
            resentCount.innerHTML = `Renew Confirmation Code in <span class="text-white fw-bold">${state.resendTime}s</span>`;
            resendBtn.disabled = true;
        } else {
            resentCount.innerHTML = "Didn't receive the code?";
            resendBtn.disabled = false;
        }
    }

    // Start resend countdown
    function startResendCountdown() {
        const timer = setInterval(() => {
            state.resendTime--;
            updateResendButton();

            if (state.resendTime <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }


    // Show error message
    function showError(message, type = 'danger') {
        state.error = message;

        // Create or update alert
        let alert = document.querySelector('.alert');
        if (!alert) {
            alert = document.createElement('div');
            alert.className = `alert alert-${type} text-white small`;
            form.insertBefore(alert, form.firstChild);
        } else {
            alert.className = `alert alert-${type} text-white small`;
        }
        alert.textContent = message;
    }


    // Clear error message
    function clearError() {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
        state.error = '';
    }

    // Show success state
    function showSuccess() {
        const container = document.querySelector('.p-3.p-md-5');
        container.innerHTML = `
            <div class="text-center py-4">
                <div class="mb-4">
                    <div class="mx-auto bg-soft-success text-center rounded-circle avatar-xxxl avatar">
                        <i class="ri-checkbox-circle-line text-success fs-1"></i>
                    </div>
                </div>
                <h3 class="text-white mb-3">Email Verified!</h3>
                <p class="text-white text-opacity-75 mb-0">
                    Your email has been successfully verified. Redirecting to login...
                </p>
            </div>
        `;
    }

     // Attach event listeners
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', handleResendCode);
    }

})