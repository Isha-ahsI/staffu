
// pagination length change datatable
$(document).ready(function () {
    $('#pageTable').DataTable({
        responsive: true,
        paging: true,
        searching: false,
        info: true,
        lengthChange: true,
        pageLength: 10,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        ordering: false,
    });
});

// short length datatable
$(document).ready(function () {
    $('#shortTable').DataTable({
        responsive: true,
        paging: false,
        searching: false,
        info: false,
        lengthChange: false,
        ordering: true,
        order: [],
        columnDefs: [
            {
                targets: '_all',
                className: 'text-start dt-left'
            }
        ]
    });
});

// filter datatable
$(document).ready(function () {
    $('#filterTable').DataTable({
        responsive: true,
        paging: false,
        searching: true,
        info: false,
        lengthChange: false,
        ordering: false,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search..."
        },
        columnDefs: [
            {
                targets: '_all',
                className: 'text-start dt-left'
            }
        ]
    });
});

// editable datatable
$(document).ready(function () {
    $(document).ready(function () {
        $('#editableTable').DataTable({
            responsive: true,
            paging: true,
            searching: false,
            info: true,
            lengthChange: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            ordering: false,
        });
    });

    // Edit btn
    $(document).on('click', '.btn-edit', function () {
        const $row = $(this).closest('tr');
        const isEditing = $row.hasClass('editing');

        if (!isEditing) {
            // Start editing
            $row.addClass('editing');
            $(this).html('<i class="bi bi-check-lg"></i>'); // change icon to ✔️

            $row.find('td').each(function (index) {
                const $cell = $(this);
                // Skip the Available column (index 6) and Actions column (index 9)
                if (index !== 5 && index !== 6 && index !== 7 && index !== 9) {
                    const $span = $cell.find('span');
                    if ($span.length && !$span.hasClass('badge')) {
                        const text = $span.text().trim();
                        $cell.html(`<input type="text" id="${text}" class="form-control form-control-sm" value="${text}">`);
                    } else if ($span.hasClass('badge')) {
                        const text = $span.text().trim();
                        $cell.html(`<input type="text" id="${text}" class="form-control form-control-sm" value="${text}">`);
                    }
                }
            });
        } else {
            // Save edits
            $row.removeClass('editing');
            $(this).html('<i class="bi bi-pencil"></i>');

            $row.find('td').each(function (index) {
                const $cell = $(this);
                const $input = $cell.find('input');
                if ($input.length) {
                    const value = $input.val();

                    // Restore original formatting based on column
                    if (index === 0) { // Emp id
                        $cell.html(`<span>${value}</span>`);
                    } else if (index === 1) { // emp name
                        $cell.html(`<div class="d-flex align-items-center gap-2" data-search="${value}">
                            <div class="avatar avatar-sm">
                                <img src="../../../images/avatars/avatar2.jpg" alt="Employee Image"
                                    class="w-100 h-100 custom-avatar">
                            </div>
                            <span>${value}</span>
                        </div>`);
                    } else if (index === 2) { // job title
                        $cell.html(`<span>${value}</span>`);
                    } else if (index === 3) { // department
                        $cell.html(`<span>${value}</span>`);
                    } else if (index === 4) { // join date
                        $cell.html(`<span>${value}</span>`);
                    }
                }
            });
        }
    })

    // DELETE BUTTON
    $(document).on('click', '.btn-delete', function () {
        deleteRow = $(this).closest('tr');
        const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
        modal.show();
    });

    $('#confirmDelete').on('click', function () {
        if (deleteRow) {
            deleteRow.remove();
            deleteRow = null;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
        modal.hide();
    });
})

// select datatable
$(document).ready(function () {
    $('#selectTable').DataTable({
        responsive: true,
        paging: true,
        searching: true,
        info: true,
        lengthChange: true,
        pageLength: 10,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        ordering: true,
        order: [],
        columnDefs: [
            { orderable: false, targets: [6, 7, 8] }
        ],
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search..."
        }
    });

    // Select all functionality
    $('#selectTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#selectTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler
    $('#selectTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#selectTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#selectTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#selectTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });
});




