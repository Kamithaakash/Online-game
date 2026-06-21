/**
 * HeartPlay - Real-Time Couples Game Engine
 * P2P WebRTC-based multiplayer game.
 */

// ==========================================================================
// SOUND EFFECT SYNTHESIZER (Web Audio API)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Low note to high note ascending chime
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25); // A5
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Quick ascending romantic fanfare (major triad: C5 - E5 - G5 - C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }

  playBuzzer() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Descending buzz error sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.35);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playTap() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Subtle bubble tick when typing or clicking
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Short high pitch woodblock-style tick
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  playChatSent() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Quick soft high bubble pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playChatReceived() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Sweet dual chime (E5 -> A5)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.08); // A5
    gain2.gain.setValueAtTime(0.05, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08 + 0.2);
    
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.15);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.08 + 0.2);
  }
}

const sound = new SoundFX();

// ==========================================================================
// GAME ENGINE & NETWORK STATE
// ==========================================================================
let role = null; // 'host' or 'client'
let peer = null;
let conn = null;
let raceTimerInterval = null;
let lastTimeLeft = null;

// Chat Widget State
let isChatOpen = false;
let chatUnreadCount = 0;
let chatTypingTimeout = null;

let gameState = {
  round: 1,
  status: 'LOBBY', // 'LOBBY', 'GAME_SELECTOR', 'WORD_SETUP', 'LETTER_SETUP', 'RACE', 'ROUND_END', 'SOS_PLAY', 'SOS_END', 'QUIZ_PLAY', 'QUIZ_REVEAL', 'QUIZ_END'
  currentGame: '', // '', 'LETTER_LINK', 'SOS', 'QUIZ'
  hostName: 'Player 1',
  joinerName: 'Player 2',
  hostScore: 0,
  joinerScore: 0,
  activePlayer: 'host', // 'host' or 'client'
  // Letter Link
  baseWord: '',
  startLetter: '',
  endLetter: '',
  winner: '',
  winningWord: '',
  lovePassWord: '',
  lovePassRequester: '',
  timeLeft: 15,
  // SOS Game State
  sosBoard: [], // size 36
  completedSosLines: [], // [{ cells: [idx1, idx2, idx3], owner: 'host'/'client' }]
  sosScores: { host: 0, client: 0 },
  // Sync Quiz State
  quizIndex: 0,
  quizAnswers: { host: '', client: '' },
  quizMatches: 0,
  // Rock Paper Scissors State
  rpsChoices: { host: '', client: '' },
  rpsScores: { host: 0, client: 0 },
};

const cuteNicknames = ['Cupcake', 'Honey', 'Sugar', 'Peanut', 'Cuddlebug', 'Babe', 'Sweetheart', 'Pumpkin', 'Snuggles', 'Lovebird'];

function getRandomNickname() {
  return cuteNicknames[Math.floor(Math.random() * cuteNicknames.length)];
}

function normalizeRoomCode(input) {
  const digits = input.replace(/\D/g, '');
  return digits.substring(0, 4);
}

// Check URL parameters for auto-joining
window.addEventListener('DOMContentLoaded', () => {
  initFloatingHearts();
  
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get('room');
  if (roomCode) {
    const cleanCode = roomCode.toUpperCase().replace('HEART-', '');
    document.getElementById('joinCodeInput').value = `HEART-${cleanCode}`;
    addLog(`Found room code in URL: HEART-${cleanCode}. Enter your nickname and join!`, 'system');
  }
});

// ==========================================================================
// FLOATING HEARTS BACKGROUND EFFECT
// ==========================================================================
function initFloatingHearts() {
  const container = document.getElementById('bgHeartsContainer');
  const emojis = ['❤️', '💖', '💝', '💕', '💗', '🌸', '✨'];
  
  setInterval(() => {
    // Prevent spawning if tab is inactive
    if (document.hidden) return;
    if (container.children.length > 25) return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random styling
    const size = Math.floor(Math.random() * 20) + 12; // 12px to 32px
    const left = Math.floor(Math.random() * 95); // 0% to 95%
    const duration = Math.floor(Math.random() * 6) + 7; // 7s to 13s
    const delay = Math.random() * 2;
    
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    container.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }, 700);
}

// ==========================================================================
// FLOATING REACTIONS (INTERACTIVE LAYER)
// ==========================================================================
function spawnFloatingReaction(emoji) {
  const reaction = document.createElement('div');
  reaction.className = 'floating-reaction';
  reaction.textContent = emoji;
  
  // Random horizontal variance and slight rotation direction
  const left = Math.floor(Math.random() * 60) + 20; // 20% to 80% screen width
  const rotation = Math.floor(Math.random() * 80) - 40; // -40deg to +40deg
  
  reaction.style.left = `${left}%`;
  reaction.style.setProperty('--rot', `${rotation}deg`);
  
  document.body.appendChild(reaction);
  
  setTimeout(() => {
    reaction.remove();
  }, 2900);
}

// ==========================================================================
// DOM ELEMENT EVENT LISTENERS
// ==========================================================================
// Header Action Hooks
document.getElementById('howToPlayBtn').addEventListener('click', () => {
  sound.playTap();
  document.getElementById('howToPlayModal').classList.remove('hidden');
});

const closeModal = () => {
  sound.playTap();
  document.getElementById('howToPlayModal').classList.add('hidden');
};
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('closeModalOkBtn').addEventListener('click', closeModal);

document.getElementById('soundToggleBtn').addEventListener('click', () => {
  const isSoundOn = sound.toggle();
  sound.playTap();
  document.getElementById('soundOnIcon').classList.toggle('hidden', !isSoundOn);
  document.getElementById('soundOffIcon').classList.toggle('hidden', isSoundOn);
});

// Setup Lobby Controls
document.getElementById('createRoomBtn').addEventListener('click', () => {
  sound.playTap();
  const nameInput = document.getElementById('nicknameInput').value.trim();
  const nickname = nameInput || getRandomNickname();
  role = 'host';
  hostRoom(nickname);
});

document.getElementById('joinRoomBtn').addEventListener('click', () => {
  sound.playTap();
  const nameInput = document.getElementById('nicknameInput').value.trim();
  const codeInput = document.getElementById('joinCodeInput').value.trim();
  const nickname = nameInput || getRandomNickname();
  
  if (!codeInput) {
    showError('Please enter a room code first.', 'join');
    return;
  }
  
  role = 'client';
  joinRoom(codeInput, nickname);
});

// Clipboard Helper
document.getElementById('copyCodeBtn').addEventListener('click', () => {
  sound.playTap();
  const roomCode = document.getElementById('roomCodeDisplay').textContent;
  
  navigator.clipboard.writeText(roomCode).then(() => {
    const origBtn = document.getElementById('copyCodeBtn').innerHTML;
    document.getElementById('copyCodeBtn').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ec4b6" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    addLog(`Copied room code "${roomCode}" to clipboard!`, 'system');
    setTimeout(() => {
      document.getElementById('copyCodeBtn').innerHTML = origBtn;
    }, 2000);
  });
});

// Gameplay Interactive Input Hooks
document.getElementById('submitBaseWordBtn').addEventListener('click', () => {
  submitBaseWord();
});

document.getElementById('baseWordInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitBaseWord();
});

document.getElementById('submitEndingLetterBtn').addEventListener('click', () => {
  submitEndingLetter();
});

document.getElementById('endingLetterInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitEndingLetter();
});

document.getElementById('submitRaceWordBtn').addEventListener('click', () => {
  submitRaceWord();
});

document.getElementById('raceWordInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitRaceWord();
  } else {
    // Send typing notification
    sendTypingIndicator(true);
    resetTypingTimeout();
  }
});

// Typing Debouncer
let typingTimeout = null;
function resetTypingTimeout() {
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    sendTypingIndicator(false);
  }, 1500);
}

// Next Round triggers
document.getElementById('nextRoundBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NEXT_ROUND' });
});

// Game Selector selection
document.querySelectorAll('.btn-select-game').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const game = e.target.getAttribute('data-game');
    sound.playTap();
    triggerAction({ type: 'ACTION_SELECT_GAME', game: game });
  });
});

// Change Game Button
document.getElementById('changeGameBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// SOS Controls
document.getElementById('restartSosBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_SOS_RESTART' });
});

document.getElementById('exitSosBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// Quiz Controls
document.getElementById('submitQuizAnswerBtn').addEventListener('click', () => {
  submitQuizAnswer();
});

document.getElementById('quizAnswerInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitQuizAnswer();
  }
});

function submitQuizAnswer() {
  const inputEl = document.getElementById('quizAnswerInput');
  const answer = inputEl.value.trim();
  if (!answer) {
    sound.playBuzzer();
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 500);
    return;
  }
  triggerAction({ type: 'ACTION_QUIZ_SUBMIT', answer: answer });
}

document.getElementById('quizMatchBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_QUIZ_EVALUATE', approved: true });
});

document.getElementById('quizMismatchBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_QUIZ_EVALUATE', approved: false });
});

document.getElementById('restartQuizBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_QUIZ_RESTART' });
});

document.getElementById('exitQuizBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// RPS Controls
document.querySelectorAll('.rps-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.rps-btn');
    if (!targetBtn) return;
    const weapon = targetBtn.getAttribute('data-weapon');
    sound.playTap();
    triggerAction({ type: 'ACTION_RPS_SUBMIT', weapon: weapon });
  });
});

document.getElementById('restartRpsBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_RPS_RESTART' });
});

document.getElementById('exitRpsBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// Reaction Dock Hooks
document.querySelectorAll('.react-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const emoji = e.target.getAttribute('data-emoji');
    sound.playTap();
    spawnFloatingReaction(emoji);
    sendNetworkMessage({ type: 'REACTION', emoji: emoji });
  });
});

// Activity logger reset
document.getElementById('clearLogBtn').addEventListener('click', () => {
  sound.playTap();
  const logContent = document.getElementById('activityLog');
  logContent.innerHTML = `<div class="log-entry system-entry">Feed cleared. Room: ${document.getElementById('activeRoomBadge').textContent}</div>`;
});

// ==========================================================================
// NETWORK LAYER - PEERJS HOST/JOIN
// ==========================================================================
function hostRoom(nickname) {
  // Generate random 4-digit room code
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const peerId = `heartplay-love-${code}`;
  
  gameState.hostName = nickname;
  gameState.status = 'LOBBY';
  
  peer = new Peer(peerId);

  peer.on('open', (id) => {
    console.log('Room opened on PeerServer. Peer ID:', id);
    document.getElementById('roomCodeDisplay').textContent = `HEART-${code}`;
    document.getElementById('roomDetailsPanel').classList.remove('hidden');
    document.getElementById('nicknameInput').disabled = true;
    document.getElementById('createRoomBtn').disabled = true;
    
    addLog(`Created room HEART-${code}. Send link to your partner!`, 'system');
  });

  peer.on('connection', (connection) => {
    if (conn) {
      // Room is busy
      connection.on('open', () => {
        connection.send({ type: 'REJECT', reason: 'Room is occupied!' });
        connection.close();
      });
      return;
    }
    
    conn = connection;
    setupNetworkConnection();
  });

  peer.on('error', (err) => {
    console.error('Peer server error:', err);
    if (err.type === 'unavailable-id') {
      // Regenerate room code on collision
      hostRoom(nickname);
    } else {
      showError(`Hosting error: ${err.message}`, 'join');
    }
  });
}

function joinRoom(codeInput, nickname) {
  const code = normalizeRoomCode(codeInput);
  if (!code || code.length !== 4) {
    showError('Invalid code. Please enter a 4-digit numeric code.', 'join');
    return;
  }
  
  gameState.joinerName = nickname;
  const hostPeerId = `heartplay-love-${code}`;
  
  // Random alphanumeric identifier for client
  const clientPeerId = `heartplay-client-${Math.random().toString(36).substring(2, 7)}`;
  peer = new Peer(clientPeerId);

  peer.on('open', () => {
    console.log('Connecting to host room code:', code);
    conn = peer.connect(hostPeerId);
    setupNetworkConnection();
  });

  peer.on('error', (err) => {
    console.error('Connection joining error:', err);
    showError('Could not link to room. Verify the code and that your partner has hosted.', 'join');
  });
}

function setupNetworkConnection() {
  conn.on('open', () => {
    sound.playChime();
    
    // Hide setup overlay errors
    document.getElementById('joinErrorMsg').classList.add('hidden');
    
    if (role === 'host') {
      addLog(`Partner linked up! Starting game soon...`, 'system');
    } else {
      // Introduce client to host
      sendNetworkMessage({ 
        type: 'INTRODUCE', 
        nickname: gameState.joinerName 
      });
    }

    // Set chat to online state
    updateChatStatus(true);
  });

  conn.on('data', (data) => {
    handleIncomingMessage(data);
  });

  conn.on('close', () => {
    handleDisconnect();
  });

  conn.on('error', (err) => {
    console.error('Data connection error:', err);
    handleDisconnect();
  });
}

function sendNetworkMessage(msg) {
  if (conn && conn.open) {
    conn.send(msg);
  }
}

function handleDisconnect() {
  sound.playBuzzer();
  addLog('Connection lost. Returning to Lobby.', 'system');
  alert('Partner disconnected. Returning to lobby setup.');
  clearRaceTimer();
  
  // Set chat to offline state
  updateChatStatus(false);
  
  // Reset all
  if (peer) {
    peer.destroy();
  }
  peer = null;
  conn = null;
  role = null;
  
  // Reset buttons
  document.getElementById('nicknameInput').disabled = false;
  document.getElementById('createRoomBtn').disabled = false;
  document.getElementById('roomDetailsPanel').classList.add('hidden');
  
  // Return screen
  switchScreen('lobbyScreen');
}

// ==========================================================================
// MESSAGE ROUTER (HOST & CLIENT PROTOCOL)
// ==========================================================================
function handleIncomingMessage(data) {
  if (role === 'host') {
    // --- HOST HANDLERS ---
    switch (data.type) {
      case 'INTRODUCE':
        gameState.joinerName = data.nickname;
        addLog(`${gameState.joinerName} joined the game!`, 'system');
        
        // Start the game! Setup state
        gameState.status = 'GAME_SELECTOR';
        gameState.currentGame = '';
        gameState.round = 1;
        gameState.hostScore = 0;
        gameState.joinerScore = 0;
        gameState.activePlayer = 'host';
        
        broadcastState();
        switchScreen('gameScreen');
        renderUI();
        break;

      case 'ACTION_SUBMIT_BASE_WORD':
        processBaseWordSubmission(data.word);
        break;

      case 'ACTION_SUBMIT_LETTER':
        processLetterSubmission(data.letter);
        break;

      case 'ACTION_SUBMIT_RACE_WORD':
        processRaceSubmission(data.word, 'client');
        break;

      case 'ACTION_LOVE_PASS_RESPONSE':
        processLovePassResponse(data.approved);
        break;

      case 'ACTION_NEXT_ROUND':
        processNextRound();
        break;

      case 'ACTION_SELECT_GAME':
        processSelectGame(data.game);
        break;

      case 'ACTION_EXIT_TO_SELECTOR':
        processExitToSelector();
        break;

      case 'ACTION_SOS_MOVE':
        processSosMove(data.cellIndex, data.letter, 'client');
        break;

      case 'ACTION_SOS_RESTART':
        processSosRestart();
        break;

      case 'ACTION_QUIZ_SUBMIT':
        processQuizSubmit(data.answer, 'client');
        break;

      case 'ACTION_QUIZ_EVALUATE':
        processQuizEvaluate(data.approved);
        break;

      case 'ACTION_QUIZ_RESTART':
        processQuizRestart();
        break;

      case 'ACTION_RPS_SUBMIT':
        processRpsSubmit(data.weapon, 'client');
        break;

      case 'ACTION_RPS_RESTART':
        processRpsRestart();
        break;

      case 'REACTION':
        spawnFloatingReaction(data.emoji);
        break;

      case 'TYPING':
        showOpponentTyping(data.isTyping);
        break;

      case 'CHAT_MSG':
        receiveChatMessage(data.text);
        break;

      case 'CHAT_TYPING':
        handleChatTyping(data.isTyping);
        break;
    }
  } else {
    // --- CLIENT HANDLERS ---
    switch (data.type) {
      case 'STATE_UPDATE':
        gameState = data.state;
        if (document.getElementById('lobbyScreen').classList.contains('active')) {
          switchScreen('gameScreen');
        }
        renderUI();
        break;

      case 'REACTION':
        spawnFloatingReaction(data.emoji);
        break;

      case 'TYPING':
        showOpponentTyping(data.isTyping);
        break;

      case 'RACE_REJECTED':
        handleRaceWordRejected(data.reason);
        break;

      case 'REJECT':
        alert(`Rejected: ${data.reason}`);
        handleDisconnect();
        break;

      case 'CHAT_MSG':
        receiveChatMessage(data.text);
        break;

      case 'CHAT_TYPING':
        handleChatTyping(data.isTyping);
        break;
    }
  }
}

function broadcastState() {
  if (role === 'host') {
    sendNetworkMessage({ 
      type: 'STATE_UPDATE', 
      state: gameState 
    });
  }
}

// Unified trigger for both host actions and client commands
function triggerAction(action) {
  if (role === 'host') {
    // Execute locally
    switch (action.type) {
      case 'ACTION_SUBMIT_BASE_WORD':
        processBaseWordSubmission(action.word);
        break;
      case 'ACTION_SUBMIT_LETTER':
        processLetterSubmission(action.letter);
        break;
      case 'ACTION_SUBMIT_RACE_WORD':
        processRaceSubmission(action.word, 'host');
        break;
      case 'ACTION_LOVE_PASS_RESPONSE':
        processLovePassResponse(action.approved);
        break;
      case 'ACTION_NEXT_ROUND':
        processNextRound();
        break;
      case 'ACTION_SELECT_GAME':
        processSelectGame(action.game);
        break;
      case 'ACTION_EXIT_TO_SELECTOR':
        processExitToSelector();
        break;
      case 'ACTION_SOS_MOVE':
        processSosMove(action.cellIndex, action.letter, 'host');
        break;
      case 'ACTION_SOS_RESTART':
        processSosRestart();
        break;
      case 'ACTION_QUIZ_SUBMIT':
        processQuizSubmit(action.answer, 'host');
        break;
      case 'ACTION_QUIZ_EVALUATE':
        processQuizEvaluate(action.approved);
        break;
      case 'ACTION_QUIZ_RESTART':
        processQuizRestart();
        break;
      case 'ACTION_RPS_SUBMIT':
        processRpsSubmit(action.weapon, role);
        break;
      case 'ACTION_RPS_RESTART':
        processRpsRestart();
        break;
    }
  } else {
    // Client sends command to host
    sendNetworkMessage(action);
  }
}

// ==========================================================================
// HOST ENGINE STATE MODIFICATION LOGIC
// ==========================================================================
function processBaseWordSubmission(letter) {
  const cleanLetter = letter.trim().toUpperCase();
  if (cleanLetter.length !== 1 || !/^[A-Z]$/.test(cleanLetter)) {
    return;
  }

  gameState.baseWord = cleanLetter;
  gameState.startLetter = cleanLetter;
  gameState.status = 'LETTER_SETUP';
  
  // Next input is ending letter - other player chooses it
  gameState.activePlayer = (gameState.activePlayer === 'host') ? 'client' : 'host';
  
  const submitterName = (gameState.activePlayer === 'client') ? gameState.hostName : gameState.joinerName;
  addLog(`${submitterName} set starting letter: "${gameState.startLetter}"`, 'play');
  
  broadcastState();
  renderUI();
  sound.playChime();
}

function processLetterSubmission(letter) {
  const cleanLetter = letter.trim().toUpperCase();
  if (cleanLetter.length !== 1 || !/^[A-Z]$/.test(cleanLetter) || cleanLetter === gameState.startLetter) {
    return;
  }

  gameState.endLetter = cleanLetter;
  gameState.status = 'RACE';
  
  const pickerName = (gameState.activePlayer === 'host') ? gameState.hostName : gameState.joinerName;
  addLog(`${pickerName} selected ending constraint: "${gameState.endLetter}". RACE START!`, 'play');
  
  startRaceTimer();
  
  broadcastState();
  renderUI();
  sound.playChime();
}

async function processRaceSubmission(word, submitter) {
  const cleanWord = word.trim().toUpperCase();
  
  // Regex check basic match
  if (!cleanWord.startsWith(gameState.startLetter) || !cleanWord.endsWith(gameState.endLetter) || !/^[A-Z]+$/.test(cleanWord)) {
    if (submitter === 'host') {
      handleRaceWordRejected("Word doesn't match the starting and ending letter rules.");
    } else {
      sendNetworkMessage({ type: 'RACE_REJECTED', reason: "Word doesn't match the rules." });
    }
    return;
  }

  const submissionRound = gameState.round;

  // API dictionary validation
  const isValidEnglish = await checkWordInDictionary(cleanWord);
  
  // Discard validation result if round advanced or game state exited during network fetch
  if (gameState.status !== 'RACE' || gameState.round !== submissionRound) {
    return;
  }

  if (isValidEnglish) {
    // Immediate win
    awardRaceWinner(submitter, cleanWord);
  } else {
    // Trigger "Love Pass" (Partner approval)
    gameState.lovePassWord = cleanWord;
    gameState.lovePassRequester = submitter;
    broadcastState();
    renderUI();
  }
}

function awardRaceWinner(winnerRole, word) {
  clearRaceTimer();
  gameState.winner = winnerRole;
  gameState.winningWord = word;
  gameState.status = 'ROUND_END';
  
  if (winnerRole === 'host') {
    gameState.hostScore++;
    addLog(`❤️ ${gameState.hostName} typed "${word}" first and won the round! (+1 Point)`, 'points');
  } else {
    gameState.joinerScore++;
    addLog(`❤️ ${gameState.joinerName} typed "${word}" first and won the round! (+1 Point)`, 'points');
  }
  
  gameState.lovePassWord = '';
  gameState.lovePassRequester = '';
  
  broadcastState();
  renderUI();
}

function processLovePassResponse(approved) {
  const word = gameState.lovePassWord;
  const requester = gameState.lovePassRequester;
  
  if (approved) {
    // Approved by partner
    addLog(`"Love Pass" granted! Partner accepted: "${word}"`, 'play');
    awardRaceWinner(requester, word);
  } else {
    // Rejected by partner
    addLog(`"Love Pass" denied! "${word}" was rejected.`, 'system');
    
    // Reset state back to Race screen
    gameState.lovePassWord = '';
    gameState.lovePassRequester = '';
    
    broadcastState();
    
    // Alert the requester
    if (requester === 'host') {
      handleRaceWordRejected("Your partner denied the Love Pass! Keep typing.");
    } else {
      sendNetworkMessage({ type: 'RACE_REJECTED', reason: "Your partner denied the Love Pass! Keep typing." });
    }
    
    renderUI();
  }
}

function processNextRound() {
  gameState.round++;
  gameState.baseWord = '';
  gameState.startLetter = '';
  gameState.endLetter = '';
  gameState.winner = '';
  gameState.winningWord = '';
  gameState.status = 'WORD_SETUP';
  
  // Submitter turns rotate: Odd rounds = Host submits base, Even rounds = Client submits base
  gameState.activePlayer = (gameState.round % 2 === 1) ? 'host' : 'client';
  
  addLog(`--- Round ${gameState.round} Started ---`, 'system');
  
  broadcastState();
  renderUI();
}

function processSelectGame(gameType) {
  gameState.currentGame = gameType;
  gameState.round = 1;
  gameState.hostScore = 0;
  gameState.joinerScore = 0;
  
  if (gameType === 'LETTER_LINK') {
    gameState.status = 'WORD_SETUP';
    gameState.activePlayer = 'host';
    gameState.baseWord = '';
    gameState.startLetter = '';
    gameState.endLetter = '';
    gameState.winner = '';
    gameState.winningWord = '';
    gameState.lovePassWord = '';
    gameState.lovePassRequester = '';
    addLog(`--- Game Mode: Letter Link started! ---`, 'system');
  } else if (gameType === 'SOS') {
    gameState.status = 'SOS_PLAY';
    gameState.activePlayer = 'host';
    gameState.sosBoard = Array(36).fill('');
    gameState.completedSosLines = [];
    gameState.sosScores = { host: 0, client: 0 };
    addLog(`--- Game Mode: SOS started! ---`, 'system');
  } else if (gameType === 'QUIZ') {
    gameState.status = 'QUIZ_PLAY';
    gameState.quizIndex = 0;
    gameState.quizAnswers = { host: '', client: '' };
    gameState.quizMatches = 0;
    addLog(`--- Game Mode: Sync Quiz started! ---`, 'system');
  } else if (gameType === 'RPS') {
    gameState.status = 'RPS_PLAY';
    gameState.rpsChoices = { host: '', client: '' };
    gameState.rpsScores = { host: 0, client: 0 };
    addLog(`--- Game Mode: Rock Paper Scissors started! ---`, 'system');
  }
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

function processExitToSelector() {
  gameState.status = 'GAME_SELECTOR';
  gameState.currentGame = '';
  gameState.hostScore = 0;
  gameState.joinerScore = 0;
  gameState.lovePassWord = '';
  gameState.lovePassRequester = '';
  clearRaceTimer();
  addLog(`Returned to Game Selector lounge.`, 'system');
  
  broadcastState();
  renderUI();
}

function checkNewSos(board, r, c, letter, existingSosKeys) {
  const newSosLines = [];
  const inBounds = (row, col) => row >= 0 && row < 6 && col >= 0 && col < 6;
  const getCell = (row, col) => board[row * 6 + col];

  if (letter === 'S') {
    const checkDir = (dr1, dc1, dr2, dc2) => {
      // Forward
      if (inBounds(r + dr1, c + dc1) && inBounds(r + dr2, c + dc2)) {
        if (getCell(r + dr1, c + dc1) === 'O' && getCell(r + dr2, c + dc2) === 'S') {
          const key = [r * 6 + c, (r + dr1) * 6 + (c + dc1), (r + dr2) * 6 + (c + dc2)].sort((a,b)=>a-b).join('-');
          if (!existingSosKeys.includes(key)) {
            newSosLines.push({ key, cells: [r * 6 + c, (r + dr1) * 6 + (c + dc1), (r + dr2) * 6 + (c + dc2)] });
          }
        }
      }
      // Backward
      if (inBounds(r - dr1, c - dc1) && inBounds(r - dr2, c - dc2)) {
        if (getCell(r - dr1, c - dc1) === 'O' && getCell(r - dr2, c - dc2) === 'S') {
          const key = [r * 6 + c, (r - dr1) * 6 + (c - dc1), (r - dr2) * 6 + (c - dc2)].sort((a,b)=>a-b).join('-');
          if (!existingSosKeys.includes(key)) {
            newSosLines.push({ key, cells: [r * 6 + c, (r - dr1) * 6 + (c - dc1), (r - dr2) * 6 + (c - dc2)] });
          }
        }
      }
    };

    checkDir(0, 1, 0, 2);   // Horizontal
    checkDir(1, 0, 2, 0);   // Vertical
    checkDir(1, 1, 2, 2);   // Diagonal Down-Right
    checkDir(1, -1, 2, -2); // Diagonal Down-Left
  } else if (letter === 'O') {
    const checkDir = (dr1, dc1) => {
      if (inBounds(r - dr1, c - dc1) && inBounds(r + dr1, c + dc1)) {
        if (getCell(r - dr1, c - dc1) === 'S' && getCell(r + dr1, c + dc1) === 'S') {
          const key = [(r - dr1) * 6 + (c - dc1), r * 6 + c, (r + dr1) * 6 + (c + dc1)].sort((a,b)=>a-b).join('-');
          if (!existingSosKeys.includes(key)) {
            newSosLines.push({ key, cells: [(r - dr1) * 6 + (c - dc1), r * 6 + c, (r + dr1) * 6 + (c + dc1)] });
          }
        }
      }
    };

    checkDir(0, 1);   // Horizontal
    checkDir(1, 0);   // Vertical
    checkDir(1, 1);   // Diagonal Down-Right
    checkDir(1, -1);  // Diagonal Down-Left
  }

  return newSosLines;
}

function processSosMove(cellIndex, letter, submitter) {
  if (gameState.status !== 'SOS_PLAY') return;
  if (gameState.sosBoard[cellIndex] !== '') return;
  if (gameState.activePlayer !== submitter) return;

  gameState.sosBoard[cellIndex] = letter;
  const r = Math.floor(cellIndex / 6);
  const c = cellIndex % 6;
  const existingSosKeys = gameState.completedSosLines.map(line => line.key);
  
  const newMatches = checkNewSos(gameState.sosBoard, r, c, letter, existingSosKeys);
  const submitterName = (submitter === 'host') ? gameState.hostName : gameState.joinerName;
  
  if (newMatches.length > 0) {
    newMatches.forEach(match => {
      gameState.completedSosLines.push({
        cells: match.cells,
        owner: submitter,
        key: match.key
      });
    });
    gameState.sosScores[submitter] += newMatches.length;
    addLog(`${submitterName} placed ${letter} at (${r+1},${c+1}) and formed ${newMatches.length} SOS! (+${newMatches.length} pts)`, 'play');
    sound.playSuccess();
  } else {
    addLog(`${submitterName} placed ${letter} at (${r+1},${c+1})`, 'system');
    gameState.activePlayer = (submitter === 'host') ? 'client' : 'host';
    sound.playTap();
  }

  const isFull = gameState.sosBoard.every(cell => cell !== '');
  if (isFull) {
    gameState.status = 'SOS_END';
    const hs = gameState.sosScores.host;
    const cs = gameState.sosScores.client;
    
    if (hs > cs) {
      gameState.winner = 'host';
      addLog(`🏁 SOS Game Finished! ${gameState.hostName} wins the match (${hs} vs ${cs})! 🏆`, 'points');
    } else if (cs > hs) {
      gameState.winner = 'client';
      addLog(`🏁 SOS Game Finished! ${gameState.joinerName} wins the match (${cs} vs ${hs})! 🏆`, 'points');
    } else {
      gameState.winner = 'tie';
      addLog(`🏁 SOS Game Finished in a tie (${hs} vs ${cs})! 🤝`, 'system');
    }
  }

  broadcastState();
  renderUI();
}

function processSosRestart() {
  gameState.status = 'SOS_PLAY';
  gameState.sosBoard = Array(36).fill('');
  gameState.completedSosLines = [];
  gameState.sosScores = { host: 0, client: 0 };
  gameState.activePlayer = 'host';
  addLog(`--- SOS Game Restarted ---`, 'system');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

const quizQuestions = [
  "Where was our first date (or where did we first meet)?",
  "Who is more likely to fall asleep during a movie?",
  "What is your partner's ultimate comfort food?",
  "What is your partner's biggest pet peeve?",
  "Who said 'I love you' first?",
  "Who is the better cook between you two?",
  "If you could travel anywhere together tomorrow, where would you go?",
  "Who is the more organized one in the relationship?",
  "What is your partner's favorite movie or TV show?",
  "What is your favorite memory together so far?"
];

function processQuizSubmit(answer, submitter) {
  if (gameState.status !== 'QUIZ_PLAY') return;
  gameState.quizAnswers[submitter] = answer;
  
  const submitterName = (submitter === 'host') ? gameState.hostName : gameState.joinerName;
  addLog(`${submitterName} locked in their answer.`, 'system');

  if (gameState.quizAnswers.host !== '' && gameState.quizAnswers.client !== '') {
    gameState.status = 'QUIZ_REVEAL';
    addLog(`Revealing both answers side-by-side!`, 'play');
    sound.playChime();
  } else {
    sound.playTap();
  }

  broadcastState();
  renderUI();
}

function processQuizEvaluate(approved) {
  if (gameState.status !== 'QUIZ_REVEAL') return;
  
  if (approved) {
    gameState.quizMatches++;
    addLog(`Sync confirmed! Answers matched. ❤️ (+1 Point)`, 'points');
    sound.playSuccess();
  } else {
    addLog(`Answers didn't match. 💔 Next question.`, 'system');
    sound.playBuzzer();
  }

  gameState.quizIndex++;
  gameState.quizAnswers = { host: '', client: '' };

  if (gameState.quizIndex >= quizQuestions.length) {
    gameState.status = 'QUIZ_END';
    const scorePct = Math.round((gameState.quizMatches / quizQuestions.length) * 100);
    addLog(`🏁 Sync Quiz finished! Final Score: ${gameState.quizMatches}/${quizQuestions.length} matches (${scorePct}% Synced)!`, 'points');
  } else {
    gameState.status = 'QUIZ_PLAY';
  }

  broadcastState();
  renderUI();
}

function processQuizRestart() {
  gameState.status = 'QUIZ_PLAY';
  gameState.quizIndex = 0;
  gameState.quizAnswers = { host: '', client: '' };
  gameState.quizMatches = 0;
  addLog(`--- Sync Quiz Restarted ---`, 'system');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

function processRpsSubmit(weapon, submitter) {
  if (gameState.status !== 'RPS_PLAY') return;
  if (gameState.rpsChoices[submitter] !== '') return;

  gameState.rpsChoices[submitter] = weapon;
  
  const submitterName = (submitter === 'host') ? gameState.hostName : gameState.joinerName;
  addLog(`${submitterName} locked in their weapon choice.`, 'system');

  if (gameState.rpsChoices.host !== '' && gameState.rpsChoices.client !== '') {
    gameState.status = 'RPS_REVEAL';
    
    // Determine winner
    const hostWeapon = gameState.rpsChoices.host;
    const clientWeapon = gameState.rpsChoices.client;
    
    const rpsDetails = {
      rock: { emoji: '🪨', label: 'Rock' },
      paper: { emoji: '✉️', label: 'Love Letter' },
      scissors: { emoji: '✂️', label: 'Scissors' }
    };
    
    if (hostWeapon === clientWeapon) {
      gameState.winner = 'tie';
      addLog(`⚔️ RPS Round Result: It's a tie! Both selected ${rpsDetails[hostWeapon].label} ${rpsDetails[hostWeapon].emoji}`, 'play');
    } else {
      const beats = {
        rock: 'scissors',
        scissors: 'paper',
        paper: 'rock'
      };
      
      if (beats[hostWeapon] === clientWeapon) {
        gameState.winner = 'host';
        gameState.hostScore++;
        gameState.rpsScores.host++;
        addLog(`⚔️ RPS Round Result: ${gameState.hostName} won with ${rpsDetails[hostWeapon].label} ${rpsDetails[hostWeapon].emoji}! (+1 point)`, 'points');
      } else {
        gameState.winner = 'client';
        gameState.joinerScore++;
        gameState.rpsScores.client++;
        addLog(`⚔️ RPS Round Result: ${gameState.joinerName} won with ${rpsDetails[clientWeapon].label} ${rpsDetails[clientWeapon].emoji}! (+1 point)`, 'points');
      }
    }
    sound.playChime();
  } else {
    sound.playTap();
  }

  broadcastState();
  renderUI();
}

function processRpsRestart() {
  gameState.status = 'RPS_PLAY';
  gameState.rpsChoices = { host: '', client: '' };
  gameState.round++;
  addLog(`--- RPS Round ${gameState.round} Started ---`, 'system');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

function startRaceTimer() {
  if (role !== 'host') return;
  clearInterval(raceTimerInterval);
  gameState.timeLeft = 15;
  broadcastState();
  
  raceTimerInterval = setInterval(() => {
    // Pause countdown if there is a pending Love Pass validation
    if (gameState.lovePassWord) return;

    if (gameState.timeLeft > 0) {
      gameState.timeLeft--;
      broadcastState();
      renderUI();
    } else {
      clearInterval(raceTimerInterval);
      triggerRaceTimeout();
    }
  }, 1000);
}

function clearRaceTimer() {
  if (role === 'host') {
    clearInterval(raceTimerInterval);
  }
}

function triggerRaceTimeout() {
  if (role !== 'host') return;
  gameState.winner = 'none';
  gameState.winningWord = '';
  gameState.status = 'ROUND_END';
  addLog(`⏰ Time's up! No one guessed a word in time.`, 'system');
  broadcastState();
  renderUI();
}

// ==========================================================================
// LOCAL SCREEN ACTIONS / HELPERS
// ==========================================================================
function submitBaseWord() {
  const inputEl = document.getElementById('baseWordInput');
  const letter = inputEl.value.trim().toUpperCase();
  
  if (letter.length !== 1 || !/^[A-Z]$/.test(letter)) {
    sound.playBuzzer();
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 500);
    return;
  }
  
  inputEl.value = '';
  triggerAction({ type: 'ACTION_SUBMIT_BASE_WORD', word: letter });
}

function submitEndingLetter() {
  const inputEl = document.getElementById('endingLetterInput');
  const letter = inputEl.value.trim().toUpperCase();
  
  if (letter.length !== 1 || !/^[A-Z]$/.test(letter) || letter === gameState.startLetter) {
    sound.playBuzzer();
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 500);
    return;
  }
  
  inputEl.value = '';
  triggerAction({ type: 'ACTION_SUBMIT_LETTER', letter: letter });
}

function submitRaceWord() {
  const inputEl = document.getElementById('raceWordInput');
  const submitBtn = document.getElementById('submitRaceWordBtn');
  const word = inputEl.value.trim().toUpperCase();
  
  if (!word || !word.startsWith(gameState.startLetter) || !word.endsWith(gameState.endLetter) || !/^[A-Z]+$/.test(word)) {
    sound.playBuzzer();
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 500);
    return;
  }
  
  // Disable locally to prevent double submission
  if (inputEl) inputEl.disabled = true;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "VERIFYING...";
  }

  // Client/Host launches validation trigger
  sendTypingIndicator(false);
  triggerAction({ type: 'ACTION_SUBMIT_RACE_WORD', word: word });
}

function handleRaceWordRejected(reason) {
  sound.playBuzzer();
  const inputEl = document.getElementById('raceWordInput');
  const submitBtn = document.getElementById('submitRaceWordBtn');
  
  if (inputEl) {
    inputEl.disabled = false;
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 500);
    inputEl.focus();
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "SUBMIT WORD 🚀";
  }
  
  // Show localized tip
  const logEl = document.getElementById('activityLog');
  const errEntry = document.createElement('div');
  errEntry.className = 'log-entry';
  errEntry.style.borderColor = 'var(--danger)';
  errEntry.style.background = 'rgba(230,57,70,0.06)';
  errEntry.textContent = reason;
  logEl.appendChild(errEntry);
  logEl.scrollTop = logEl.scrollHeight;
}

// Dictionary lookup cache to speed up subsequent checks
const dictionaryCache = {};

// Real-time Dictionary Validation (Online lookup)
async function checkWordInDictionary(word) {
  const lowerWord = word.trim().toLowerCase();
  if (dictionaryCache[lowerWord] !== undefined) {
    return dictionaryCache[lowerWord];
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 800); // 800ms timeout for faster feedback

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(lowerWord)}`, {
      signal: controller.signal
    });
    clearTimeout(id);
    const isValid = res.status === 200;
    dictionaryCache[lowerWord] = isValid;
    return isValid;
  } catch (error) {
    clearTimeout(id);
    console.error("Dictionary API fetch failed or timed out: ", error);
    // Don't cache on network failure so it can be retried later if needed
    return false; // Force fallback to partner review modal on error
  }
}

// Client typing states
function sendTypingIndicator(isTyping) {
  sendNetworkMessage({ type: 'TYPING', isTyping: isTyping });
}

function showOpponentTyping(isTyping) {
  const el = document.getElementById('opponentTypingStatus');
  const partnerName = (role === 'host') ? gameState.joinerName : gameState.hostName;
  el.textContent = `${partnerName} is typing... 💬`;
  if (isTyping) {
    el.classList.add('visible');
  } else {
    el.classList.remove('visible');
  }
}

// UI State Switcher
function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(scr => scr.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Log view details
function addLog(text, type = 'system') {
  const logContent = document.getElementById('activityLog');
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}-entry`;
  entry.textContent = text;
  logContent.appendChild(entry);
  logContent.scrollTop = logContent.scrollHeight;
}

function showError(msg, side = 'join') {
  if (side === 'join') {
    const errorDisplay = document.getElementById('joinErrorMsg');
    errorDisplay.textContent = msg;
    errorDisplay.classList.remove('hidden');
    sound.playBuzzer();
  }
}

// ==========================================================================
// RENDER INTERFACE FROM CURRENT STATE (STATE MACHINE VIEW CONTROLLER)
// ==========================================================================
function renderUI() {
  // Sync general rooms & nick elements
  const isHost = (role === 'host');
  const myName = isHost ? gameState.hostName : gameState.joinerName;
  const partnerName = isHost ? gameState.joinerName : gameState.hostName;
  
  document.getElementById('hostPlayerName').textContent = gameState.hostName;
  document.getElementById('joinerPlayerName').textContent = gameState.joinerName;
  
  // Scores display
  document.getElementById('hostScoreNum').textContent = `(${gameState.hostScore})`;
  document.getElementById('joinerScoreNum').textContent = `(${gameState.joinerScore})`;
  
  // Render score hearts
  const generateHearts = (score) => {
    if (score === 0) return '💔';
    return '❤️'.repeat(Math.min(score, 5)) + (score > 5 ? `+${score-5}` : '');
  };
  document.getElementById('hostScoreHearts').textContent = generateHearts(gameState.hostScore);
  document.getElementById('joinerScoreHearts').textContent = generateHearts(gameState.joinerScore);
  
  // Connect Badge
  const roomCode = document.getElementById('roomCodeDisplay').textContent;
  document.getElementById('activeRoomBadge').textContent = roomCode !== 'HEART-XXXX' ? roomCode : 'CONNECTED';

  // Active status card indicators (pulse highlight for active setup)
  const isTurnActive = (gameState.status === 'WORD_SETUP' || gameState.status === 'LETTER_SETUP' || gameState.status === 'SOS_PLAY');
  document.getElementById('playerHostCard').classList.toggle('active-turn', isTurnActive && gameState.activePlayer === 'host');
  document.getElementById('playerJoinerCard').classList.toggle('active-turn', isTurnActive && gameState.activePlayer === 'client');

  // Toggle Change Game button visibility
  const changeGameBtn = document.getElementById('changeGameBtn');
  if (changeGameBtn) {
    const showBtn = isHost && gameState.status !== 'LOBBY' && gameState.status !== 'GAME_SELECTOR';
    changeGameBtn.classList.toggle('hidden', !showBtn);
  }

  // Turn status updates
  const roundEl = document.getElementById('roundCounter');
  roundEl.textContent = `Round ${gameState.round}`;
  
  const turnIndicator = document.getElementById('gameTurnIndicator');
  
  // Process Dynamic Panels based on Game State
  document.querySelectorAll('.game-step-view').forEach(panel => panel.classList.remove('active'));

  if (gameState.status === 'GAME_SELECTOR') {
    document.getElementById('stepGameSelector').classList.add('active');
    
    roundEl.textContent = "Love Lounge";
    turnIndicator.textContent = isHost ? "Select a game" : "Waiting for partner...";
    
    const cardGrid = document.getElementById('gameSelectionGrid');
    const waitingEl = document.getElementById('gameSelectorWaiting');
    
    if (isHost) {
      cardGrid.classList.remove('hidden');
      waitingEl.classList.add('hidden');
    } else {
      cardGrid.classList.add('hidden');
      waitingEl.classList.remove('hidden');
    }
  }

  else if (gameState.status === 'WORD_SETUP') {
    document.getElementById('stepWordSetup').classList.add('active');
    
    const myTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    
    if (myTurn) {
      turnIndicator.textContent = "Your Turn to set Starting Letter";
      document.getElementById('wordSetupDesc').textContent = "Choose a starting letter (A-Z) to begin the round constraint.";
      document.getElementById('wordSetupInputArea').classList.remove('hidden');
      document.getElementById('wordSetupWaiting').classList.add('hidden');
      document.getElementById('baseWordInput').focus();
    } else {
      turnIndicator.textContent = `${partnerName}'s Turn`;
      document.getElementById('wordSetupDesc').textContent = `Waiting for ${partnerName} to choose starting letter...`;
      document.getElementById('wordSetupInputArea').classList.add('hidden');
      document.getElementById('wordSetupWaiting').classList.remove('hidden');
    }
  } 
  
  else if (gameState.status === 'LETTER_SETUP') {
    document.getElementById('stepLetterSetup').classList.add('active');
    document.getElementById('lastLetterDisplay').textContent = gameState.startLetter;
    
    const myTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    
    if (myTurn) {
      turnIndicator.textContent = "Your Turn to set Ending Letter";
      document.getElementById('letterSetupDesc').textContent = `Set the target ending letter. The starting letter is "${gameState.startLetter}".`;
      document.getElementById('letterSetupInputArea').classList.remove('hidden');
      document.getElementById('letterSetupWaiting').classList.add('hidden');
      document.getElementById('endingLetterInput').focus();
    } else {
      turnIndicator.textContent = `${partnerName}'s Turn`;
      document.getElementById('letterSetupDesc').textContent = `Waiting for ${partnerName} to pick the ending letter constraint...`;
      document.getElementById('letterSetupInputArea').classList.add('hidden');
      document.getElementById('letterSetupWaiting').classList.remove('hidden');
    }
  } 
  
  else if (gameState.status === 'RACE') {
    document.getElementById('stepRace').classList.add('active');
    turnIndicator.textContent = "🔥 FASTEST WORD WINS! 🔥";
    
    document.getElementById('raceStartLetter').textContent = gameState.startLetter;
    document.getElementById('raceEndLetter').textContent = gameState.endLetter;
    
    // Update Timer display
    const timerContainer = document.getElementById('raceTimerContainer');
    const countdownEl = document.getElementById('raceCountdown');
    if (countdownEl) {
      countdownEl.textContent = gameState.timeLeft;
    }
    if (timerContainer) {
      timerContainer.classList.toggle('warning', gameState.timeLeft <= 3);
    }

    // Play tick sound when countdown number decreases (Host and Client synced)
    if (gameState.timeLeft !== lastTimeLeft) {
      if (gameState.timeLeft < 15 && gameState.timeLeft > 0 && !gameState.lovePassWord) {
        sound.playTick();
      }
      lastTimeLeft = gameState.timeLeft;
    }
    
    // Clear and enable typing input if just entered race state
    const inputEl = document.getElementById('raceWordInput');
    const submitBtn = document.getElementById('submitRaceWordBtn');
    if (inputEl.getAttribute('data-active-round') !== String(gameState.round)) {
      inputEl.value = '';
      inputEl.disabled = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "SUBMIT WORD 🚀";
      }
      inputEl.setAttribute('data-active-round', String(gameState.round));
      setTimeout(() => inputEl.focus(), 100);
    }

    // Modal Overlays for "Love Pass" check
    if (gameState.lovePassWord) {
      const requesterRole = gameState.lovePassRequester;
      const isMeRequester = (isHost && requesterRole === 'host') || (!isHost && requesterRole === 'client');
      
      if (isMeRequester) {
        // Show waiting popup
        document.getElementById('waitingApprovalModal').classList.remove('hidden');
        document.getElementById('partnerApprovalModal').classList.add('hidden');
      } else {
        // Show approval choice popup
        document.getElementById('approvalRequestMsg').textContent = `Your partner submitted a word, but it isn't in the standard English dictionary. Do you approve?`;
        document.getElementById('challengeWordDisplay').textContent = gameState.lovePassWord;
        
        // Remove old event listeners by replacing buttons
        const approveBtn = document.getElementById('approveWordBtn');
        const rejectBtn = document.getElementById('rejectWordBtn');
        
        const newApprove = approveBtn.cloneNode(true);
        const newReject = rejectBtn.cloneNode(true);
        
        approveBtn.parentNode.replaceChild(newApprove, approveBtn);
        rejectBtn.parentNode.replaceChild(newReject, rejectBtn);
        
        newApprove.addEventListener('click', () => {
          sound.playTap();
          triggerAction({ type: 'ACTION_LOVE_PASS_RESPONSE', approved: true });
        });
        
        newReject.addEventListener('click', () => {
          sound.playTap();
          triggerAction({ type: 'ACTION_LOVE_PASS_RESPONSE', approved: false });
        });
        
        document.getElementById('partnerApprovalModal').classList.remove('hidden');
        document.getElementById('waitingApprovalModal').classList.add('hidden');
      }
    } else {
      // Hide all overlay modals
      document.getElementById('partnerApprovalModal').classList.add('hidden');
      document.getElementById('waitingApprovalModal').classList.add('hidden');
    }
  } 
  
  else if (gameState.status === 'ROUND_END') {
    document.getElementById('stepRoundResult').classList.add('active');
    
    // Hide overlay modals
    document.getElementById('partnerApprovalModal').classList.add('hidden');
    document.getElementById('waitingApprovalModal').classList.add('hidden');
    
    // Reset local timer tracker
    lastTimeLeft = null;
    
    const winIsHost = (gameState.winner === 'host');
    const winIsClient = (gameState.winner === 'client');
    const isMeWinner = (isHost && winIsHost) || (!isHost && winIsClient);
    
    turnIndicator.textContent = "Round Finished";
    
    if (gameState.winner === 'none') {
      document.getElementById('resultEmoji').textContent = "⏰";
      document.getElementById('resultTitle').textContent = "Time's Up! ⌛";
      document.getElementById('resultWordDetail').innerHTML = "Neither of you typed a valid word within 15 seconds. Try to be faster next round!";
    } else {
      const winnerName = winIsHost ? gameState.hostName : gameState.joinerName;
      document.getElementById('resultEmoji').textContent = isMeWinner ? "🏆" : "🥺";
      document.getElementById('resultTitle').textContent = `${winnerName} won the round!`;
      document.getElementById('resultWordDetail').innerHTML = `Submitted word: <strong>${gameState.winningWord}</strong> (Starts with ${gameState.startLetter}, ends with ${gameState.endLetter})`;
    }
    
    document.getElementById('resultHostName').textContent = gameState.hostName;
    document.getElementById('resultHostScore').textContent = gameState.hostScore;
    document.getElementById('resultJoinerName').textContent = gameState.joinerName;
    document.getElementById('resultJoinerScore').textContent = gameState.joinerScore;
    
    // Play confetti and winner sound locally once on round end transition
    const roundEndedMarker = `end-${gameState.round}`;
    if (document.getElementById('stepRoundResult').getAttribute('data-marker') !== roundEndedMarker) {
      document.getElementById('stepRoundResult').setAttribute('data-marker', roundEndedMarker);
      if (gameState.winner === 'none') {
        sound.playBuzzer();
      } else if (isMeWinner) {
        sound.playSuccess();
        triggerConfettiShower();
      } else {
        sound.playChime();
      }
    }
  }

  else if (gameState.status === 'SOS_PLAY') {
    document.getElementById('stepSosPlay').classList.add('active');
    
    const isMyTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    roundEl.textContent = `SOS Classic`;
    turnIndicator.textContent = isMyTurn ? "Your Turn!" : `${partnerName}'s Turn`;
    
    // Update score badges
    document.getElementById('sosHostScore').textContent = gameState.sosScores.host;
    document.getElementById('sosClientScore').textContent = gameState.sosScores.client;
    
    // Pulse turn highlight on player cards
    document.getElementById('playerHostCard').classList.toggle('active-turn', gameState.activePlayer === 'host');
    document.getElementById('playerJoinerCard').classList.toggle('active-turn', gameState.activePlayer === 'client');

    // Draw SOS board
    const gridContainer = document.getElementById('sosGridContainer');
    gridContainer.innerHTML = '';
    
    const getSelectedLetter = () => {
      const radio = document.querySelector('input[name="sosLetter"]:checked');
      return radio ? radio.value : 'S';
    };

    for (let i = 0; i < 36; i++) {
      const cell = document.createElement('div');
      cell.className = 'sos-cell';
      const cellVal = gameState.sosBoard[i];
      
      if (cellVal !== '') {
        cell.textContent = cellVal;
        cell.classList.add('placed', `letter-${cellVal}`);
      }
      
      // Highlight matching cell lines
      gameState.completedSosLines.forEach(line => {
        if (line.cells.includes(i)) {
          if (line.owner === 'host') {
            cell.classList.add('sos-cell-match-host');
          } else {
            cell.classList.add('sos-cell-match-client');
          }
        }
      });
      
      if (cellVal === '' && isMyTurn) {
        cell.addEventListener('click', () => {
          const letter = getSelectedLetter();
          triggerAction({ type: 'ACTION_SOS_MOVE', cellIndex: i, letter: letter });
        });
      }
      
      gridContainer.appendChild(cell);
    }
  }

  else if (gameState.status === 'SOS_END') {
    document.getElementById('stepSosResult').classList.add('active');
    
    roundEl.textContent = `SOS Finished`;
    turnIndicator.textContent = `Game Finished`;
    
    const hs = gameState.sosScores.host;
    const cs = gameState.sosScores.client;
    const winIsHost = (gameState.winner === 'host');
    const winIsClient = (gameState.winner === 'client');
    const isMeWinner = (isHost && winIsHost) || (!isHost && winIsClient);
    
    if (gameState.winner === 'tie') {
      document.getElementById('sosResultEmoji').textContent = "🤝";
      document.getElementById('sosResultTitle').textContent = "It's a Tie! 💖";
      document.getElementById('sosResultDetail').textContent = `Final Score: ${hs} vs ${cs}`;
    } else {
      const winnerName = winIsHost ? gameState.hostName : gameState.joinerName;
      document.getElementById('sosResultEmoji').textContent = isMeWinner ? "🏆" : "🥺";
      document.getElementById('sosResultTitle').textContent = `${winnerName} Won!`;
      document.getElementById('sosResultDetail').textContent = `Final Score: ${hs} vs ${cs}`;
    }
    
    // Play confetti and sound locally once on round end transition
    const roundEndedMarker = `end-sos`;
    if (document.getElementById('stepSosResult').getAttribute('data-marker') !== roundEndedMarker) {
      document.getElementById('stepSosResult').setAttribute('data-marker', roundEndedMarker);
      if (gameState.winner === 'tie') {
        sound.playChime();
      } else if (isMeWinner) {
        sound.playSuccess();
        triggerConfettiShower();
      } else {
        sound.playChime();
      }
    }
  }

  else if (gameState.status === 'QUIZ_PLAY') {
    document.getElementById('stepQuizPlay').classList.add('active');
    
    roundEl.textContent = `Sync Quiz`;
    turnIndicator.textContent = `Let's Match!`;
    
    // Set Question index and text
    document.getElementById('quizQuestionNum').textContent = gameState.quizIndex + 1;
    document.getElementById('quizQuestionText').textContent = quizQuestions[gameState.quizIndex];
    
    const myAnswerSubmitted = isHost ? (gameState.quizAnswers.host !== '') : (gameState.quizAnswers.client !== '');
    
    const inputArea = document.getElementById('quizInputArea');
    const waitingEl = document.getElementById('quizWaitingPartner');
    
    if (myAnswerSubmitted) {
      inputArea.classList.add('hidden');
      waitingEl.classList.remove('hidden');
    } else {
      inputArea.classList.remove('hidden');
      waitingEl.classList.add('hidden');
      
      // Clear input when question changes
      const textInput = document.getElementById('quizAnswerInput');
      if (textInput.getAttribute('data-active-q') !== String(gameState.quizIndex)) {
        textInput.value = '';
        textInput.setAttribute('data-active-q', String(gameState.quizIndex));
        setTimeout(() => textInput.focus(), 100);
      }
    }
  }

  else if (gameState.status === 'QUIZ_REVEAL') {
    document.getElementById('stepQuizReveal').classList.add('active');
    
    roundEl.textContent = `Sync Quiz Reveal`;
    turnIndicator.textContent = isHost ? `Evaluate the Match!` : `Revealing Answers...`;
    
    document.getElementById('quizRevealQuestionText').textContent = quizQuestions[gameState.quizIndex];
    
    // Set answers and roles
    document.getElementById('quizRevealHostName').textContent = gameState.hostName;
    document.getElementById('quizRevealHostAnswer').textContent = gameState.quizAnswers.host;
    document.getElementById('quizRevealClientName').textContent = gameState.joinerName;
    document.getElementById('quizRevealClientAnswer').textContent = gameState.quizAnswers.client;
    
    const evalArea = document.getElementById('quizEvaluateArea');
    const evalWaiting = document.getElementById('quizEvaluateWaiting');
    
    if (isHost) {
      evalArea.classList.remove('hidden');
      evalWaiting.classList.add('hidden');
    } else {
      evalArea.classList.add('hidden');
      evalWaiting.classList.remove('hidden');
    }
  }

  else if (gameState.status === 'QUIZ_END') {
    document.getElementById('stepQuizResult').classList.add('active');
    
    roundEl.textContent = `Quiz Finished`;
    turnIndicator.textContent = `Synergy Revealed`;
    
    const matches = gameState.quizMatches;
    const totalQ = quizQuestions.length;
    const scorePct = Math.round((matches / totalQ) * 100);
    
    document.getElementById('quizSyncPercentage').textContent = `${scorePct}% Synced`;
    document.getElementById('quizSyncMeterFill').style.width = `${scorePct}%`;
    
    let description = '';
    if (scorePct >= 90) {
      description = `🔥 Soulmates! You two know each other inside out. Absolutely perfect synergy! 💖`;
    } else if (scorePct >= 70) {
      description = `💕 Cute Match! You guys are highly synced and make a wonderful couple! Keep it up.`;
    } else if (scorePct >= 50) {
      description = `🌱 In Training! You match on some key things, but there's plenty of space to learn and explore each other!`;
    } else {
      description = `🙈 Room to Grow! Use this as a fun excuse to talk more, tell stories, and discover secrets! 💬`;
    }
    
    document.getElementById('quizResultDetail').textContent = description;
    
    // Play confetti and sound locally once on round end transition
    const roundEndedMarker = `end-quiz`;
    if (document.getElementById('stepQuizResult').getAttribute('data-marker') !== roundEndedMarker) {
      document.getElementById('stepQuizResult').setAttribute('data-marker', roundEndedMarker);
      if (scorePct >= 70) {
        sound.playSuccess();
        triggerConfettiShower();
      } else {
        sound.playChime();
      }
    }
  }

  else if (gameState.status === 'RPS_PLAY') {
    document.getElementById('stepRpsPlay').classList.add('active');
    
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `Choose your weapon`;
    
    const myChoice = isHost ? gameState.rpsChoices.host : gameState.rpsChoices.client;
    
    const weaponSelector = document.getElementById('rpsWeaponSelector');
    const waitingEl = document.getElementById('rpsWaitingPartner');
    const waitingText = document.getElementById('rpsWaitingText');
    
    // Highlight or reset selector buttons based on current player choice
    document.querySelectorAll('.rps-btn').forEach(btn => {
      const weapon = btn.getAttribute('data-weapon');
      if (myChoice === weapon) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    if (myChoice !== '') {
      weaponSelector.classList.add('hidden');
      waitingEl.classList.remove('hidden');
      waitingText.textContent = `Waiting for ${partnerName} to choose...`;
    } else {
      weaponSelector.classList.remove('hidden');
      waitingEl.classList.add('hidden');
    }
  }

  else if (gameState.status === 'RPS_REVEAL') {
    document.getElementById('stepRpsReveal').classList.add('active');
    
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `Showdown!`;
    
    const hostWeapon = gameState.rpsChoices.host;
    const clientWeapon = gameState.rpsChoices.client;
    
    const rpsDetails = {
      rock: { emoji: '🪨', label: 'Rock' },
      paper: { emoji: '✉️', label: 'Love Letter' },
      scissors: { emoji: '✂️', label: 'Scissors' }
    };
    
    // Set text and roles
    document.getElementById('rpsRevealHostRole').textContent = gameState.hostName;
    document.getElementById('rpsRevealHostEmoji').textContent = rpsDetails[hostWeapon].emoji;
    document.getElementById('rpsRevealHostLabel').textContent = rpsDetails[hostWeapon].label;
    
    document.getElementById('rpsRevealClientRole').textContent = gameState.joinerName;
    document.getElementById('rpsRevealClientEmoji').textContent = rpsDetails[clientWeapon].emoji;
    document.getElementById('rpsRevealClientLabel').textContent = rpsDetails[clientWeapon].label;
    
    // Highlight winner card
    const hostCard = document.getElementById('rpsRevealHostCard');
    const clientCard = document.getElementById('rpsRevealClientCard');
    hostCard.classList.remove('winner-card-host');
    clientCard.classList.remove('winner-card-client');
    
    const emojiEl = document.getElementById('rpsResultEmoji');
    const titleEl = document.getElementById('rpsResultTitle');
    const detailEl = document.getElementById('rpsResultDetail');
    
    if (gameState.winner === 'tie') {
      emojiEl.textContent = '🤝';
      titleEl.textContent = "It's a Tie! 💖";
      detailEl.textContent = `You both chose ${rpsDetails[hostWeapon].label}!`;
    } else {
      const winIsHost = (gameState.winner === 'host');
      const isMeWinner = (role === gameState.winner);
      const winnerName = winIsHost ? gameState.hostName : gameState.joinerName;
      const winnerWeapon = winIsHost ? hostWeapon : clientWeapon;
      const loserWeapon = winIsHost ? clientWeapon : hostWeapon;
      
      const getRpsComparisonText = (wWeapon, lWeapon) => {
        if (wWeapon === 'paper' && lWeapon === 'rock') {
          return 'Love Letter wraps the Rock! ✉️ > 🪨';
        }
        if (wWeapon === 'scissors' && lWeapon === 'paper') {
          return 'Scissors cut the Love Letter! ✂️ > ✉️';
        }
        if (wWeapon === 'rock' && lWeapon === 'scissors') {
          return 'Rock smashes the Scissors! 🪨 > ✂️';
        }
        return '';
      };
      
      if (winIsHost) {
        hostCard.classList.add('winner-card-host');
      } else {
        clientCard.classList.add('winner-card-client');
      }
      
      emojiEl.textContent = isMeWinner ? '🎉' : '🥺';
      titleEl.textContent = getRpsComparisonText(winnerWeapon, loserWeapon);
      detailEl.textContent = `${winnerName} won the clash!`;
    }
    
    // Play confetti and sound locally once on round end transition
    const rpsRevealMarker = `end-rps-${gameState.round}`;
    if (document.getElementById('stepRpsReveal').getAttribute('data-marker') !== rpsRevealMarker) {
      document.getElementById('stepRpsReveal').setAttribute('data-marker', rpsRevealMarker);
      if (gameState.winner === 'tie') {
        sound.playChime();
      } else {
        const isMeWinner = (role === gameState.winner);
        if (isMeWinner) {
          sound.playSuccess();
          triggerConfettiShower();
        } else {
          sound.playChime();
        }
      }
    }
  }
}

// Confetti particle helper
function triggerConfettiShower() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ==========================================================================
// CHAT WIDGET FUNCTIONALITY
// ==========================================================================

function initChatWidget() {
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');

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

function sendChatMessage() {
  const chatInput = document.getElementById('chatInput');
  if (!chatInput) return;

  const text = chatInput.value.trim();
  if (!text) return;

  // Clear input
  chatInput.value = '';

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
    messageEl.className = `chat-bubble ${sender === 'me' ? 'sent' : 'received'}`;
    
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
    
    const partnerName = (role === 'host') ? gameState.joinerName : gameState.hostName;
    if (placeholderText) {
      placeholderText.textContent = `Linked with ${partnerName}! Send a sweet message. 💖`;
    }
    
    // Add system connected message
    appendChatMessage('system', `Connected with ${partnerName}!`, true);
  } else {
    statusDot.className = 'chat-status-dot offline';
    chatInput.disabled = true;
    chatInput.value = '';
    chatSendBtn.disabled = true;
    
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

// Auto-initialize chat widget on script load
initChatWidget();
