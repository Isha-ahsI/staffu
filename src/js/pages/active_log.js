document.addEventListener("DOMContentLoaded", function () {
    // Initialize Flatpickr for perticular date of activity log
    const activityDatePicker = flatpickr("#activityDatePicker", {
        dateFormat: "D, d M Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });
})