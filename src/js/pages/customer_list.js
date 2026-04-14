

$(document).ready(function () {
    const table = $('#customersListTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { orderable: false, targets: [2, 3, 7] },
        ],
    });

    // Move info to custom container
    $('#customersListTable_info').appendTo('#table-info');

    // DELETE BUTTON
    let deleteRow = null;
    $(document).on('click', '.btn-delete', function () {
        deleteRow = table.row($(this).closest('tr'));
        const modal = new bootstrap.Modal(document.getElementById('deleteCustomerModal'));
        modal.show();
    });

    $('#confirmDeleteCus').on('click', function () {
        if (deleteRow) {
            deleteRow.remove().draw();
            deleteRow = null;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteCustomerModal'));
        modal.hide();
    });

    // customer type filter dropdown button
    $('.dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        const status = $(this).data('status');
        const text = $(this).text();

        $('#cusTypeFilter .filter-label').html(text);

        table.column(3).search(status).draw();
    });

    // Custom search input
    let customSearchValue = '';
    $('#cusListSearchInput').on('keyup', function () {
        customSearchValue = this.value.toLowerCase();
        table.search(this.value).draw();
    });

});


