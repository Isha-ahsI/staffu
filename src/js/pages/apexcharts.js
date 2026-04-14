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


    //  global font-family for all charts
    Apex = {
        chart: {
            fontFamily: 'Nunito, sans-serif'
        }
    };

    // column with marker
    const columnMarkerOptions = {
        series: [
            {
                name: 'Actual',
                data: [
                    {
                        x: '2011',
                        y: 1292,
                        goals: [
                            {
                                name: 'Expected',
                                value: 1400,
                                strokeHeight: 5,
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2012',
                        y: 4432,
                        goals: [
                            {
                                name: 'Expected',
                                value: 5400,
                                strokeHeight: 5,
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2013',
                        y: 5423,
                        goals: [
                            {
                                name: 'Expected',
                                value: 5200,
                                strokeHeight: 5,
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2014',
                        y: 6653,
                        goals: [
                            {
                                name: 'Expected',
                                value: 6500,
                                strokeHeight: 5,
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2015',
                        y: 8133,
                        goals: [
                            {
                                name: 'Expected',
                                value: 6600,
                                strokeHeight: 13,
                                strokeWidth: 0,
                                strokeLineCap: 'round',
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2016',
                        y: 7132,
                        goals: [
                            {
                                name: 'Expected',
                                value: 7500,
                                strokeHeight: 5,
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2017',
                        y: 7332,
                        goals: [
                            {
                                name: 'Expected',
                                value: 8700,
                                strokeHeight: 5,
                                strokeColor: colors.primary
                            }
                        ]
                    },
                    {
                        x: '2018',
                        y: 6553,
                        goals: [
                            {
                                name: 'Expected',
                                value: 7300,
                                strokeHeight: 2,
                                strokeDashArray: 2,
                                strokeColor: colors.primary
                            }
                        ]
                    }
                ]
            }
        ],
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: false,
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 4,
                color: colors.dark,
                opacity: 0.2,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
        colors: [colors.info],
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: hexToRgba(colors.secondary, 0.1),
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'center',
            customLegendItems: ['Actual', 'Expected'],
            offsetY: 10,
            itemMargin: {
                horizontal: 15,
            },
            labels: {
                colors: 'var(--bs-text-muted)'
            },
            markers: {
                fillColors: [colors.info, colors.primary],
                offsetX: -5,
            }
        },

        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return '$' + val.toLocaleString();
                },
            },
        }
    }

    const columnMarkerChart = new ApexCharts(document.querySelector("#columnMarkerChart"), columnMarkerOptions);
    columnMarkerChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });


    // Dumbbell Chart
    const dumbbellOptions = {
        series: [
            {
                data: [
                    {
                        x: '2008',
                        y: [2800, 4500]
                    },
                    {
                        x: '2009',
                        y: [3200, 4100]
                    },
                    {
                        x: '2010',
                        y: [2950, 7800]
                    },
                    {
                        x: '2011',
                        y: [3000, 4600]
                    },
                    {
                        x: '2012',
                        y: [3500, 4100]
                    },
                    {
                        x: '2013',
                        y: [4500, 6500]
                    },
                    {
                        x: '2014',
                        y: [4100, 5600]
                    }
                ]
            }
        ],
        chart: {
            height: 350,
            type: 'rangeBar',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 6,
                color: colors.dark,
                opacity: 0.1,
            },
        },
        plotOptions: {
            bar: {
                isDumbbell: true,
                columnWidth: 3,
                dumbbellColors: [[colors.blue, colors.success]]
            }
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'right',
            customLegendItems: ['Project A', 'Project B'],
            offsetY: -10,
            itemMargin: {
                horizontal: 15,
            },
            labels: {
                colors: 'var(--bs-text-muted)'
            },
            markers: {
                fillColors: [colors.blue, colors.success],
                offsetX: -5,
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                gradientToColors: [colors.success],
                inverseColors: true,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: hexToRgba(colors.secondary, 0.3),
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        xaxis: {
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                offsetX: -10,
            }
        }
    }

    const dumbbellChart = new ApexCharts(document.querySelector("#dumbbellChart"), dumbbellOptions);
    dumbbellChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });


    // Gradient Donut
    const gradientDonutOptions = {
        series: [44, 55, 41, 17, 15],
        chart: {
            height: 350,
            type: 'donut',
            dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                color: colors.dark,
                opacity: 0.2,
            },
        },
        stroke: {
            show: true,
            width: 2,
            colors: [hexToRgba(colors.light, 0.5)],
        },
        labels: ["Mobile Apps", "Web Platform", "Desktop", "API Services", "Others"],
        colors: [
            colors.primary,
            colors.orange,
            colors.success,
            colors.danger,
            colors.warning,
            colors.info,
        ],
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,

                donut: {
                    size: "65%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Share",
                            fontSize: "16px",
                            color: 'var(--bs-text-muted)',
                            fontWeight: 500,
                            formatter: () => "100%",
                        },
                        value: {
                            color: 'var(--bs-text-dark)',
                            fontWeight: 600,
                            formatter: function (val) {
                                return val + "%"
                            }
                        }
                    },
                },
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            formatter: function (val, opts) {
                return val
            },
            labels: {
                colors: 'var(--bs-text-muted)'
            },
            itemMargin: {
                horizontal: 15,
            },
            markers: {
                offsetX: -5,
            }
        },
        tooltip: {
            enabled: false,
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 250
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    const gradientDonut = new ApexCharts(document.querySelector("#gradientDonut"), gradientDonutOptions);
    gradientDonut.render();


    // Stacked chart
    function generateDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
    const stackedOptions = {
        series: [
            {
                name: 'South',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2025 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'North',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2025 GMT').getTime(), 20, {
                    min: 10,
                    max: 20
                })
            },
            {
                name: 'Central',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2025 GMT').getTime(), 20, {
                    min: 10,
                    max: 15
                })
            }
        ],
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: {
                show: false,
            },
            events: {
                selection: function (chart, e) {
                    console.log(new Date(e.xaxis.min))
                }
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 4,
                color: colors.dark,
                opacity: 0.3,
            },
        },
        grid: {
            borderColor: hexToRgba(colors.secondary, 0.2),
            strokeDashArray: 3,
        },
        colors: [colors.info, colors.success, colors.orange],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2,
            curve: 'straight'
        },
        fill: {
            type: 'gradient',
            shade: 'light',
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0,
            }
        },
        legend: {
            show: false,
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            labels: {
                offsetX: -10,
            }
        },
        markers: {
            shape: "plus",
        },
    }
    const stackedChart = new ApexCharts(document.querySelector("#stackedChart"), stackedOptions);
    stackedChart.render();


    //Stroked Gauge 
    const stackedGaugeOptions = {
        series: [75],
        chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10,
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 4,
                color: colors.dark,
                opacity: 0.3,
            },
        },
        colors: [colors.primary],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                    background: 'var(--bs-light-rgb)',
                    opacity: 0.1
                },
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: colors.primary,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: 'var(--bs-text-dark)',
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
        },
        stroke: {
            dashArray: 4
        },
        labels: ['Median Ratio'],
    }

    const stackedGaugeChart = new ApexCharts(document.querySelector("#stackedGauge"), stackedGaugeOptions);
    stackedGaugeChart.render();


    // Polar Area Chart
    const polarAreaOptions = {
        series: [14000, 23000, 21500, 17800, 15000],
        chart: {
            type: 'polarArea',
            height: 400,
            dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 6,
                color: colors.dark,
                opacity: 0.2
            }
        },
        stroke: {
            width: 2,
            colors: ['var(--bs-card-bg-color)']
        },
        fill: {
            type: 'gradient',
            opacity: 0.8,
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: [colors.primary, colors.success, colors.warning, colors.danger],
                opacityFrom: 0.9,
                opacityTo: 0.5,
                stops: [0, 100]
            },
        },
        labels: ['Revenue', 'Expenses', 'Profit', 'Tax', 'Investments'],
        colors: [colors.primary, colors.success, colors.warning, colors.danger, colors.blue],
        legend: {
            position: 'bottom',
            labels: {
                colors: 'var(--bs-text-muted)'
            },
            itemMargin: {
                horizontal: 15,
            },
            markers: {
                shape: 'star',
                offsetX: -5,
            }
        },
        plotOptions: {
            polarArea: {
                rings: { strokeWidth: 1, strokeColor: hexToRgba(colors.secondary, 0.4) },
                spokes: { strokeWidth: 1, strokeColor: hexToRgba(colors.secondary, 0.4), connectorColors: hexToRgba(colors.secondary, 0.4) }
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => `${(val / 1000).toFixed(0)}k`,
                style: {
                    colors: 'var(--bs-text-dark)'
                }
            },
            axisBorder: {
                color: 'var(--bs-border-color)'
            }
        },
        responsive: [{
            breakpoint: 992,
            options: {
                chart: {
                    height: 250
                },
                legend: {
                    itemMargin: {
                        horizontal: 5,
                    },
                }
            },
        }]

    }

    const polarAreaChart = new ApexCharts(document.querySelector("#polarArea"), polarAreaOptions);
    polarAreaChart.render();


    //  Grouped Stacked Bars
    const groupedStackedOptions = {
        series: [
            {
                name: 'Q1 Budget',
                group: 'budget',
                color: [hexToRgba(colors.primary, 0.5)],
                data: [440, 550, 410, 670, 220],
            },
            {
                name: 'Q1 Actual',
                group: 'actual',
                color: [colors.primary],
                data: [480, 500, 400, 650, 250],
            },
            {
                name: 'Q2 Budget',
                group: 'budget',
                color: [hexToRgba(colors.pink, 0.5)],
                data: [130, 360, 200, 80, 130],
            },
            {
                name: 'Q2 Actual',
                group: 'actual',
                color: [colors.pink],
                data: [200, 400, 250, 100, 120],
            },
        ],
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 4,
                color: colors.dark,
                opacity: 0.2,
            },
        },
        stroke: {
            width: 1,
            colors: ['var(--bs-card-bg-color)']
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        xaxis: {
            categories: [
                'Online advertising',
                'Sales Training',
                'Print advertising',
                'Catalogs',
                'Meetings'
            ],
            labels: {
                formatter: (val) => {
                    return val / 1000 + 'K'
                },
                style: {
                    fontSize: '14px',
                }
            },
            axisBorder: {
                color: hexToRgba(colors.secondary, 0.3),
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '14px',
                }
            },
            axisBorder: {
                color: hexToRgba(colors.secondary, 0.3),
            }
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
            clusterGroupedSeriesOrientation: "horizontal",
            horizontalAlign: "right",
            labels: {
                colors: 'var(--bs-text-muted)'
            },
        },
        grid: {
            borderColor: hexToRgba(colors.secondary, 0.05),
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '$' + val.toLocaleString();
                },
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                yaxis: {
                    show: false,
                }
            }
        }]
    }

    const groupedStackedChart = new ApexCharts(document.querySelector("#groupedStackedChart"), groupedStackedOptions);
    groupedStackedChart.render();


    // radarChart
    const radarOptions = {
        series: [{
            name: 'Satisfaction',
            data: [85, 54, 25, 45, 99, 23],
        }, {
            name: 'Coversion',
            data: [20, 30, 40, 80, 20, 80],
        }, {
            name: 'Session Duration',
            data: [40, 60, 80, 18, 40, 13],
        }],
        chart: {
            height: 350,
            type: 'radar',
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                left: 3,
                top: 3,
                color: colors.dark,
                opacity: 0.3
            }
        },
        colors: [colors.info, colors.success, colors.orange],
        stroke: {
            width: 2,
            colors: [hexToRgba(colors.info, 0.5), hexToRgba(colors.success, 0.5), hexToRgba(colors.orange, 0.5)],
        },
        fill: {
            opacity: 0.15
        },
        plotOptions: {
            radar: {
                size: 140,
                polygons: {
                    strokeColors: hexToRgba(colors.secondary, 0.3),
                    connectorColors: hexToRgba(colors.secondary, 0.3),
                    fill: {
                        colors: ['transparent']
                    }
                }
            }
        },
        markers: {
            size: 0,
            shape: 'sparkle',
            strokeWidth: 0,
        },
        yaxis: {
            show: false
        },
        xaxis: {
            categories: ['2011', '2012', '2013', '2014', '2015', '2016']
        },
        legend: {
            position: 'bottom',
            offsetY: 20,
            labels: {
                colors: 'var(--bs-text-muted)'
            },
            itemMargin: {
                horizontal: 15,
            },
            markers: {
                offsetX: -5,
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 250
                },
            }
        }]
    }

    const radarChart = new ApexCharts(document.querySelector("#radarChart"), radarOptions);
    radarChart.render();


    // steplineChart
    const steplineOptions = {
        series: [{
            name: "Profit",
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58, 55]
        }],
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'oct', 'nov', 'dec'],
        colors: [colors.primary],
        stroke: {
            curve: 'stepline',
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 4,
            strokeColors: 'var(--bs-card-bg-color)',
            hover: {
                sizeOffset: 3
            }
        },
        grid: {
            show: false,
        },
        tooltip: {
            x: {
                show: false,
            }
        },
    }

    const steplineChart = new ApexCharts(document.querySelector("#steplineChart"), steplineOptions);
    steplineChart.render();


    // Treemap Chart
    const treemapOptions = {
        series: [
            {
                data: [
                    {
                        x: 'New Delhi',
                        y: 218
                    },
                    {
                        x: 'Kolkata',
                        y: 149
                    },
                    {
                        x: 'Mumbai',
                        y: 184
                    },
                    {
                        x: 'Ahmedabad',
                        y: 55
                    },
                    {
                        x: 'Bangaluru',
                        y: 84
                    },
                    {
                        x: 'Pune',
                        y: 31
                    },
                    {
                        x: 'Chennai',
                        y: 70
                    },
                    {
                        x: 'Jaipur',
                        y: 30
                    },
                    {
                        x: 'Surat',
                        y: 44
                    },
                    {
                        x: 'Hyderabad',
                        y: 68
                    },
                    {
                        x: 'Lucknow',
                        y: 28
                    },
                    {
                        x: 'Indore',
                        y: 19
                    },
                    {
                        x: 'Kanpur',
                        y: 29
                    }
                ]
            }
        ],
        legend: {
            show: false
        },
        chart: {
            height: 350,
            type: 'treemap',
            toolbar: {
                show: false
            }
        },
        colors: [colors.primary, colors.secondary, colors.success, colors.warning, colors.info, colors.danger, colors.blue, colors.orange, colors.pink, colors.primary, colors.success, colors.info, colors.warning],
        stroke: {
            width: 3,
            colors: ['var(--bs-card-bg-color)'],
        },
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
                borderRadius: 12,
            }
        },
    }

    const treemapChart = new ApexCharts(document.querySelector("#treemapChart"), treemapOptions);
    treemapChart.render();


    // Horizontal BoxPlot Chart
    const boxplotOptions = {
        series: [
            {
                data: [
                    {
                        x: 'Category A',
                        y: [54, 66, 69, 75, 88],
                        goals: [
                            {
                                value: 90,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: colors.pink,
                            },
                            {
                                value: 93,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: colors.pink,
                            },
                        ],
                    },
                    {
                        x: 'Category B',
                        y: [43, 65, 69, 76, 81],
                    },
                    {
                        x: 'Category C',
                        y: [31, 39, 45, 51, 59],
                    },
                    {
                        x: 'Category D',
                        y: [39, 46, 55, 65, 71],
                        goals: [
                            {
                                value: 30,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: colors.pink,
                            },
                            {
                                value: 32,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: colors.pink,
                            },
                            {
                                value: 76,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: colors.pink,
                            },
                        ],
                    },
                    {
                        x: 'Category E',
                        y: [41, 49, 58, 61, 67],
                    },

                ],
            },
        ],
        chart: {
            type: 'boxPlot',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '40%'
            },
            boxPlot: {
                colors: {
                    upper: colors.primary,
                    lower: colors.pink,
                }
            }
        },
        stroke: {
            colors: [hexToRgba(colors.secondary, 0.5)]
        },
        grid: {
            borderColor: hexToRgba(colors.secondary, 0.15),
            strokeDashArray: 5,
        },
        yaxis: {
            axisBorder: {
                color: 'var(--bs-border-color)'
            }
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            }
        }
    }

    const boxplotChart = new ApexCharts(document.querySelector("#boxplotChart"), boxplotOptions);
    boxplotChart.render();


    // Timeline Chart
    const timelineOptions = {
        series: [
            {
                data: [
                    {
                        x: 'Analysis',
                        y: [
                            new Date('2019-02-27').getTime(),
                            new Date('2019-03-04').getTime()
                        ],
                        strokeColor: hexToRgba(colors.primary, 0.3),
                    },
                    {
                        x: 'Design',
                        y: [
                            new Date('2019-03-04').getTime(),
                            new Date('2019-03-08').getTime()
                        ],
                        strokeColor: hexToRgba(colors.success, 0.3)
                    },
                    {
                        x: 'Coding',
                        y: [
                            new Date('2019-03-07').getTime(),
                            new Date('2019-03-10').getTime()
                        ],
                        strokeColor: hexToRgba(colors.info, 0.3)
                    },
                    {
                        x: 'Testing',
                        y: [
                            new Date('2019-03-08').getTime(),
                            new Date('2019-03-12').getTime()
                        ],
                        strokeColor: hexToRgba(colors.orange, 0.3)
                    },
                    {
                        x: 'Deployment',
                        y: [
                            new Date('2019-03-12').getTime(),
                            new Date('2019-03-17').getTime()
                        ],
                        strokeColor: hexToRgba(colors.blue, 0.3)
                    }
                ]
            }
        ],
        stroke: {
            show: true,
            width: 1,
        },
        chart: {
            height: 350,
            type: 'rangeBar',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            }
        },
        colors: [colors.primary, colors.success, colors.info, colors.orange, colors.blue],
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                dataLabels: {
                    hideOverflowingLabels: false
                },
                borderRadius: 10,
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                // val is [start, end] timestamps
                var label = opts.w.globals.labels[opts.dataPointIndex];
                var start = new Date(val[0]);
                var end = new Date(val[1]);

                // calculate difference in days
                var diff = Math.round((end - start) / (1000 * 60 * 60 * 24));

                return label + ': ' + diff + (diff > 1 ? ' days' : ' day');
            },
            style: {
                colors: [colors.primary, colors.success, colors.info, colors.orange, colors.blue],
            }
        },
        xaxis: {
            type: 'datetime',
            axisBorder: {
                show: false,
                color: hexToRgba(colors.secondary, 0.7)
            },
            axisTicks: {
                show: true,
                color: hexToRgba(colors.secondary, 0.7)
            }
        },
        yaxis: {
            show: false,
        },
        grid: {
            row: {
                colors: [hexToRgba(colors.secondary, 0.05), 'var(--bs-card-bg-color)'],
                opacity: 1
            },
            borderColor: 'var(--bs-card-bg-color)',
        },
        fill: {
            opacity: 0.1
        }
    }

    const timelineChart = new ApexCharts(document.querySelector("#timelineChart"), timelineOptions);
    timelineChart.render();


    // Scatter Chart
    const scatterOptions = {
        series: [
            {
                name: 'DIAMOND',
                data: generateDayWiseTimeSeries(
                    new Date('10 Feb 2017 GMT').getTime(),
                    10,
                    {
                        min: 5,
                        max: 60,
                    }
                ),
            },
            {
                name: 'TRIANGLE',
                data: generateDayWiseTimeSeries(
                    new Date('17 Feb 2017 GMT').getTime(),
                    10,
                    {
                        min: 54,
                        max: 90,
                    }
                ),
            },
            {
                name: 'CROSS',
                data: generateDayWiseTimeSeries(
                    new Date('29 Feb 2017 GMT').getTime(),
                    8,
                    {
                        min: 10,
                        max: 50,
                    }
                ),
            },
            {
                name: 'PLUS',
                data: generateDayWiseTimeSeries(
                    new Date('10 Mar 2017 GMT').getTime(),
                    16,
                    {
                        min: 30,
                        max: 99,
                    }
                ),
            },
            {
                name: 'LINE',
                data: generateDayWiseTimeSeries(
                    new Date('29 Mar 2017 GMT').getTime(),
                    10,
                    {
                        min: 0,
                        max: 90,
                    }
                ),
            },
            {
                name: 'STAR',
                data: generateDayWiseTimeSeries(
                    new Date('10 Apr 2017 GMT').getTime(),
                    10,
                    {
                        min: 15,
                        max: 60,
                    }
                ),
            },
            {
                name: 'SPARKLE',
                data: generateDayWiseTimeSeries(
                    new Date('20 Apr 2017 GMT').getTime(),
                    10,
                    {
                        min: 45,
                        max: 99,
                    }
                ),
            },
        ],
        chart: {
            height: 350,
            type: 'scatter',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            }
        },
        colors: [
            colors.primary,
            colors.pink,
            colors.success,
            colors.info,
            colors.danger,
            colors.blue,
            colors.orange,
        ],
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false
        },
        xaxis: {
            type: 'datetime',
        },
        legend: {
            offsetY: 20,
            markers: {
                strokeWidth: [1, 1, 2, 2, 3, 1, 1],
                offsetX: -5,
            },
            labels: {
                colors: 'var(--bs-text-muted)'
            },
            itemMargin: {
                horizontal: 15,
            },
        },
        markers: {
            shape: [
                'diamond',
                'triangle',
                'cross',
                'plus',
                'line',
                'star',
                'sparkle',
            ],
            size: 8,
            fillOpacity: 0.8,
            strokeColors: 'var(--bs-card-bg-color)',
            strokeWidth: [1, 1, 2, 2, 3, 1, 1],
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        yaxis: {
            labels: {
                offsetX: -15,
            }
        },
    }

    const scatterChart = new ApexCharts(document.querySelector("#scatterChart"), scatterOptions);
    scatterChart.render();

})