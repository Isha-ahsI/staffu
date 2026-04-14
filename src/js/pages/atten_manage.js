document.addEventListener("DOMContentLoaded", function () {
    const colors = {
        primary: "#4666e1",
        secondary: "#8990b0",
        success: "#28adbb",
        warning: "#e1cd3c",
        info: "#55b0db",
        danger: "#e25867",
        indigo: "#6f5fe0",
        light: "#f8f9fd",
        dark: "#1f2440 ",
        blue: "#1774ff",
        orange: "#e17846",
        pink: "#c64ad5",
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

    //  global font-family for all charts
    Apex = {
        chart: {
            fontFamily: 'Nunito, sans-serif'
        }
    };

    // Attendance Overview Chart (Stacked Columns)
    const seriesColors = [
        shadeColor(colors.primary, 0.3),
        colors.primary,
        shadeColor(colors.primary, -0.2)
    ];
    const attendOverviewOptions = {
        chart: {
            type: 'bar',
            height: 355,
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 4,
                color: colors.dark,
                opacity: 0.2,
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
        series: [{
            name: 'Present',
            data: [44, 55, 41, 67, 22, 43, 21, 49, 72, 33, 45, 65]
        }, {
            name: 'On Leave',
            data: [13, 23, 20, 8, 13, 27, 33, 12, 15, 29, 25, 18]
        }, {
            name: 'Absent',
            data: [11, 17, 15, 15, 21, 14, 13, 22, 18, 20, 16, 14]
        }],
        dataLabels: {
            enabled: false
        },
        colors: seriesColors,
        plotOptions: {
            bar: {
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            },
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            itemMargin: {
                horizontal: 10,
                vertical: 10
            },
            markers: {
                size: 10,
                shape: 'line',
                strokeWidth: 5,
                offsetX: -4,
                offsetY: 0
            },
            labels: {
                colors: 'var(--bs-text-muted)'
            }
        },
        grid: {
            show: true,
            borderColor: hexToRgba(colors.secondary, 0.2),
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
    };

    const attendOverviewChart = new ApexCharts(document.querySelector("#attendOverviewChart"), attendOverviewOptions);
    attendOverviewChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });


    // Initialize Flatpickr for single date selection
    const singleDatePicker = flatpickr("#singleDatePicker", {
        dateFormat: "d, F Y",
        defaultDate: new Date("2026-01-19"),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });
})


// attandance list datatable
$(document).ready(function () {
    const table = $('#attanManageTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { orderable: false, targets: [5, 6, 7] },
            { type: 'date', targets: 2, className: 'text-start dt-left' }
        ],
    });

    // Move info to custom container
    $('#attanManageTable_info').appendTo('#table-attend-info');

    // status filtered dropdown
    $('.dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        const status = $(this).data('status');
        const html = $(this).html();
        $('#statusFilter2 .filter-label').html(html);
        if (status === "") {
            table.column(7).search("").draw();
        } else {
            table.column(7)
                .search('^' + status + '$', true, true)
                .draw();
        }
    });

    // Custom search input
    let customSearchValue = '';
    $('#empAttendSearchInput').on('keyup', function () {
        customSearchValue = this.value.toLowerCase();
        table.search(this.value).draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data) {

        if (!customSearchValue) return true;

        return (
            data[0].toLowerCase().includes(customSearchValue) ||
            data[1].toLowerCase().includes(customSearchValue) ||
            data[3].toLowerCase().includes(customSearchValue)
        );
    });

    // Custom length change
    $('#attendCustomLength').on('change', function () {
        const length = parseInt($(this).val());
        table.page.len(length).draw();
    });

});