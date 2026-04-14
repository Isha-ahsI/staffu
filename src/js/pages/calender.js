(function () {
    // Configuration
    const eventTypes = {
        meeting: { label: 'Meeting', icon: 'bi bi-people', bg: '#4666e1', text: 'white' },
        task: { label: 'Task', icon: 'bi-briefcase', bg: '#28adbb', text: 'dark' },
        deadline: { label: 'Deadline', icon: 'bi-calendar-check', bg: '#e25867', text: 'white' },
        leave: { label: 'Leave', icon: 'bi-calendar-event', bg: '#1774ff', text: 'white' },
        holiday: { label: 'Holiday', icon: 'bi-umbrella', bg: '#55b0db', text: 'dark' },
        reminder: { label: "Reminder", icon: 'bi bi-bell-fill', bg: '#e1cd3c', text: 'dark' },
        training: { label: 'Training', icon: 'bi-journal-bookmark', bg: '#6f5fe0', text: 'white' },
    };

    // Color options with hex values
    const colorOptions = [
        { name: 'Primary', value: '#4666e1', hex: '#4666e1' },
        { name: 'Secondary', value: '#65688a', hex: '#65688a' },
        { name: 'Success', value: '#28adbb', hex: '#28adbb' },
        { name: 'Danger', value: '#e25867', hex: '#e25867' },
        { name: 'Warning', value: '#e1cd3c', hex: '#e1cd3c' },
        { name: 'Cyan', value: '#55b0db', hex: '#55b0db' },
    ];

    const leaveBalance = 15;
    let usedLeaves = 5;
    let selectedColor = '#4666e1';

    // Utility functions
    function addDays(d, days) {
        const x = new Date(d);
        x.setDate(x.getDate() + days);
        return x;
    }

    function uid() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function getEventClassName(color) {
        const colorMap = {
            '#4666e1': 'event-primary',
            '#65688a': 'event-secondary',
            '#0d2042': 'event-dark',
            '#55b0db': 'event-info',
            '#28adbb': 'event-success',
            '#e1cd3c': 'event-warning',
            '#e25867': 'event-danger',
            '#1774ff': 'event-blue',
        };
        return colorMap[color] || 'event-primary';
    }

    function formatShort(dt) {
        const d = new Date(dt);
        return d.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Initial events
    const initialEvents = [
        {
            id: '1',
            title: 'Project Deadline',
            start: (() => {
                const d = addDays(new Date(), 5);
                d.setHours(14, 30, 0); // 2:30 PM
                return d.toISOString();
            })(),
            allDay: false,
            className: [getEventClassName('#e25867')],
            textColor: 'white',
            extendedProps: {
                type: 'deadline',
                description: 'Submit final project deliverables',
                status: 'pending',
                priority: 'high',
                color: '#e25867'
            }
        },
        {
            id: '2',
            title: 'Vacation',
            start: addDays(new Date(), 10).toISOString().split('T')[0],
            end: addDays(new Date(), 15).toISOString().split('T')[0],
            allDay: true,
            className: [getEventClassName('#55b0db')],
            textColor: 'white',
            extendedProps: {
                type: 'leave',
                description: 'Summer vacation',
                status: 'approved',
                color: '#55b0db'
            }
        },
        {
            id: '3',
            title: 'React Workshop',
            start: addDays(new Date(), 7).toISOString().split('T')[0] + 'T14:00:00',
            end: addDays(new Date(), 9).toISOString().split('T')[0] + 'T17:00:00',
            allDay: true,
            className: [getEventClassName('#e1cd3c')],
            textColor: 'white',
            extendedProps: {
                type: 'task',
                description: 'Advanced React patterns',
                status: 'confirmed',
                trainer: 'Alex Johnson',
                color: '#e1cd3c'
            }
        },
        {
            id: '4',
            title: 'Team Meeting',
            start: addDays(new Date(), -8).toISOString().split('T')[0],
            allDay: false,
            className: [getEventClassName('#1774ff')],
            textColor: 'white',
            extendedProps: {
                type: 'meeting',
                description: 'Discuss employee performance and company policies.',
                status: 'confirmed',
                recurring: 'yearly',
                color: '#1774ff'
            }
        }
    ];

    // DOM references
    const calendarEl = document.getElementById('calendar');
    const btnAddEvent = document.getElementById('btnAddEvent');
    const eventModalEl = document.getElementById('eventModal');
    const eventModal = new bootstrap.Modal(eventModalEl);
    const delConfirmModal = new bootstrap.Modal(document.getElementById('delConfirmModal'));
    const form = document.getElementById('eventForm');
    const modalTitle = document.getElementById('modalTitle');
    const inputId = document.getElementById('eventId');
    const inputTitle = document.getElementById('eventTitle');
    const inputType = document.getElementById('eventType');
    const inputStatus = document.getElementById('eventStatus');
    const inputDateTime = document.getElementById('dateTime');
    const inputDesc = document.getElementById('eventDescription');
    const deleteBtn = document.getElementById('deleteBtn');
    const saveBtn = document.getElementById('saveBtn');
    const colorOptionsEl = document.getElementById('colorOptions');
    const colorPickerGroup = document.getElementById('colorPickerGroup');
    const statusGroup = document.getElementById('statusGroup');

    // Sidebar elements
    const totalEventsBadge = document.getElementById('totalEventsBadge');
    const workCountEl = document.getElementById('workCount');
    const leaveCountEl = document.getElementById('leaveCount');
    const remainingLeavesEl = document.getElementById('remainingLeaves');
    const usedLeavesEl = document.getElementById('usedLeaves');
    const leaveProgressEl = document.getElementById('leaveProgress');
    const usedPercentEl = document.getElementById('usedPercent');
    const upcomingListEl = document.getElementById('upcomingList');
    const upcomingCountEl = document.getElementById('upcomingCount');
    document.getElementById('leaveBalance').textContent = leaveBalance;

    // Initialize Flatpickr
    const fp = flatpickr(inputDateTime, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: false,
        minDate: 'today',
        allowInput: true
    });

    // Build color options - ONCE on page load
    function buildColorOptions() {
        colorOptionsEl.innerHTML = ''; // Clear first
        colorOptions.forEach((colorObj, index) => {
            const div = document.createElement('div');
            div.className = 'color-option avatar avatar-xs rounded-circle';
            div.style.backgroundColor = colorObj.hex;
            div.dataset.color = colorObj.hex;
            div.title = colorObj.name;
            div.innerHTML = '<i class="bi bi-check" style="display: none;"></i>';
            div.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectedColor = colorObj.hex;

                // Remove selected class and hide check icons from all options first
                colorOptionsEl.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                    const checkIcon = opt.querySelector('.bi-check');
                    if (checkIcon) {
                        checkIcon.style.display = 'none';
                    }
                });

                // Add selected class and show check icon for clicked option
                div.classList.add('selected');
                const checkIcon = div.querySelector('.bi-check');
                if (checkIcon) {
                    checkIcon.style.display = 'block';
                }
            });
            colorOptionsEl.appendChild(div);
        });
    }

    // Update color selection UI
    function updateColorSelectionUI() {
        if (!colorOptionsEl) {
            console.error('Color options element not found in updateColorSelectionUI');
            return;
        }

        const colorElements = colorOptionsEl.querySelectorAll('.color-option');

        colorElements.forEach(el => {
            const elementColor = el.dataset.color;
            const checkIcon = el.querySelector('.bi-check');

            if (elementColor === selectedColor) {
                el.classList.add('selected');
                if (checkIcon) {
                    checkIcon.style.display = 'block';
                }
            } else {
                el.classList.remove('selected');
                if (checkIcon) {
                    checkIcon.style.display = 'none';
                }
            }
        });

        // Force a repaint to ensure visual update
        colorOptionsEl.offsetHeight;
    }

    // Build color options on page load
    if (colorOptionsEl) {
        buildColorOptions();
        // Set initial selection after a small delay to ensure DOM is ready
        setTimeout(() => {
            updateColorSelectionUI();
        }, 100);
    } else {
        console.error('Color options element not found!');
    }

    // Initialize FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            start: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
            end: 'today prev,next',
        },
        themeSystem: 'bootstrap5',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        nowIndicator: true,
        events: initialEvents,
        views: {
            dayGridMonth: {
                // Move exactly 1 month when prev/next is clicked
                dateIncrement: { months: 1 }
            }
        },
        dateClick: function (arg) {
            openAddModal(arg.date);
        },
        eventClick: function (info) {
            openEditModal(info.event);
        },
        eventContent: function (arg) {
            const type = arg.event.extendedProps.type || 'work';
            const iconClass = eventTypes[type] ? eventTypes[type].icon : 'bi-briefcase';

            const wrapper = document.createElement('div');
            wrapper.style.padding = '2px';
            wrapper.style.overflow = 'hidden';
            wrapper.innerHTML = `
                <i class="bi ${iconClass} fs-14"></i>
                <span class="fc-event-time">${arg.timeText ? arg.timeText + ' ' : ''}</span>
                <span class="fc-event-title fs-14">${arg.event.title}</span>
            `;
            return { domNodes: [wrapper] };
        },
        eventDrop: function () {
            refreshSidebar();
        },
        eventResize: function () {
            refreshSidebar();
        },
        datesSet: function (info) {
            // fc-header-toolbar title
            const titleEl = document.querySelector('.fc-toolbar-title');
            if (!titleEl) return;

            const date = info.view.currentStart;
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            // group-btn
            const group = document.querySelector('.fc-toolbar .btn-group');
            const activeBtn = group.querySelector('.btn.active');

            if (!group.querySelector('.fc-view-slider')) {
                const slider = document.createElement('div');
                slider.className = 'fc-view-slider';
                group.appendChild(slider);
            }

            const slider = group.querySelector('.fc-view-slider');

            slider.style.width = activeBtn.offsetWidth + 'px';
            slider.style.left = activeBtn.offsetLeft + 'px';

        },
    });

    calendar.render();
    refreshSidebar();


    // flatpicker mini calendar
    const flatpickrInstance = flatpickr("#sidebar-datepicker", {
        inline: true,
        defaultDate: calendar.getDate(), // start synced with FullCalendar
        onReady: function (selectedDates, dateStr, instance) {
            const cal = instance.calendarContainer;
            cal.style.width = "100%";
            cal.style.maxWidth = "100%";
            cal.style.boxSizing = "border-box";

            const inner = instance.calendarContainer.querySelector(".flatpickr-innerContainer");
            if (inner) {
                inner.style.justifyContent = "center";
                inner.style.alignItems = "center";
            }
        },
        onChange: function (selectedDates) {
            calendar.gotoDate(selectedDates[0]);
        },
    });

    calendar.on('datesSet', function (info) {
        flatpickrInstance.setDate(info.view.currentStart, false);
    });


    // Modal handling
    function openAddModal(date) {
        modalTitle.textContent = 'Add New Event';
        inputId.value = '';
        inputTitle.value = '';
        inputType.value = 'task';
        inputStatus.value = 'pending';
        inputDesc.value = '';
        selectedColor = '#4666e1';

        // Show/hide appropriate sections
        colorPickerGroup.style.display = '';
        colorPickerGroup.style.color = 'white';
        statusGroup.style.display = 'none';
        deleteBtn.style.display = 'none';
        saveBtn.textContent = 'Save Event';

        // Update color selection
        updateColorSelectionUI();

        if (date) {
            fp.setDate(date, true);
        } else {
            fp.clear();
        }
        eventModal.show();
    }

    function openEditModal(fcEvent) {
        modalTitle.textContent = 'Edit Event';
        inputId.value = fcEvent.id;
        inputTitle.value = fcEvent.title;
        const type = fcEvent.extendedProps.type || 'work';
        inputType.value = type;
        inputStatus.value = fcEvent.extendedProps.status || 'pending';
        inputDesc.value = fcEvent.extendedProps.description || '';

        // Set the selected color from event - use backgroundColor if color not available
        selectedColor = fcEvent.extendedProps.color || fcEvent.backgroundColor || '#4666e1';

        // Set date
        fp.setDate(fcEvent.start, true);

        // Show/hide appropriate sections
        colorPickerGroup.style.display = (type === 'leave') ? 'none' : '';
        statusGroup.style.display = (type === 'leave') ? '' : 'none';
        deleteBtn.style.display = '';
        saveBtn.textContent = 'Update Event';

        // IMPORTANT: Update color UI AFTER setting selectedColor
        updateColorSelectionUI();

        eventModal.show();
    }

    // Event type change handler
    inputType.addEventListener('change', (e) => {
        const type = e.target.value;
        colorPickerGroup.style.display = (type === 'leave') ? 'none' : '';
        statusGroup.style.display = (type === 'leave') ? '' : 'none';

        // Set default color based on event type
        if (eventTypes[type] && type !== 'leave') {
            selectedColor = eventTypes[type].bg;
            updateColorSelectionUI();
        }
    });

    // Add event button
    btnAddEvent.addEventListener('click', () => openAddModal(new Date()));

    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = inputId.value || uid();
        const title = inputTitle.value.trim();
        const type = inputType.value;
        const status = inputStatus.value;
        const desc = inputDesc.value.trim();

        if (!title) return;

        const raw = inputDateTime.value;
        if (!raw) {
            alert('Please choose date & time');
            return;
        }

        const parsed = new Date(raw);
        const isLeave = type === 'leave';

        // Get event color - for leave use default, otherwise use selected color
        let bgColor;
        if (isLeave) {
            bgColor = eventTypes.leave.bg;
        } else {
            bgColor = selectedColor || '#4666e1'; // Fallback to default
        }


        const eventObj = {
            id: id,
            title: title,
            start: isLeave ? parsed.toISOString().split('T')[0] : parsed.toISOString(),
            allDay: true,
            className: [getEventClassName(bgColor)],
            textColor: 'white',
            extendedProps: {
                type: type,
                status: status,
                description: desc,
                color: bgColor
            }
        };


        const existing = calendar.getEventById(id);
        if (existing) {
            // Remove the old event and add the new one to ensure all properties are updated
            existing.remove();
            calendar.addEvent(eventObj);
        } else {
            calendar.addEvent(eventObj);
            if (isLeave) {
                usedLeaves++;
            }
        }

        // Reset form
        inputTitle.value = '';
        inputDesc.value = '';
        inputType.value = 'work';
        inputStatus.value = 'pending';
        inputId.value = '';
        selectedColor = '#4666e1';
        updateColorSelectionUI();

        eventModal.hide();
        refreshSidebar();
    });

    // Delete flow
    deleteBtn.addEventListener('click', () => {
        delConfirmModal.show();
    });

    document.getElementById('confirmDelete').addEventListener('click', () => {
        const id = inputId.value;
        if (!id) return;

        const ev = calendar.getEventById(id);
        if (ev) {
            if (ev.extendedProps.type === 'leave') {
                usedLeaves = Math.max(0, usedLeaves - 1);
            }
            ev.remove();
        }

        delConfirmModal.hide();
        eventModal.hide();
        refreshSidebar();
    });

    // Refresh sidebar
    function refreshSidebar() {
        const allEvents = calendar.getEvents();
        totalEventsBadge.textContent = `${allEvents.length} Total`;

        const stats = { task: 0, leave: 0 };
        allEvents.forEach(ev => {
            const t = ev.extendedProps.type || 'work';
            stats[t] = (stats[t] || 0) + 1;
        });

        workCountEl.textContent = stats.task || 0;
        leaveCountEl.textContent = stats.leave || 0;

        const percent = Math.min(100, Math.round((usedLeaves / leaveBalance) * 100));
        remainingLeavesEl.textContent = Math.max(0, leaveBalance - usedLeaves);
        usedLeavesEl.textContent = usedLeaves;
        leaveProgressEl.style.width = percent + '%';
        usedPercentEl.textContent = percent + '%';

        // Upcoming events
        const upcoming = allEvents
            .filter(ev => new Date(ev.start) > new Date())
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .slice(0, 4);

        upcomingCountEl.textContent = upcoming.length;
        upcomingListEl.innerHTML = '';

        if (upcoming.length === 0) {
            upcomingListEl.innerHTML = `
                <div class="text-center py-3 text-muted">
                    <i class="bi bi-calendar-x fs-4 d-block mb-2"></i>
                    <span class="small">No upcoming events</span>
                </div>
            `;
        } else {
            upcoming.forEach(ev => {
                const wrapper = document.createElement('div');
                wrapper.className = 'd-flex align-items-center p-2 rounded-3 hover-bg-light transition-all bg-secondary bg-opacity-10';
                wrapper.style.cursor = 'pointer';
                wrapper.addEventListener('click', () => openEditModal(ev));

                const badgeBg = (ev.extendedProps.type === 'work') ? 'bg-primary bg-opacity-10 text-primary border border-1 border-primary border-opacity-25' : 'bg-success bg-opacity-10 text-success border border-1 border-primary border-opacity-25';
                const iconClass = (ev.extendedProps.type === 'work') ? 'ri-briefcase-line' : 'ri-calendar-check-fill';

                wrapper.innerHTML = `
                    <div class="avatar avatar-sm rounded-3 me-3 ${badgeBg} rounded-circle">
                        <i class="${iconClass} fw-medium"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="fw-medium text-truncate text-dark">${ev.title}</div>
                        <small class="text-muted d-flex">
                            <i class="bi bi-calendar3 me-1"></i>
                            ${formatShort(ev.start)}
                        </small>
                    </div>
                    <i class="bi bi-chevron-right text-muted ms-2"></i>
                `;
                upcomingListEl.appendChild(wrapper);
            });
        }
    }

    // Initial sidebar refresh
    refreshSidebar();

})();