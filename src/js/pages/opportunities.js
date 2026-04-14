
$(document).ready(function () {
    const table = $('#oppoListTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [4, 6, 8] },
            { type: 'date', targets: 7 }
        ],
    });

    // Custom search input
    let customSearchValue = '';
    $('#oppoListSearchInput').on('keyup', function () {
        customSearchValue = this.value.toLowerCase();
        table.search(this.value).draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data) {

        if (!customSearchValue) return true;

        return (
            data[0].toLowerCase().includes(customSearchValue) ||
            data[1].toLowerCase().includes(customSearchValue) ||
            data[2].toLowerCase().includes(customSearchValue) ||
            data[3].toLowerCase().includes(customSearchValue)
        );
    });

    // Move info to custom container
    $('#oppoListTable_info').appendTo('#table-info');

    // group radio button filter probability
    $('input[name="probability"]').on('change', function () {

        let value = $(this).val();

        if (value === "") {
            table.column(6).search('').draw();
        } else {
            table.column(6)
                .search('^' + value + '$', true, false)
                .draw();
        }
    });

})