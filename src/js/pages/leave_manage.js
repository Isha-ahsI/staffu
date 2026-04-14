//Employee Leave List
$(document).ready(function () {
    const table = $('#empLeaveTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { orderable: false, targets: [2, 7, 8] },
            { type: 'date', targets: [3, 5], className: 'text-start dt-left' }
        ],
    });

    // Move info to custom container
    $('#empLeaveTable_info').appendTo('#table-leave-info');

    // leave Type filtered dropdown
    let leaveType = '';
    let leaveStatus = '';

    $('.type-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        leaveType = $(this).data('status');
        const text = $(this).text();

        $('#leaveTypeFilter .filter-label').html(text);

        applyFilters();
    });

    // leave status filtered dropdown
    $('.status-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        leaveStatus = $(this).data('status');
        const text = $(this).text();

        $('#leaveStatusFilter .filter-label').html(text);

        applyFilters();
    });

    // Function to apply both filters
    function applyFilters() {
        table
            .column(2).search(leaveType)
            .column(8).search(leaveStatus)
            .draw();
    }

    // onclick of table row open modal for leave approve or reject
    $('#empLeaveTable tbody').on('click', 'tr', function () {
        const data = table.row(this).data();
        const cellContent = $('<div>').html(data[1]);
        const imgSrc = cellContent.find('img').attr('src');
        const empName = cellContent.find('h6 span').text().trim();
        const jobTitle = cellContent.find('small').text().trim();

        // Fill modal fields
        $('#modalEmpAvatar').attr('src', imgSrc);
        $('#modalEmpId').html(data[0]);
        $('#modalEmpName').text(empName);
        $('#modalJobTitle').text(jobTitle);
        $('#modalStatus').html(data[8]);
        $('#modalReqDate').html(data[3]);
        $('#modalStartDate').html(data[4]);
        $('#modalEndDate').html(data[5]);
        $('#modalType').html(data[2]);
        $('#modalDuration').html(data[6]);
        $('#modalReason').html(data[7]);

        // Show Bootstrap modal
        const modal = new bootstrap.Modal(document.getElementById('leaveApproveModal'));
        modal.show();
    });

});


// Initialize Start Date
const startDatePicker = flatpickr("#startLeaveDatePicker", {
    dateFormat: "d, F Y",
    defaultDate: new Date(),
    onChange: function (selectedDates, dateStr, instance) {
        // update min date of End Date picker
        endDatePicker.set('minDate', dateStr);
    }
});

// Initialize End Date
const endDatePicker = flatpickr("#endLeaveDatePicker", {
    dateFormat: "d, F Y",
    defaultDate: new Date(),
    onChange: function (selectedDates, dateStr, instance) {
        // update max date of Start Date picker
        startDatePicker.set('maxDate', dateStr);
    }
});
