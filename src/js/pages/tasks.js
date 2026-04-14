document.addEventListener("DOMContentLoaded", function () {
    // avtar tooltip js
    function initTooltips() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
    const tasksKanban = new jKanban({
        element: "#taskKanban",
        gutter: '0px',
        widthBoard: "410px",
        dragItems: true,
        dragBoards: true,
        itemHandleOptions: {
            enabled: false,
        },
        buttonClick: function (el, boardId) {
            // Store boardId in modal
            document.getElementById("saveTaskBtn").dataset.boardId = boardId;

            // Open modal
            const modal = new bootstrap.Modal(document.getElementById('addTaskKanbanItemModal'));
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
                        id: "new1",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>May 26,2026</small>
                                <span class="badge bg-soft-warning border-0">Medium</span>
                            </div>
                            <h6 class="fs-18 mb-0">Renewal Campaign</h6>
                            <p class="text-muted">Build the necessary API endpoints.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">65%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-primary" style="width: 65%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 5</span></div>
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
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "new2",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Feb 20,2026</small>
                                <span class="badge bg-soft-success border-0">High</span>
                            </div>
                            <h6 class="fs-18 mb-0">ERP Integration</h6>
                            <p class="text-muted">Draft proposal including timeline and cost estimation.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">80%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-primary" style="width: 80%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 8</span></div>
                                <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar4.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nisha Shahu"><img alt="Nisha Shahu"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg"></div>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "new3",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Feb 10,2026</small>
                                <span class="badge bg-soft-danger border-0">Low</span>
                            </div>
                            <h6 class="fs-18 mb-0">Website Redesign</h6>
                            <p class="text-muted">Implement lead capture, tracking, and status updates.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">25%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-primary" style="width: 25%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 3</span></div>
                                <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Pooja Mehta"><img alt="Pooja Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar3.jpg"></div>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "new4",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Feb 01,2026</small>
                                <span class="badge bg-soft-warning border-0">Medium</span>
                            </div>
                            <h6 class="fs-18 mb-0">Design Mobile App Dashboard</h6>
                            <p class="text-muted">Create dashboard UI with analytics widgets for employees.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">37%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="37" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-primary" style="width: 37%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 4</span></div>
                                <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar4.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee" class="w-100 h-100"
                                            src="../images/avatars/avatar6.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="shreya Kapoor"><img alt="Mark Lee"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg"></div>
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
                        id: "progress1",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Mar 20,2026</small>
                                <span class="badge bg-soft-success border-0">High</span>
                            </div>
                            <h6 class="fs-18 mb-0">Digital Marketing Portal</h6>
                            <p class="text-muted">Ensure analytics charts and KPIs display correctly.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">75%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-info" style="width: 75%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 6</span></div>
                                <div class="avatar-group justify-content-center">
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
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "progress2",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Feb 28,2026</small>
                                <span class="badge bg-soft-danger border-0">Low</span>
                            </div>
                            <h6 class="fs-18 mb-0">Retail Management System</h6>
                            <p class="text-muted">Check real-time stock updates and alerts.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">60%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-info" style="width: 60%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 7</span></div>
                                <div class="avatar-group justify-content-center">
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
                                            src="../images/avatars/avatar7.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Raj Grover"><img alt="Raj Grover"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar9.jpg"></div>
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
                        id: "review1",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Jan 18,2026</small>
                                <span class="badge bg-soft-danger border-0">Low</span>
                            </div>
                            <h6 class="fs-18 mb-0">Test User Role Permissions</h6>
                            <p class="text-muted">Verify admin, manager, and employee access levels.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">45%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-orange" style="width: 45%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 2</span></div>
                                <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Ethan Ray"><img alt="Ethan Ray"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar2.jpg"></div>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "review2",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Dec 30,2025</small>
                                <span class="badge bg-soft-warning border-0">medium</span>
                            </div>
                            <h6 class="fs-18 mb-0">Verify Inventory Updates</h6>
                            <p class="text-muted">Check real-time stock updates and alerts.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">55%</small>
                            </div>
                            <div class="progress" role="progressbar" aria-label="8px high" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-orange" style="width: 55%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 5</span></div>
                                <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Prem Mehta"><img alt="Prem Mehta"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar1.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee" class="w-100 h-100"
                                            src="../images/avatars/avatar10.jpg"></div>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "review3",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Jan 23,2026</small>
                                <span class="badge bg-soft-success border-0">High</span>
                            </div>
                            <h6 class="fs-18 mb-0">Review Marketing Dashboard Widgets</h6>
                            <p class="text-muted">Ensure analytics charts and KPIs display correctly.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">77%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-orange" style="width: 77%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 7</span></div>
                                <div class="avatar-group justify-content-center">
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
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Neha Sharma"><img alt="Ollivia Joy"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar10.jpg"></div>
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
                        id: "completed1",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Feb 17,2026</small>
                                <span class="badge bg-soft-success border-0">High</span>
                            </div>
                            <h6 class="fs-18 mb-0">Launch Email Marketing Campaign</h6>
                            <p class="text-muted">Sent February campaign to 10k subscribers.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">85%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-success" style="width: 85%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 10</span></div>
                                <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nia Dubey"><img alt="Nia Dubey"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar5.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Jaya Shah"><img alt="Jaya Shah"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                         title="Rahul Sharma"><img alt="Rahul Sharma"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar6.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Mark Lee"><img alt="Mark Lee" class="w-100 h-100"
                                            src="../images/avatars/avatar9.jpg"></div>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                    {
                        id: "completed2",
                        title: `
                        <div class="kanban-card">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small class="text-muted"><span class="me-1"><i class="bi bi-circle-fill fs-10"></i></span>Feb 12,2026</small>
                                <span class="badge bg-soft-warning border-0">Medium</span>
                            </div>
                            <h6 class="fs-18 mb-0">Setup Hosting Environment</h6>
                            <p class="text-muted">Configure AWS server and deploy staging build.</p>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <small class="text-muted fs-12">Progress</small>
                                <small class="text-muted fs-12">70%</small>
                            </div>
                            <div class="progress" role="progressbar"  aria-label="8px high" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                <div class="progress-bar bg-success" style="width: 70%"></div>
                            </div>  
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <div><span class="badge bg-outline-light"><i class="ri-link"></i> 6</span></div>
                                 <div class="avatar-group justify-content-center">
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nisha Shahu"><img alt="Nisha Shahu"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar7.jpg"></div>
                                    <div class="avatar rounded-circle avatar-sm overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Neha Sharma"><img alt="Neha Sharma"
                                            class="w-100 h-100"
                                            src="../images/avatars/avatar8.jpg"></div>
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
    const tasksDatePicker = flatpickr(".tasksSingleDatePicker", {
        dateFormat: "D, d M Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

    // Initialize Flatpickr for date range for tasks schedule
    const taskSchedulePicker = flatpickr("#taskDateSchedulePicker", {
        mode: "range",
        dateFormat: "d, F Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

    initTooltips();
})