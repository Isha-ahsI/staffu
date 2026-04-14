document.addEventListener("DOMContentLoaded", function () {

    // global font-family for all charts
    Apex = {
        chart: {
            fontFamily: 'Nunito, sans-serif'
        }
    };

    // Initialize employee performance chart
    const kpiData = [66, 68, 80, 85, 71, 78, 66];
    const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const empPerformOptions = {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        series: [
            {
                name: 'KPI Performance',
                data: kpiData.map((val, index) => {
                    return {
                        x: categories[index],
                        y: val,
                        goals: [
                            {
                                name: 'Top Border',
                                value: val,
                                strokeHeight: 3,
                                strokeWidth: 20,
                                strokeColor: '#4666e1'
                            }
                        ]
                    };
                })
            }
        ],
        plotOptions: {
            bar: {
                columnWidth: '60%',
            }
        },
        colors: ['#4666e1'],
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 0.3,
                opacityFrom: 0.8,
                opacityTo: 0.05,
                stops: [0, 100]
            }
        },

        stroke: {
            show: false,
            curve: 'smooth',
            width: 2
        },

        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },

        yaxis: {
            show: false
        },

        grid: {
            show: false
        },

        tooltip: {
            y: {
                formatter: val => `${val}%`
            }
        }

    };

    const empPerformChart = new ApexCharts(document.querySelector("#empPerformChart"), empPerformOptions);
    empPerformChart.render().then(() => {
        window.dispatchEvent(new Event('resize'));
    });


    // Initialize Flatpickr for date range selection
    const joiningDate = flatpickr("input#addEmpJoinDate", {
        dateFormat: "d, F Y",
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

})


// employee list datatable
$(document).ready(function () {
    const table = $('#empListTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [3, 4, 7, 8, 9, 10] },
            { type: 'date', targets: 5 }
        ],
    });

    // Custom length change
    $('#customLength').on('change', function () {
        const length = parseInt($(this).val());
        table.page.len(length).draw();
    });

    // Custom search input
    let customSearchValue = '';
    $('#empListSearchInput').on('keyup', function () {
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

        const status = data[8]; // Status column
        const type = data[4];   // Employment type column
        const model = data[7];  // Work model column

        // Get selected values
        const selectedStatus = $('.filter-status:checked')
            .map(function () { return this.value; })
            .get();

        const selectedType = $('.filter-type:checked')
            .map(function () { return this.value; })
            .get();

        const selectedModel = $('.filter-model:checked')
            .map(function () { return this.value; })
            .get();

        const selected = $('.filter-check:checked')
            .map(function () { return this.value; })
            .get();

        // Status filter
        if (selectedStatus.length && !selectedStatus.includes(status)) {
            return false;
        }

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

        return selected.includes(status) || selected.includes(type) || selected.includes(model);
    });
    $('.filter-status, .filter-type, .filter-model').on('change', function () {
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

    // Select all functionality
    $('#empListTable thead input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('#empListTable tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    // Individual checkbox change handler
    $('#empListTable tbody').on('change', 'tr td input[type="checkbox"]', function () {
        e.stopPropagation();
        const totalCheckboxes = $('#empListTable tbody tr td input[type="checkbox"]').length;
        const checkedCheckboxes = $('#empListTable tbody tr td input[type="checkbox"]:checked').length;

        // Update header checkbox state
        const headerCheckbox = $('#empListTable thead input[type="checkbox"]');
        if (checkedCheckboxes === 0) {
            headerCheckbox.prop('checked', false).prop('indeterminate', false);
        } else if (checkedCheckboxes === totalCheckboxes) {
            headerCheckbox.prop('checked', true).prop('indeterminate', false);
        } else {
            headerCheckbox.prop('checked', false).prop('indeterminate', true);
        }
    });

    // Move info to custom container
    $('#empListTable_info').appendTo('#table-info');

    // edit data
    $(document).on('click', '.btn-edit', function () {
        const $row = $(this).closest('tr');
        const isEditing = $row.hasClass('editing');

        if (!isEditing) {
            // Start editing
            $row.addClass('editing');
            $(this).html('<i class="ri-check-line fs-5 fw-normal"></i>'); // Change icon to check mark

            $row.find('td').each(function (index) {
                const $cell = $(this);
                // Skip the Available column (index 6) and Actions column (index 9)
                if (index !== 4 && index !== 7 && index !== 8 && index !== 9 && index !== 10) {
                    const $span = $cell.find('span');
                    if ($span.length && !$span.hasClass('badge')) {
                        const text = $span.text().trim();
                        $cell.html(`<input type="text" id="${text}" class="form-control" value="${text}">`);
                    } else if ($span.hasClass('badge')) {
                        const text = $span.text().trim();
                        $cell.html(`<input type="text" id="${text}" class="form-control" value="${text}">`);
                    }
                }
            });
        }
        else {
            // Save edits
            $row.removeClass('editing');
            $(this).html('<i class="ri-edit-box-line fs-5 fw-normal"></i>');

            $row.find('td').each(function (index) {
                const $cell = $(this);
                const $input = $cell.find('input');
                if ($input.length) {
                    const value = $input.val();

                    // Restore original formatting based on column
                    if (index === 0) { // Emp id
                        $cell.html(`EMP-<span class="fw-semibold">${value}</span>`);
                    } else if (index === 1) { // emp name
                        $cell.html(`<div class="d-flex align-items-center gap-2" data-search="${value}">
                                                                <div class="avatar avatar-md">
                                                                    <img src="../../../images/avatars/avatar2.jpg"
                                                                        alt="Employee Img"
                                                                        class="w-100 h-100 custom-avatar">
                                                                </div>
                                                                <h6 class="mb-0 fw-semibold"><span>${value}</span></h6>
                                                            </div>`);
                    } else if (index === 2) { // designation
                        $cell.html(`<span>${value}</span>`);
                    } else if (index === 3) { // gmail id
                        $cell.html(`<span>${value}</span>`);
                    } else if (index === 5) { // join date
                        $cell.html(`<span>${value}</span>`);
                    } else if (index === 6) { // salary
                        $cell.html(`<span>${value}</span>`);
                    }
                }
            });
        }
    });

    // Delete row functionality
    let deleteRow = null;
    $(document).on('click', '.btn-delete', function () {
        deleteRow = table.row($(this).closest('tr'));
        const modal = new bootstrap.Modal(document.getElementById('deleteEmpConfirmModal'));
        modal.show();
    });

    $('#confirmDeleteEmp').on('click', function () {
        if (deleteRow) {
            deleteRow.remove().draw();
            deleteRow = null;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteEmpConfirmModal'));
        modal.hide();
    });

});

