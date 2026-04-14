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


    //  global font-family for all charts
    Apex = {
        chart: {
            fontFamily: 'Nunito, sans-serif'
        }
    };


    // Expense by Category Donut Chart
    const expenseChategoryOptions = {
        chart: {
            height: 250,
            type: 'donut',
        },
        series: [20, 15, 13, 12, 13, 13, 14],
        labels: ['Salary & Wages', 'Benefits', 'Taxes & Contributions', 'Bonus & Incentives', 'Overtime', 'Allowances', 'Reimbursements'],
        colors: [colors.primary, colors.secondary, colors.info, colors.indigo, colors.orange, colors.blue, colors.pink],
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 25,
                        },
                        value: {
                            show: true,
                            fontWeight: 650,
                            fontSize: '22px',
                            color: 'var(--bs-text-dark)',
                            offsetY: -15,
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontWeight: 650,
                            fontSize: '16px',
                            color: 'var(--bs-text-muted)',
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return total + "%";
                            }
                        }
                    }
                }
            },
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.3,
            }
        },
        legend: {
            formatter: function (val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%"
            },
            markers: {
                size: 10,
                shape: 'line',
                strokeWidth: 2,
                offsetX: -4,
                offsetY: 0
            },

            labels: {
                colors: 'var(--bs-text-muted)'
            }
        },
        stroke: {
            lineCap: "round",
            width: 6,
            colors: ['var(--bs-card-bg-color)']
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        responsive: [{
            breakpoint: 576,
            chart: {
                height: 300,
            },
            options: {
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                }
            }
        }]
    };

    const expenseChategoryChart = new ApexCharts(document.querySelector("#expenseChategoryChart"), expenseChategoryOptions);
    expenseChategoryChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });


    // Expense Trend Chart
    const expenseTrendOptions = {
        chart: {
            type: 'area',
            height: 300,
            toolbar: {
                show: false
            },
            offsetY: 20,
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 3,
                color: colors.dark,
                opacity: 0.5,
            },
        },

        stroke: {
            curve: 'straight',
            width: 2,
            lineCap: "round",
            dashArray: 4,
        },
        dataLabels: {
            enabled: false
        },
        colors: [colors.primary],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: [colors.primary],
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0.03,
                stops: [0, 100]
            },
        },
        series: [{
            name: 'Expenses',
            data: [42000, 45000, 38000, 45680, 48000, 43000]
        }],
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June'],
            title: {
                text: 'Month',
                offsetY: 7,
                style: {
                    color: undefined,
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--bs-text-muted)'
                },
            },
            axisBorder: {
                show: false,
            },
            labels: {
                offsetY: 7,
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            labels: {
                offsetX: -5,
            },
            title: {
                text: 'Expense ($)',
                offsetX: -5,
                style: {
                    color: undefined,
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--bs-text-muted)'
                },

            },
        },
        labels: {
            formatter: function (val) {
                return '$' + val.toLocaleString();
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + val;
                }
            },
            marker: {
                show: false,
            },
        },
        grid: {
            show: false,
        },
        markers: {
            size: 5,
            colors: ['var(--bs-card-bg-color)'],
            showNullDataPoints: true,
            strokeColors: [colors.primary],
            strokeWidth: 2,
            hover: {
                size: 8,
            }
        }

    }

    const expenseTrendChart = new ApexCharts(document.querySelector("#expenseTrendChart"), expenseTrendOptions);
    expenseTrendChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });


    // Initialize Flatpickr for single date selection
    const expenseDatePicker = flatpickr("#expenseDatePicker", {
        dateFormat: "d M, Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });
})

$(document).ready(function () {
    const table = $('#expenseTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { orderable: false, targets: [1, 5, 8, 9, 10] },
            { type: 'date', targets: [0, 7], className: 'text-start dt-left' }
        ],
    });

    // Delete row functionality
    let deleteRow = null;
    $(document).on('click', '.delete-item', function () {
        deleteRow = table.row($(this).closest('tr'));
        const modal = new bootstrap.Modal(document.getElementById('deleteExpenseModal'));
        modal.show();
    });

    $('#confirmExpenseDelete').on('click', function () {
        if (deleteRow) {
            deleteRow.remove().draw();
            deleteRow = null;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteExpenseModal'));
        modal.hide();
    });


    // Select all functionality
    $('#expenseTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#expenseTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler
    $('#expenseTable tbody').on('change', 'input[type="checkbox"]', function () {
        const totalCheckboxes = $('#expenseTable tbody input[type="checkbox"]').length;
        const checkedCheckboxes = $('#expenseTable tbody input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#expenseTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });

    // expense type filter dropdown button
    $('.dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        const status = $(this).data('status');
        const text = $(this).text();

        $('#expenseStatusFilter .filter-label').html(text);

        table.column(8).search(status).draw();
    });

    // Move info to custom container
    $('#expenseTable_info').appendTo('#expenseTable-info');
})