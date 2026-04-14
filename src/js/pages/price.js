 const toggleButtons = document.querySelectorAll('.billing-option');
  const prices = document.querySelectorAll('.amount');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const selectedPlan = button.getAttribute('data-plan');
    //   const discount = 20;
      prices.forEach(priceEl => {
        const monthly = parseFloat(priceEl.dataset.monthly);
        const yearly =  parseFloat(priceEl.dataset.yearly);

        if (selectedPlan === 'monthly') {
          priceEl.innerText = `$${monthly}`;
          priceEl.nextElementSibling.innerText = '/Month';
        } else {
          priceEl.innerText = `$${yearly}`;
          priceEl.nextElementSibling.innerText = `/Year (Save 20%)`;
        }
      });
    });
  });   