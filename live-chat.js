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

  const openChat = () => {
    liveChatWidget.classList.add('is-open');
    liveChatWidget.setAttribute('aria-hidden', 'false');
    liveChatLauncher.setAttribute('aria-expanded', 'true');
    liveChatInput.focus();
  };

  const closeChat = () => {
    liveChatWidget.classList.remove('is-open');
    liveChatWidget.setAttribute('aria-hidden', 'true');
    liveChatLauncher.setAttribute('aria-expanded', 'false');
  };

  liveChatLauncher.addEventListener('click', () => {
    if (liveChatWidget.classList.contains('is-open')) {
      closeChat();
      return;
    }

    openChat();
    if (liveChatMessages.childElementCount === 0) {
      appendMessage('Type your question and we will open WhatsApp for you.', 'bot');
    }
  });

  liveChatWidget.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-live-chat')) {
      closeChat();
    }
  });

  liveChatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = liveChatInput.value.trim();
    if (!message) {
      return;
    }

    appendMessage(message, 'user');

    const whatsappMessage = [
      'Live chat question from SK Builders website:',
      `Question: ${message}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!newWindow) {
      window.location.href = whatsappUrl;
    }

    liveChatInput.value = '';
    closeChat();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && liveChatWidget.classList.contains('is-open')) {
      closeChat();
    }
  });
}
