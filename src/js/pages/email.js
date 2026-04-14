let emails = [...emailsData];
let selectedEmails = [];
let activeTab = 'inbox';
let quillEditor = null;
let currentEmail = null;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    renderEmailList();
    initializeQuillEditor();
    setupEventListeners();
    setupModalResize('modalEmailDialog', 'maximizeBtn', 'minimizeBtn');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('emailsearch').addEventListener('input', function (e) {
        filterEmails(e.target.value);
    });

    // Select all checkbox
    document.getElementById('selectAll').addEventListener('change', function (e) {
        toggleSelectAll(e.target.checked);
    });

    // Compose form submit
    document.getElementById('composeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        handleComposeSend();
    });

    // Back arrow in email detail offcanvas
    document.addEventListener('click', function (e) {
        if (e.target.closest('.text-dark .ri-arrow-left-wide-line')) {
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('emailDetailOffcanvas'));
            if (offcanvas) {
                offcanvas.hide();
            }
        }
    });
}

// Initialize Quill Editor
function initializeQuillEditor() {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
    ];

    quillEditor = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Compose your email here...',
        modules: {
            toolbar: toolbarOptions
        }
    });
}

// Render Email List
function renderEmailList(filteredData = null) {
    const emailsToRender = filteredData || emails;
    const emailListContainer = document.getElementById('emailList');

    if (emailsToRender.length === 0) {
        emailListContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="ri-inbox-fill fs-1 text-muted"></i>
                <h5 class="mt-3">No emails found</h5>
                <p class="text-muted">Try adjusting your search or filter</p>
            </div>
        `;
        return;
    }

    const emailHTML = emailsToRender.map(email => {
        const avatar = avatarImages[email.id % avatarImages.length];
        const categoryColor = getCategoryColor(email.category);

        return `
            <div class="py-3 list-group-item bg-transparent ${email.unread ? 'unread' : ''}">
                <div class="email-item d-flex align-items-center">
                    <div class="d-flex gap-3 align-items-center me-3">
                        <input class="form-check-input email-checkbox" type="checkbox" 
                               data-id="${email.id}" ${selectedEmails.includes(email.id) ? 'checked' : ''}>
                        <div class="star-icon rounded-circle" onclick="toggleStar(${email.id})">
                            <i class="bi ${email.starred ? 'bi-star-fill text-warning' : 'bi-star text-muted opacity-50'}"></i>
                        </div>
                    </div>

                    <div class="d-flex flex-fill overflow-hidden" onclick="openEmailDetail(${email.id})">
                        <div class="d-flex align-items-center w-100">
                            <div class="position-relative me-3">
                                <img src="${avatar}" alt="${email.sender}" class="avatar-img-sm rounded-circle">
                                ${email.unread ? `
                                    <span class="position-absolute top-0 end-0 translate-middle p-1 bg-primary border border-2 border-white rounded-circle">
                                        <span class="visually-hidden">Unread</span>
                                    </span>
                                ` : ''}
                            </div>

                            <div class="d-flex flex-column flex-fill overflow-hidden">
                                <div class="d-flex flex-wrap align-items-center mb-2">
                                    <div class="d-flex flex-wrap gap-2 align-items-end">
                                        <h6 class="fw-semibold me-2 mb-0 text-truncate ${email.unread ? 'text-dark' : 'text-muted'}">
                                            ${email.sender}
                                        </h6>
                                        <span class="badge bg-soft-${categoryColor}">${email.category}</span>
                                    </div>
                                    <div class="ms-auto">
                                        <small class="text-muted text-nowrap">${email.time}</small>
                                        ${email.hasAttachment ? '<i class="ri-attachment-2 ms-2 text-muted"></i>' : ''}
                                    </div>
                                </div>

                                <div class="d-flex align-items-start email-text-content">
                                    <p class="mb-0 fs-14 email-text">
                                        <small class="text-dark fs-14">${email.subject}</small>
                                        <small class="text-muted fs-14 ms-2 d-none d-md-inline">- ${email.preview}</small>
                                    </p>
                                    <div class="email-action-icon d-flex align-items-center">
                                        <button type="button" class="btn btn-link btn-sm p-1 text-muted" title="Archive">
                                            <i class="ri-archive-line"></i>
                                        </button>
                                        <button type="button" class="btn btn-link btn-sm p-1 text-muted" 
                                                onclick="deleteEmail(event, ${email.id})" title="Delete">
                                            <i class="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    emailListContainer.innerHTML = emailHTML;
    updateEmailCount();

    // Add event listeners to checkboxes
    document.querySelectorAll('.email-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function (e) {
            e.stopPropagation();
            toggleEmailSelection(parseInt(this.dataset.id));
        });
    });
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        'Payment': 'success',
        'Social': 'info',
        'Client Meeting': 'blue',
        'Project Team Discussion': 'warning',
        'Work': 'danger',
    };
    return colors[category] || 'secondary';
}

// Toggle Star
function toggleStar(emailId) {
    const emailIndex = emails.findIndex(e => e.id === emailId);
    if (emailIndex !== -1) {
        emails[emailIndex].starred = !emails[emailIndex].starred;
        renderEmailList();
    }
}

// Toggle Email Selection
function toggleEmailSelection(emailId) {
    const index = selectedEmails.indexOf(emailId);
    if (index > -1) {
        selectedEmails.splice(index, 1);
    } else {
        selectedEmails.push(emailId);
    }
    updateEmailCount();
}

// Toggle Select All
function toggleSelectAll(checked) {
    if (checked) {
        selectedEmails = emails.map(e => e.id);
    } else {
        selectedEmails = [];
    }
    renderEmailList();
}

// Update Email Count
function updateEmailCount() {
    const countElement = document.getElementById('emailCount');
    if (selectedEmails.length > 0) {
        countElement.textContent = `${selectedEmails.length} selected`;
    } else {
        countElement.textContent = `${emails.length} mails`;
    }
}

// Filter Emails
function filterEmails(query) {
    if (!query) {
        renderEmailList();
        return;
    }

    const filtered = emails.filter(email =>
        email.sender.toLowerCase().includes(query.toLowerCase()) ||
        email.subject.toLowerCase().includes(query.toLowerCase()) ||
        email.preview.toLowerCase().includes(query.toLowerCase())
    );

    renderEmailList(filtered);
}

// Change Tab
function changeTab(tab) {
    activeTab = tab;
    renderSidebar();
    // Here you would filter emails based on the tab
    // For now, just re-render the list
    renderEmailList();
}

// Open Compose Modal
function openComposeModal() {
    const modal = new bootstrap.Modal(document.getElementById('composeModal'));
    modal.show();

    // Clear the editor
    if (quillEditor) {
        quillEditor.setText('');
    }
}

// Handle Compose Send
function handleComposeSend() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('composeModal'));

    // Get form values
    const recipient = document.querySelector('#composeForm input[type="email"]').value;
    const subject = document.querySelector('#composeForm input[type="text"]').value;
    const body = quillEditor.root.innerHTML;


    // Show success message
    alert('Email sent successfully!');

    // Close modal and reset form
    modal.hide();
    document.getElementById('composeForm').reset();
    quillEditor.setText('');
}

// Open Email Detail
function openEmailDetail(emailId) {
    currentEmail = emails.find(e => e.id === emailId);
    if (!currentEmail) return;

    // Mark as read
    currentEmail.unread = false;
    renderEmailList();

    const avatar = avatarImages[currentEmail.id % avatarImages.length];
    const categoryColor = getCategoryColor(currentEmail.category);

    // Update HTML template with email data
    document.getElementById('emailAvatar').src = avatar;
    document.getElementById('emailAvatar').alt = currentEmail.sender;
    document.getElementById('emailSender').textContent = currentEmail.sender;
    document.getElementById('emailId').textContent = currentEmail. emailid;
    document.getElementById('emailSenderFooter').textContent = currentEmail.sender;
    document.getElementById('emailTime').textContent = currentEmail.time;
    document.getElementById('emailDate').textContent = currentEmail.date;
    document.getElementById('emailSubject').textContent = currentEmail.subject;
    document.getElementById('emailPreview').textContent = currentEmail.preview;

    // Update category badge
    const categoryBadge = document.getElementById('emailCategory');
    categoryBadge.textContent = currentEmail.category;
    categoryBadge.className = `badge bg-soft-${categoryColor}`;

    // Update star button
    const starButton = document.getElementById('starButton');
    const starIcon = document.getElementById('starIcon');
    starButton.className = `btn btn-link p-0 ${currentEmail.starred ? 'text-warning' : 'text-muted'}`;
    starIcon.className = `fs-5 ${currentEmail.starred ? 'ri-star-fill' : 'ri-star-line'}`;
    starButton.onclick = () => toggleStar(currentEmail.id);

    // Show/hide attachments
    const attachmentCard = document.getElementById('attachmentCard');
    attachmentCard.style.display = currentEmail.hasAttachment ? 'block' : 'block';

    const offcanvas = new bootstrap.Offcanvas(document.getElementById('emailDetailOffcanvas'));
    offcanvas.show();
}

// Delete Email
function deleteEmail(event, emailId) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this email?')) {
        emails = emails.filter(e => e.id !== emailId);
        selectedEmails = selectedEmails.filter(id => id !== emailId);
        renderEmailList();
    }
}


// modal custom size
function setupModalResize(modalEmailDialog, maximizeBtn, minimizeBtn) {
    const modalDialog = document.getElementById(modalEmailDialog);
    const maximizeButton = document.getElementById(maximizeBtn);
    const minimizeButton = document.getElementById(minimizeBtn);
    const editor = document.getElementById('editor');

    if (!modalDialog || !maximizeButton || !minimizeButton) return;

    let modalState = 'normal';

    // Maximize → XL
    maximizeButton.addEventListener('click', () => {
        if (modalState === 'xl') {
            // From XL → normal
            modalDialog.classList.remove('modal-fullscreen');
            modalDialog.classList.add('modal-lg');
            modalState = 'normal';
            editor.style.height = "300px";
        } else if (modalState === 'normal') {
            // From normal → small
            modalDialog.classList.remove('modal-fullscreen', 'modal-lg');
            modalDialog.classList.add('modal-fullscreen');
            modalState = 'xl';
            editor.style.height = "625px";

        } else if (modalState === 'sm') {
            // From small → normal
            modalDialog.classList.remove('modal-fullscreen');
            modalDialog.classList.add('modal-lg');
            modalState = 'normal';
            editor.style.height = "300px";
        }
    });

    // Minimize → SM
    minimizeButton.addEventListener('click', function () {
        if (modalState === 'xl') {
            // From XL → normal
            modalDialog.classList.remove('modal-fullscreen', 'modal-lg');
            modalDialog.classList.add('modal-lg');
            modalState = 'normal';
            editor.style.height = "300px";
        } else if (modalState === 'normal') {
            // From normal → small
            modalDialog.classList.remove('modal-fullscreen', 'modal-lg');
            modalDialog.classList.add();
            modalState = 'sm';
            editor.style.height = "300px";
        } else if (modalState === 'sm') {
            // From small → normal
            modalDialog.classList.remove('modal-fullscreen', 'modal-lg');
            modalDialog.classList.add('modal-lg');
            modalState = 'normal';
            editor.style.height = "300px";
        }
    });
}

// file attach trigger
function triggerFileInput(type) {
    const input = document.getElementById('fileEmailInput');
    if (!input) return;

    input.accept = "*/*";
    input.click();
}


