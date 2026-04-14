document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkIndeterminate');
    const checkboxdisabled = document.getElementById('checkIndeterminateDisabled');
    if (checkbox) {
        checkbox.indeterminate = true;
    }
    if (checkbox) {
        checkboxdisabled.indeterminate = true;
    }
});

(function () {
  'use strict';

  // Fetch all forms to apply custom Bootstrap validation
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over forms and prevent submission if invalid
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        alert('✅ Form submitted successfully!');
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

