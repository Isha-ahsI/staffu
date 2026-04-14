(function () {
    'use strict';

    // Sample chat data
    const conversations = [
        { id: 1, name: 'Priya Sharma', lastMessage: 'Hey, how are you doing?', time: '10:30 AM', unread: 2, avatar: 'avatar10.jpg', online: true, status: 'Hey there! I am using DurXen.' },
        { id: 2, name: 'Ethan', lastMessage: 'Meeting at 2 PM', time: '9:15 AM', unread: 0, avatar: 'avatar2.jpg', online: true },
        { id: 3, name: 'Team Backend', lastMessage: 'Mike: I\'ll be late today', time: 'Yesterday', unread: 5, avatar: 'avatar4.jpg', isGroup: true, members: 8 },
        { id: 4, name: 'Ollivia Joy', lastMessage: 'Thanks for the update!', time: 'Yesterday', unread: 0, avatar: 'avatar3.jpg', online: false },
        { id: 5, name: 'Marketing Team', lastMessage: 'New campaign draft ready for review', time: '7/25/23', unread: 0, avatar: 'avatar7.jpg', isGroup: true, online: true, members: 12 },
        { id: 6, name: 'Laura Taylor', lastMessage: 'See you tomorrow!', time: 'Yesterday', unread: 0, avatar: 'avatar5.jpg', online: false },
        { id: 7, name: 'Mark Lee', lastMessage: 'Great work today!', time: '2 days ago', unread: 3, avatar: 'avatar6.jpg', online: false },
        { id: 8, name: 'Sophia', lastMessage: 'Hello!', time: 'Today', unread: 0, avatar: 'avatar8.jpg', online: false },
        { id: 9, name: 'Daniel Miller', lastMessage: 'Hello!', time: 'Yesterday', unread: 0, avatar: 'avatar9.jpg', online: true },
        { id: 10, name: 'Kelvin', lastMessage: 'Thanks for the update!', time: 'Yesterday', unread: 0, avatar: 'avatar1.jpg', online: false }
    ];

    // Sample messages for the active chat
    let messages = [
        { id: 1, sender: 'them', text: 'Hey there!', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Hi! How are you?', time: '10:02 AM' },
        { id: 3, sender: 'me', text: 'Pretty good! Just working on some new features for our project.', time: '10:05 AM' },
        { id: 4, sender: 'them', text: 'That sounds interesting! What kind of features?', time: '10:07 AM' },
        { id: 5, sender: 'me', text: 'I\'m working on DurXen, a modern React admin dashboard template.', time: '10:09 AM' },
        { id: 6, sender: 'them', text: 'That sounds interesting! What kind of features?', time: '10:07 AM' },
        { id: 7, sender: 'me', text: 'I\'m working on DurXen, a modern React admin dashboard template.', time: '10:09 AM' },
        {
            id: 8,
            sender: 'me',
            text: 'Check out these photos!',
            time: '10:03 AM',
            attachments: [
                { id: 'att1', url: 'images/card_img/img1.jpg', type: 'image', name: 'img-1' },
                { id: 'att2', url: 'images/card_img/img2.jpg', type: 'image', name: 'img-2' },
                { id: 'att3', url: 'images/card_img/img3.jpg', type: 'image', name: 'img-3' },
                { id: 'att4', url: 'images/card_img/img4.jpg', type: 'image', name: 'img-4' },
                { id: 'att5', url: 'images/card_img/img5.jpg', type: 'image', name: 'img-5' },
                { id: 'att6', url: 'images/card_img/img6.jpg', type: 'image', name: 'img-6' },
            ]
        },
        { id: 9, sender: 'them', typing: true }
    ];


    // Sample groups data
    const sampleGroups = [
        { id: 'g1', name: 'Project Team', avatar1: 'avatar1.jpg', avatar2: 'avatar2.jpg', lastMessage: 'Meeting at 3 PM', time: '2h', members: 8, isMuted: false },
        { id: 'g2', name: 'Design Squad', avatar1: 'avatar8.jpg', avatar2: 'avatar3.jpg', lastMessage: 'Check the new mockups', time: '1d', members: 5, isMuted: true },
        { id: 'g3', name: 'Company Announcements', avatar1: 'avatar5.jpg', avatar2: 'avatar4.jpg', lastMessage: 'Holiday schedule updated', time: '2d', members: 42, isMuted: false }
    ];

    // Sample calls data
    const sampleCalls = [
        { id: 'c1', name: 'Ollivia Joy', avatar1: 'avatar5.jpg', time: '5:00', way: 'outgoing', status: 'missed', type: 'voicecall', no: '2', date: 'Today' },
        { id: 'c2', name: 'Kelvin', avatar1: 'avatar1.jpg', time: '2:25', way: 'incoming', status: 'answered', type: 'voicecall', date: 'Yesterday' },
        { id: 'c3', name: 'Project Team', avatar1: 'avatar4.jpg', time: '5:30', way: 'group', status: 'answered', type: 'videocall', date: '21 Jan,2026', avatar2: 'avatar6.jpg' }
    ];

    // Forward contacts
    const forwardContacts = [
        { id: 1, name: 'John Doe', avatar: 'avatar2.jpg', online: true },
        { id: 2, name: 'Sarah Smith', avatar: 'avatar5.jpg', online: true },
        { id: 3, name: 'Alex Johnson', avatar: 'avatar6.jpg', online: false },
        { id: 4, name: 'Alex Johnson', avatar: 'avatar7.jpg', online: false },
    ];

    // State variables
    let activeChat = 1;
    let searchTerm = '';
    let replyTo = null;
    let attachments = [];
    let selectedContacts = [];
    let callDuration = 0;
    let callInterval = null;
    let isMuted = false;
    let isSpeakerOn = true;
    let isVideoOn = true;
    let isCallMinimized = false;

    // Initialize - FIXED: Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChat);
    } else {
        // DOM is already loaded
        initializeChat();
    }

    function initializeChat() {
        setTimeout(() => {
            renderChatList();
            renderGroupsList();
            renderCallsList();
            renderMessages();
            setupEventListeners();
            setupEmojiPicker();
            updateChatHeader();
            initializeFancybox();
        }, 100)
    }

    document.querySelectorAll('#chat-sidebar-offcanvas .nav-link').forEach(function (el) {
        let target = el.getAttribute('data-bs-target');
        let newTarget = target + '-mobile';

        el.setAttribute('data-bs-target', newTarget);

        let pane = document.querySelector('#chat-sidebar-offcanvas ' + target);
        if (pane) {
            pane.setAttribute('id', target.replace('#', '') + '-mobile');
        }
    });

    function setupEventListeners() {
        // Search functionality
        const searchInputs = document.querySelectorAll('.chatSearch');
        searchInputs.forEach(searchInput => {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                renderChatList();
            });
        });

        // Message form
        const form = document.getElementById('messageForm');
        if (form) {
            form.addEventListener('submit', handleSendMessage);
        }

        // File input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileSelect);
        }

        // Attach buttons
        document.querySelectorAll('[data-attach-type]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                triggerFileInput(this.dataset.attachType);
            });
        });

        // Forward modal
        const forwardBtn = document.getElementById('forwardBtn');
        if (forwardBtn) {
            forwardBtn.addEventListener('click', handleForward);
        }

        // Call controls
        setupCallControls();
    }

    function setupCallControls() {
        // Voice call controls will be set up dynamically when modals are shown
    }

    function renderChatList() {
        const chatLists = document.querySelectorAll('.chatList');

        if (chatLists.length === 0) {
            return;
        }

        const filtered = conversations.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
        );


        const html = filtered.map(chat => createChatListItem(chat)).join('');

        // Render to all chat list instances
        chatLists.forEach(chatList => {
            chatList.innerHTML = html;

            // FIXED: Add click listeners with proper event handling
            const items = chatList.querySelectorAll('.chat-list-item');

            items.forEach(item => {
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const chatId = parseInt(this.dataset.chatId);

                    activeChat = chatId;
                    renderChatList();
                    renderMessages();
                    updateChatHeader();

                    // Close offcanvas if open
                    const offcanvasElement = document.getElementById('chat-sidebar-offcanvas');
                    if (offcanvasElement) {
                        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (bsOffcanvas) {
                            bsOffcanvas.hide();
                        }
                    }
                });
            });
        });
    }
    function createChatListItem(chat) {
        const isActive = activeChat === chat.id;
        const typingIds = [2, 5];
        const isTyping = typingIds.includes(chat.id);

        return `
            <div class="chat-list-item ${isActive ? 'active-chat bg-primary bg-opacity-10 border-0 border-start border-4 border-primary shadow-sm rounded-end-3' : 'chat-items-bg rounded-3'} position-relative overflow-hidden list-group-item border-0 mb-2" 
                 data-chat-id="${chat.id}" style="cursor: pointer;">
                <div class="d-flex align-items-start py-2">
                    <div class="position-relative me-3">
                        <div class="avatar-wrapper">
                            <img class="avatar-md rounded-circle" src="images/avatars/${chat.avatar}" alt="${chat.name}">
                             ${chat.unread > 0 ? `<span class="position-absolute top-100 start-100 translate-middle bg-success text-white rounded-circle z-2 incoming-message d-flex align-items-center justify-content-center border border-white border-3 shadow-lg">${chat.unread}</span>` : ''}
                        </div>
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h6 class="mb-0 text-truncate fw-medium fs-18 ${isActive ? 'text-primary' : 'text-dark'}">${chat.name}</h6>
                            <div class="d-flex align-items-center">
                                <small class="${chat.unread > 0 ? 'text-primary fw-bold' : 'text-muted'} text-nowrap">${chat.time}</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                ${isTyping ? `
                                    <div class="typing-indicator d-flex align-items-center gap-1 mb-1">
                                        <small class="text-primary typing-text fw-medium">typing</small>
                                        <div class="dots-wrapper">
                                            <div class="typing-dot"></div>
                                            <div class="typing-dot"></div>
                                            <div class="typing-dot"></div> 
                                            <div class="typing-shadow"></div>
                                            <div class="typing-shadow"></div>
                                            <div class="typing-shadow"></div> 
                                        </div>
                                    </div>
                                ` : `
                                    <p class="mb-0 fs-15 text-muted text-truncate">${chat.lastMessage.length > 25 ? chat.lastMessage.substring(0, 25) + '...' : chat.lastMessage}</p>
                                `}
                            </div>
                            <i class="ri-check-double-fill ${chat.unread > 0 ? 'text-success' : 'text-muted'} fs-6"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderGroupsList() {
        const groupsLists = document.querySelectorAll('.groupsList');
        if (groupsLists.length === 0) return;

        const html = sampleGroups.map(group => `
            <div class="border-0 rounded-3 p-3 mb-2 chat-items-bg list-group-item">
                <div class="d-flex align-items-start">
                    <div class="avatar-group group-profile position-relative">
                        <img class="avatar avatar-sm border border-2 border-white shadow-sm rounded-circle group-avatar1" src="images/avatars/${group.avatar1}">
                        <img class="avatar avatar-sm border border-2 border-white shadow-sm rounded-circle group-avatar2" src="images/avatars/${group.avatar2}">
                    </div>
                    <div class="flex-grow-1 overflow-hidden ms-4">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h6 class="mb-0 text-truncate fw-medium fs-18">${group.name}</h6>
                            <div class="d-flex align-items-center">
                                <span><i class="ri-group-line text-dark me-1"></i></span>
                                <small class="text-dark">${group.members}</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-0 text-muted text-truncate">${group.lastMessage}</p>
                             <small class="text-muted">${group.time}</small>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        groupsLists.forEach(groupsList => {
            groupsList.innerHTML = html;
        });
    }

    function renderCallsList() {
        const callsLists = document.querySelectorAll('.callsList');
        if (callsLists.length === 0) return;

        const html = sampleCalls.map(call => `
            <div class="border-0 rounded-3 p-3 mb-2 chat-items-bg list-group-item">
                <div class="d-flex align-items-start gap-3">
                    <div class="avatar-group group-profile position-relative">
                        <img class="avatar-md rounded-circle group-avatar1" src="images/avatars/${call.avatar1}">
                        ${call.way === 'group' ? `<img class="avatar avatar-sm border border-2 border-white shadow-sm rounded-circle group-avatar2" src="images/avatars/${call.avatar2}">` : ''}
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0 text-truncate fw-medium fs-18">${call.name} ${call.status === 'missed' ? `<span class="text-danger">(${call.no})</span>` : ''}</h6>
                                <div class="d-flex align-items-start gap-1">
                                    <span class="${call.status === 'missed' ? 'text-danger' : 'text-success'}"><i class="${call.way === 'incoming' ? 'ri-arrow-left-down-long-line' : 'ri-arrow-right-up-long-line'}"></i></span>
                                    <small>${call.date} , ${call.time}</small>
                                </div>
                            </div>
                            <div class="avatar avatar-md ${call.status === 'missed' ? 'text-danger bg-danger' : 'text-success bg-success'}  bg-opacity-10 rounded-circle">
                                ${call.type === 'voicecall' ? '<i class="bi bi-telephone"></i>' : '<i class="bi bi-camera-video"></i>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        callsLists.forEach(callsList => {
            callsList.innerHTML = html;
        });
    }

    function updateChatHeader() {
        const activeChatData = conversations.find(c => c.id === activeChat);
        if (!activeChatData) return;

        // Desktop header
        const desktopHeader = document.getElementById('chatHeaderDesktop');
        if (desktopHeader) {
            desktopHeader.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="position-relative me-3">
                        <img class="avatar-lg rounded-circle ${activeChatData.online ? 'avatar-border-primary' : 'avatar-border-secondary'}" src="images/avatars/${activeChatData.avatar}" alt="${activeChatData.name}">
                        ${activeChatData.online ? '<span class="position-absolute isOnline bottom-0 end-0 bg-success rounded-circle border border-white"></span>' : ''}
                    </div>
                    <div>
                        <h6 class="mb-0 text-dark">${activeChatData.name}</h6>
                        <small class="text-muted">${activeChatData.online ? 'Active now' : 'Last seen recently'}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center text-dark gap-4">
                    <div class="d-flex align-items-center gap-3">
                        <button type="button" class="avatar avatar-md p-0  btn bg-soft-primary text-primary rounded-pill" onclick="chatApp.showVoiceCall()"><i class="ri-phone-line fw-medium"></i></button>
                        <button type="button" class="avatar avatar-md p-0  btn bg-soft-primary text-primary rounded-pill" onclick="chatApp.showVideoCall()"><i class="ri-video-on-line fw-medium"></i></button>
                    </div>
                    <div class="dropdown">
                        <button type="button" class="btn border-0 dropdown-toggle card-drop-icon" data-bs-toggle="dropdown" aria-expanded="false" id="chatDrop"><i class="bi bi-three-dots-vertical fw-bold fs-5"></i></button>
                        <div aria-labelledby="dropdown" class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">New group</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">View contact</a></li>
                            <li><a class="dropdown-item" href="#">Search</a></li>
                            <li><a class="dropdown-item" href="#">Media,Links, and Docs</a></li>
                            <li><a class="dropdown-item" href="#">Mute notifications</a></li>
                            <li><a class="dropdown-item" href="#">Disappearing messages</a></li>
                            <li><a class="dropdown-item" href="#">Chat Theme</a></li>
                        </div>
                    </div>
                </div>
            `;
        }


        // Mobile header
        const mobileHeader = document.getElementById('chatHeaderMobile');
        if (mobileHeader) {
            mobileHeader.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <button type="button" class="d-lg-none me-3 avatar avatar-md p-0 border-0 btn bg-soft-secondary text-dark rounded-circle"
                    data-bs-toggle="offcanvas" data-bs-target="#chat-sidebar-offcanvas" aria-controls="chat-sidebar-offcanvas" aria-label="Open chat sidebar">
                    <i class="ri-menu-line fs-5"></i>
                </button>

                <div class="d-flex align-items-center">
                    <div class="position-relative me-2">
                        <img width="36" height="36" class="border rounded-circle" src="images/avatars/${activeChatData.avatar}" alt="${activeChatData.name}">
                        ${activeChatData.online ? '<span class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"></span>' : ''}
                    </div>
                    <div>
                        <h6 class="mb-0 text-dark">${activeChatData.name}</h6>
                        <small class="text-muted">${activeChatData.online ? 'Active now' : 'Last seen recently'}</small>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center gap-4">
                <div class="d-flex align-items-center gap-3">
                    <button type="button" class="avatar avatar-md p-0  btn bg-soft-primary text-primary rounded-pill d-sm-block d-none" onclick="chatApp.showVoiceCall()"><i class="ri-phone-line fw-medium"></i></button>
                    <button type="button" class="avatar avatar-md p-0  btn bg-soft-primary text-primary rounded-pill d-sm-block d-none" onclick="chatApp.showVideoCall()"><i class="ri-video-on-line fw-medium"></i></button>
                </div>
                <div class="dropdown">
                    <button type="button" class="btn border-0 dropdown-toggle card-drop-icon" data-bs-toggle="dropdown" aria-expanded="false" id="chatDrop"><i class="bi bi-three-dots-vertical fw-bold fs-5"></i></button>
                    <div aria-labelledby="dropdown" class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">New group</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">View contact</a></li>
                        <li><a class="dropdown-item" href="#">Search</a></li>
                        <li><a class="dropdown-item" href="#">Media,Links, and Docs</a></li>
                        <li><a class="dropdown-item" href="#">Mute notifications</a></li>
                        <li><a class="dropdown-item" href="#">Disappearing messages</a></li>
                        <li><a class="dropdown-item" href="#">Chat Theme</a></li>
                    </div>
                </div>
            </div>
                
            `;
        }
    }

    function renderMessages() {
        const container = document.getElementById('messagesContainer');
        if (!container) {
            return;
        }

        const activeChatData = conversations.find(c => c.id === activeChat);
        if (!activeChatData) {
            return;
        }

        container.innerHTML = messages.map(msg => {
            const isMe = msg.sender === 'me';
            const replyMsg = msg.replyTo ? messages.find(m => m.id === msg.replyTo) : null;

            return `
                <div class="d-flex mb-3 align-items-start ${isMe ? 'justify-content-end' : 'justify-content-start'}">
                    ${!isMe ? `
                        <div class="me-2">
                            <img class="shadow-sm isYou custom-avatar avatar avatar-sm" src="images/avatars/${activeChatData.avatar}">
                        </div>
                    ` : ''}
                    
                    <div class="d-flex w-80 flex-wrap ${isMe ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-1">
                        <div class="d-flex flex-column">
                            <h6 class="${isMe ? "text-end" : "text-start"}">${isMe ? 'You' : activeChatData.name}</h6>
                            <div class="d-flex align-items-center gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}">
                                <div class="d-flex flex-column">
                                    <div class="fs-14 ${isMe ? 'bg-primary text-white msg-bg-me' : 'text-dark msg-bg-you'}">
                                        ${msg.replyTo && replyMsg ? `
                                            <div class="small mb-2 p-2 rounded-3 ${isMe ? 'bg-white bg-opacity-25' : 'bg-secondary bg-opacity-10'}">
                                                <div class="fw-semibold">Replying to ${isMe ? 'You' : activeChatData.name}</div>
                                                <div class="text-truncate small">${replyMsg.text || 'Message not found'}</div>
                                            </div>
                                        ` : ''}
                                        
                                        ${msg.text ? `<p class="mb-0">${msg.text}</p>` : ''}
                                        
                                        ${msg.attachments ? renderAttachments(msg.attachments, activeChat) : ''}
                                        
                                        ${msg.typing ? `
                                            <div class="typing-indicator d-flex align-items-center gap-1">
                                                <small class="text-primary typing-text fw-medium">typing</small>
                                                <div class="dots-wrapper">
                                                    <div class="typing-dot"></div>
                                                    <div class="typing-dot"></div>
                                                    <div class="typing-dot"></div>  
                                                    <div class="typing-shadow"></div>
                                                    <div class="typing-shadow"></div>
                                                    <div class="typing-shadow"></div>
                                                </div>
                                            </div>
                                        ` : ''} 
                                        <div class="d-flex justify-content-end align-items-center ${isMe ? 'mt-2' : 'mt-0'} ">
                                            ${isMe ? '<i class="ri-check-double-line text-white small"></i>' : ''}
                                        </div>
                                    </div>
                                </div>
                                ${!msg.typing ? `
                                    <div>
                                        <div class="dropdown message-actions">
                                            <button class="btn btn-link text-muted p-0 border-0 shadow-none dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                <i class="ri-more-2-fill"></i>
                                            </button>
                                            <ul class="dropdown-menu ${isMe ? 'dropdown-menu-end' : ''}">
                                                <li><a class="dropdown-item" href="#" onclick="chatApp.copyMessage('${msg.text?.replace(/'/g, "\\'")}'); return false;"><i class="ri-file-copy-line me-2"></i> Copy</a></li>
                                                <li><a class="dropdown-item" href="#" onclick="chatApp.replyToMessage(${msg.id}); return false;"><i class="ri-reply-line me-2"></i> Reply</a></li>
                                                <li><a class="dropdown-item" href="#" onclick="chatApp.forwardMessage(${msg.id}); return false;"><i class="ri-share-forward-line me-2"></i> Forward</a></li>
                                                <li><hr class="dropdown-divider"></li>
                                                <li><a class="dropdown-item text-danger" href="#" onclick="chatApp.deleteMessage(${msg.id}); return false;"><i class="ri-delete-bin-line me-2"></i> Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            <small class="text-muted mt-1 ${isMe ? 'text-start ms-4' : ' text-end me-4'}">${msg.time || ''}</small>
                        </div>   
                    </div>
                    
                    ${isMe ? `
                        <div class="ms-2">
                            <img class="shadow-sm isMe custom-avatar-left avatar avatar-sm" src="images/avatars/avatar1.jpg">
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        scrollToBottom();
        initializeFancybox();
    }

    function renderAttachments(attachments, chatId) {
        if (!attachments || attachments.length === 0) return '';

        return `
            <div class="mt-2 d-flex flex-wrap gap-2">
                ${attachments.slice(0, 3).map((att, idx) => `
                    <div class="mb-2">
                        <div class="position-relative">
                            <a href="${att.url}" data-fancybox="chat-gallery-${chatId}" data-caption="${att.name}" data-thumb="${att.url}">
                                <img alt="Chat attachment ${idx + 1}" loading="lazy" class="img-thumbnail chat-input-img cursor-pointer hover-zoom border-0" src="${att.url}">
                            </a>
                            ${idx === 2 && attachments.length > 3 ? `
                                <a href="${att.url}" class="overlay-more cursor-pointer" data-fancybox="chat-gallery-${chatId}" data-caption="Image ${idx + 1} of ${attachments.length}">
                                    +${attachments.length - 3}
                                </a>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
                ${attachments.slice(3).map(att => `
                    <a href="${att.url}" data-fancybox="chat-gallery-${chatId}" data-caption="${att.name}" data-thumb="${att.url}" style="display: none;">
                        <span class="sr-only">${att.name}</span>
                    </a>
                `).join('')}
            </div>
        `;
    }

    function scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        if (container) {
            setTimeout(() => container.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
        }
    }

    function initializeFancybox() {
        if (typeof Fancybox !== 'undefined') {
            Fancybox.bind('[data-fancybox]', {
                Toolbar: { display: { right: ["slideshow", "fullscreen", "download", "thumbs", "close"] } },
                Thumbs: { autoStart: true }
            });
        }
    }


    function handleSendMessage(e) {
        e.preventDefault();

        const input = document.getElementById('messageInput');
        const message = input ? input.value.trim() : '';

        if (message === '' && attachments.length === 0) return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'me',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            replyTo: replyTo ? replyTo.id : null,
            attachments: attachments.length > 0 ? [...attachments] : null
        };

        messages.push(newMsg);

        if (input) input.value = '';
        attachments = [];
        replyTo = null;

        renderMessages();
        const attachPreview = document.getElementById('attachmentPreview');
        const replyPreview = document.getElementById('replyPreview');
        if (attachPreview) attachPreview.innerHTML = '';
        if (replyPreview) replyPreview.innerHTML = '';
    }

    function handleFileSelect(e) {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                attachments.push({
                    id: Date.now() + Math.random(),
                    url: event.target.result,
                    type: file.type.startsWith('image/') ? 'image' : 'document',
                    name: file.name,
                    size: file.size
                });
                renderAttachmentPreview();
            };
            reader.readAsDataURL(file);
        });
    }

    function renderAttachmentPreview() {
        const preview = document.getElementById('attachmentPreview');
        if (!preview || attachments.length === 0) return;

        preview.innerHTML = `
            <div class="d-flex flex-wrap gap-2 mb-2">
                ${attachments.map(att => `
                    <div class="position-relative border rounded p-2 msg-type">
                        ${att.type === 'image' ? `
                            <img src="${att.url}" class="chat-input-img rounded">
                        ` : `
                            <div class="d-flex align-items-center p-2">
                                <i class="ri-file-line fs-3 me-2"></i>
                                <div>
                                    <div class="small text-truncate" style="max-width: 150px;">${att.name}</div>
                                    <div class="text-muted small">${(att.size / 1024).toFixed(1)} KB</div>
                                </div>
                            </div>
                        `}
                        <button type="button" class="btn btn-danger position-absolute top-0 end-0 avatar-xxxs p-0" onclick="chatApp.removeAttachment('${att.id}')">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function triggerFileInput(type) {
        const input = document.getElementById('fileInput');
        if (!input) return;

        input.accept = type === 'image' ? 'image/*' : type === 'documents' ? '.pdf,.doc,.docx,.txt' : '*';
        input.click();
    }

    function setupEmojiPicker() {
        const picker = document.querySelector("#emojiPicker");
        const input = document.querySelector("#messageInput");

        if (picker && input) {
            picker.addEventListener("emoji-click", (event) => {
                const emoji = event.detail.unicode;
                input.value += emoji;
            });
        }
    }

    function renderForwardContacts() {
        const contactsList = document.getElementById('forwardContactsList');
        if (!contactsList) return;

        contactsList.innerHTML = forwardContacts.map(contact => `
            <div class="list-group-item border-0 rounded mb-1 p-2 ${selectedContacts.some(c => c.id === contact.id) ? 'bg-primary bg-opacity-10' : 'bg-secondary bg-opacity-10'}" 
                 data-contact-id="${contact.id}" style="cursor: pointer;">
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input class="form-check-input border-primary" type="checkbox" id="contact-${contact.id}" 
                               ${selectedContacts.some(c => c.id === contact.id) ? 'checked' : ''}>
                    </div>
                    <div class="position-relative me-3">
                        <img src="images/avatars/${contact.avatar}" class="avatar avatar-md shadow-sm rounded-circle">
                        ${contact.online ? '<span class="position-absolute bottom-0 isOnline end-0 bg-success rounded-circle border border-white"></span>' : ''}
                    </div>
                    <div>
                        <h6 class="mb-0">${contact.name}</h6>
                        <small class="${contact.online ? 'text-success' : 'text-muted'}">
                            <i class="${contact.online ? 'ri-record-circle-fill me-1' : 'ri-time-line me-1'}"></i>
                            ${contact.online ? 'Online' : 'Offline'}
                        </small>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click listeners for contact selection
        contactsList.querySelectorAll('.list-group-item').forEach(item => {
            item.addEventListener('click', function () {
                const contactId = parseInt(this.dataset.contactId);
                toggleContactSelect(contactId);
            });
        });
    }

    function toggleContactSelect(contactId) {
        const contact = forwardContacts.find(c => c.id === contactId);
        if (!contact) return;

        if (selectedContacts.some(c => c.id === contactId)) {
            selectedContacts = selectedContacts.filter(c => c.id !== contactId);
        } else {
            selectedContacts.push(contact);
        }

        renderForwardContacts();
        updateSelectedCount();
    }

    function updateSelectedCount() {
        const selectedCount = document.getElementById('selectedCount');
        const forwardBtn = document.getElementById('forwardBtn');

        if (selectedCount) {
            selectedCount.textContent = selectedContacts.length > 0
                ? `${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''} selected`
                : 'No contacts selected';
        }

        if (forwardBtn) {
            forwardBtn.disabled = selectedContacts.length === 0;
        }
    }

    function handleForward() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('forwardModal'));
        if (modal) modal.hide();
        selectedContacts = [];
        updateSelectedCount();
    }

    function startCallTimer() {
        callDuration = 0;
        callInterval = setInterval(() => {
            callDuration++;
            const hours = Math.floor(callDuration / 3600);
            const minutes = Math.floor((callDuration % 3600) / 60);
            const seconds = callDuration % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Update both voice and video call duration displays
            const voiceDurationElement = document.querySelector('#voiceCallModal .call-duration');
            const videoDurationElement = document.querySelector('#videoCallModal .badge:has(.ri-record-circle-fill)');

            if (voiceDurationElement) {
                voiceDurationElement.textContent = timeString;
            }
            if (videoDurationElement) {
                videoDurationElement.innerHTML = `<i class="ri-record-circle-fill me-1 text-danger"></i> ${timeString}`;
            }

            // Update minimized call bar duration
            updateMinimizedCallDuration();
        }, 1000);
    }

    function stopCallTimer() {
        if (callInterval) {
            clearInterval(callInterval);
            callInterval = null;
        }
        callDuration = 0;
    }

    function setupVoiceCallControls() {
        // Mute button
        const muteBtn = document.querySelector('#voiceCallModal .btn:has(.ri-mic-line), #voiceCallModal .btn:has(.ri-mic-off-line)');
        if (muteBtn) {
            muteBtn.addEventListener('click', function () {
                isMuted = !isMuted;
                this.innerHTML = `<i class="ri-${isMuted ? 'mic-off' : 'mic'}-line fs-4 fw-medium"></i>`;
                this.className = `avatar avatar-xl p-0 rounded-circle btn ${isMuted ? 'btn-danger' : 'btn-outline-primary'}`;

                // Update volume visualization
                updateVolumeVisualization();
            });
        }

        // Speaker button
        const speakerBtn = document.querySelector('#voiceCallModal .btn:has(.ri-volume-up-line), #voiceCallModal .btn:has(.ri-volume-mute-line)');
        if (speakerBtn) {
            speakerBtn.addEventListener('click', function () {
                isSpeakerOn = !isSpeakerOn;
                this.innerHTML = `<i class="ri-volume-${isSpeakerOn ? 'up' : 'mute'}-line fs-4 fw-medium"></i>`;
                this.className = `avatar avatar-xl p-0 rounded-circle btn ${isSpeakerOn ? 'btn-primary' : 'btn-outline-primary'}`;
            });
        }

        // Minimize button
        const minimizeBtn = document.querySelector('#voiceCallModal .btn:has(.ri-subtract-line)');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', function () {
                toggleMinimizeCall();
            });
        }

        // End call button
        const endCallBtn = document.querySelector('#voiceCallModal .btn-danger');
        if (endCallBtn) {
            endCallBtn.addEventListener('click', function () {
                const modal = bootstrap.Modal.getInstance(document.getElementById('voiceCallModal'));
                if (modal) modal.hide();
            });
        }
    }


    function setupVideoCallControls() {
        // Mute button
        const muteBtn = document.querySelector('#videoCallModal button[aria-label="Mute"]');
        if (muteBtn) {
            muteBtn.addEventListener('click', function () {
                isMuted = !isMuted;
                this.innerHTML = `<i class="ri-${isMuted ? 'mic-off' : 'mic'}-line fs-4 fw-medium"></i>`;
                this.className = `d-flex flex-column align-items-center justify-content-center btn ${isMuted ? 'btn-danger' : 'bg-light bg-opacity-50 text-dark'} avatar avatar-xl p-0 rounded-circle`;
                this.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
                this.setAttribute('title', isMuted ? 'Unmute' : 'Mute');
            });
        }

        // Video button
        const videoBtn = document.querySelector('#videoCallModal button[aria-label="Turn off video"]');
        if (videoBtn) {
            videoBtn.addEventListener('click', function () {
                isVideoOn = !isVideoOn;
                this.innerHTML = `<i class="ri-camera${isVideoOn ? '' : '-off'}-line fs-4 fw-medium"></i>`;
                this.className = `d-flex flex-column align-items-center justify-content-center btn ${isVideoOn ? 'bg-light bg-opacity-50 text-dark' : 'btn-danger'} avatar avatar-xl p-0 rounded-circle`;
                this.setAttribute('aria-label', isVideoOn ? 'Turn off video' : 'Turn on video');
                this.setAttribute('title', isVideoOn ? 'Turn off video' : 'Turn on video');

                // Update self view
                updateSelfView();
            });
        }

        // Speaker button
        const speakerBtn = document.querySelector('#videoCallModal button[aria-label="Speaker on"]');
        if (speakerBtn) {
            speakerBtn.addEventListener('click', function () {
                isSpeakerOn = !isSpeakerOn;
                this.innerHTML = `<i class="ri-volume-${isSpeakerOn ? 'up' : 'mute'}-line fs-4 fw-medium"></i>`;
                this.className = `d-flex flex-column align-items-center justify-content-center btn ${isSpeakerOn ? 'bg-light bg-opacity-50 text-dark' : 'btn-outline-danger'} avatar avatar-xl p-0 rounded-circle`;
                this.setAttribute('aria-label', isSpeakerOn ? 'Speaker on' : 'Speaker off');
                this.setAttribute('title', isSpeakerOn ? 'Speaker on' : 'Speaker off');
            });
        }

        // End call button
        const endCallBtn = document.querySelector('#videoCallModal button[aria-label="End Call"]');
        if (endCallBtn) {
            endCallBtn.addEventListener('click', function () {
                const modal = bootstrap.Modal.getInstance(document.getElementById('videoCallModal'));
                if (modal) modal.hide();
            });
        }
    }

    let volumeInterval = null;

    function startVolumeVisualization() {
        const volumeBars = document.querySelectorAll('#voiceCallModal .bar.bg-primary');

        volumeInterval = setInterval(() => {
            volumeBars.forEach(bar => {
                if (isMuted) {
                    bar.className = 'bar bg-danger';
                    bar.style.height = '5px';
                    bar.style.opacity = '0.7';
                } else {
                    bar.className = 'bar bg-primary';
                    bar.style.height = `${Math.random() * 20 + 5}px`;
                    bar.style.opacity = '1';
                }
            });
        }, 300);
    }

    function updateVolumeVisualization() {
        const volumeBars = document.querySelectorAll('#voiceCallModal .bar.bg-primary, #voiceCallModal .bar.bg-danger');

        volumeBars.forEach(bar => {
            if (isMuted) {
                bar.className = 'bar bg-danger';
                bar.style.height = '5px';
                bar.style.opacity = '0.7';
            } else {
                bar.className = 'bar bg-primary';
                bar.style.opacity = '1';
            }
        });
    }

    function updateSelfView() {
        const selfView = document.querySelector('#videoCallModal .position-absolute.end-0');
        if (!selfView) return;

        if (!isVideoOn) {
            // Add camera off overlay if it doesn't exist
            let overlay = selfView.querySelector('.camera-off-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'camera-off-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-70';
                overlay.innerHTML = `
                    <div class="bg-dark rounded-circle d-flex align-items-center justify-content-center mb-2" style="width: 40px; height: 40px;">
                        <i class="ri-camera-off-line text-white-50"></i>
                    </div>
                    <small class="text-white">Camera off</small>
                `;
                selfView.appendChild(overlay);
            }
        } else {
            // Remove camera off overlay
            const overlay = selfView.querySelector('.camera-off-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    }

    function toggleMinimizeCall() {
        isCallMinimized = !isCallMinimized;
        const modal = document.getElementById('voiceCallModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);

        if (isCallMinimized) {
            // Remove focus from any focused element in the modal
            const focusedElement = modal.querySelector(':focus');
            if (focusedElement) {
                focusedElement.blur();
            }

            // Hide the modal
            if (modalInstance) {
                modalInstance.hide();
            }
            // Show minimized call bar
            showMinimizedCallBar();
        } else {
            // Show the modal
            if (modalInstance) {
                modalInstance.show();
            }
            // Hide minimized call bar
            hideMinimizedCallBar();
        }
    }

    function showMinimizedCallBar() {
        const activeChatData = conversations.find(c => c.id === activeChat);

        // Remove existing minimized bar if any
        hideMinimizedCallBar();

        // Create minimized call bar
        const minimizedBar = document.createElement('div');
        minimizedBar.id = 'minimizedCallBar';
        minimizedBar.className = 'position-fixed bottom-0 end-0 m-3 rounded-3 shadow-lg overflow-hidden';
        minimizedBar.style.zIndex = '1055';
        minimizedBar.style.width = '300px';

        minimizedBar.innerHTML = `
            <div class="d-flex align-items-center p-3 bg-primary">
                <img src="images/avatars/${activeChatData.avatar}" class="rounded-circle border border-2 border-primary me-3" width="40" height="40">
                <div class="flex-grow-1">
                    <div class="text-truncate fw-medium text-light">${activeChatData.name}</div>
                    <div class="small text-light">
                        <span class="minimized-call-duration">00:00</span>
                    </div>
                </div>
                <button type="button" class="btn btn-link text-light p-0" onclick="chatApp.toggleMinimizeCall()">
                    <i class="ri-arrow-up-s-line fs-4"></i>
                </button>
            </div>
        `;

        document.body.appendChild(minimizedBar);

        // Update duration in minimized bar
        updateMinimizedCallDuration();
    }

    function hideMinimizedCallBar() {
        const minimizedBar = document.getElementById('minimizedCallBar');
        if (minimizedBar) {
            minimizedBar.remove();
        }
    }

    function updateMinimizedCallDuration() {
        const durationElement = document.querySelector('.minimized-call-duration');
        if (durationElement && isCallMinimized) {
            const minutes = Math.floor(callDuration / 60);
            const seconds = callDuration % 60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            durationElement.textContent = timeString;
        }
    }


    // Public API
    window.chatApp = {
        copyMessage: (text) => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
            }
        },

        deleteMessage: (id) => {
            messages = messages.filter(m => m.id !== id);
            renderMessages();
        },

        forwardMessage: (messageId) => {
            renderForwardContacts();
            updateSelectedCount();
            const modal = new bootstrap.Modal(document.getElementById('forwardModal'));
            modal.show();
        },

        replyToMessage: (id) => {
            replyTo = messages.find(m => m.id === id);
            if (!replyTo) return;

            const activeChatData = conversations.find(c => c.id === activeChat);
            const preview = document.getElementById('replyPreview');

            if (preview) {
                preview.innerHTML = `
                    <div class="bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <small class="text-muted me-2">Replying to: ${replyTo.sender === 'me' ? 'You' : activeChatData.name}</small>
                            <div class="text-truncate">${replyTo.text}</div>
                        </div>
                        <button type="button" class="text-muted p-0 btn btn-link btn-sm" onclick="chatApp.cancelReply()">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                `;
            }
            document.getElementById('messageInput')?.focus();
        },

        cancelReply: () => {
            replyTo = null;
            document.getElementById('replyPreview').innerHTML = '';
        },

        removeAttachment: (id) => {
            attachments = attachments.filter(a => a.id !== id);
            renderAttachmentPreview();
        },

        showVoiceCall: () => {
            const activeChatData = conversations.find(c => c.id === activeChat);
            const modal = new bootstrap.Modal(document.getElementById('voiceCallModal'));

            // Update modal content
            const callerName = document.querySelector('.caller-name');
            const callerAvatar = document.querySelector('.caller-avatar');

            if (callerName) callerName.textContent = activeChatData.name;
            if (callerAvatar) callerAvatar.src = `images/avatars/${activeChatData.avatar}`;

            // Reset call states
            isMuted = false;
            isSpeakerOn = true;

            modal.show();
            startCallTimer();

            // Setup voice call controls after modal is shown
            setTimeout(() => {
                setupVoiceCallControls();
            }, 100);

            // Auto-answer simulation
            setTimeout(() => {
                const callStatus = document.querySelector('.call-status');
                const callDurationEl = document.querySelector('.call-duration');

                if (callStatus) {
                    callStatus.textContent = 'Connected';
                    callStatus.style.display = 'none';
                }
                if (callDurationEl) {
                    callDurationEl.style.display = 'block';
                }

                // Start volume visualization
                startVolumeVisualization();
            }, 2000);
        },

        showVideoCall: () => {
            const activeChatData = conversations.find(c => c.id === activeChat);
            const modal = new bootstrap.Modal(document.getElementById('videoCallModal'));

            // Reset call states
            isMuted = false;
            isSpeakerOn = true;
            isVideoOn = true;

            modal.show();
            startCallTimer();

            // Setup video call controls after modal is shown
            setTimeout(() => {
                setupVideoCallControls();
            }, 100);
        },

        toggleMinimizeCall: () => {
            toggleMinimizeCall();
        }

    }

    // Modal event listeners
    document.addEventListener('hidden.bs.modal', function (e) {
        if (e.target.id === 'voiceCallModal' || e.target.id === 'videoCallModal') {
            // Don't stop timer if call is minimized
            if (!isCallMinimized) {
                stopCallTimer();

                // Stop volume visualization
                if (volumeInterval) {
                    clearInterval(volumeInterval);
                    volumeInterval = null;
                }

                // Reset call states
                isMuted = false;
                isSpeakerOn = true;
                isVideoOn = true;

                // Remove minimized call bar
                hideMinimizedCallBar();
            }

            // Remove any camera off overlays
            const overlays = document.querySelectorAll('.camera-off-overlay');
            overlays.forEach(overlay => overlay.remove());

            // Reset voice call modal display
            if (e.target.id === 'voiceCallModal' && !isCallMinimized) {
                const callStatus = document.querySelector('.call-status');
                const callDurationEl = document.querySelector('.call-duration');

                if (callStatus) {
                    callStatus.textContent = 'Calling...';
                    callStatus.style.display = 'block';
                }
                if (callDurationEl) {
                    callDurationEl.textContent = '00:00';
                    callDurationEl.style.display = 'none';
                }

                // Reset volume bars
                const volumeBars = document.querySelectorAll('#voiceCallModal .bar.bg-primary, #voiceCallModal .bar.bg-danger');
                volumeBars.forEach(bar => {
                    bar.className = 'bar bg-primary';
                    bar.style.opacity = '1';
                });
            }
        }
    });

    // Handle modal shown event to restore from minimized state
    document.addEventListener('shown.bs.modal', function (e) {
        if (e.target.id === 'voiceCallModal' && isCallMinimized) {
            isCallMinimized = false;
            hideMinimizedCallBar();
        }
    });

})();