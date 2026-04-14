document.addEventListener("DOMContentLoaded", function () {
    const colors = {
        primary: "#4666e1",
        secondary: "#8990b0",
        success: "#28adbb",
        warning: "#e1cd3c",
        info: "#55b0db",
        danger: "#e25867",
        light: "#f8f9fd",
        dark: "#1f2440 ",
        blue: "#1774ff",
        orange: "#e17846",
        pink: "#c64ad5",
    };

    // global font-family for all charts
    Apex = {
        chart: {
            fontFamily: 'Nunito, sans-serif'
        }
    };

    // --------------------------
    // Chart 1: attendance tracker (Syncing charts)
    // --------------------------

    const trackChart = document.querySelector("#attendanceTrackChart");
    if (trackChart) {
        function formatTimeFromMinutes(value) {
            let hours = Math.floor(value / 60);
            let minutes = value % 60;
            let period = hours >= 12 ? "PM" : "AM";

            hours = hours % 12 || 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;

            return `${hours}:${minutes} ${period}`;
        }

        const linechartOptions = {
            chart: {
                height: 250,
                type: 'line',
                toolbar: { show: false },
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 2,
                    blur: 8,
                    color: colors.dark,
                    opacity: 0.3,
                },
            },
            series: [
                {
                    name: "Avg Check-In Time",
                    data: [
                        { x: "Jan", y: 595 },
                        { x: "Feb", y: 610 },
                        { x: "Mar", y: 600 },
                        { x: "Apr", y: 605 },
                        { x: "May", y: 615 },
                        { x: "Jun", y: 605 },
                    ]
                },
                {
                    name: "Avg Check-Out Time",
                    data: [
                        { x: "Jan", y: 1080 },
                        { x: "Feb", y: 1110 },
                        { x: "Mar", y: 1100 },
                        { x: "Apr", y: 1095 },
                        { x: "May", y: 1120 },
                        { x: "Jun", y: 1200 },
                    ]
                }

            ],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: {
                    enabled: false
                },
                crosshairs: {
                    show: true,
                    width: 1,
                    dashArray: 0,
                    opacity: 0.7,
                    stroke: {
                        width: 1,
                        dashArray: 0
                    }
                }
            },
            yaxis: {
                labels: {
                    show: false,
                    formatter: formatTimeFromMinutes
                },
            },
            stroke: {
                colors: ['var(--bs-primary)'],
                width: 3,
            },
            markers: {
                size: 4,
                strokeWidth: 1,
                strokeColors: ['var(--bs-menu-btn-hover-color)'],
                colors: ['var(--bs-card-bg-color)'],
                hover: {
                    size: 6
                }
            },
            grid: {
                show: false
            },
            tooltip: {
                marker: {
                    show: false,
                },
                x: {
                    show: false,
                },
                y: {
                    formatter: formatTimeFromMinutes,
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
            },
            legend: {
                show: false,
            }
        }
        const attendanceTrackChart = new ApexCharts(trackChart, linechartOptions);
        attendanceTrackChart.render().then(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }


    // Initialize Flatpickr for date range selection
    const dateRangePicker = flatpickr("#dateRangePicker", {
        mode: "range",
        dateFormat: "d, F Y",
        defaultDate: new Date("2026-01-08"),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

})


// attendence datatable with custom search and status filter
if (typeof $ !== "undefined" && $.fn.DataTable) {
    $(document).ready(function () {

        const table = $('.attendence-table').DataTable({
            dom: 'rt',
            ordering: false,
        });

        // Custom search input
        $('#attendenceSearchInput').on('keyup', function () {
            table.search(this.value).draw();
        });

        $('.dropdown-menu .dropdown-item').on('click', function (e) {
            e.preventDefault();

            const status = $(this).data('status');
            const text = $(this).text();

            $('#statusFilter .filter-label').html(text);

            table.column(5).search(status).draw();
        });

    });
}
