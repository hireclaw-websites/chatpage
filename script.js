document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message-wrapper');
    const ctaMessage = document.querySelector('.cta-message');
    const chatMessages = document.getElementById('chatMessages');
    const inputWrapper = document.querySelector('.input-wrapper');
    const sendButton = document.querySelector('.send-button');
    const inputField = document.querySelector('.input-wrapper input');

    // Sequential animation for messages
    messages.forEach((message, index) => {
        message.style.animationDelay = `${index * 0.6}s`;
    });

    if (ctaMessage) {
        ctaMessage.style.animationDelay = `${messages.length * 0.6 + 0.3}s`;
    }

    // Auto-scroll as messages appear
    let scrollTimeout;
    const observer = new MutationObserver(() => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    });

    observer.observe(chatMessages, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
    });

    // Smooth scroll to bottom after all animations
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, messages.length * 600 + 800);

    // Redirect input interactions to Telegram
    const redirectToTelegram = () => {
        window.open('https://t.me/chatpage_bot', '_blank');
    };

    inputWrapper.addEventListener('click', redirectToTelegram);
    sendButton.addEventListener('click', (e) => {
        e.stopPropagation();
        redirectToTelegram();
    });

    // Typing indicator effect on hover
    let typingInterval;
    inputField.addEventListener('mouseenter', () => {
        const placeholders = [
            'Continue on Telegram...',
            'Chat with @chatpage_bot...',
            'Build your website now...',
            'Start the conversation...'
        ];
        let currentIndex = 0;

        typingInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % placeholders.length;
            inputField.placeholder = placeholders[currentIndex];
        }, 2000);
    });

    inputField.addEventListener('mouseleave', () => {
        clearInterval(typingInterval);
        inputField.placeholder = 'Continue on Telegram...';
    });

    // Add subtle pulse animation to CTA button after delay
    setTimeout(() => {
        const telegramButton = document.getElementById('telegramCta');
        if (telegramButton) {
            telegramButton.style.animation = 'pulse 2s ease-in-out infinite';

            // Define pulse animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.03);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }, messages.length * 600 + 2000);

    // Add visual feedback for back arrow
    const backArrow = document.querySelector('.back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', () => {
            // Simulate navigation (in a real app this would go somewhere)
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 300);
        });
    }

    // Track CTA clicks (for analytics placeholder)
    const telegramButton = document.getElementById('telegramCta');
    if (telegramButton) {
        telegramButton.addEventListener('click', () => {
            console.log('CTA clicked: Telegram bot link');
            // Analytics tracking would go here
        });
    }

    // Add status indicator animation
    const botStatus = document.querySelector('.bot-status');
    if (botStatus) {
        setInterval(() => {
            const currentText = botStatus.textContent;
            botStatus.style.opacity = '0';
            setTimeout(() => {
                botStatus.textContent = currentText === 'online' ? 'typing...' : 'online';
                botStatus.style.opacity = '0.85';
            }, 300);
        }, 8000);
    }

    // Performance optimization: lazy load animations
    if ('IntersectionObserver' in window) {
        const lazyAnimations = document.querySelectorAll('.message-wrapper, .cta-message');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        });

        lazyAnimations.forEach(element => {
            animationObserver.observe(element);
        });
    }
});
