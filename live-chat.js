const liveChatLauncher = document.getElementById('open-live-chat');
const liveChatWidget = document.getElementById('live-chat-widget');
const liveChatMessages = document.getElementById('live-chat-messages');
const liveChatForm = document.getElementById('live-chat-form');
const liveChatInput = document.getElementById('live-chat-input');
const whatsappPhoneNumber = '919553688562';

if (liveChatLauncher && liveChatWidget && liveChatMessages && liveChatForm && liveChatInput) {
  const appendMessage = (text, type) => {
    const messageElement = document.createElement('div');
    messageElement.className = `live-chat-message ${type}`;
    messageElement.textContent = text;
    liveChatMessages.appendChild(messageElement);
    liveChatMessages.scrollTop = liveChatMessages.scrollHeight;
  };

  const isChatOpen = () => liveChatWidget.classList.contains('is-open');

  const setChatOpenState = (open) => {
    liveChatWidget.classList.toggle('is-open', open);
    liveChatWidget.setAttribute('aria-hidden', open ? 'false' : 'true');
    liveChatLauncher.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      liveChatInput.focus();
    }
  };

  const buildWhatsAppUrl = (question) => {
    const whatsappMessage = [
      'Live chat question from SK Builders website:',
      `Question: ${question}`,
    ].join('\n');

    return `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  };

  const openWhatsAppChat = (whatsappUrl) => {
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  };

  liveChatLauncher.addEventListener('click', () => {
    if (isChatOpen()) {
      setChatOpenState(false);
      return;
    }

    setChatOpenState(true);

    if (liveChatMessages.childElementCount === 0) {
      appendMessage('Type your question and we will open WhatsApp for you.', 'bot');
    }
  });

  liveChatWidget.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-live-chat')) {
      setChatOpenState(false);
    }
  });

  liveChatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = liveChatInput.value.trim();
    if (!message) {
      return;
    }

    appendMessage(message, 'user');
    openWhatsAppChat(buildWhatsAppUrl(message));

    liveChatInput.value = '';
    setChatOpenState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isChatOpen()) {
      setChatOpenState(false);
    }
  });
}
