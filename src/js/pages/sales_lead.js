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


    // --------------------------
    // Chart 1: Sales & Lead KPI's card (linechart)
    // --------------------------

    // spark1
    const chartS1 = document.querySelector(".spark1");
    if (chartS1) {
        const spark1Option = {
            chart: {
                type: 'area',
                height: 100,
                redrawOnParentResize: true,
                sparkline: {
                    enabled: true
                },
                dropShadow: {
                    enabled: true,
                    top: 10,
                    left: 5,
                    blur: 4,
                    opacity: 0.2
                }
            },
            stroke: {
                curve: 'stepline',
                width: 1,
                dashArray: 4
            },
            markers: {
                shape: "square",
                hover: {
                    size: 4,
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100]
                }
            },
            series: [{
                name: 'Sales',
                data: [20000, 80000, 40000, 60000, 25000, 70000, 90000, 20000, 50000, 80000, 35000, 10500]
            }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            tooltip: {
                y: {
                    formatter: val => '$' + val
                }
            },
            yaxis: {
                min: 0
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            colors: [colors.primary],

        }

        const spark1Chart = new ApexCharts(chartS1, spark1Option);
        spark1Chart.render().then(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }

    // spark2
    const chartS2 = document.querySelector(".spark2");
    if (chartS2) {
        const spark2Option = {
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                dropShadow: {
                    enabled: true,
                    top: 10,
                    left: 5,
                    blur: 4,
                    opacity: 0.2
                }
            },
            stroke: {
                curve: 'stepline',
                width: 1,
                dashArray: 4
            },
            markers: {
                shape: "square",
                hover: {
                    size: 4,
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100]
                }
            },
            series: [{
                name: 'Leads',
                data: [540, 350, 550, 400, 650, 780, 540, 710, 900, 640, 800, 780]
            }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yaxis: {
                min: 0
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            colors: [colors.success],
        }

        const spark2Chart = new ApexCharts(chartS2, spark2Option);
        spark2Chart.render();
    }

    // spark3
    const chartS3 = document.querySelector(".spark3");
    if (chartS3) {
        const spark3Option = {
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                dropShadow: {
                    enabled: true,
                    top: 10,
                    left: 5,
                    blur: 4,
                    opacity: 0.2
                }
            },
            stroke: {
                curve: 'stepline',
                width: 1,
                dashArray: 4
            },
            markers: {
                shape: "square",
                hover: {
                    size: 4,
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100]
                }
            },
            series: [{
                name: 'Sales',
                data: [800, 300, 500, 200, 425, 625, 750, 280, 550, 750, 600, 850]
            }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            tooltip: {
                y: {
                    formatter: val => '$' + val
                },
            },
            yaxis: {
                min: 0
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            colors: [colors.warning],
        }

        const spark3Chart = new ApexCharts(chartS3, spark3Option);
        spark3Chart.render();
    }

    // spark4
    const chartS4 = document.querySelector(".spark4");
    if (chartS4) {
        const spark4Option = {
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                dropShadow: {
                    enabled: true,
                    top: 10,
                    left: 5,
                    blur: 4,
                    opacity: 0.2
                }
            },
            stroke: {
                curve: 'stepline',
                width: 1,
                dashArray: 4
            },
            markers: {
                shape: "square",
                hover: {
                    size: 4,
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100]
                }
            },
            series: [{
                name: 'Sales',
                data: [5, 12, 20, 15, 8, 22, 27, 16, 25, 20, 30, 40]
            }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            tooltip: {
                y: {
                    formatter: val => val + "%"
                },
            },
            yaxis: {
                min: 0
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            colors: [colors.orange],
        }

        const spark4Chart = new ApexCharts(chartS4, spark4Option);
        spark4Chart.render();
    }


    // --------------------------
    // Chart 2: Monthly Sales vs Leads Trend (linechart)
    // --------------------------
    const chartE3 = document.querySelector("#lineChart");
    if (chartE3) {
        const linesOptions = {
            chart: {
                type: 'line',
                height: 450,
                stacked: false,
                toolbar: { show: false },
                dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 5,
                    blur: 6,
                    color: colors.dark,
                    opacity: 0.2,
                },
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                itemMargin: {
                    horizontal: 10,
                    vertical: 10
                },
                markers: {
                    offsetX: -5,
                },
                labels: {
                    colors: 'var(--bs-text-muted)'
                }
            },
            colors: [colors.primary, colors.info],
            grid: {
                show: true,
                borderColor: hexToRgba(colors.secondary, 0.1),
            },
            series: [
                {
                    name: 'Sales',
                    data: [90000, 120000, 140000, 100000, 250000, 340000, 300000, 400000, 500000, 450000, 420000, 480000]
                },
                {
                    name: 'Leads',
                    data: [545, 600, 785, 800, 640, 780, 540, 710, 900, 940, 800, 780]
                }
            ],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: {
                    text: 'Month',
                    style: {
                        color: undefined,
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--bs-text-muted)'
                    },
                },
            },
            yaxis: [
                {
                    axisBorder: {
                        show: true,
                        color: colors.primary,
                    },
                    title: {
                        text: 'Sales ($)',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--bs-text-muted)'
                        },
                    },
                    labels: {
                        formatter: function (val) {
                            return '$' + val.toLocaleString();
                        },
                    }
                },
                {
                    opposite: true,
                    axisBorder: {
                        show: true,
                        color: colors.success
                    },
                    title: {
                        text: 'Leads',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--bs-text-muted)'
                        }
                    },
                    labels: {
                        formatter: function (val) {
                            return val.toLocaleString();
                        }
                    }
                }
            ],
            stroke: {
                curve: 'smooth',
                width: [4, 2],
                dashArray: [0, 3]
            },
        }
        const lineChart = new ApexCharts(chartE3, linesOptions);
        lineChart.render();
    }

    // --------------------------
    // Chart 3: Sales per week (Heatmap chart)
    // --------------------------
    const chartE2 = document.querySelector("#heatMapChart");
    if (chartE2) {
        function generateData(days, yrange) {
            let series = [];
            for (let i = 0; i < days.length; i++) {
                series.push({
                    x: days[i], // use day name
                    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
                });
            }
            return series;
        }
        const daysOfWeek = ['Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'Sun'];
        const heatMapOptions = {
            series: [{
                name: '7 AM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            {
                name: '9 AM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            {
                name: '11AM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            {
                name: '1PM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            {
                name: '3PM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            {
                name: '5PM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            {
                name: '7PM',
                data: generateData(daysOfWeek, { min: 0, max: 90 })
            },
            ],
            chart: {
                height: 350,
                type: 'heatmap',
                toolbar: {
                    offsetY: -50,
                }
            },
            plotOptions: {
                heatmap: {
                    radius: 8,
                    useFillColorAsStroke: false,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 100, name: 'Metric Value', color: colors.primary }
                        ],
                        inverse: true,
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '14px',
                markers: {
                    offsetX: -5,
                },
                labels: {
                    colors: 'var(--bs-text-muted)'
                }
            },
            stroke: {
                show: true,
                width: 8,
                colors: ['var(--bs-card-bg-color)']
            },
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: -15
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                }
            },
            tooltip: {
                x: {
                    show: true,
                    formatter: function (val) {
                        return val + "day";
                    }
                },
                y: {
                    formatter: function (val) {
                        return val + " sales";
                    }
                }
            },
        }
        const heatMapChart = new ApexCharts(chartE2, heatMapOptions);
        heatMapChart.render();
    }

    // --------------------------
    // Chart 4:Countries wise sales (Reversed Bar Chart)
    // --------------------------
    const chartEl = document.querySelector("#reversedBarChart");
    if (chartEl) {
        const reversedBarOptions = {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: true,
                    tools: {
                        download: false,
                    }
                }
            },

            states: {
                active: {
                    filter: {
                        type: 'lighten',
                    }
                },
            },
            series: [{
                data: [1200, 1570, 700, 1375, 450, 580, 690]
            }],
            colors: [colors.info],
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        position: 'top',
                        maxItems: 100,
                        hideOverflowingLabels: true,
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: 20,
            },
            xaxis: {
                categories: ['India', 'United State', 'Russia', 'Indonesia', 'China', 'Australia', 'Canada'],
            },
            grid: {
                show: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: -10,
                    left: 0
                }
            },
            tooltip: {
                enabled: false,
            },
        }
        const reversedBarChart = new ApexCharts(chartEl, reversedBarOptions);
        reversedBarChart.render();
    }

})

//small radial chart in Top Leads by Potential Value
if (typeof $ !== "undefined" && $.fn.DataTable) {
    $(document).ready(function () {
        function initProgressCharts() {
            $('#leadTable tbody div[data-progress]').each(function () {
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

        const table = $('#leadTable').DataTable({
            responsive: true,
            paging: false,
            searching: true,
            info: false,
            lengthChange: false,
            ordering: true,
            order: [],
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search..."
            },
            dom: '<"datatable-header d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3"<"table-title">f>rtip',
            columnDefs: [
                {
                    targets: [0, 5, 6],
                    className: 'text-start dt-left'
                },
                { orderable: false, targets: [2, 3, 4] }
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

        $('.table-title').html('<h5 class="card-title mb-0">Top Leads by Potential Value</h5>');
    })
}
