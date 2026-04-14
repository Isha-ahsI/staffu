document.addEventListener("DOMContentLoaded", function () {
    // onboarding/offvboarding emp cards
    const onboardingBtn = document.getElementById("onboardingBtn");
    const offboardingBtn = document.getElementById("offboardingBtn");
    const onboardingCards = document.getElementById("onBoarding");
    const offboardingCards = document.getElementById("offBoarding");
    const overlay = document.querySelector(".btn-overlay");

    onboardingBtn.addEventListener("click", () => {
        onboardingCards.classList.remove("d-none");
        offboardingCards.classList.add("d-none");
        onboardingBtn.classList.add("active");
        offboardingBtn.classList.remove("active");
        overlay.classList.remove("option2");
        overlay.classList.add("option1");
    });

    offboardingBtn.addEventListener("click", () => {
        offboardingCards.classList.remove("d-none");
        onboardingCards.classList.add("d-none");
        offboardingBtn.classList.add("active");
        onboardingBtn.classList.remove("active");
        overlay.classList.remove("option1");
        overlay.classList.add("option2");
    });

})