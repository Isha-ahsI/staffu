
//small radial chart in Employee Performance
$(document).ready(function () {
    function initProgressCharts() {
        $('#empPerformanceTable tbody div[data-progress]').each(function () {
            const container = $(this);

            if (container.children('.apexcharts-canvas').length > 0) {
                return;
            }

            const percent = container.data('progress');
            let color = '#e25867';
            if (percent > 30 && percent <= 70) {
                color = '#e1cd3c';
            } else if (percent > 70) {
                color = '#28adbb';
            }

            const options = {
                chart: {
                    height: 60,
                    width: 60,
                    type: 'radialBar',
                    sparkline: { enabled: true },
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
                colors: [color],
                stroke: {
                    lineCap: 'round'
                },
            };

            const chart = new ApexCharts(this, options);
            chart.render();
        });
    }

    const table = $('#empPerformanceTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [3, 4, 5, 6, 7] },
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
    $('#empPerformanceTable_info').appendTo('#table-per-info');

    // Custom length change
    $('#customPerLength').on('change', function () {
        const length = parseInt($(this).val());
        table.page.len(length).draw();
    });

    // Custom search input
    let customSearchValue = '';
    $('#empPerSearchInput').on('keyup', function () {
        customSearchValue = this.value.toLowerCase();
        table.search(this.value).draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data) {

        if (!customSearchValue) return true;

        return (
            data[0].toLowerCase().includes(customSearchValue) ||
            data[1].toLowerCase().includes(customSearchValue) ||
            data[2].toLowerCase().includes(customSearchValue)
        );
    });

    // filter options
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {

        const type = data[3];   // Employment type column
        const model = data[4];  // Work model column

        const selectedType = $('.filter-type:checked')
            .map(function () { return this.value; })
            .get();

        const selectedModel = $('.filter-model:checked')
            .map(function () { return this.value; })
            .get();

        const selected = $('.filter-check:checked')
            .map(function () { return this.value; })
            .get();

        // Employment type filter
        if (selectedType.length && !selectedType.includes(type)) {
            return false;
        }

        // Work model filter
        if (selectedModel.length && !selectedModel.includes(model)) {
            return false;
        }

        if (selected.length === 0) {
            return true;
        }

        return selected.includes(type) || selected.includes(model);
    });
    $('.filter-type, .filter-model').on('change', function () {
        const total = $('.filter-check').length;
        const checked = $('.filter-check:checked').length;
        $('#checkAll').prop('checked', total === checked);
        table.draw();
    });
    $('#checkAll').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('.filter-check').not(this)
            .prop('checked', isChecked)
            .trigger('change');
    });
    $('.filter-check').not('#checkAll').on('change', function () {
        const total = $('.filter-check').not('#checkAll').length;
        const checked = $('.filter-check:checked').not('#checkAll').length;
        $('#checkAll').prop('checked', total === checked);
        table.draw();
    })
})