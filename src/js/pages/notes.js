
document.addEventListener("DOMContentLoaded", function () {
    // avtar tooltip js
     function initTooltips() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }

    const notesKanban = new jKanban({
        element: "#clientNotesKanban",
        gutter: '0px',
        widthBoard: "410px",
        dragItems: true,
        dragBoards: true,
        itemHandleOptions: false,
        buttonClick: function (el, boardId) {
            // Store boardId in modal
            document.getElementById("saveNoteBtn").dataset.boardId = boardId;

            // Open modal
            const modal = new bootstrap.Modal(document.getElementById('addNoteKanbanItemModal'));
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
                id: "_todo",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">To Do</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addNoteKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
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
                        id: "todo1",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18">Discussed contract renewal</h6>
                                <span class="badge bg-soft-success border-0 rounded-pill">High</span>
                            </div>
                            <p class="text-muted mb-2">Had a meeting with the client to review and discuss the contract renewal terms,...</p>
                            <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line fs-6"></i> 01 - 09 December</span>
                            <hr class="mb-2 mt-4">
                            <div class="d-flex justify-content-between align-items-end">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-xs overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nia Dubey">
                                        <img alt="Nia Dubey" class="w-100 h-100"
                                            src="../images/avatars/avatar5.jpg">
                                    </div>
                                    <div class="avatar rounded-circle avatar-xs overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Jaya Shah">
                                        <img alt="Jaya Shah" class="w-100 h-100"
                                        src="../images/avatars/avatar8.jpg">
                                    </div>
                                    <div class="avatar rounded-circle avatar-xs overflow-hidden"
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

                    {
                        id: "todo2",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18 text-wrap">Client requested updated pricing.</h6>
                                <span class="badge bg-soft-warning border-0 rounded-pill">Medium</span>
                            </div>
                            <p class="text-muted">The client requested an updated pricing proposal reflecting current requirements and scope changes.</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 3</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 3</span>
                            </div>   
                        </div>
                        `,
                    },

                ]
            },
            {
                id: "_contacted",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">Contacted</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addNoteKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
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
                        id: "contact1",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18 ">Follow-Up Call</h6>
                                <span class="badge bg-soft-warning border-0 rounded-pill">Medium</span>
                            </div>
                            <p class="text-muted">Set a follow-up call to discuss pending questions from the previous meeting. ...</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 3</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 2</span>
                            </div>   
                        </div>
                        `,
                    },

                    {
                        id: "contact2",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                 <div class="d-flex align-items-center gap-2">
                                    <div class="avatar avatar-sm">
                                        <img src="images/avatars/avatar2.jpg" alt="client Img" class="w-100 h-100 custom-avatar">
                                    </div>
                                    <div>
                                        <h6 class="mb-0 fw-semibold"><span>Tiger Nixon</span></h6>
                                        <small class="text-muted">Client</small>
                                    </div>
                                </div>
                                <span class="badge bg-soft-success border-0 rounded-pill">High</span>
                            </div>  
                            <hr class="mb-2">
                            <h6 class="mb-2 fw-semibold fs-18 ">Contract Renewal Discussion</h6>
                            <p class="text-muted">Had a meeting with the client to review the current contract terms and discuss renewal options....</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 6</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 5</span>
                            </div>
                        </div>
                        `,
                    },

                    {
                        id: "contact3",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18">Project Demo Scheduled</h6>
                                <span class="badge bg-soft-success border-0 rounded-pill">High</span>
                            </div>
                            <p class="text-muted mb-2">Scheduled a product demo with the client to showcase new features...</p>
                            <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line fs-6"></i> 11 - 13 January</span>
                            <hr class="mb-2 mt-4">
                            <div class="d-flex justify-content-between align-items-end">
                                <div class="avatar-group">
                                    <div class="avatar rounded-circle avatar-xs overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Nia Dubey">
                                        <img alt="Nia Dubey" class="w-100 h-100"
                                            src="../images/avatars/avatar1.jpg">
                                    </div>
                                    <div class="avatar rounded-circle avatar-xs overflow-hidden"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Jaya Shah">
                                        <img alt="Jaya Shah" class="w-100 h-100"
                                        src="../images/avatars/avatar10.jpg">
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

                    {
                        id: "contact4",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18 ">Internal Team Discussion</h6>
                                <span class="badge bg-soft-danger border-0 rounded-pill">Low</span>
                            </div>
                            <p class="text-muted">Hold an internal discussion to align on client requirements, pricing adjustments, and strategy for negotiation. ...</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 1</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 2</span>
                            </div>   
                        </div>
                        `,
                    },

                ]
            },
            {
                id: "_proposal",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">Proposal Sent</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addNoteKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
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
                        id: "proposal1",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                 <div class="d-flex align-items-center gap-2">
                                    <div class="avatar avatar-sm">
                                        <img src="images/avatars/avatar7.jpg" alt="client Img" class="w-100 h-100 custom-avatar">
                                    </div>
                                    <div>
                                        <h6 class="mb-0 fw-semibold"><span>Nia Sharma</span></h6>
                                        <small class="text-muted">Client</small>
                                    </div>
                                </div>
                                <span class="badge bg-soft-success border-0 rounded-pill">High</span>
                            </div>  
                            <hr class="mb-2">
                            <h6 class="mb-2 fw-semibold fs-18 ">Schedule Next Meeting</h6>
                            <p class="text-muted">Coordinate with the client to schedule the next strategy/approval meeting....</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 3</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 4</span>
                            </div>
                        </div>
                        `,
                    },

                    {
                        id: "proposal2",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18 ">Send Reminder Email</h6>
                                <span class="badge bg-soft-danger border-0 rounded-pill">Low</span>
                            </div>
                            <p class="text-muted">Send a polite reminder to the client regarding pending approvals, ...</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 2</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 2</span>
                            </div>   
                        </div>
                        `,
                    },

                    {
                        id: "proposal3",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18">Schedule Next Meeting</h6>
                                <span class="badge bg-soft-warning border-0 rounded-pill">Medium</span>
                            </div>
                            <p class="text-muted mb-2">Coordinate with the client to schedule the next strategy/approval meeting....</p>
                            <span class="badge bg-outline-secondary fw-medium fs-14"><i class="ri-calendar-schedule-line fs-6"></i> 21 - 31 January</span>
                            <hr class="mb-2 mt-4">
                            <div class="d-flex justify-content-between align-items-end">
                                <div class="avatar avatar-sm">
                                    <img src="images/avatars/avatar6.jpg" alt="client Img" class="w-100 h-100 rounded-circle">
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted"><i class="bi bi-chat-right-text"></i> 5</span>
                                    <span class="text-muted"><i class="bi bi-link-45deg"></i> 2</span>
                                </div>
                            </div>
                        </div>
                        `,
                    },
                ]
            },
            {
                id: "_negotiation",
                title: `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <h6 class="mb-0 fw-bold fs-18">Negotiation</h6>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn bg-transparent border-0 p-0" data-bs-toggle="modal" data-bs-target="#addNoteKanbanItemModal"><i class="bi bi-plus-circle-dotted"></i></button>
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
                        id: "negotiation1",
                        title: `
                        <div class="kanban-card mt-2">
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <h6 class="mb-2 fw-semibold fs-18 text-wrap">Contract Terms Negotiation</h6>
                                <span class="badge bg-soft-warning border-0 rounded-pill">Medium</span>
                            </div>
                            <p class="text-muted">Discussed key terms of the contract with the client, including pricing adjustments, delivery timelines, and service scope. Identified areas requiring internal approval...</p>
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <span class="text-muted"><i class="bi bi-chat-right-text"></i> 1</span>
                                <span class="text-muted"><i class="bi bi-link-45deg"></i> 2</span>
                            </div>   
                        </div>
                        `,
                    },
                ]
            },
        ]

    });

    // todo board bg color
    const todoBoard = document.querySelector('.kanban-board[data-id="_todo"]');
    todoBoard.classList.add('kanban-board-bg-primary');
    // contacted board bg color
    const contactBoard = document.querySelector('.kanban-board[data-id="_contacted"]');
    contactBoard.classList.add('kanban-board-bg-blue');
    // proposal board bg color
    const proposalBoard = document.querySelector('.kanban-board[data-id="_proposal"]');
    proposalBoard.classList.add('kanban-board-bg-info');
    // negotiation board bg color
    const negotiatBoard = document.querySelector('.kanban-board[data-id="_negotiation"]');
    negotiatBoard.classList.add('kanban-board-bg-orange');



    // Initialize Flatpickr for perticular date of notes
    const notesDatePicker = flatpickr("#notesDatePicker", {
        dateFormat: "D, d M Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

    // Initialize Flatpickr for date range for notes schedule
    const noteSchedulePicker = flatpickr(".noteSchedulePicker", {
        mode: "range",
        dateFormat: "d, F Y",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr, instance) {
            // You can add logic here to filter events based on selected date range
        }
    });

     initTooltips();
})