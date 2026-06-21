// CHAT WIDGET & STICKERS FUNCTIONALITY
// ==========================================================================

let isChatOpen = false;
let chatUnreadCount = 0;

function initChatWidget() {
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  const clearChatBtn = document.getElementById('clearChatBtn');

  if (chatToggleBtn) {
    chatToggleBtn.addEventListener('click', () => {
      sound.playTap();
      toggleChatPanel();
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', () => {
      sound.playTap();
      toggleChatPanel(false);
    });
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', () => {
      sendChatMessage();
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });

    chatInput.addEventListener('input', () => {
      sendChatTypingIndicator(true);
      resetChatTypingTimeout();
    });
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      sound.playTap();
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        chatMessages.innerHTML = '';
        addLog(`Chat cleared.`, 'system');
      }
    });
  }

  // Bind emoji buttons
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const emoji = e.currentTarget.getAttribute('data-emoji');
      sound.playTap();
      sendChatMessage(emoji);
    });
  });

  // Bind sticker buttons
  document.querySelectorAll('.sticker-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const stickerId = e.currentTarget.getAttribute('data-sticker');
      sound.playTap();
      
      // Send network packet
      sendNetworkMessage({
        type: 'CHAT_STICKER',
        stickerId: stickerId
      });

      // Handle locally
      processLocalSticker(stickerId, 'me');
    });
  });
}

function processLocalSticker(stickerId, sender) {
  const partnerName = (role === 'host') ? gameState.joinerName : gameState.hostName;
  let logText = '';

  if (stickerId === 'kiss') {
    sound.playKiss();
    spawnFloatingReaction('💋');
    spawnFloatingReaction('❤️');
    logText = sender === 'me' ? `You sent partner a kiss! 💋❤️` : `${partnerName} sent you a kiss! 💋❤️`;
  } else if (stickerId === 'hug') {
    sound.playHug();
    spawnFloatingReaction('🤗');
    spawnFloatingReaction('💖');
    logText = sender === 'me' ? `You sent partner a warm hug! 🤗💖` : `${partnerName} sent you a warm hug! 🤗💖`;
  } else if (stickerId === 'spank') {
    sound.playSpank();
    spawnFloatingReaction('🍑');
    spawnFloatingReaction('💥');
    logText = sender === 'me' ? `You spanked partner! 🍑💥` : `${partnerName} spanked you! 🍑💥`;
  } else if (stickerId === 'tickle') {
    sound.playTickle();
    spawnFloatingReaction('😜');
    spawnFloatingReaction('👉');
    logText = sender === 'me' ? `You tickled partner! 😜👉` : `${partnerName} tickled you! 😜👉`;
  } else if (stickerId === 'nibble') {
    sound.playNibble();
    spawnFloatingReaction('😈');
    spawnFloatingReaction('🦷');
    logText = sender === 'me' ? `You nibbled partner! 😈🦷` : `${partnerName} nibbled you! 😈🦷`;
  }

  if (logText) {
    addLog(logText, 'play');
  }
}

function toggleChatPanel(forceState) {
  const chatPanel = document.getElementById('chatPanel');
  const chatBadge = document.getElementById('chatBadge');
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  
  if (forceState !== undefined) {
    isChatOpen = forceState;
  } else {
    isChatOpen = !isChatOpen;
  }

  if (isChatOpen) {
    chatPanel.classList.remove('hidden');
    chatUnreadCount = 0;
    if (chatBadge) {
      chatBadge.classList.add('hidden');
      chatBadge.textContent = '0';
    }
    if (chatToggleBtn) {
      chatToggleBtn.classList.remove('chat-btn-pulse');
    }
    
    // Scroll messages to bottom and focus
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    const chatInput = document.getElementById('chatInput');
    if (chatInput && !chatInput.disabled) {
      setTimeout(() => chatInput.focus(), 100);
    }
  } else {
    chatPanel.classList.add('hidden');
  }
}

function sendChatMessage(customText) {
  const chatInput = document.getElementById('chatInput');
  if (!chatInput) return;

  const text = customText !== undefined ? customText.trim() : chatInput.value.trim();
  if (!text) return;

  if (customText === undefined) {
    // Clear input
    chatInput.value = '';
  }

  // Append locally
  appendChatMessage('me', text);

  // Send to peer
  sendNetworkMessage({
    type: 'CHAT_MSG',
    text: text
  });

  // Stop typing indicator
  sendChatTypingIndicator(false);
  if (chatTypingTimeout) {
    clearTimeout(chatTypingTimeout);
  }

  // Play sound
  sound.playChatSent();
}

function receiveChatMessage(text) {
  appendChatMessage('partner', text);
  
  if (isChatOpen) {
    sound.playChatReceived();
  } else {
    chatUnreadCount++;
    const chatBadge = document.getElementById('chatBadge');
    if (chatBadge) {
      chatBadge.textContent = chatUnreadCount;
      chatBadge.classList.remove('hidden');
    }
    
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    if (chatToggleBtn) {
      chatToggleBtn.classList.remove('chat-btn-pulse');
      // trigger browser reflow to restart animation
      void chatToggleBtn.offsetWidth;
      chatToggleBtn.classList.add('chat-btn-pulse');
    }
    
    sound.playChatReceived();
  }
}

function sendChatTypingIndicator(isTyping) {
  sendNetworkMessage({
    type: 'CHAT_TYPING',
    isTyping: isTyping
  });
}

function resetChatTypingTimeout() {
  if (chatTypingTimeout) {
    clearTimeout(chatTypingTimeout);
  }
  chatTypingTimeout = setTimeout(() => {
    sendChatTypingIndicator(false);
  }, 2000);
}

function handleChatTyping(isTyping) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Remove existing typing indicator
  const existingIndicator = chatMessages.querySelector('.chat-typing-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }

  if (isTyping) {
    // Hide placeholder
    const placeholder = document.getElementById('chatPlaceholder');
    if (placeholder) {
      placeholder.style.display = 'none';
    }

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-typing-indicator';
    typingIndicator.innerHTML = `
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
    `;
    
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function appendChatMessage(sender, text, isSystem = false) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Hide placeholder
  const placeholder = document.getElementById('chatPlaceholder');
  if (placeholder) {
    placeholder.style.display = 'none';
  }

  // Remove typing indicator if it exists, to insert message before it or just re-add it
  const typingIndicator = chatMessages.querySelector('.chat-typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }

  const messageEl = document.createElement('div');
  
  if (isSystem) {
    messageEl.className = 'chat-system-msg';
    messageEl.textContent = text;
  } else {
    messageEl.className = \`chat-bubble \${sender === 'me' ? 'sent' : 'received'}\`;
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    messageEl.appendChild(textSpan);
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'chat-time';
    const now = new Date();
    timeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageEl.appendChild(timeSpan);
  }

  chatMessages.appendChild(messageEl);

  // Restore typing indicator if opponent is typing
  if (typingIndicator && sender === 'me') {
    chatMessages.appendChild(typingIndicator);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateChatStatus(isOnline) {
  const statusDot = document.getElementById('chatStatusDot');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const placeholderText = document.getElementById('chatPlaceholderText');
  const placeholder = document.getElementById('chatPlaceholder');
  const chatMessages = document.getElementById('chatMessages');

  if (!statusDot || !chatInput || !chatSendBtn) return;

  if (isOnline) {
    statusDot.className = 'chat-status-dot online';
    chatInput.disabled = false;
    chatSendBtn.disabled = false;
    
    // Enable sticker and emoji buttons
    document.querySelectorAll('.sticker-btn, .emoji-btn').forEach(btn => {
      btn.disabled = false;
    });
    
    const partnerName = (role === 'host') ? gameState.joinerName : gameState.hostName;
    if (placeholderText) {
      placeholderText.textContent = \`Linked with \${partnerName}! Send a sweet message. 💖\`;
    }
    
    // Add system connected message
    appendChatMessage('system', \`Connected with \${partnerName}!\`, true);
  } else {
    statusDot.className = 'chat-status-dot offline';
    chatInput.disabled = true;
    chatInput.value = '';
    chatSendBtn.disabled = true;
    
    // Disable sticker and emoji buttons
    document.querySelectorAll('.sticker-btn, .emoji-btn').forEach(btn => {
      btn.disabled = true;
    });
    
    if (placeholderText) {
      placeholderText.textContent = 'Link up with your partner using a Room Code to start chatting! 💬';
    }
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
    
    // Remove all previous messages or append a system offline message
    if (chatMessages) {
      // Keep placeholder, clear rest
      const placeholderHtml = placeholder ? placeholder.outerHTML : '';
      chatMessages.innerHTML = placeholderHtml;
    }
  }
}

// Auto-initialize chat sidebar on script load
initChatWidget();
