$(document).ready(function () {
    function initProgressCharts() {
        $('#customersEngageTable tbody div[data-progress]').each(function () {
            const container = $(this);

            if (container.children('.apexcharts-canvas').length > 0) {
                return;
            }

            const percent = container.data('progress');

            const options = {
                chart: {
                    height: 60,
                    width: 60,
                    type: 'radialBar',
                    sparkline: {
                        enabled: true
                    },
                    animations: { enabled: false },
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
                colors: ['#55b0db'],
                stroke: {
                    lineCap: 'round'
                },
            };

            const chart = new ApexCharts(this, options);
            chart.render();
        });
    }

    const table = $('#customersEngageTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [1, 3, 4, 5, 7, 8, 9] },
            { type: 'date', targets: 6 }
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
    $('#customersEngageTable_info').appendTo('#table-engage-info');

    // Custom length change
    $('#customEngageLength').on('change', function () {
        const length = parseInt($(this).val());
        table.page.len(length).draw();
    });

    // customer type filter dropdown button
    $('.dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        const status = $(this).data('status');
        const text = $(this).text();

        $('#cusEnagageTypeFilter .filter-label').html(text);

        table.column(1).search(status).draw();
    });

})