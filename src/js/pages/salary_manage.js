document.addEventListener("DOMContentLoaded", function () {

    const colors = {
        primary: "#4666e1",
        secondary: "#8990b0",
        dark: "#1f2440 ",
    };


    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = Math.min(255, Math.max(0, R + Math.round(255 * percent)));
        G = Math.min(255, Math.max(0, G + Math.round(255 * percent)));
        B = Math.min(255, Math.max(0, B + Math.round(255 * percent)));

        const RR = R.toString(16).padStart(2, '0');
        const GG = G.toString(16).padStart(2, '0');
        const BB = B.toString(16).padStart(2, '0');

        return `#${RR}${GG}${BB}`;
    }

    // --------------------------
    // Helper to convert hex to rgba
    // --------------------------
    function hexToRgba(hex, alpha) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // global font-family for all charts
    Apex = {
        chart: {
            fontFamily: 'Nunito, sans-serif'
        }
    };

    // Payroll Summary Chart (Stacked Columns)
    const seriesColors = [
        shadeColor(colors.primary, 0.3),
        colors.primary,
        shadeColor(colors.primary, -0.3)
    ];
    const salaryStackedOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            dropShadow: {
                enabled: true,
                top: 3,
                left: 4,
                blur: 6,
                color: colors.dark,
                opacity: 0.2,
            },
            toolbar: {
                show: false
            },
            offsetY: -10,
            offsetX: 10,
        },
        series: [{
            name: 'Monthaly Payroll',
            data: [44, 55, 41, 67, 22, 43, 40, 37, 30, 44, 42, 45]
        }, {
            name: 'Overtime',
            data: [13, 23, 20, 8, 13, 27, 30, 23, 27, 32, 22, 28]
        }, {
            name: 'Bonuses & Incentives',
            data: [11, 17, 15, 15, 21, 14, 18, 20, 20, 18, 17, 15]
        }],
        colors: seriesColors,
        fill: {
            opacity: 0.7,
        },
        stroke: {
            width: 3,
            colors: ['transparent']
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                borderRadius: 4,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            }
        },
        xaxis: {
            type: 'category',
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Suptember', 'October', 'November', 'December'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            strokeDashArray: 3,
            borderColor: hexToRgba(colors.secondary, 0.2),
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            positiob: 'right',
            horihorizontalAlign: 'center',
            customLegendItems: [],
            clusterGroupedSeries: true,
            clusterGroupedSeriesOrientation: 'vertical',
            itemMargin: {
                horizontal: 10,
                vertical: 5
            },
            labels: {
                useSeriesColors: true
            },
            markers: {
                shape: 'square',
                size: 7,
                strokeWidth: 1,
                offsetX: -5,
            },
        },
        tooltip: {
            marker: {
                show: false,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'darken',
                }
            },
        },
        responsive: [{
            breakpoint: 576,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '40%'
                    }
                },
            },
        },
        {
            breakpoint: 768,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '35%'
                    }
                },
            },
        },]
    }

    const salaryStackedChart = new ApexCharts(document.querySelector("#salaryStackedChart"), salaryStackedOptions);
    salaryStackedChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });

})


// Task data table with radial progress bars
$(document).ready(function () {
    const table = $('#salaryListTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [5] },
            { type: 'date', targets: [4, 6] }
        ],
    });

    // Move info to custom container
    $('#salaryListTable_info').appendTo('#table-salary-info');

    // Custom length change
    $('#customSalaryLength').on('change', function () {
        const length = parseInt($(this).val());
        table.page.len(length).draw();
    });


    // leave pay status filtered dropdown
    let payStatus = '';

    $('.status-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        payStatus = $(this).data('status');
        const text = $(this).text();

        $('#payStatusFilter .filter-label').html(text);

        applyFilters();
    });

    // Function to apply both filters
    function applyFilters() {
        table.column(5).search(payStatus).draw();
    }
});