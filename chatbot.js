/* ==========================================================
   DANDY SADDLERY - PREMIUM FAQ CHATBOT INTEGRATION (DROP-UP)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inject Chatbot HTML Structure safely into the page body
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'dandy-chatbot-root';
    chatbotContainer.innerHTML = `
        <button id="chatbot-launcher" aria-label="Open support chat">
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                <circle cx="7" cy="9" r="1.5"/><circle cx="12" cy="9" r="1.5"/><circle cx="17" cy="9" r="1.5"/>
            </svg>
        </button>

        <div id="chatbot-window">
            <div id="chatbot-header">
                <div class="chatbot-brand-status">
                    <h3>Dandy Support</h3>
                    <span class="status-indicator">Online Leather Assistant</span>
                </div>
                <button id="chatbot-close-btn" aria-label="Close chat">&times;</button>
            </div>
            
            <div id="chatbot-messages-body"></div>

            <!-- Drop-up drawer panel container hidden out of sight by default -->
            <div id="chatbot-options-container"></div>

            <!-- Persistent interaction panel row footer tracker components -->
            <div class="chatbot-footer-bar">
                <button id="faq-drawer-toggle">
                    <span>Choose a Question</span>
                    <span class="caret-icon">&#9650;</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatbotContainer);

    // FAQ Knowledge Base Configurations
    const faqData = {
        greeting: "Welcome to our online leather assistant. I can help answer some common questions about our handcrafted leather goods. What are you looking to build today?",
        faqs: [
            {
                id: 1,
                question: "How long do custom orders take?",
                answer: "Because every stitch and oil treatment is completed strictly by hand, standard build times average 3 to 5 weeks depending on project scale."
            },
            {
                id: 2,
                question: "How do I measure my belt size?",
                answer: "For a perfect fit, measure your current belt from the hole you use most frequently down to where the leather folds around the buckle. This is typically 2 inches larger than your standard pant size. Visit our sizing guide for more assistance!"
            },
            {
                id: 3,
                question: "Where do you source your leather?",
                answer: "We source entirely premium 12oz vegetable-tanned harness leather and hides from historic, world-class American tanneries like Wickett & Craig."
            },
            {
                id: 4,
                question: "Do you offer a warranty?",
                answer: "Yes, absolutely. We handcraft items to outlive their owners. We back our workmanship with a lifetime guarantee against structural failure under normal use."
            }
        ]
    };

    // DOM Target Elements
    const launcher = document.getElementById('chatbot-launcher');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const messagesBody = document.getElementById('chatbot-messages-body');
    const optionsContainer = document.getElementById('chatbot-options-container');
    const drawerToggle = document.getElementById('faq-drawer-toggle');

    let initialGreetingSent = false;

    // Toggle Window Visibility Handles
    launcher.addEventListener('click', (e) => {
        e.stopPropagation();
        chatWindow.classList.add('active');
        launcher.classList.add('hidden');
        if (!initialGreetingSent) {
            triggerSystemGreeting();
        }
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChat();
    });
    
    // Global backdrop window frame click closure configuration hooks
    document.addEventListener('click', (e) => {
        if (!chatbotContainer.contains(e.target) && chatWindow.classList.contains('active')) {
            closeChat();
        }
    });

    function closeChat() {
        chatWindow.classList.remove('active');
        launcher.classList.remove('hidden');
        closeDrawer();
    }

    // Toggle Menu Drawer State Handles
    drawerToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (optionsContainer.classList.contains('drawer-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    function openDrawer() {
        optionsContainer.classList.add('drawer-open');
        drawerToggle.classList.add('active');
    }

    function closeDrawer() {
        optionsContainer.classList.remove('drawer-open');
        drawerToggle.classList.remove('active');
    }

    // System Greeting Sequences
    function triggerSystemGreeting() {
        initialGreetingSent = true;
        appendMessage('system', faqData.greeting);
        renderOptions();
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender === 'user' ? 'msg-user' : 'msg-system');
        
        const bubble = document.createElement('div');
        bubble.classList.add('msg-bubble');
        bubble.innerText = text;
        
        msgDiv.appendChild(bubble);
        messagesBody.appendChild(msgDiv);
        messagesBody.scrollTop = messagesBody.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'chat-typing-indicator';
        typingDiv.classList.add('chat-msg', 'msg-system');
        typingDiv.innerHTML = `<div class="msg-bubble typing-dots"><span></span><span></span><span></span></div>`;
        messagesBody.appendChild(typingDiv);
        messagesBody.scrollTop = messagesBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('chat-typing-indicator');
        if (indicator) indicator.remove();
    }

    // Render Actionable FAQ Buttons Inside sliding drawer panels
    function renderOptions() {
        optionsContainer.innerHTML = '';
        faqData.faqs.forEach(faq => {
            const btn = document.createElement('button');
            btn.classList.add('faq-option-btn');
            btn.innerText = faq.question;
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeDrawer(); // Slide drawer downward immediately on choice selection
                handleFaqSelection(faq);
            });
            
            optionsContainer.appendChild(btn);
        });
    }

    function handleFaqSelection(faq) {
        // Post User text selection bubble
        appendMessage('user', faq.question);

        // Queue simulated responses safely
        setTimeout(() => {
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                appendMessage('system', faq.answer);
            }, 1200);
        }, 300);
    }
});