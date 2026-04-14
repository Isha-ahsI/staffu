// Task data table with radial progress bars
$(document).ready(function () {
    function initProgressCharts() {
        // Fakt e j div ne target karo jemari chart render nathi thayo
        $('#taskListTable tbody div[data-progress]').each(function () {
            const container = $(this);

            // Jo aa div ma chart pela thi render thayelo hoy to fari na karvo
            if (container.children('.apexcharts-canvas').length > 0) {
                return;
            }

            const percent = container.data('progress');
            // Tamari color condition logic
            let color = '#e25867'; // Red
            if (percent > 30 && percent <= 70) {
                color = '#e1cd3c'; // Yellow
            } else if (percent > 70) {
                color = '#28adbb'; // Blue/Teal
            }

            const options = {
                chart: {
                    height: 60,
                    width: 60,
                    type: 'radialBar',
                    sparkline: { enabled: true },
                    animations: { enabled: false },
                    // Aa line khas ઉમેરો:
                    redrawOnWindowResize: false,
                    redrawOnParentResize: false
                },
                plotOptions: {
                    radialBar: {
                        track: {
                            background: 'var(--bs-light-rgb)',
                            opacity: 0.1
                        },
                        hollow: {
                            size: '35%',
                        },
                        dataLabels: {
                            show: true,
                            name: { show: false },
                            value: {
                                show: true,
                                fontSize: '10px',
                                offsetY: 4,
                                color: 'var(--bs-text-dark)',
                                formatter: function (val) {
                                    return val + '%';
                                }
                            }
                        }
                    }
                },
                series: [percent],
                colors: [color],
                stroke: {
                    lineCap: 'round'
                },
            };

            const chart = new ApexCharts(this, options);
            chart.render();
        });
    }

    const table = $('#taskListTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [3, 4, 7, 8] },
            { type: 'date', targets: 5 }
        ],
        drawCallback: function () {
            initProgressCharts();
        }
    });

    table.on('responsive-display', function (e, datatable, row, showHide, update) {
        if (showHide) {
            initProgressCharts();
        }
    });


    // Move info to custom container
    $('#taskListTable_info').appendTo('#table-task-info');

    // Custom length change
    $('#customTaskLength').on('change', function () {
        const length = parseInt($(this).val());
        table.page.len(length).draw();
    });

    // Custom search input
    $('#taskListSearchInput').on('keyup', function () {
        customSearchValue = this.value.toLowerCase();
        table.search(this.value).draw();
    });

    // leave Type filtered dropdown
    let taskPriority = '';
    let taskStatus = '';

    $('.priority-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        taskPriority = $(this).data('priority');
        const text = $(this).text();

        $('#taskPriorityFilter .filter-label').html(text);

        applyFilters();
    });

    // leave status filtered dropdown
    $('.status-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        taskStatus = $(this).data('status');
        const text = $(this).text();

        $('#taskStatusFilter .filter-label').html(text);

        applyFilters();
    });

    // Function to apply both filters
    function applyFilters() {
        table
            .column(3).search(taskPriority)
            .column(7).search(taskStatus)
            .draw();
    }

    // Delete row functionality
    let deleteRow = null;
    $(document).on('click', '.btn-delete', function () {
        deleteRow = table.row($(this).closest('tr'));
        const modal = new bootstrap.Modal(document.getElementById('deleteTaskConfirmModal'));
        modal.show();
    });

    $('#confirmDeleteTask').on('click', function () {
        if (deleteRow) {
            deleteRow.remove().draw();
            deleteRow = null;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteTaskConfirmModal'));
        modal.hide();
    });
});