document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.view-content').forEach(content => { content.style.display = 'none'; });
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const target = activeTab.dataset.target;
        document.getElementById(target).style.display = 'block';
    }

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();

            const target = this.dataset.target;

            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

            document.querySelectorAll('.view-content').forEach(content => { content.style.display = 'none'; });

            this.classList.add('active');

            document.getElementById(target).style.display = 'block';
        });
    });
})

function initProgressCharts() {
    $('#leadsDetails div[data-progress]').each(function () {
        const container = $(this);

        if (container.children('.apexcharts-canvas').length > 0) {
            return;
        }

        const percent = container.data('progress');
        let color = '#e25867'; // Red
        if (percent > 30 && percent <= 70) {
            color = '#e1cd3c'; // Yellow
        } else if (percent > 70) {
            color = '#28adbb'; // Blue/Teal
        }

        const options = {
            chart: {
                type: 'radialBar',
                height: 60,
                width: 60,
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
            colors: [color],
            stroke: {
                lineCap: 'round'
            },
        };

        const chart = new ApexCharts(this, options);
        chart.render();
    })
}
initProgressCharts();

$(document).ready(function () {
    const table = $('#leadsManageTable').DataTable({
        responsive: true,
        dom: 'ti',
        ordering: true,
        order: [],
        columnDefs: [
            { targets: '_all', className: 'text-start dt-left' },
            { orderable: false, targets: [2, 7, 8] }
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
    $('#leadsManageTable_info').appendTo('#table-leave-info');

    // lead source filtered dropdown
    let leadSource = '';
    let leadStatus = '';

    $('.source-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        leadSource = $(this).data('status');
        const html = $(this).html();

        $('#leadSourceFilter .filter-label').html(html);

        applyFilters();
    });

    // lead status filtered dropdown
    $('.status-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
        e.preventDefault();

        leadStatus = $(this).data('status');
        const text = $(this).text();

        $('#leadStatusFilter .filter-label').html(text);

        applyFilters();
    });

    // Function to apply both filters
    function applyFilters() {
        table
            .column(2).search(leadSource)
            .column(7).search(leadStatus)
            .draw();
    }
})

// $(document).ready(function () {
//     const table = $('#leadsManageTable').DataTable({
//         responsive: true,
//         dom: 'ti',
//         ordering: true,
//         order: [],
//         columnDefs: [
//             { targets: '_all', className: 'text-start dt-left' },
//             { orderable: false, targets: [2, 7, 8] }
//         ],
//         initComplete: function () {
//             $('#leadsManageTable tbody td[data-progress]').each(function (index, el) {
//                 const percent = $(el).data('progress');
//                 const chartId = 'radialBar-' + index;
//                 $(el).attr('id', chartId);

//                 renderRadialChart(document.querySelector('#' + chartId), percent);
//             });
//         }
//     })
//     // Move info to custom container
//     $('#leadsManageTable_info').appendTo('#table-leave-info');

//     // lead source filtered dropdown
//     let leadSource = '';
//     let leadStatus = '';

//     $('.source-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
//         e.preventDefault();

//         leadSource = $(this).data('status');
//         const html = $(this).html();

//         $('#leadSourceFilter .filter-label').html(html);

//         applyFilters();
//     });

//     // lead status filtered dropdown
//     $('.status-dropdown .dropdown-menu .dropdown-item').on('click', function (e) {
//         e.preventDefault();

//         leadStatus = $(this).data('status');
//         const text = $(this).text();

//         $('#leadStatusFilter .filter-label').html(text);

//         applyFilters();
//     });

//     // Function to apply both filters
//     function applyFilters() {
//         table
//             .column(2).search(leadSource)
//             .column(7).search(leadStatus)
//             .draw();
//     }

// })


// function renderRadialChart(container, percent) {
//     percent = Math.max(0, Math.min(percent, 100));

//     let color = '#e25867';
//     if (percent > 30 && percent <= 70) {
//         color = '#e1cd3c';
//     } else if (percent > 70) {
//         color = '#28adbb';
//     }

//     const options = {
//         chart: {
//             type: 'radialBar',
//             height: 60,
//             width: 60,
//             sparkline: {
//                 enabled: true
//             }
//         },
//         plotOptions: {
//             radialBar: {
//                 hollow: {
//                     size: '35%',
//                 },
//                 dataLabels: {
//                     show: true,
//                     name: { show: false },
//                     value: {
//                         show: true,
//                         fontSize: '10px',
//                         offsetY: 4,
//                         formatter: function (val) {
//                             return val + '%';
//                         }
//                     }
//                 }
//             }
//         },
//         series: [percent],
//         colors: [color],
//         stroke: {
//             lineCap: 'round'
//         },
//     };
//     const probabilityChart = new ApexCharts(container, options);
//     probabilityChart.render();
// }

// function renderCardCharts() {
//     document.querySelectorAll('#cardView .radial-chart').forEach(el => {
//         const percent = Number(el.dataset.progress) || 0;

//         renderRadialChart(el, percent);

//         // ✅ mark as rendered
//         el.dataset.rendered = "true";
//     });
// }