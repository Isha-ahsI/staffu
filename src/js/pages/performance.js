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
    // Chart 1:  Total Sales Revenue (Area chart)
    // --------------------------

    const chartP1 = document.querySelector(".revenueChart");
    if (chartP1) {
        const revenueOptions = {
            series: [{
                name: 'Revenue',
                data: [6000000, 9500000, 7450000, 12300000, 9000000, 15500000]
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: [colors.orange]
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [colors.orange],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.03,
                    stops: [0, 100]
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                },
                y: {
                    formatter: function (value) {
                        return "$" + value.toLocaleString();
                    },
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
                marker: {
                    show: false,
                }
            },
            xaxis: {
                crosshairs: {
                    show: false,
                }
            },
            colors: [colors.orange],
        };
        const revenueChart = new ApexCharts(chartP1, revenueOptions);
        revenueChart.render().then(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }


    // --------------------------
    // Chart 2:  Average Deal Size (Area chart)
    // --------------------------

    const chartP2 = document.querySelector(".averageDealChart");
    if (chartP2) {
        const averageDealOptions = {
            series: [{
                name: 'Avg Deal Size',
                data: [460000, 400000, 450000, 385000, 480000, 445000]
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                dashArray: 4,
                colors: [colors.primary]
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [colors.primary],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.03,
                    stops: [0, 100]
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                },
                y: {
                    formatter: function (value) {
                        return "$" + value.toLocaleString();
                    },
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
                marker: {
                    show: false,
                }
            },
            xaxis: {
                crosshairs: {
                    show: false,
                }
            },
            colors: [colors.primary],
        };

        const averageDealChart = new ApexCharts(chartP2, averageDealOptions);
        averageDealChart.render().then(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }


    // --------------------------
    // Chart 3:  Number of Deals Closed (Area chart)
    // --------------------------

    const chartP3 = document.querySelector(".dealClosedChart");
    if (chartP3) {
        const dealClosedOptions = {
            series: [{
                name: 'Deals Closed',
                data: [26, 4, 16, 28, 5, 30]
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: [colors.info]
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [colors.info],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.03,
                    stops: [0, 100]
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                },
                y: {
                    formatter: function (val) {
                        return val + " Deals";
                    },
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
                marker: {
                    show: false,
                }
            },
            xaxis: {
                crosshairs: {
                    show: false,
                }
            },
            colors: [colors.info],
        };

        const dealClosedChart = new ApexCharts(chartP3, dealClosedOptions);
        dealClosedChart.render();
    }


    // --------------------------
    // Chart 4:  Win Rate (Donut chart)
    // --------------------------

    const chartP4 = document.querySelector(".winRateChart");
    if (chartP4) {
        const winRateOptions = {
            series: [67, 33],
            labels: ['Win', 'Lose'],
            chart: {
                height: 180,
                type: 'donut',
                toolbar: {
                    show: false
                }
            },
            colors: [colors.success, colors.danger],
            stroke: {
                show: true,
                colors: ['var(--bs-card-bg-color)'],
                width: 5,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                    }
                }
            },
            grid: {
                padding: {
                    top: -10,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            },
            dataLabels: {
                enabled: false,
                formatter: function (val, opts) {
                    return val + "%"
                },
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%"
                },
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                },
                fontSize: '16px',
                markers: {
                    shape: "star",
                    strokeWidth: 0,
                    offsetX: -5
                },
                labels: {
                    colors: 'var(--bs-text-muted)'
                }
            },
            tooltip: {
                enabled: false,
            },
        };

        const winRateChart = new ApexCharts(chartP4, winRateOptions);
        winRateChart.render();
    }


    // --------------------------
    // Chart 5:  Sales Pipeline Value ( Funnel Charts )
    // --------------------------

    const chartE4 = document.querySelector("#salesPipelineChart");
    if (chartE4) {
        const revenueData = [6500000, 8200000, 5900000, 4200000, 3000000]
        const funnelOptions = {
            chart: {
                type: 'bar',
                height: 430,
                dropShadow: {
                    enabled: true,
                },
                toolbar: {
                    show: false
                }
            },
            series: [
                {
                    data: [120, 90, 60, 35, 20],
                },
            ],
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: '80%',
                    isFunnel: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
                },
                dropShadow: {
                    enabled: false,
                },
                background: {
                    enabled: true,
                    padding: 4,
                    borderRadius: 2,
                    foreColor: 'var(--bs-dark)',
                }
            },
            xaxis: {
                categories: [
                    'Lead',
                    'Qualified',
                    'Proposal',
                    'Negotiation',
                    'Closing',
                ],
                crosshairs: {
                    show: false,
                }
            },
            tooltip: {
                marker: {
                    show: false,
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const x = w.globals.labels[dataPointIndex];
                    const y = revenueData[dataPointIndex];

                    return `<div class="apex-tooltip px-3 py-2">
                   <strong>${x}</strong> : $ ${y.toLocaleString()}
                 </div>`;
                }
            },
            colors: [colors.primary],
        }
        const salesPipelineChart = new ApexCharts(chartE4, funnelOptions);
        salesPipelineChart.render();
    }


    // --------------------------
    // Chart 6:  Customer Acquisition Rate (Area chart )
    // --------------------------

    const chartP5 = document.querySelector(".cusAcquisitionChart");
    if (chartP5) {
        const cusAcquisitionOptions = {
            series: [{
                name: 'Monthly Acquisition Trend',
                data: [30, 35, 40, 41, 45]
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: [colors.success]
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [colors.success],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.03,
                    stops: [0, 100]
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                },
                y: {
                    formatter: function (val) {
                        return val + " Customers";
                    },
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
                marker: {
                    show: false,
                }
            },
            xaxis: {
                crosshairs: {
                    show: false,
                }
            },
            colors: [colors.success],
        };
        const cusAcquisitionChart = new ApexCharts(chartP5, cusAcquisitionOptions);
        cusAcquisitionChart.render();
    }


    // --------------------------
    // Chart 7:  Churn Rate (Area chart )
    // --------------------------

    const chartP6 = document.querySelector(".churnRateChart");
    if (chartP6) {
        const churnRateOptions = {
            series: [{
                name: 'Churn Trend Over Months',
                data: [8, 7, 6.5, 6, 6]
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: [colors.danger]
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [colors.danger],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.03,
                    stops: [0, 100]
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                },
                y: {
                    formatter: function (val) {
                        return val + "%";
                    },
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
                marker: {
                    show: false,
                }
            },
            xaxis: {
                crosshairs: {
                    show: false,
                }
            },
            colors: [colors.danger],
        };
        const churnRateChart = new ApexCharts(chartP6, churnRateOptions);
        churnRateChart.render();
    }


    // --------------------------
    // Chart 8:  Customer Lifetime Value (CLV) (Area chart )
    // --------------------------

    const chartP8 = document.querySelector(".clvChart");
    if (chartP8) {
        const clvChartOptions = {
            series: [{
                name: 'Average CLV Over Time',
                data: [42000, 43500, 44000, 44500, 45000]
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: [colors.warning]
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [colors.warning],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.03,
                    stops: [0, 100]
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                },
                y: {
                    formatter: function (value) {
                        return "$" + value.toLocaleString();
                    },
                    title: {
                        formatter: function () {
                            return null;
                        }
                    }
                },
                marker: {
                    show: false,
                }
            },
            xaxis: {
                crosshairs: {
                    show: false,
                }
            },
            colors: [colors.warning],
        };
        const clvChart = new ApexCharts(chartP8, clvChartOptions);
        clvChart.render();
    }
    

    // --------------------------
    // Chart 9:  Client Satisfaction (Stroked Gauge)
    // --------------------------

    const chartE5 = document.querySelector("#clientSatisfyChart");
    if (chartE5) {
        const series = [14.9, 34.8, 50.3];
        const labels = ['Detractors 1-6', 'Neutral 7-8', 'Promoters 9-10'];
        const counts = [11, 32, 62];

        const clientSatisfyOptions = {
            chart: {
                height: 350,
                type: 'donut',
                offsetY: 10,
                toolbar: { show: false },
                sparkline: { enabled: true },
            },
            series: series,
            labels: labels,
            colors: [colors.primary, colors.danger, colors.orange],
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetX: 0,
                    offsetY: 20,
                    donut: {
                        labels: {
                            show: true,
                            showAlways: false,
                            name: {
                                show: true,
                                offsetY: -50,
                                show: true,
                                fontSize: '20px',
                                fontWeight: 500,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            value: {
                                show: true,
                                offsetY: -30,
                                fontSize: '24px',
                                fontWeight: 650,
                                color: 'var(--bs-text-dark)',
                                formatter: function (val) {
                                    return val + "%"
                                }
                            },
                            total: {
                                show: true,
                                showAlways: false,
                                label: 'NPS',
                                fontWeight: 650,
                                color: 'var(--bs-text-muted)',
                                formatter: function (w) {
                                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    return Number.isInteger(total)
                                        ? total + "%"
                                        : total.toFixed(1) + "%";
                                }
                            }
                        }
                    }
                },
            },
            stroke: {
                show: true,
                colors: ['var(--bs-card-bg-color)'],
                width: 3,
                lineCap: "round",
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            tooltip: {
                enabled: false,
            }
        }

        const clientSatisfyChart = new ApexCharts(chartE5, clientSatisfyOptions);
        clientSatisfyChart.render();

        labels.forEach((label, i) => {
            const row = `<tr><td>${label}</td><td>${series[i]}%</td><td>${counts[i]}</td></tr>`;
            document.querySelector("#client-satisfy-table tbody").innerHTML += row;
        });
    }


    // --------------------------
    // Chart 10:  deals (Column Charts)
    // --------------------------

    const chartE6 = document.querySelector("#dealsChart");
    if (chartE6) {
        const dealsChartOptions = {
            chart: {
                type: 'bar',
                height: 370,
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 2,
                    blur: 4,
                    color: colors.dark,
                    opacity: 0.3,
                },
            },
            series: [{
                name: 'Transaction Amount',
                data: [20000, 24000, 28000, 25000, 30000, 21000]
            }, {
                name: 'Revenue',
                data: [25000, 23000, 23000, 20000, 27000, 19000]
            }],
            colors: [colors.success, colors.primary],
            dataLabels: {
                enabled: false
            },
            grid: {
                borderColor: hexToRgba(colors.secondary, 0.1),
                padding: {
                    top: 0,
                    right: 0,
                    bottom: -10,
                    left: 0
                }
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                    borderRadiusApplication: 'around'
                },
            },
            xaxis: {
                axisBorder: {
                    show: true,
                    color: hexToRgba(colors.secondary, 0.1),
                },
                categories: ['02.20', '02.21', '02.22', '02.23', '02.24', '02.25'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)',
                    style: {
                        color: 'var(--bs-text-muted)'
                    },
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val
                    }
                },
            },
            markers: {
                shape: "triangle",
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetY: -5,
                markers: {
                    shape: "triangle",
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                },
                labels: {
                    colors: 'var(--bs-text-muted)'
                }
            },
        }

        const dealsChart = new ApexCharts(chartE6, dealsChartOptions);
        dealsChart.render();
    }

})




// Sales per datatable
if (typeof $ !== "undefined" && $.fn.DataTable) {
    $(document).ready(function () {
        $('#salesPerTable').DataTable({
            responsive: true,
            paging: true,
            searching: true,
            info: true,
            lengthChange: true,
            ordering: true,
            order: [],
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search..."
            },
            columnDefs: [
                {
                    targets: '_all',
                    className: 'text-start dt-left'
                },
                { orderable: false, targets: [2, 5] }
            ],
        });
    });
}
