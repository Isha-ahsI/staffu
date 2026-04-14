document.addEventListener('DOMContentLoaded', function () {
    // State management
    let state = {
        emailId: 'john@durxen.com',
        isLoading: false,
        isSubmitted: false
    };

    // Get form elements
    const form = document.querySelector('.auth-form');
    const emailInput = document.getElementById('emailVerify');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Initialize form
    if (emailInput) {
        emailInput.value = state.emailId;
        emailInput.addEventListener('input', handleEmailChange);
    }

    // Handle email input change
    function handleEmailChange(e) {
        state.emailId = e.target.value;
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        if (state.isLoading) return;

        state.isLoading = true;
        updateSubmitButton();

        // Simulate API call
        setTimeout(() => {
            state.isLoading = false;
            state.isSubmitted = true;

            // Redirect to reset password page
            window.location.href = './verification.html';
        }, 1500);
    }

    // Update submit button state
    function updateSubmitButton() {
        if (state.isLoading) {
            submitBtn.disabled = true;
            submitBtn.classList.remove("btn-primary");
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2 border-2" role="status" aria-hidden="true"></span>
                Sending...
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Confirm E-mail';
        }
    }

    // Attach event listeners
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

})