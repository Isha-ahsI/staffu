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
    // Chart 1: Employee Gender Ratio (DonutChart)
    // --------------------------

    const chartA1 = document.querySelector("#ratioDonutChart");
    if (chartA1) {
        const donutOptions = {
            chart: {
                type: 'donut',
                height: 350,
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 6,
                    color: colors.dark,
                    opacity: 0.2,
                },
            },
            tooltip: {
                enabled: false,
            },
            series: [25, 75],
            labels: ['Women', 'Men'],
            colors: [colors.primary, colors.orange],
            legend: {
                position: "top",
                horizontalAlign: 'right',
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                },
                markers: {
                    shape: "circle",
                    offsetX: -5,
                },
                labels: {
                    // Legend na text mate
                    colors: 'var(--bs-secondary-color)'
                }
            },

            stroke: {
                show: false,
                width: 0,
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'middle',
                distributed: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'medium',
                    color: 'var(--bs-text-muted)',
                },
            },
            plotOptions: {
                pie: {
                    expandOnClick: true,
                    donut: {
                        size: "65%",
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '14px',
                                fontWeight: 300,
                                offsetY: 20,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            value: {
                                show: true,
                                fontSize: '24px',
                                fontWeight: 650,
                                offsetY: -20,
                                color: 'var(--bs-text-dark)',
                                formatter: function (val) {
                                    return val + "%"
                                }
                            },
                            total: {
                                show: true,
                                showAlways: false,
                                label: 'Total Employees',
                                fontWeight: 650,
                                color: 'var(--bs-text-muted)',
                                formatter: function (w) {
                                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    return total + "%";
                                }
                            }
                        }
                    },
                },
            },
        }

        const ratioDonutChart = new ApexCharts(chartA1, donutOptions);
        ratioDonutChart.render().then(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }


    // --------------------------
    // Chart 2: Employee Performance (Column BarChart)
    // --------------------------

    const chartA2 = document.querySelector("#performanceBarChart");
    if (chartA2) {
        const columnOptions = {
            chart: {
                type: "bar",
                height: 320,
                width: "100%",
                redrawOnParentResize: true,
                toolbar: { show: false },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 3,
                    blur: 4,
                    color: colors.dark,
                    opacity: 0.4,
                },
            },
            series: [{
                name: 'Performance',
                data: [80, 60, 90, 75, 50, 45, 60, 65, 65, 70, 55, 85]
            }],
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                },

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
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            stroke: {
                show: false,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: colors.primary,
                            opacity: 1
                        },
                        {
                            offset: 50,
                            color: colors.indigo,
                            opacity: 1
                        },
                        {
                            offset: 100,
                            color: colors.pink,
                            opacity: 1
                        }
                    ]
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -30,
                style: {
                    fontSize: '12px',
                    fontWeight: 'semibold',
                    colors: ['var(--bs-text-muted)']
                },
                formatter: function (val, opts) {
                    return val + "%"
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "July", "Aug", "Sep", "oct", "Nov", "Dec"],
            },
            yaxis: {
                labels: {
                    show: false,
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            }
        }

        const performanceBarChart = new ApexCharts(chartA2, columnOptions);
        performanceBarChart.render();
    }


    // --------------------------
    // Chart 3: Employee Satisfaction (RadialBar)
    // --------------------------

    const chartA3 = document.querySelector("#satisfactionRadialChart");
    if (chartA3) {
        const radialOptions = {
            chart: {
                height: 450,
                type: "radialBar",
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 6,
                    color: colors.dark,
                    opacity: 0.2,
                },
            },
            series: [82, 65, 90, 10],
            colors: [colors.info, colors.warning, colors.success, colors.primary],
            plotOptions: {
                radialBar: {
                    track: {
                        background: 'var(--bs-light-rgb)',
                        opacity: 0.1
                    },
                    hollow: {
                        size: '50%',
                    },
                    dataLabels: {
                        total: {
                            show: true,
                            label: 'TOTAL',
                            color: 'var(--bs-text-dark)',
                            fontSize: '22px',
                            fontWeight: 800
                        },
                        value: {
                            color: 'var(--bs-text-dark)',
                        }
                    },
                }
            },
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: 'center',
                fontSize: '16px',
                itemMargin: {
                    horizontal: 10,
                    vertical: 5
                },
                labels: {
                    colors: 'var(--bs-text-muted)',
                },
                markers: {
                    shape: "line",
                    offsetX: -5,
                    size: 10,
                    strokeWidth: 8,
                },
            },
            stroke: {
                lineCap: "round",
            },
            labels: ['Job Satisfaction', 'Employee NPS', 'Training Completed', 'Internal Promotions']

        }

        const satisfactionRadialChart = new ApexCharts(chartA3, radialOptions);
        satisfactionRadialChart.render();
    }


    // jsvectormap for Employee Location
    const markers = [
        { coords: [40.7128, -74.0060], name: "New York", employees: "35%" },
        { coords: [37.7749, -122.4194], name: "San Francisco", employees: "15%" },
        { coords: [51.5074, -0.1278], name: "London", employees: "25%" },
        { coords: [12.9716, 77.5946], name: "Bangalore", employees: "25%" }
    ]
    const series = {
        markers: [
            {
                attribute: 'fill',
                legend: false,
                scale: {
                    'New York': colors.info,
                    'San Francisco': colors.orange,
                    'London': colors.primary,
                    'Bangalore': colors.warning,
                },
                values: {
                    0: 'New York',
                    1: 'San Francisco',
                    2: 'London',
                    3: 'Bangalore',
                },
            },
        ],
    }
    const map = new jsVectorMap({
        selector: '#map',
        map: 'world',
        markers,
        series,
        regionStyle: {
            initial: {
                fill: 'var(--bs-text-muted)',
                fillOpacity: 0.2,
                stroke: 'var(--bs-border-color)',
                strokeWidth: 0.5,
            },
            hover: {
                fill: 'var(--bs-primary)',
            }
        },
        markerStyle: {
            hover: { fill: colors.primary, r: 6 },
        },
        onMarkerTooltipShow(event, tooltip, index) {
            const marker = markers[index]
            const html = `
            <div class="d-flex align-items-center justify-content-center gap-2">
            <h6 class="mb-0 fw-semibold">${marker.name} :</h6>
            <p class="mb-0">${marker.employees}</p>
            </div>
            `
            tooltip.text(html, true)
        },
        onRegionTooltipShow(event, tooltip) {
            tooltip.css({
                backgroundColor: colors.primary,
                padding: '8px 12px',
            })
        },
    })
})

// Employee performance datatable
if (typeof $ !== "undefined" && $.fn.DataTable) {
    $(document).ready(function () {
        $('.performTable').DataTable({
            responsive: true,
            paging: true,
            searching: false,
            info: true,
            lengthChange: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            ordering: true,
            order: [],
            columnDefs: [
                {
                    targets: '_all',
                    className: 'text-start dt-left'
                },
                { orderable: false, targets: [3, 5] }
            ]
        });
    });
}



