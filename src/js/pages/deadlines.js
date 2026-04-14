document.addEventListener("DOMContentLoaded", function () {
    // Initialize Flatpickr for date range selection
    const addDeadlineDate = flatpickr("input#addDeadlineDate", {
        dateFormat: "d, F Y",
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });
})