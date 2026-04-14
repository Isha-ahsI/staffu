document.addEventListener("DOMContentLoaded", function () {
    // avtar tooltip js
    function initTooltips() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }

    initTooltips();

    // kanban board
    const milestonesKanban = new jKanban({
        element: "#milestonesKanban",
        gutter: '0px',
        widthBoard: "410px",
        dragItems: true,
        dragBoards: true,
        itemHandleOptions: {
            enabled: false,
        },
        buttonClick: function (el, boardId) {
            // Store boardId in modal
            document.getElementById("saveMileBtn").dataset.boardId = boardId;

            // Open modal
            const modal = new bootstrap.Modal(document.getElementById('addMileKanbanItemModal'));
            modal.show();
        },
        itemAddOptions: {
            enabled: true,
            content: '+ Add New Card',
            class: 'custom-button',
            footer: true
        },
        boards: [
            {
                id: "_new",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">New</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addTaskKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
                        <div class="dropdown">
                            <button type="button" id="newKanbanDrop" aria-expanded="false"
                                class="card-drop-icon dropdown-toggle btn" data-bs-toggle="dropdown"><i
                                    class="bi bi-three-dots-vertical fs-20"></i></button>
                            <div aria-labelledby="newKanbanDrop"
                                class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item edit-board" href="#" data-discover="true">Edit Board</a>
                                <a class="dropdown-item delete-board" href="#" data-discover="true">Delete Board</a>
                            </div>
                        </div>
                    </div>
                </div>
                `,
                item: [
                    {
                        id: "newMile1",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-2</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">Mobile App Development</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 20 - 25 Febuary,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-success">High</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Requirement & Planning</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Layout Design</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Frontend Development</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Jaya Shah">
                                        <img alt="Jaya Shah" class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg">
                                    </div>
                                    <div class="avatar avatar-sm avatar-primary rounded-circle fw-semibold"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Neha Sharma">NS</div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 3</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 4</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "newMile2",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-3</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">CRM System Implementation</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 24 - 28 Feb,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-danger">Low</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Feasibility Study</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Data Modeling</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> UI/UX Design</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                               <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Jaya Shah"><img alt="Jaya Shah"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg"></div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 2</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 1</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                ]
            },
            {
                id: "_progress",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">In Progress</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addTaskKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
                        <div class="dropdown">
                            <button type="button" id="progressKanbanDrop" aria-expanded="false"
                                class="card-drop-icon dropdown-toggle btn" data-bs-toggle="dropdown"><i
                                    class="bi bi-three-dots-vertical fs-20"></i></button>
                            <div aria-labelledby="progressKanbanDrop"
                                class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item edit-board" href="#" data-discover="true">Edit Board</a>
                                <a class="dropdown-item delete-board" href="#" data-discover="true">Delete Board</a>
                            </div>
                        </div>
                    </div>
                </div>
                `,
                item: [
                    {
                        id: "progressMile1",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-4</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">E-Commerce Platform Upgrade</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 15 - 22 Febuary,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-success">High</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Backend & Database Upgrade</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Feature Enhancement</p>
                                <p class="mb-0 text-secondary"><span><i class="ri-checkbox-circle-line"></i></span> Post-Upgrade Support</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Ollivia Joy"><img alt="Ollivia Joy"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar9.jpg"></div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 7</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 5</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "progressMile2",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-5</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">Digital Marketing Campaign</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 09 - 20 Febuary,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-danger">Low</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Content Creation</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Platform Setup & Scheduling</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Campaign Launch</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Performance Tracking & Optimization</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar1.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar10.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Shreya Kapoor"><img alt="Shreya Kapoor"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg">
                                    </div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Ollivia Joy"><img alt="Ollivia Joy"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 3</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 5</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "progressMile3",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-1</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">Employee Management System</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 05 - 10 Febuary,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-warning">Medium</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> System Design</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Core Module Development</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Advanced Module Development</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Integration & Security Setup</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nia Dubey">
                                        <img alt="Nia Dubey" class="w-100 h-100"
                                            src="../images/avatars/avatar5.jpg">
                                    </div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Jaya Shah">
                                        <img alt="Jaya Shah" class="w-100 h-100"
                                        src="../images/avatars/avatar8.jpg">
                                    </div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Rahul Sharma"><img alt="Rahul Sharma" class="w-100 h-100"
                                        src="../images/avatars/avatar6.jpg">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 4</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 3</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                ]
            },
            {
                id: "_review",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">In Review</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addTaskKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
                        <div class="dropdown">
                            <button type="button" id="newKanbanDrop" aria-expanded="false"
                                class="card-drop-icon dropdown-toggle btn" data-bs-toggle="dropdown"><i
                                    class="bi bi-three-dots-vertical fs-20"></i></button>
                            <div aria-labelledby="newKanbanDrop"
                                class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item edit-board" href="#" data-discover="true">Edit Board</a>
                                <a class="dropdown-item delete-board" href="#" data-discover="true">Delete Board</a>
                            </div>
                        </div>
                    </div>
                </div>
                `,
                item: [
                    {
                        id: "reviewMile1",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-6</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">Cloud Migration Project</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 21 Jan - 02 Feb,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-warning">Medium</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Testing & Validation</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Optimization & Handover</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Post-Migration Review</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar4.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="shreya Kapoor"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg"></div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 5</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 3</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "reviewMile2",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-7</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">Sales Pipeline Optimization</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 12 - 27 Feb,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-success">High</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Training & Enablement</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Testing & Pilot Run</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Full Deployment & Monitoring</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Review & Continuous Improvement</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar1.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar10.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Ethan Ray"><img alt="Ethan Ray"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar2.jpg"></div>                        
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 6</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 4</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                ]
            },
            {
                id: "_completed",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">Completed</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addTaskKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
                        <div class="dropdown">
                            <button type="button" id="newKanbanDrop" aria-expanded="false"
                                class="card-drop-icon dropdown-toggle btn" data-bs-toggle="dropdown"><i
                                    class="bi bi-three-dots-vertical fs-20"></i></button>
                            <div aria-labelledby="newKanbanDrop"
                                class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item edit-board" href="#" data-discover="true">Edit Board</a>
                                <a class="dropdown-item delete-board" href="#" data-discover="true">Delete Board</a>
                            </div>
                        </div>
                    </div>
                </div>
                `,
                item: [
                    {
                        id: "completedMile1",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-8</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">	Mobile CRM Application</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 03 - 10 Jan,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-danger">Low</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> UI/UX Design</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Backend Development</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Frontend Development</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Ollivia Joy"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar1.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nisha Shahu"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar3.jpg"></div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 8</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 6</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "completedMile2",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-9</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">	API Integration & Automation</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 16 - 25 Jan,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-warning">Medium</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> API Research & Selection</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Development & Implementation</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> Deployment & Monitoring</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                 <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Neha Mehta"><img alt="Neha Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar2.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Pooja Khanna"><img alt="Pooja Khanna"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar9.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="shreya Kapoor"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 12</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 10</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "completedMile3",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-10</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">	Corporate Website Development</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 27 Jan - 06 Feb,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-success">High</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Project Initiation</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> UI/UX Design</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Content Development</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Testing & QA</p>    
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar4.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="shreya Kapoor"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Rahul Sharma"><img alt="Rahul Sharma" class="w-100 h-100"
                                        src="../images/avatars/avatar6.jpg">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 12</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 10</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "completedMile3",
                        title: `
                        <div class="kanban-card">
                            <h6 class="fw-bold text-dark mb-3">Milestone-10</h6>
                            <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                                <div>
                                    <h6 class="mb-2 fw-semibold fs-18">	HR Recruitment System Project</h6>
                                    <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line"></i> 02 Jan - 08 Feb,2026</span>
                                </div>
                                <span class="badge badge-sm bg-soft-success">High</span>
                            </div>
                            <div class="d-flex flex-column gap-1">
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Job Portal Setup</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Applicant Tracking</p>
                                <p class="mb-0"><span class="text-success"><i class="ri-checkbox-circle-fill"></i></span> Reporting Dashboard</p>
                                <p class="mb-0 text-secondary "><span><i class="ri-checkbox-circle-line"></i></span> System Deployment</p>
                            </div>
                            <hr class="mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Ollivia Joy"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar1.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nisha Shahu"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg"></div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 9</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 7</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                ]
            },
        ]
    })

    // new board bg color
    const newBoard = document.querySelector('.kanban-board[data-id="_new"]');
    newBoard.classList.add('kanban-board-bg-primary');

    // in progress board bg color
    const progressBoard = document.querySelector('.kanban-board[data-id="_progress"]');
    progressBoard.classList.add('kanban-board-bg-info');

    // in review board bg color
    const reviewBoard = document.querySelector('.kanban-board[data-id="_review"]');
    reviewBoard.classList.add('kanban-board-bg-orange');

    // completed board bg color
    const completBoard = document.querySelector('.kanban-board[data-id="_completed"]');
    completBoard.classList.add('kanban-board-bg-success');



    // Initialize Flatpickr for perticular date of tasks
    const mileDatePicker = flatpickr(".mileSingleDatePicker", {
        dateFormat: "D, d M Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

    // Initialize Flatpickr for date range for tasks schedule
    const mileSchedulePicker = flatpickr("#mileDateSchedulePicker", {
        mode: "range",
        dateFormat: "d, F Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });
    
})