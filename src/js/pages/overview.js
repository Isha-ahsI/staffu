
$(document).ready(function () {
    $('.overview-table').DataTable({
         responsive: true,
         dom: 't',
         ordering: false
    });

    // Select all functionality in todoListTable
    $('#todoListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#todoListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in todoListTable
    $('#todoListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#todoListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#todoListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#todoListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });

    // Select all functionality in inProgressTable
    $('#inProgressTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#inProgressTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in inProgressTable
    $('#inProgressTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#inProgressTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#inProgressTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#inProgressTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });

    
    // Select all functionality in InReviewTable
    $('#inReviewTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#inReviewTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in InReviewTable
    $('#inReviewTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#inReviewTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#inReviewTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#inReviewTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });

    
    // Select all functionality in completedTable
    $('#completedTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#completedTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in completedTable
    $('#completedTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#completedTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#completedTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#completedTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });


     // DELETE BUTTON
    $(document).on('click', '.delete-item', function () {
        deleteRow = $(this).closest('tr');
        const modal = new bootstrap.Modal(document.getElementById('deleteProjectModal'));
        modal.show();
    });

    $('#confirmDelete').on('click', function () {
        if (deleteRow) {
            deleteRow.remove();
            deleteRow = null;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteProjectModal'));
        modal.hide();
    });

})