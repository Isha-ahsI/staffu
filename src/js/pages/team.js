$(document).ready(function () {
    $('.team-table').DataTable({
        responsive: true,
        dom: 't',
        ordering: false
    });

    // Select all functionality in salesEmpListTable
    $('#salesEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#salesEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in salesEmpListTable
    $('#salesEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#salesEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#salesEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#salesEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });


    // Select all functionality in marketingEmpListTable
    $('#marketingEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#marketingEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in marketingEmpListTable
    $('#marketingEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#marketingEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#marketingEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#marketingEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });



    // Select all functionality in developmentEmpListTable
    $('#developmentEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#developmentEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in developmentEmpListTable
    $('#developmentEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#developmentEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#developmentEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#developmentEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });


    // Select all functionality in hrEmpListTable
    $('#hrEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#hrEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in  hrEmpListTable
    $('#hrEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#hrEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#hrEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#hrEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });


    // Select all functionality in financeEmpListTable
    $('#financeEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#financeEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in financeEmpListTable
    $('#financeEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#financeEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#financeEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#financeEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });


    // Select all functionality in custSupportEmpListTable
    $('#custSupportEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#custSupportEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in custSupportEmpListTable
    $('#custSupportEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#custSupportEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#custSupportEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#custSupportEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });



    // Select all functionality in operationsEmpListTable
    $('#operationsEmpListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#operationsEmpListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler in operationsEmpListTable
    $('#operationsEmpListTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#operationsEmpListTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#operationsEmpListTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#operationsEmpListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });



    // DELETE BUTTON
    $(document).on('click', '.btn-delete', function () {
        deleteRow = $(this).closest('tr');
        const modal = new bootstrap.Modal(document.getElementById('deleteTeamMemberModal'));
        modal.show();
    });

    $('#confirmDeleteMember').on('click', function () {
        if (deleteRow) {

            const table = deleteRow.closest('table');

            deleteRow.remove();
            deleteRow = null;

            const rowCount = table.find('tbody tr').length;
             table.closest('.accordion-item').find('.table-count').text(rowCount);
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteTeamMemberModal'));
        modal.hide();
    });


})