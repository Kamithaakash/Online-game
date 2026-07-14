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

  playKiss() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playSpank() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playTickle() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [600, 750, 600, 750, 900];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.03, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.05);
    });
  }

  playNibble() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.15);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playHug() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(329.63, now);
    osc1.frequency.linearRampToValueAtTime(392.00, now + 0.25);
    gain1.gain.setValueAtTime(0.06, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(392.00, now);
    osc2.frequency.linearRampToValueAtTime(493.88, now + 0.25);
    gain2.gain.setValueAtTime(0.06, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.35);
    osc2.start(now);
    osc2.stop(now + 0.35);
  }
}

const sound = new SoundFX();

// ==========================================================================
// GAME ENGINE & NETWORK STATE
// ==========================================================================
let role = null; // 'host' or 'client'
let raceTimerInterval = null;
let lastTimeLeft = null;

// Chat Widget State
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
  // Spicy Love Dice State
  diceCurrentRoll: { action: '', bodyPart: '' },
  diceWaitingApproval: false,
  diceScores: { host: 0, client: 0 },
  // Intimate Truth or Dare State
  todCurrentPrompt: '',
  todCurrentType: '', // 'truth' or 'dare'
  todWaitingApproval: false,
  todScores: { host: 0, client: 0 },
  // Never Have I Ever State
  nhieCurrentPrompt: '',
  nhieAnswers: { host: '', client: '' },
  nhieScores: { host: 0, client: 0 }, // optional, if we want to track how many 'I Have's
  // Erotic Roleplay State
  rpScenarioTitle: '',
  rpScenarioDesc: '',
  rpRoles: { host: '', client: '' },
  rpObjectives: { host: '', client: '' },
  // Tease & Command State
  teaseCommander: '', // 'host' or 'client'
  teaseOptions: [], // array of 3 command strings
  teaseChosenCommand: '',
  // Edge Roulette State
  rouletteStateText: 'WAIT', // 'WAIT', 'SLOW TEASE', 'FAST STROKES', 'HANDS OFF', 'EDGE', 'FINISH!'
  rouletteTimer: 0 // seconds left for current state
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
  localStorage.setItem('heartplay_sound', isSoundOn ? 'on' : 'off');
  document.getElementById('soundOnIcon').classList.toggle('hidden', !isSoundOn);
  document.getElementById('soundOffIcon').classList.toggle('hidden', isSoundOn);
});

// Setup Lobby Controls
document.getElementById('createRoomBtn').addEventListener('click', (e) => {
  sound.playTap();
  e.target.disabled = true;
  e.target.textContent = 'Creating... ⏳';
  const nameInput = document.getElementById('nicknameInput').value.trim();
  const nickname = nameInput || getRandomNickname();
  localStorage.setItem('heartplay_nickname', nickname);
  role = 'host';
  hostRoom(nickname);
});

document.getElementById('joinRoomBtn').addEventListener('click', (e) => {
  sound.playTap();
  const nameInput = document.getElementById('nicknameInput').value.trim();
  const codeInput = document.getElementById('joinCodeInput').value.trim();
  const nickname = nameInput || getRandomNickname();
  
  if (!codeInput) {
    showError('Please enter a room code first.', 'join');
    return;
  }
  
  localStorage.setItem('heartplay_nickname', nickname);
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

document.getElementById('nhieSkipBtn')?.addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NEXT_NHIE_ROUND' });
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

// Spicy Love Dice Controls
document.getElementById('rollDiceBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_DICE_ROLL' });
});

document.getElementById('diceApproveBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_DICE_EVALUATE', approved: true });
});

document.getElementById('diceRejectBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_DICE_EVALUATE', approved: false });
});

document.getElementById('nextDiceRoundBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NEXT_DICE_ROUND' });
});

document.getElementById('exitDiceBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// --- TRUTH OR DARE LISTENERS ---
document.getElementById('todTruthBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TOD_CHOICE', choiceType: 'truth' });
});
document.getElementById('todDareBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TOD_CHOICE', choiceType: 'dare' });
});
document.getElementById('todApproveBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TOD_EVALUATE', approved: true });
});
document.getElementById('todRejectBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TOD_EVALUATE', approved: false });
});
document.getElementById('nextTodRoundBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NEXT_TOD_ROUND' });
});
document.getElementById('exitTodBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// --- NEVER HAVE I EVER LISTENERS ---
document.getElementById('nhieHaveBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NHIE_VOTE', vote: 'have' });
});
document.getElementById('nhieHaveNotBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NHIE_VOTE', vote: 'havenot' });
});
document.getElementById('nextNhieRoundBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NEXT_NHIE_ROUND' });
});
document.getElementById('exitNhieBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// --- EROTIC ROLEPLAY LISTENERS ---
document.getElementById('nextRoleplayBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_ROLEPLAY_GENERATE' });
});
document.getElementById('exitRoleplayBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// --- TEASE & COMMAND LISTENERS ---
document.getElementById('teaseCmd1').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TEASE_CHOICE', cmdIndex: 0 });
});
document.getElementById('teaseCmd2').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TEASE_CHOICE', cmdIndex: 1 });
});
document.getElementById('teaseCmd3').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_TEASE_CHOICE', cmdIndex: 2 });
});
document.getElementById('nextTeaseRoundBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_NEXT_TEASE_ROUND' });
});
document.getElementById('exitTeaseBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_EXIT_TO_SELECTOR' });
});

// --- EDGE ROULETTE LISTENERS ---
document.getElementById('rouletteStartBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_ROULETTE_START' });
});
document.getElementById('exitRouletteBtn').addEventListener('click', () => {
  sound.playTap();
  triggerAction({ type: 'ACTION_ROULETTE_EXIT' });
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



// ==========================================================================
// NETWORK LAYER — Firebase Signaling + WebRTC Data Channel
// Works reliably across all home networks and locations.
// ==========================================================================

// --- Firebase Configuration ---
// Loaded at runtime from /api/firebase-config (Vercel serverless function).
// The API key lives ONLY in Vercel environment variables — never in source code.
let FIREBASE_CONFIG = null;

async function loadFirebaseConfig() {
  if (FIREBASE_CONFIG) return FIREBASE_CONFIG;
  try {
    const res = await fetch('/api/firebase-config');
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Config endpoint returned ${res.status}: ${body}`);
    }
    FIREBASE_CONFIG = await res.json();
    return FIREBASE_CONFIG;
  } catch (err) {
    console.error('Failed to load Firebase config:', err);
    showError(`Signaling server config error: ${err.message}. Check Vercel environment variables.`, 'join');
    throw err;
  }
}

// ICE servers: multiple STUN + free TURN relays for maximum compatibility
const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
  { urls: 'stun:stun.cloudflare.com:3478' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject'
  },
  {
    urls: 'turn:openrelay.metered.ca:443',
    username: 'openrelayproject',
    credential: 'openrelayproject'
  },
  {
    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    username: 'openrelayproject',
    credential: 'openrelayproject'
  }
];

// WebRTC peer connection (replaces PeerJS)
let rtcPeer = null;
let dataChannel = null;
let firebaseApp = null;
let firebaseDb = null;
let roomRef = null;
let joinTimeoutHandle = null;
let heartbeatInterval = null;

// PeerJS fallback globals (used alongside WebRTC)
let peer = null;
let conn = null;

// Returns a Promise<FirebaseDatabase> — must be awaited
async function getFirebaseDb() {
  if (firebaseDb) return firebaseDb;
  const config = await loadFirebaseConfig();
  try {
    // Try to reuse existing app
    firebaseApp = firebase.app();
  } catch (e) {
    firebaseApp = firebase.initializeApp(config);
  }
  firebaseDb = firebase.database();
  return firebaseDb;
}

async function hostRoom(nickname) {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  gameState.hostName = nickname;
  gameState.status = 'LOBBY';

  addLog('Connecting to signaling server...', 'system');

  let db;
  try {
    db = await getFirebaseDb();
  } catch (e) {
    addLog('Signaling server unavailable. Using fallback...', 'system');
    hostRoomFallback(nickname, code);
    return;
  }

  roomRef = db.ref(`rooms/${code}`);

  roomRef.remove().then(() => {
    const expiresAt = Date.now() + 30 * 60 * 1000;
    return roomRef.set({ host: { nickname }, expiresAt, status: 'waiting' });
  }).then(() => {
    document.getElementById('roomCodeDisplay').textContent = `HEART-${code}`;
    document.getElementById('roomDetailsPanel').classList.remove('hidden');
    document.getElementById('nicknameInput').disabled = true;
    document.getElementById('createRoomBtn').disabled = true;
    addLog(`Room HEART-${code} created! Waiting for partner...`, 'system');

    rtcPeer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    dataChannel = rtcPeer.createDataChannel('game', { ordered: true });
    setupDataChannel(dataChannel);

    rtcPeer.onicecandidate = (e) => {
      if (e.candidate) {
        roomRef.child('hostCandidates').push(e.candidate.toJSON());
      }
    };

    rtcPeer.onconnectionstatechange = () => {
      addLog(`Connection state: ${rtcPeer.connectionState}`, 'system');
    };

    rtcPeer.createOffer()
      .then(offer => rtcPeer.setLocalDescription(offer))
      .then(() => {
        addLog('Room offer ready. Waiting for partner to join...', 'system');
        return roomRef.child('offer').set({
          type: rtcPeer.localDescription.type,
          sdp: rtcPeer.localDescription.sdp
        });
      }).catch(err => {
        console.error('Offer creation error:', err);
        showError('Failed to create room. Please try again.', 'join');
      });

    roomRef.child('answer').on('value', snapshot => {
      const answer = snapshot.val();
      if (answer && rtcPeer && !rtcPeer.currentRemoteDescription) {
        addLog('Partner found! Establishing connection...', 'system');
        rtcPeer.setRemoteDescription(new RTCSessionDescription(answer))
          .catch(err => console.error('setRemoteDescription (answer) error:', err));
      }
    });

    roomRef.child('clientCandidates').on('child_added', snapshot => {
      const candidate = snapshot.val();
      if (candidate && rtcPeer) {
        rtcPeer.addIceCandidate(new RTCIceCandidate(candidate))
          .catch(err => console.error('addIceCandidate (host) error:', err));
      }
    });

    roomRef.onDisconnect().remove();

  }).catch(err => {
    console.error('Firebase room creation error:', err);
    addLog(`Signaling error: ${err.message || err.code || 'unknown'}. Using fallback...`, 'system');
    hostRoomFallback(nickname, code);
  });
}

// ---- CLIENT/JOIN FLOW ----
async function joinRoom(codeInput, nickname) {
  const code = normalizeRoomCode(codeInput);
  if (!code || code.length !== 4) {
    showError('Invalid code. Please enter a 4-digit numeric code.', 'join');
    return;
  }

  gameState.joinerName = nickname;

  const joinBtn = document.getElementById('joinRoomBtn');
  joinBtn.disabled = true;
  joinBtn.textContent = 'Connecting...';

  addLog('Looking up room...', 'system');

  // Master timeout — ALWAYS fires after 30s no matter what
  joinTimeoutHandle = setTimeout(() => {
    addLog('Connection timed out.', 'system');
    if (rtcPeer) { rtcPeer.close(); rtcPeer = null; }
    if (peer) { peer.destroy(); peer = null; }
    dataChannel = null; conn = null; role = null;
    joinBtn.disabled = false;
    joinBtn.textContent = 'Join Nest';
    showError('Connection timed out. Make sure your partner\'s room is open and try again.', 'join');
  }, 30000);

  let db;
  try {
    db = await getFirebaseDb();
  } catch (e) {
    clearTimeout(joinTimeoutHandle);
    joinBtn.disabled = false;
    joinBtn.textContent = 'Join Nest';
    addLog(`Signaling server error: ${e.message}`, 'system');
    // showError already called inside loadFirebaseConfig
    return;
  }

  roomRef = db.ref(`rooms/${code}`);

  roomRef.child('offer').once('value').then(snapshot => {
    const offer = snapshot.val();
    if (!offer) {
      clearTimeout(joinTimeoutHandle);
      joinBtn.disabled = false;
      joinBtn.textContent = 'Join Room 💞';
      showError('Room not found. Check the code and make sure your partner has created the room first.', 'join');
      addLog('Room not found in signaling server.', 'system');
      return;
    }

    addLog('Room found! Connecting...', 'system');
    rtcPeer = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    rtcPeer.onicecandidate = (e) => {
      if (e.candidate) {
        roomRef.child('clientCandidates').push(e.candidate.toJSON());
      }
    };

    rtcPeer.onconnectionstatechange = () => {
      addLog(`Connection state: ${rtcPeer.connectionState}`, 'system');
      if (rtcPeer.connectionState === 'failed') {
        clearTimeout(joinTimeoutHandle);
        joinBtn.disabled = false;
        joinBtn.textContent = 'Join Room 💞';
        showError('Connection failed. Both players may be behind strict firewalls. Try again.', 'join');
      }
    };

    rtcPeer.ondatachannel = (e) => {
      dataChannel = e.channel;
      setupDataChannel(dataChannel);
    };

    rtcPeer.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => rtcPeer.createAnswer())
      .then(answer => rtcPeer.setLocalDescription(answer))
      .then(() => {
        addLog('Answer sent. Waiting for direct connection...', 'system');
        return roomRef.child('answer').set({
          type: rtcPeer.localDescription.type,
          sdp: rtcPeer.localDescription.sdp
        });
      })
      .catch(err => {
        clearTimeout(joinTimeoutHandle);
        console.error('Join signaling error:', err);
        addLog(`Signaling error: ${err.message || err}`, 'system');
        joinBtn.disabled = false;
        joinBtn.textContent = 'Join Room 💞';
        showError('Signaling failed. Please try again.', 'join');
      });

    roomRef.child('hostCandidates').on('child_added', snapshot => {
      const candidate = snapshot.val();
      if (candidate && rtcPeer) {
        rtcPeer.addIceCandidate(new RTCIceCandidate(candidate))
          .catch(err => console.error('addIceCandidate (client) error:', err));
      }
    });

  }).catch(err => {
    clearTimeout(joinTimeoutHandle);
    console.error('Firebase join error:', err);
    addLog(`Firebase error: ${err.message || err.code || JSON.stringify(err)}. Trying fallback...`, 'system');
    joinBtn.disabled = false;
    joinBtn.textContent = 'Join Nest';
    // Fall back to PeerJS signaling (mirrors hostRoom's fallback behavior)
    joinRoomFallback(codeInput, nickname);
  });
}

function abortJoin(joinBtn, message) {
  if (rtcPeer) { rtcPeer.close(); rtcPeer = null; }
  dataChannel = null;
  role = null;
  joinBtn.disabled = false;
  joinBtn.textContent = 'Join Room 💞';
  showError(message, 'join');
}

// ---- DATA CHANNEL SETUP ----
function setupDataChannel(channel) {
  channel.onopen = () => {
    clearTimeout(joinTimeoutHandle);

    // Re-enable join button if it was a client connection
    const joinBtn = document.getElementById('joinRoomBtn');
    joinBtn.disabled = false;
    joinBtn.textContent = 'Join Room 💞';

    // Shim conn for compatibility with existing code
    conn = {
      open: true,
      send: (msg) => {
        if (dataChannel && dataChannel.readyState === 'open') {
          dataChannel.send(JSON.stringify(msg));
        }
      },
      close: () => { if (rtcPeer) rtcPeer.close(); }
    };

    sound.playChime();
    document.getElementById('joinErrorMsg').classList.add('hidden');

    if (role === 'host') {
      addLog('Partner linked up! Starting game soon...', 'system');
    } else {
      sendNetworkMessage({ type: 'INTRODUCE', nickname: gameState.joinerName });
    }

    updateChatStatus(true);

    // Start heartbeat to detect disconnects
    startHeartbeat();
  };

  channel.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      if (data.type === '__HEARTBEAT__') return; // ignore pings
      handleIncomingMessage(data);
    } catch (err) {
      console.error('Message parse error:', err);
    }
  };

  channel.onclose = () => {
    handleDisconnect();
  };

  channel.onerror = (err) => {
    console.error('Data channel error:', err);
    handleDisconnect();
  };
}

function startHeartbeat() {
  clearInterval(heartbeatInterval);
  heartbeatInterval = setInterval(() => {
    if (dataChannel && dataChannel.readyState === 'open') {
      dataChannel.send(JSON.stringify({ type: '__HEARTBEAT__' }));
    } else if (dataChannel && dataChannel.readyState !== 'connecting') {
      handleDisconnect();
    }
  }, 5000);
}

// ---- MESSAGE SENDING ----
function sendNetworkMessage(msg) {
  if (conn && conn.open) {
    conn.send(msg);
  }
}

// ---- DISCONNECT ----
function handleDisconnect() {
  clearInterval(heartbeatInterval);
  sound.playBuzzer();
  addLog('Connection lost. Returning to Lobby.', 'system');
  alert('Partner disconnected. Returning to lobby setup.');
  clearRaceTimer();

  updateChatStatus(false);

  if (roomRef) { 
    if (role === 'host') { roomRef.remove(); } else { roomRef.off(); }
    roomRef = null; 
  }
  if (rtcPeer) { rtcPeer.close(); rtcPeer = null; }
  if (peer) { peer.destroy(); peer = null; }
  dataChannel = null;
  conn = null;
  role = null;

  document.getElementById('nicknameInput').disabled = false;
  document.getElementById('createRoomBtn').disabled = false;
  document.getElementById('roomDetailsPanel').classList.add('hidden');

  switchScreen('lobbyScreen');
}

// ---- PEERJS FALLBACK (if Firebase is blocked/unavailable) ----
const PEER_CONFIG_FALLBACK = {
  config: {
    iceServers: ICE_SERVERS
  }
};

function hostRoomFallback(nickname, code) {
  addLog('Using fallback connection mode...', 'system');
  const peerId = `heartplay-love-${code}`;
  peer = new Peer(peerId, PEER_CONFIG_FALLBACK);

  peer.on('open', () => {
    document.getElementById('roomCodeDisplay').textContent = `HEART-${code}`;
    document.getElementById('roomDetailsPanel').classList.remove('hidden');
    document.getElementById('nicknameInput').disabled = true;
    document.getElementById('createRoomBtn').disabled = true;
    addLog(`Created room HEART-${code}. Send link to your partner!`, 'system');
  });

  peer.on('connection', (connection) => {
    if (conn) {
      connection.on('open', () => {
        connection.send({ type: 'REJECT', reason: 'Room is occupied!' });
        connection.close();
      });
      return;
    }
    conn = connection;
    setupPeerJsConnection();
  });

  peer.on('error', (err) => {
    if (err.type === 'unavailable-id') {
      hostRoomFallback(nickname);
    } else {
      showError(`Connection error: ${err.message}`, 'join');
    }
  });
}

function joinRoomFallback(codeInput, nickname) {
  const code = normalizeRoomCode(codeInput);
  gameState.joinerName = nickname;
  const hostPeerId = `heartplay-love-${code}`;
  const clientPeerId = `heartplay-client-${Math.random().toString(36).substring(2, 7)}`;

  const joinBtn = document.getElementById('joinRoomBtn');
  joinBtn.disabled = true;
  joinBtn.textContent = 'Connecting...';

  const fbTimeout = setTimeout(() => {
    if (!conn || !conn.open) {
      if (peer) peer.destroy();
      peer = null; conn = null; role = null;
      joinBtn.disabled = false;
      joinBtn.textContent = 'Join Room 💞';
      showError('Connection timed out. Verify the code and try again.', 'join');
    }
  }, 20000);

  peer = new Peer(clientPeerId, PEER_CONFIG_FALLBACK);
  peer.on('open', () => {
    conn = peer.connect(hostPeerId, { reliable: true });
    setupPeerJsConnection(fbTimeout, joinBtn);
  });
  peer.on('error', (err) => {
    clearTimeout(fbTimeout);
    if (peer) peer.destroy();
    peer = null; conn = null; role = null;
    joinBtn.disabled = false;
    joinBtn.textContent = 'Join Room 💞';
    showError('Could not link to room. Verify the code and that your partner has hosted.', 'join');
  });
}

function setupPeerJsConnection(timeoutId, joinBtn) {
  conn.on('open', () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (joinBtn) { joinBtn.disabled = false; joinBtn.textContent = 'Join Room 💞'; }
    sound.playChime();
    document.getElementById('joinErrorMsg').classList.add('hidden');
    if (role === 'host') {
      addLog('Partner linked up! Starting game soon...', 'system');
    } else {
      sendNetworkMessage({ type: 'INTRODUCE', nickname: gameState.joinerName });
    }
    updateChatStatus(true);
  });
  conn.on('data', (data) => handleIncomingMessage(data));
  conn.on('close', () => handleDisconnect());
  conn.on('error', (err) => { console.error('PeerJS data error:', err); handleDisconnect(); });
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

      case 'CHAT_STICKER':
        processLocalSticker(data.stickerId, 'partner');
        break;
        
      case 'ACTION_DICE_ROLL':
        processDiceRoll();
        break;
      case 'ACTION_DICE_EVALUATE':
        processDiceEvaluate(data.approved);
        break;
      case 'ACTION_NEXT_DICE_ROUND':
        processNextDiceRound();
        break;
        
      // Truth or Dare
      case 'ACTION_TOD_CHOICE':
        processTodChoice(data.choiceType);
        break;
      case 'ACTION_TOD_EVALUATE':
        processTodEvaluate(data.approved);
        break;
      case 'ACTION_NEXT_TOD_ROUND':
        processNextTodRound();
        break;
        
      // Never Have I Ever
      case 'ACTION_NHIE_VOTE':
        processNhieVote(data.vote, 'client');
        break;
      case 'ACTION_NEXT_NHIE_ROUND':
        processNextNhieRound();
        break;
        
      // Erotic Roleplay
      case 'ACTION_ROLEPLAY_GENERATE':
        processRoleplayGenerate();
        break;
        
      // Tease & Command
      case 'ACTION_TEASE_CHOICE':
        processTeaseChoice(data.cmdIndex);
        break;
      case 'ACTION_NEXT_TEASE_ROUND':
        processTeaseNextRound();
        break;
        
      // Edge Roulette
      case 'ACTION_ROULETTE_START':
        processRouletteStart();
        break;
      case 'ACTION_ROULETTE_EXIT':
        processRouletteExit();
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

      case 'CHAT_STICKER':
        processLocalSticker(data.stickerId, 'partner');
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
      case 'ACTION_DICE_ROLL':
        processDiceRoll();
        break;
      case 'ACTION_DICE_EVALUATE':
        processDiceEvaluate(action.approved);
        break;
      case 'ACTION_NEXT_DICE_ROUND':
        processNextDiceRound();
        break;
        
      // Truth or Dare
      case 'ACTION_TOD_CHOICE':
        processTodChoice(action.choiceType);
        break;
      case 'ACTION_TOD_EVALUATE':
        processTodEvaluate(action.approved);
        break;
      case 'ACTION_NEXT_TOD_ROUND':
        processNextTodRound();
        break;
        
      // Never Have I Ever
      case 'ACTION_NHIE_VOTE':
        processNhieVote(action.vote, 'host');
        break;
      case 'ACTION_NEXT_NHIE_ROUND':
        processNextNhieRound();
        break;
        
      // Erotic Roleplay
      case 'ACTION_ROLEPLAY_GENERATE':
        processRoleplayGenerate();
        break;
        
      // Tease & Command
      case 'ACTION_TEASE_CHOICE':
        processTeaseChoice(action.cmdIndex);
        break;
      case 'ACTION_NEXT_TEASE_ROUND':
        processTeaseNextRound();
        break;
        
      // Edge Roulette
      case 'ACTION_ROULETTE_START':
        processRouletteStart();
        break;
      case 'ACTION_ROULETTE_EXIT':
        processRouletteExit();
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
    shuffleArray(quizQuestions);
    gameState.quizIndex = 0;
    gameState.quizAnswers = { host: '', client: '' };
    gameState.quizMatches = 0;
    addLog(`--- Game Mode: Sync Quiz started! ---`, 'system');
  } else if (gameType === 'RPS') {
    gameState.status = 'RPS_PLAY';
    gameState.rpsChoices = { host: '', client: '' };
    gameState.rpsScores = { host: 0, client: 0 };
    addLog(`--- Game Mode: Rock Paper Scissors started! ---`, 'system');
  } else if (gameType === 'DICE') {
    gameState.status = 'DICE_PLAY';
    gameState.activePlayer = 'host';
    gameState.diceCurrentRoll = { action: '', bodyPart: '' };
    gameState.diceWaitingApproval = false;
    gameState.diceScores = { host: 0, client: 0 };
    addLog(`--- Game Mode: Spicy Love Dice started! ---`, 'system');
  } else if (gameType === 'TOD') {
    gameState.status = 'TOD_PLAY';
    gameState.activePlayer = 'host';
    gameState.todCurrentPrompt = '';
    gameState.todCurrentType = '';
    gameState.todWaitingApproval = false;
    gameState.todScores = { host: 0, client: 0 };
    addLog(`--- Game Mode: Intimate Truth or Dare started! ---`, 'system');
  } else if (gameType === 'NHIE') {
    gameState.status = 'NHIE_PLAY';
    gameState.nhieHistory = [];
    let prompt = nhieStatements[Math.floor(Math.random() * nhieStatements.length)];
    gameState.nhieHistory.push(prompt);
    gameState.nhieCurrentPrompt = prompt;
    gameState.nhieAnswers = { host: '', client: '' };
    gameState.nhieScores = { host: 0, client: 0 };
    addLog(`--- Game Mode: Never Have I Ever started! ---`, 'system');
  } else if (gameType === 'ROLEPLAY') {
    gameState.status = 'ROLEPLAY_PLAY';
    addLog(`--- Game Mode: Erotic Roleplay started! ---`, 'system');
    processRoleplayGenerate(); // generates first scenario immediately
  } else if (gameType === 'TEASE') {
    gameState.status = 'TEASE_PLAY';
    gameState.teaseCommander = 'host'; // host starts as commander
    gameState.teaseOptions = generateTeaseOptions();
    gameState.teaseChosenCommand = '';
    addLog(`--- Game Mode: Tease & Command started! ---`, 'system');
  } else if (gameType === 'ROULETTE') {
    gameState.status = 'ROULETTE_PLAY';
    gameState.rouletteStateText = 'WAIT';
    gameState.rouletteTimer = 0;
    addLog(`--- Game Mode: Edge Roulette started! ---`, 'system');
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

let quizQuestions = [
  "Where was our first date (or where did we first meet)?",
  "Who is more likely to fall asleep during a movie?",
  "What is your partner's ultimate comfort food?",
  "What is your partner's biggest pet peeve?",
  "Who said 'I love you' first?",
  "Who is the better cook between you two?",
  "If you could travel anywhere together tomorrow, where would you go?",
  "Who is the more organized one in the relationship?",
  "What is your partner's favorite movie or TV show?",
  "What is your favorite memory together so far?",
  "What is my weirdest habit?",
  "Who takes longer to get ready?",
  "What is my go-to karaoke song?",
  "Who is more likely to start an argument over nothing?",
  "What is my favorite physical feature of yours?",
  "If we won the lottery, what is the first thing we would buy?",
  "Who is more romantic?",
  "What is my favorite season of the year?",
  "Who is more likely to survive a zombie apocalypse?",
  "What is my dream job?",
  "Who is more stubborn?",
  "What is my favorite dessert?",
  "Who is the better driver?",
  "Who spends more time on their phone?",
  "What is my biggest fear?",
  "Who is more likely to get a speeding ticket?",
  "What is my favorite way to relax?",
  "Who is more adventurous in bed?",
  "What is my favorite drink?",
  "Who is more likely to cry during a sad movie?"
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
  shuffleArray(quizQuestions);
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

// ==========================================================================
// SPICY LOVE DICE LOGIC
// ==========================================================================
const spicyActions = [
  "Kiss", "Massage", "Lick", "Nibble", "Tease", "Bite", "Tickle", "Caress", "Blow on", "Suck"
];
const spicyBodyParts = [
  "Neck", "Ear", "Lips", "Thighs", "Stomach", "Collarbone", "Fingers", "Chest", "Cheek", "Back"
];

function processDiceRoll() {
  if (gameState.status !== 'DICE_PLAY') return;
  
  // Choose random
  const action = spicyActions[Math.floor(Math.random() * spicyActions.length)];
  const bodyPart = spicyBodyParts[Math.floor(Math.random() * spicyBodyParts.length)];
  
  gameState.diceCurrentRoll = { action, bodyPart };
  gameState.status = 'DICE_RESULT';
  gameState.diceWaitingApproval = true;
  
  const submitterName = (gameState.activePlayer === 'host') ? gameState.hostName : gameState.joinerName;
  addLog(`🎲 ${submitterName} rolled: ${action} the ${bodyPart}!`, 'play');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

function processDiceEvaluate(approved) {
  if (gameState.status !== 'DICE_RESULT') return;
  if (!gameState.diceWaitingApproval) return;
  
  gameState.diceWaitingApproval = false;
  
  const submitterName = (gameState.activePlayer === 'host') ? gameState.hostName : gameState.joinerName;
  
  if (approved) {
    if (gameState.activePlayer === 'host') {
      gameState.hostScore++;
      gameState.diceScores.host++;
    } else {
      gameState.joinerScore++;
      gameState.diceScores.client++;
    }
    addLog(`❤️ ${submitterName} completed the challenge! (+1 Point)`, 'points');
    sound.playSuccess();
  } else {
    addLog(`❌ Challenge skipped.`, 'system');
    sound.playBuzzer();
  }

  broadcastState();
  renderUI();
}

function processNextDiceRound() {
  gameState.status = 'DICE_PLAY';
  gameState.activePlayer = (gameState.activePlayer === 'host') ? 'client' : 'host';
  gameState.diceCurrentRoll = { action: '', bodyPart: '' };
  gameState.diceWaitingApproval = false;
  gameState.round++;
  
  addLog(`--- Dice Round ${gameState.round} Started ---`, 'system');
  
  broadcastState();
  renderUI();
  sound.playTap();
}

// ==========================================================================
// INTIMATE TRUTH OR DARE LOGIC
// ==========================================================================
const todTruths = [
  "What is your biggest sexual fantasy involving us?",
  "Where is your favorite place to be kissed or touched?",
  "What's a kink you've always wanted to try but never told me?",
  "What is the dirtiest dream you've ever had about me?",
  "What outfit of mine turns you on the most?",
  "If we could have sex anywhere in the world right now, where would it be?",
  "What is your favorite memory of us being intimate?",
  "What's something I do normally that you find incredibly sexy?",
  "Have you ever masturbated while thinking about me?",
  "What is the most adventurous place you'd want to get intimate?"
];

const todDares = [
  "Take off one piece of my clothing using only your teeth.",
  "Give me a 2-minute sensual massage anywhere you want.",
  "Perform a 1-minute striptease for me.",
  "Kiss your way down my stomach and linger there.",
  "Whisper your dirtiest thought into my ear.",
  "Blindfold me and use an ice cube (or warm breath) on my neck.",
  "Let me take off one piece of your clothing.",
  "Kiss me passionately for 30 seconds without using your hands.",
  "Trace my lips with your fingers, then kiss me.",
  "Sit on my lap and grind for 30 seconds."
];

function processTodChoice(choiceType) {
  if (gameState.status !== 'TOD_PLAY') return;
  
  const promptList = (choiceType === 'truth') ? todTruths : todDares;
  const prompt = promptList[Math.floor(Math.random() * promptList.length)];
  
  gameState.todCurrentType = choiceType;
  gameState.todCurrentPrompt = prompt;
  gameState.status = 'TOD_RESULT';
  gameState.todWaitingApproval = true;
  
  const submitterName = (gameState.activePlayer === 'host') ? gameState.hostName : gameState.joinerName;
  const emoji = choiceType === 'truth' ? '🗣️' : '😈';
  addLog(`🔥 ${submitterName} chose ${choiceType.toUpperCase()}! ${emoji}`, 'play');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

function processTodEvaluate(approved) {
  if (gameState.status !== 'TOD_RESULT') return;
  if (!gameState.todWaitingApproval) return;
  
  gameState.todWaitingApproval = false;
  const submitterName = (gameState.activePlayer === 'host') ? gameState.hostName : gameState.joinerName;
  
  if (approved) {
    if (gameState.activePlayer === 'host') {
      gameState.hostScore++;
      gameState.todScores.host++;
    } else {
      gameState.joinerScore++;
      gameState.todScores.client++;
    }
    addLog(`❤️ ${submitterName} completed the ${gameState.todCurrentType}! (+1 Point)`, 'points');
    sound.playSuccess();
  } else {
    addLog(`❌ Challenge skipped.`, 'system');
    sound.playBuzzer();
  }

  broadcastState();
  renderUI();
}

function processNextTodRound() {
  gameState.status = 'TOD_PLAY';
  gameState.activePlayer = (gameState.activePlayer === 'host') ? 'client' : 'host';
  gameState.todCurrentPrompt = '';
  gameState.todCurrentType = '';
  gameState.todWaitingApproval = false;
  gameState.round++;
  
  addLog(`--- Truth or Dare Round ${gameState.round} Started ---`, 'system');
  
  broadcastState();
  renderUI();
  sound.playTap();
}

// ==========================================================================
// NEVER HAVE I EVER LOGIC
// ==========================================================================
const nhieStatements = [
  "Never have I ever fantasized about a threesome.",
  "Never have I ever worn lingerie (or gone commando) in public.",
  "Never have I ever watched porn together with a partner.",
  "Never have I ever roleplayed in the bedroom.",
  "Never have I ever sent a nude photo to you.",
  "Never have I ever faked an orgasm.",
  "Never have I ever been caught in the act.",
  "Never have I ever used a sex toy on a partner.",
  "Never have I ever kissed someone of the same sex.",
  "Never have I ever had sex in a public place."
];

function processNhieVote(vote, voterRole) {
  if (gameState.status !== 'NHIE_PLAY') return;
  
  gameState.nhieAnswers[voterRole] = vote;
  
  const voterName = (voterRole === 'host') ? gameState.hostName : gameState.joinerName;
  addLog(`🙈 ${voterName} has voted secretly...`, 'system');
  
  // Check if both voted
  if (gameState.nhieAnswers.host !== '' && gameState.nhieAnswers.client !== '') {
    gameState.status = 'NHIE_RESULT';
    addLog(`✨ Both players voted! The truth is revealed!`, 'play');
    sound.playSuccess();
  } else {
    sound.playTap();
  }
  
  broadcastState();
  renderUI();
}

function processNextNhieRound() {
  gameState.status = 'NHIE_PLAY';
  let available = nhieStatements.filter(s => !(gameState.nhieHistory || []).includes(s));
  if (available.length === 0) {
      gameState.nhieHistory = [];
      available = nhieStatements;
  }
  let nextPrompt = available[Math.floor(Math.random() * available.length)];
  if (!gameState.nhieHistory) gameState.nhieHistory = [];
  gameState.nhieHistory.push(nextPrompt);
  gameState.nhieCurrentPrompt = nextPrompt;
  
  gameState.nhieAnswers = { host: '', client: '' };
  gameState.round++;
  
  addLog(`--- NHIE Round ${gameState.round} Started ---`, 'system');
  
  broadcastState();
  renderUI();
  sound.playTap();
}

// ==========================================================================
// EROTIC ROLEPLAY GENERATOR LOGIC
// ==========================================================================
const rpScenarios = [
  {
    title: "The Strict Boss & Naughty Secretary",
    desc: "Late night at the office. Everyone else has gone home.",
    roleA: "The Boss: Strict, demanding, and secretly incredibly horny.",
    roleB: "The Secretary: Innocent-looking but purposely making mistakes to get punished.",
    objA: "Command them to get on their knees and beg for forgiveness.",
    objB: "Tease them until they lose their professional composure completely."
  },
  {
    title: "Strangers at the Hotel Bar",
    desc: "You are two strangers who lock eyes across a dimly lit bar.",
    roleA: "The Confident Stranger: Smooth, direct, and knows exactly what they want.",
    roleB: "The Shy Traveler: A bit nervous but desperately craving attention.",
    objA: "Convince them to go to the bathroom with you right now.",
    objB: "Make them buy you a drink by complimenting a specific body part."
  },
  {
    title: "Caught Cheating on a Test",
    desc: "A strict professor catches a student cheating on a final exam.",
    roleA: "The Professor: Disappointed but willing to offer 'extra credit'.",
    roleB: "The Student: Desperate to pass by any means necessary.",
    objA: "Make them describe exactly what they'll do to pass.",
    objB: "Offer to do something completely inappropriate to raise your grade."
  },
  {
    title: "The Delivery Driver & Lonely Housewife/Husband",
    desc: "A delivery driver arrives with a package that needs a 'special signature'.",
    roleA: "The Driver: Hot, sweaty, and definitely noticing the customer's attire.",
    roleB: "The Customer: Wearing something entirely inappropriate for opening the door.",
    objA: "Ask to come inside for a glass of water.",
    objB: "Pretend you don't have cash for a tip and offer an alternative."
  },
  {
    title: "The Strict Personal Trainer",
    desc: "An intense personal training session after hours at the gym.",
    roleA: "The Trainer: Demanding perfection and very hands-on.",
    roleB: "The Client: Exhausted but extremely turned on by the authority.",
    objA: "Punish them for bad form with a physical consequence.",
    objB: "Beg for a 'rest' by offering a different kind of workout."
  },
  {
    title: "The Maid & The Billionaire",
    desc: "Cleaning a massive penthouse suite when the owner suddenly arrives early.",
    roleA: "The Billionaire: Used to getting whatever they want, whenever they want.",
    roleB: "The Maid: Caught snooping in the bedroom and looking for a way out of trouble.",
    objA: "Demand they clean a specific area very, very slowly.",
    objB: "Offer a 'deep clean' to keep your job."
  },
  {
    title: "The Burglary Gone Wrong",
    desc: "A masked intruder breaks into a house, but the owner was awake and waiting.",
    roleA: "The Intruder: Caught off guard and tied up by the surprisingly prepared owner.",
    roleB: "The Owner: Completely in control and ready to interrogate.",
    objA: "Try to negotiate your release using only your body.",
    objB: "Search the intruder thoroughly for 'hidden weapons'."
  },
  {
    title: "The Jealous Ex-Lover at a Wedding",
    desc: "Crashing a mutual friend's wedding to confront a former lover.",
    roleA: "The Ex: Drunk on champagne, jealous, and reckless.",
    roleB: "The Guest: Trying to keep things quiet but unable to resist the tension.",
    objA: "Corner them in the coat closet and make them admit they miss you.",
    objB: "Try to push them away but fail miserably."
  },
  {
    title: "The Vampire & The Willing Victim",
    desc: "A seductive immortal corners a human who has been seeking them out.",
    roleA: "The Vampire: Hungry, ancient, and deeply sensual.",
    roleB: "The Human: Terrified but entirely mesmerized and willing.",
    objA: "Hypnotize them into exposing their neck and begging for the bite.",
    objB: "Offer yourself completely and describe how it feels."
  },
  {
    title: "The Cop & The Speeding Driver",
    desc: "Pulled over on a deserted highway in the middle of the night.",
    roleA: "The Officer: Stern, authoritative, and demanding a reason not to write a ticket.",
    roleB: "The Driver: Flirtatious and willing to do anything to avoid the fine.",
    objA: "Order them out of the car for a 'pat down'.",
    objB: "Suggest a way to pay the fine right here, right now."
  }
];

function processRoleplayGenerate() {
  if (gameState.status !== 'ROLEPLAY_PLAY') return;
  
  let available = rpScenarios.filter(s => s.title !== gameState.rpScenarioTitle);
  if (available.length === 0) available = rpScenarios;
  const scenario = available[Math.floor(Math.random() * available.length)];
  
  gameState.rpScenarioTitle = scenario.title;
  gameState.rpScenarioDesc = scenario.desc;
  
  // Randomly assign A/B
  if (Math.random() > 0.5) {
    gameState.rpRoles.host = scenario.roleA;
    gameState.rpObjectives.host = scenario.objA;
    gameState.rpRoles.client = scenario.roleB;
    gameState.rpObjectives.client = scenario.objB;
  } else {
    gameState.rpRoles.host = scenario.roleB;
    gameState.rpObjectives.host = scenario.objB;
    gameState.rpRoles.client = scenario.roleA;
    gameState.rpObjectives.client = scenario.objA;
  }
  
  gameState.round++;
  addLog(`🎭 New Roleplay Scenario Generated!`, 'play');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

// ==========================================================================
// TEASE & COMMAND LOGIC
// ==========================================================================
const teaseCommandsList = [
  "Touch yourself over your clothes for 60 seconds.",
  "Remove your underwear and show me.",
  "Massage your nipples/chest slowly for 2 minutes.",
  "Edge yourself until I say stop.",
  "Whisper what you want me to do to you.",
  "Spank yourself lightly 5 times.",
  "Show me your favorite toy and tell me how you use it.",
  "Kiss the camera and tell me I own you."
];

function generateTeaseOptions() {
  const shuffled = [...teaseCommandsList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function processTeaseNextRound() {
  gameState.status = 'TEASE_PLAY';
  // Swap commander
  if (gameState.teaseCommander === '') {
    gameState.teaseCommander = 'host';
  } else {
    gameState.teaseCommander = (gameState.teaseCommander === 'host') ? 'client' : 'host';
  }
  
  gameState.teaseOptions = generateTeaseOptions();
  gameState.teaseChosenCommand = '';
  gameState.round++;
  
  const cmdName = gameState.teaseCommander === 'host' ? gameState.hostName : gameState.joinerName;
  addLog(`👑 ${cmdName} is now the Commander!`, 'system');
  
  broadcastState();
  renderUI();
  sound.playTap();
}

function processTeaseChoice(cmdIndex) {
  if (gameState.status !== 'TEASE_PLAY') return;
  
  gameState.teaseChosenCommand = gameState.teaseOptions[cmdIndex];
  gameState.status = 'TEASE_RESULT';
  
  addLog(`👑 Commander has chosen! Submissive, obey!`, 'play');
  
  broadcastState();
  renderUI();
  sound.playSuccess();
}

// ==========================================================================
// EDGE ROULETTE LOGIC
// ==========================================================================
const rouletteStates = ['SLOW TEASE', 'FAST STROKES', 'HANDS OFF', 'EDGE'];
let rouletteInterval = null;

function processRouletteStart() {
  if (gameState.status !== 'ROULETTE_PLAY' || role !== 'host') return;
  
  gameState.rouletteStateText = 'SLOW TEASE';
  gameState.rouletteTimer = 15; // 15 seconds for first state
  addLog(`⏱️ Edge Roulette started! Follow the commands!`, 'play');
  
  broadcastState();
  renderUI();
  
  clearInterval(rouletteInterval);
  rouletteInterval = setInterval(() => {
    gameState.rouletteTimer--;
    let stateChanged = false;
    
    if (gameState.rouletteTimer <= 0) {
      stateChanged = true;
      if (gameState.rouletteStateText === 'FINISH!') {
        clearInterval(rouletteInterval);
        gameState.rouletteStateText = 'DONE';
        addLog(`✨ Roulette Complete!`, 'system');
      } else {
        // Pick next state randomly, increasing chance of FINISH as round increases
        if (gameState.round > 5 && Math.random() > 0.7) {
          gameState.rouletteStateText = 'FINISH!';
          gameState.rouletteTimer = 30;
          sound.playSuccess(); // Big sound for finish
        } else {
          gameState.rouletteStateText = rouletteStates[Math.floor(Math.random() * rouletteStates.length)];
          gameState.rouletteTimer = Math.floor(Math.random() * 15) + 10; // 10-25 seconds
          sound.playTap();
        }
        gameState.round++;
      }
    }
    
    if (stateChanged) {
      broadcastState();
    }
    renderUI();
  }, 1000);
}

function processRouletteExit() {
  clearInterval(rouletteInterval);
  processExitToSelector();
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
  lastTimeLeft = null;
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
  if (inputEl) inputEl.blur(); // Dismiss mobile keyboard
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
  
  // Show localized tip inline in chat sidebar
  addLog(reason, 'system');
}

// Real-time Dictionary Validation using embedded dictionary.js data
async function checkWordInDictionary(word) {
  const cleanWord = word.trim().toUpperCase();
  
  if (typeof dictionaryData !== 'undefined' && dictionaryData instanceof Set) {
    return dictionaryData.has(cleanWord);
  }
  
  console.error("Dictionary data is missing!");
  if (typeof showToast === 'function') {
    showToast("Dictionary loading, passing to partner for approval...", "warning", 3500);
  }
  return false; 
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
  // Feed removed as per user request
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
  
  document.getElementById('hostPlayerName').innerHTML = `${gameState.hostName} <span style="font-size: 0.8em;" title="Host">🏠</span>`;
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
    const currentSosState = JSON.stringify(gameState.sosBoard) + JSON.stringify(gameState.completedSosLines) + isMyTurn;
    
    if (gridContainer.getAttribute('data-sos-state') !== currentSosState) {
      gridContainer.setAttribute('data-sos-state', currentSosState);
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
    
    // Reset classes
    hostCard.classList.remove('winner-card-host', 'loser-card');
    clientCard.classList.remove('winner-card-client', 'loser-card');
    
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
          return 'Love Letter SMOTHERS Rock with affection! 😍 💌 > 🪨';
        }
        if (wWeapon === 'scissors' && lWeapon === 'paper') {
          return 'Scissors SHREDS the Love Letter! ✂️ 💥 💌';
        }
        if (wWeapon === 'rock' && lWeapon === 'scissors') {
          return 'Rock SMASHES Scissors to dust! 🪨 💥 ✂️';
        }
        return '';
      };
      
      if (winIsHost) {
        hostCard.classList.add('winner-card-host');
        clientCard.classList.add('loser-card');
      } else {
        clientCard.classList.add('winner-card-client');
        hostCard.classList.add('loser-card');
      }
      
      emojiEl.textContent = isMeWinner ? '🎉' : '🥺';
      titleEl.textContent = getRpsComparisonText(winnerWeapon, loserWeapon);
      detailEl.textContent = `${winnerName} won the clash!`;
    }
    
    // Play confetti and sound locally once on round end transition
    const rpsRevealMarker = `end-rps-${gameState.round}`;
    if (document.getElementById('stepRpsReveal').getAttribute('data-marker') !== rpsRevealMarker) {
      document.getElementById('stepRpsReveal').setAttribute('data-marker', rpsRevealMarker);
      
      // Reset animation by re-triggering overlay
      const overlay = document.getElementById('rpsDramaticOverlay');
      if (overlay) {
        overlay.classList.remove('rps-dramatic-overlay');
        void overlay.offsetWidth; // trigger reflow
        overlay.classList.add('rps-dramatic-overlay');
      }

      // Play dramatic sound sequence
      sound.playTap();
      setTimeout(() => sound.playTap(), 800);
      setTimeout(() => sound.playTap(), 1600);

      setTimeout(() => {
        if (gameState.winner === 'tie') {
          sound.playChime();
        } else {
          const isMeWinner = (role === gameState.winner);
          if (isMeWinner) {
            sound.playSuccess();
            triggerConfettiShower();
          } else {
            sound.playBuzzer();
          }
        }
      }, 3500); // Wait for CSS animation to finish
    }
  }

  else if (gameState.status === 'DICE_PLAY') {
    document.getElementById('stepDicePlay').classList.add('active');
    
    roundEl.textContent = `Round ${gameState.round}`;
    
    const isMyTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    turnIndicator.textContent = isMyTurn ? `Your Turn to Roll!` : `Waiting for ${partnerName}...`;
    
    const rollBtnArea = document.getElementById('diceRollBtnArea');
    const waitingEl = document.getElementById('diceWaitingPartner');
    const waitingText = document.getElementById('diceWaitingText');
    
    if (isMyTurn) {
      rollBtnArea.classList.remove('hidden');
      waitingEl.classList.add('hidden');
    } else {
      rollBtnArea.classList.add('hidden');
      waitingEl.classList.remove('hidden');
      waitingText.textContent = `Waiting for ${partnerName} to roll the dice...`;
    }
    
    // Reset display
    document.getElementById('diceAction').textContent = '?';
    document.getElementById('diceBodyPart').textContent = '?';
  }

  else if (gameState.status === 'DICE_RESULT') {
    document.getElementById('stepDiceResult').classList.add('active');
    
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `Spicy Challenge`;
    
    const isMyTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    const rollerName = gameState.activePlayer === 'host' ? gameState.hostName : gameState.joinerName;
    
    document.getElementById('diceResultAction').textContent = gameState.diceCurrentRoll.action;
    document.getElementById('diceResultBodyPart').textContent = gameState.diceCurrentRoll.bodyPart;
    
    const evalArea = document.getElementById('diceEvaluateArea');
    const waitingEl = document.getElementById('diceEvaluateWaiting');
    const nextRoundArea = document.getElementById('diceNextRoundArea');
    
    if (gameState.diceWaitingApproval) {
      nextRoundArea.classList.add('hidden');
      if (isMyTurn) {
        // I rolled, waiting for partner to approve
        evalArea.classList.add('hidden');
        waitingEl.classList.remove('hidden');
      } else {
        // Partner rolled, I must approve
        evalArea.classList.remove('hidden');
        waitingEl.classList.add('hidden');
        document.getElementById('diceEvalQuestion').textContent = `Did ${rollerName} complete the challenge?`;
      }
    } else {
      // Evaluation is done
      evalArea.classList.add('hidden');
      waitingEl.classList.add('hidden');
      nextRoundArea.classList.remove('hidden');
    }
    
    document.getElementById('diceHostName').textContent = gameState.hostName;
    document.getElementById('diceHostScore').textContent = gameState.diceScores.host;
    document.getElementById('diceJoinerName').textContent = gameState.joinerName;
    document.getElementById('diceJoinerScore').textContent = gameState.diceScores.client;
  }
  
  else if (gameState.status === 'TOD_PLAY') {
    document.getElementById('stepTodPlay').classList.add('active');
    roundEl.textContent = `Round ${gameState.round}`;
    
    const isMyTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    turnIndicator.textContent = isMyTurn ? `Your Turn to Choose!` : `Waiting for ${partnerName}...`;
    
    const btnArea = document.getElementById('todChoiceBtnArea');
    const waitingEl = document.getElementById('todWaitingPartner');
    
    if (isMyTurn) {
      btnArea.classList.remove('hidden');
      waitingEl.classList.add('hidden');
    } else {
      btnArea.classList.add('hidden');
      waitingEl.classList.remove('hidden');
    }
  }
  
  else if (gameState.status === 'TOD_RESULT') {
    document.getElementById('stepTodResult').classList.add('active');
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `Truth or Dare`;
    
    const isMyTurn = (isHost && gameState.activePlayer === 'host') || (!isHost && gameState.activePlayer === 'client');
    const actingName = gameState.activePlayer === 'host' ? gameState.hostName : gameState.joinerName;
    
    document.getElementById('todResultType').textContent = gameState.todCurrentType.toUpperCase() + '!';
    document.getElementById('todChallengeDisplay').textContent = gameState.todCurrentPrompt;
    
    const evalArea = document.getElementById('todEvaluateArea');
    const waitingEl = document.getElementById('todEvaluateWaiting');
    const nextRoundArea = document.getElementById('todNextRoundArea');
    
    if (gameState.todWaitingApproval) {
      nextRoundArea.classList.add('hidden');
      if (isMyTurn) {
        evalArea.classList.add('hidden');
        waitingEl.classList.remove('hidden');
      } else {
        evalArea.classList.remove('hidden');
        waitingEl.classList.add('hidden');
        document.getElementById('todEvalQuestion').textContent = `Did ${actingName} complete the ${gameState.todCurrentType}?`;
      }
    } else {
      evalArea.classList.add('hidden');
      waitingEl.classList.add('hidden');
      nextRoundArea.classList.remove('hidden');
    }
    
    document.getElementById('todHostName').textContent = gameState.hostName;
    document.getElementById('todHostScore').textContent = gameState.todScores.host;
    document.getElementById('todJoinerName').textContent = gameState.joinerName;
    document.getElementById('todJoinerScore').textContent = gameState.todScores.client;
  }
  
  else if (gameState.status === 'NHIE_PLAY') {
    document.getElementById('stepNhiePlay').classList.add('active');
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `Confessions`;
    
    document.getElementById('nhieStatementDisplay').textContent = gameState.nhieCurrentPrompt;
    
    const myVote = isHost ? gameState.nhieAnswers.host : gameState.nhieAnswers.client;
    const btnArea = document.getElementById('nhieVoteBtnArea');
    const waitingEl = document.getElementById('nhieWaitingPartner');
    
    if (myVote === '') {
      btnArea.classList.remove('hidden');
      waitingEl.classList.add('hidden');
    } else {
      btnArea.classList.add('hidden');
      waitingEl.classList.remove('hidden');
    }
  }
  
  else if (gameState.status === 'NHIE_RESULT') {
    document.getElementById('stepNhieResult').classList.add('active');
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `The Truth is Out!`;
    
    document.getElementById('nhieResultStatement').textContent = gameState.nhieCurrentPrompt;
    
    document.getElementById('nhieRevealHostName').textContent = gameState.hostName;
    const hAnswer = gameState.nhieAnswers.host === 'have' ? 'I Have 😈' : 'I Haven\'t 😇';
    document.getElementById('nhieRevealHostAnswer').textContent = hAnswer;
    
    document.getElementById('nhieRevealClientName').textContent = gameState.joinerName;
    const cAnswer = gameState.nhieAnswers.client === 'have' ? 'I Have 😈' : 'I Haven\'t 😇';
    document.getElementById('nhieRevealClientAnswer').textContent = cAnswer;
  }
  
  else if (gameState.status === 'ROLEPLAY_PLAY') {
    document.getElementById('stepRoleplay').classList.add('active');
    roundEl.textContent = `Scenario ${gameState.round}`;
    turnIndicator.textContent = `Act it out!`;
    
    document.getElementById('rpScenarioTitle').textContent = gameState.rpScenarioTitle;
    document.getElementById('rpScenarioDesc').textContent = gameState.rpScenarioDesc;
    
    document.getElementById('rpHostNameLabel').textContent = gameState.hostName;
    document.getElementById('rpHostRole').textContent = gameState.rpRoles.host;
    document.getElementById('rpHostObjective').textContent = gameState.rpObjectives.host;
    
    document.getElementById('rpClientNameLabel').textContent = gameState.joinerName;
    document.getElementById('rpClientRole').textContent = gameState.rpRoles.client;
    document.getElementById('rpClientObjective').textContent = gameState.rpObjectives.client;
    
    // Only host can generate new scenario
    if (isHost) {
      document.getElementById('rpControlsArea').classList.remove('hidden');
    } else {
      document.getElementById('rpControlsArea').classList.add('hidden');
    }
  }
  
  else if (gameState.status === 'TEASE_PLAY') {
    document.getElementById('stepTeasePlay').classList.add('active');
    roundEl.textContent = `Round ${gameState.round}`;
    
    const isCmd = (isHost && gameState.teaseCommander === 'host') || (!isHost && gameState.teaseCommander === 'client');
    const cmdName = gameState.teaseCommander === 'host' ? gameState.hostName : gameState.joinerName;
    
    turnIndicator.textContent = isCmd ? `Your turn to Command!` : `Waiting for orders...`;
    document.getElementById('teaseRoleTitle').textContent = isCmd ? `You are the Commander 👑` : `You are the Submissive ⛓️`;
    document.getElementById('teaseRoleDesc').textContent = isCmd ? `Choose an action for your partner to perform on camera.` : `Wait for your commander's orders...`;
    
    const cmdArea = document.getElementById('teaseCommanderArea');
    const subArea = document.getElementById('teaseSubmissiveArea');
    
    if (isCmd) {
      cmdArea.classList.remove('hidden');
      subArea.classList.add('hidden');
      document.getElementById('teaseCmd1').textContent = gameState.teaseOptions[0];
      document.getElementById('teaseCmd2').textContent = gameState.teaseOptions[1];
      document.getElementById('teaseCmd3').textContent = gameState.teaseOptions[2];
    } else {
      cmdArea.classList.add('hidden');
      subArea.classList.remove('hidden');
    }
  }
  
  else if (gameState.status === 'TEASE_RESULT') {
    document.getElementById('stepTeaseResult').classList.add('active');
    roundEl.textContent = `Round ${gameState.round}`;
    turnIndicator.textContent = `Perform!`;
    
    const isCmd = (isHost && gameState.teaseCommander === 'host') || (!isHost && gameState.teaseCommander === 'client');
    
    document.getElementById('teaseActionTarget').textContent = isCmd ? `Watch closely as they perform:` : `You must perform this action on camera:`;
    document.getElementById('teaseChosenCommand').textContent = gameState.teaseChosenCommand;
    
    if (isHost) {
      document.getElementById('teaseNextRoundArea').classList.remove('hidden');
    } else {
      document.getElementById('teaseNextRoundArea').classList.add('hidden');
    }
  }
  
  else if (gameState.status === 'ROULETTE_PLAY') {
    document.getElementById('stepRoulettePlay').classList.add('active');
    roundEl.textContent = `Synchronized`;
    turnIndicator.textContent = `Follow the pacing!`;
    
    document.getElementById('rouletteActionText').textContent = gameState.rouletteStateText;
    
    // Format timer
    const m = Math.floor(gameState.rouletteTimer / 60);
    const s = gameState.rouletteTimer % 60;
    document.getElementById('rouletteTimerText').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    
    const box = document.getElementById('rouletteDisplayBox');
    box.style.borderColor = '#fff';
    box.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
    
    if (gameState.rouletteStateText === 'FINISH!') {
      box.style.borderColor = '#ff3366';
      box.style.boxShadow = '0 0 40px rgba(255,51,102,0.8)';
      document.getElementById('rouletteActionText').style.color = '#ff3366';
      triggerConfettiShower(); // small confetti blast
    } else if (gameState.rouletteStateText === 'HANDS OFF') {
      box.style.borderColor = '#ffcc00';
      document.getElementById('rouletteActionText').style.color = '#ffcc00';
    } else if (gameState.rouletteStateText === 'EDGE') {
      box.style.borderColor = '#ff0000';
      document.getElementById('rouletteActionText').style.color = '#ff0000';
    } else {
      document.getElementById('rouletteActionText').style.color = '#fff';
    }
    
    if (isHost) {
      document.getElementById('rouletteControlsArea').classList.remove('hidden');
      if (gameState.rouletteStateText === 'WAIT' || gameState.rouletteStateText === 'DONE') {
        document.getElementById('rouletteStartBtn').disabled = false;
      } else {
        document.getElementById('rouletteStartBtn').disabled = true;
      }
    } else {
      document.getElementById('rouletteControlsArea').classList.add('hidden');
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
// CHAT SIDEBAR & STICKERS FUNCTIONALITY
// ==========================================================================

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
  if (!conn || !conn.open) {
      if (typeof showToast === 'function') showToast('Not connected yet!', 'error');
      return;
  }
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
    
    // Enable sticker and emoji buttons
    document.querySelectorAll('.sticker-btn, .emoji-btn').forEach(btn => {
      btn.disabled = false;
    });
    
    const partnerName = (role === 'host') ? gameState.joinerName : gameState.hostName;
    if (placeholderText) {
      placeholderText.textContent = 'Linked with ' + partnerName + '! Send a sweet message. 💖';
    }
    
    // Add system connected message
    appendChatMessage('system', 'Connected with ' + partnerName + '!', true);
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

// Load localStorage preferences
(function loadSavedPreferences() {
  const savedName = localStorage.getItem('heartplay_nickname');
  if (savedName) {
    const nickInput = document.getElementById('nicknameInput');
    if (nickInput) nickInput.value = savedName;
  }
  
  const savedSound = localStorage.getItem('heartplay_sound');
  if (savedSound === 'off') {
    sound.toggle();
    document.getElementById('soundOnIcon').classList.add('hidden');
    document.getElementById('soundOffIcon').classList.remove('hidden');
  }
})();

// ==========================================================================
// QUALITY OF LIFE IMPROVEMENTS
// ==========================================================================

// ── #1 TOAST NOTIFICATION SYSTEM ─────────────────────────────────────────
/**
 * showToast(message, type, duration)
 * type: 'info' | 'success' | 'error' | 'warning'
 * Shows a small popup in the bottom-right corner that fades out automatically.
 */
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `heartplay-toast toast-${type}`;

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: '💬' };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '💬'}</span><span class="toast-msg">${message}</span>`;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  // Auto-remove
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

// ── #2 ROOM CODE INPUT AUTO-FORMAT ───────────────────────────────────────
/**
 * While joiner types their code, auto-format to HEART-XXXX.
 * Allows typing just the 4 digits, or the full code.
 */
(function initJoinCodeAutoFormat() {
  const joinInput = document.getElementById('joinCodeInput');
  if (!joinInput) return;

  joinInput.addEventListener('input', () => {
    // Get raw text, uppercase it, strip everything non-alphanumeric
    let raw = joinInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Strip the HEART prefix so user can paste "HEART-1234" or type "HEART1234"
    // Only strip if the string starts with "HEART" (5 chars) so digits typed first are preserved
    if (raw.startsWith('HEART')) {
      raw = raw.substring(5); // remove exactly the first 5 chars "HEART"
    }

    // Keep only up to 4 chars of the actual code
    raw = raw.slice(0, 4);

    if (raw.length > 0) {
      // Preserve cursor: set value then restore caret to end
      joinInput.value = `HEART-${raw}`;
    } else {
      joinInput.value = '';
    }
  });

  // Allow pressing Enter on the join code input to trigger join
  joinInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('joinRoomBtn')?.click();
    }
  });
})();

// ── #3 RACE INPUT: AUTO-UPPERCASE + LIVE LETTER VALIDATOR ────────────────
/**
 * As the player types in the race word input:
 *  - Converts value to uppercase (CSS shows it visually but value stays lowercase without this)
 *  - Shows ✅ or ❌ in #wordValidationIndicator based on start/end letter match
 */
(function initRaceInputEnhancements() {
  const raceInput = document.getElementById('raceWordInput');
  const indicator = document.getElementById('wordValidationIndicator');
  if (!raceInput || !indicator) return;

  raceInput.addEventListener('input', () => {
    // Auto-uppercase actual value
    const pos = raceInput.selectionStart;
    raceInput.value = raceInput.value.toUpperCase();
    raceInput.setSelectionRange(pos, pos);

    // Live validation feedback
    const word = raceInput.value.trim();
    if (!word || !gameState.startLetter || !gameState.endLetter) {
      indicator.textContent = '';
      indicator.className = 'word-validation-indicator';
      return;
    }

    const startsOk = word.startsWith(gameState.startLetter);
    const endsOk   = word.endsWith(gameState.endLetter);
    const lettersOnly = /^[A-Z]+$/.test(word);

    if (startsOk && endsOk && lettersOnly && word.length >= 2) {
      indicator.textContent = `✅ "${word}" matches ${gameState.startLetter}...${gameState.endLetter}`;
      indicator.className = 'word-validation-indicator valid';
    } else {
      let hint = '';
      if (!startsOk) hint = `Must start with "${gameState.startLetter}"`;
      else if (!endsOk) hint = `Must end with "${gameState.endLetter}"`;
      else if (!lettersOnly) hint = 'Letters only';
      indicator.textContent = `❌ ${hint}`;
      indicator.className = 'word-validation-indicator invalid';
    }
  });

  // Clear indicator when round resets (input is cleared)
  const origSubmit = window.submitRaceWord;
  if (typeof origSubmit === 'function') {
    window.submitRaceWord = function() {
      origSubmit.call(this, ...arguments);
      if (indicator) { indicator.textContent = ''; indicator.className = 'word-validation-indicator'; }
    };
  }

  // QoL 15 fix: also clear indicator when processNextRound triggers and clears the input
  const origProcessNextRound = window.processNextRound;
  if (typeof origProcessNextRound === 'function') {
    window.processNextRound = function() {
      origProcessNextRound.call(this, ...arguments);
      if (indicator) { indicator.textContent = ''; indicator.className = 'word-validation-indicator'; }
    };
  }
})();

// ── #4 BEFORE-UNLOAD DISCONNECT WARNING ──────────────────────────────────
/**
 * If a game is active and the tab is closed or refreshed,
 * the browser shows a native "Leave page?" confirmation dialog.
 */
window.addEventListener('beforeunload', (e) => {
  const activeGameStatuses = [
    'GAME_SELECTOR', 'WORD_SETUP', 'LETTER_SETUP', 'RACE', 'ROUND_END',
    'SOS_PLAY', 'SOS_END', 'QUIZ_PLAY', 'QUIZ_REVEAL', 'QUIZ_END',
    'RPS_PLAY', 'RPS_REVEAL', 'DICE_PLAY', 'DICE_RESULT',
    'TOD_PLAY', 'TOD_RESULT', 'NHIE_PLAY', 'NHIE_RESULT',
    'ROLEPLAY_PLAY', 'TEASE_PLAY', 'TEASE_RESULT', 'ROULETTE_PLAY'
  ];
  if ((conn || dataChannel) && activeGameStatuses.includes(gameState.status)) {
    e.preventDefault();
    e.returnValue = 'Your partner will be disconnected. Are you sure you want to leave?';
    return e.returnValue;
  }
});

// ── #5 COPY FULL SHARE LINK (not just room code) ─────────────────────────
/**
 * Override the copy button to copy the full URL with ?room=XXXX
 * so the partner can click directly and the code auto-fills.
 * Also shows a toast confirming the copy.
 */
(function initShareLinkCopy() {
  const shareBtn = document.getElementById('shareLinkBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    sound.playTap();
    const roomCodeText = document.getElementById('roomCodeDisplay').textContent;
    const digits = roomCodeText.replace('HEART-', '');
    const shareUrl = `${window.location.origin}${window.location.pathname}?room=${digits}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      const origInner = shareBtn.innerHTML;
      shareBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ec4b6" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      showToast(`Share link copied! Send it to your partner 💌`, 'success', 3500);
      setTimeout(() => { shareBtn.innerHTML = origInner; }, 2000);
    }).catch(() => {
      navigator.clipboard.writeText(roomCodeText);
      showToast(`Room code "${roomCodeText}" copied!`, 'info');
    });
  });
})();

// ── #6 GENTLE LOSER CONFETTI ─────────────────────────────────────────────
/**
 * triggerLoserConfetti — a small, soft hearts burst for the non-winning player.
 * Called in renderUI wherever triggerConfettiShower is already being called for the winner.
 */
function triggerLoserConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 30,
    spread: 55,
    origin: { y: 0.7 },
    colors: ['#ff4d6d', '#ff758f', '#ffb3c6', '#ffc8dd'],
    shapes: ['circle'],
    scalar: 0.8,
    gravity: 0.6,
    drift: 0.3
  });
}

// Patch the round result rendering to fire loser confetti
const _origRenderUI = renderUI;
window.renderUI = function() {
  _origRenderUI.apply(this, arguments);

  // Letter Link round end
  if (gameState.status === 'ROUND_END' && gameState.winner !== 'none') {
    const isHost = (role === 'host');
    const isMeWinner = (isHost && gameState.winner === 'host') || (!isHost && gameState.winner === 'client');
    const marker = `loser-${gameState.round}`;
    const el = document.getElementById('stepRoundResult');
    if (el && el.getAttribute('data-loser-marker') !== marker && !isMeWinner) {
      el.setAttribute('data-loser-marker', marker);
      setTimeout(triggerLoserConfetti, 300);
    }
  }

  // SOS end
  if (gameState.status === 'SOS_END' && gameState.winner !== 'tie') {
    const isHost = (role === 'host');
    const isMeWinner = (isHost && gameState.winner === 'host') || (!isHost && gameState.winner === 'client');
    const el = document.getElementById('stepSosResult');
    if (el && el.getAttribute('data-loser-marker') !== 'sos' && !isMeWinner) {
      el.setAttribute('data-loser-marker', 'sos');
      setTimeout(triggerLoserConfetti, 300);
    }
  }

  // RPS reveal
  if (gameState.status === 'RPS_REVEAL' && gameState.winner !== 'tie') {
    const isMeWinner = (role === gameState.winner);
    const el = document.getElementById('stepRpsReveal');
    const marker = `rps-loser-${gameState.round}`;
    if (el && el.getAttribute('data-loser-marker') !== marker && !isMeWinner) {
      el.setAttribute('data-loser-marker', marker);
      setTimeout(triggerLoserConfetti, 300);
    }
  }
};

// ── #7 TIMER URGENCY COLORS ───────────────────────────────────────────────
/**
 * Extends the existing ≤3s warning. Now:
 *  - ≤10s → adds 'timer-caution' (orange)
 *  - ≤5s  → adds 'timer-urgent' (red pulse)
 * The existing 'warning' class at ≤3s remains unchanged.
 */
(function patchTimerColors() {
  const _origInner = renderUI; // already patched above, patch from current window.renderUI
  const _patchedRenderUI = window.renderUI;

  window.renderUI = function() {
    _patchedRenderUI.apply(this, arguments);

    if (gameState.status === 'RACE') {
      const timerContainer = document.getElementById('raceTimerContainer');
      if (timerContainer) {
        timerContainer.classList.toggle('timer-caution', gameState.timeLeft <= 10 && gameState.timeLeft > 5);
        timerContainer.classList.toggle('timer-urgent',  gameState.timeLeft <= 5);
      }
    }
  };
})();

// ── #8 TOAST WIRED INTO KEY GAME EVENTS ──────────────────────────────────
/**
 * Wire toast messages to important moments that previously had no visible feedback.
 * We patch key functions non-destructively using wrapper technique.
 */

// Toast on successful connection
const _origUpdateChatStatus = updateChatStatus;
window.updateChatStatus = function(isOnline) {
  _origUpdateChatStatus.apply(this, arguments);
  if (isOnline) {
    const partnerName = (role === 'host') ? gameState.joinerName : gameState.hostName;
    showToast(`💖 Connected with ${partnerName}!`, 'success', 4000);
  }
};

// Toast on race word rejection
const _origHandleRaceWordRejected = handleRaceWordRejected;
window.handleRaceWordRejected = function(reason) {
  _origHandleRaceWordRejected.apply(this, arguments);
  showToast(reason, 'error', 3500);
};

// Toast when Love Pass is granted or denied (for the requester)
const _origProcessLovePassResponse = processLovePassResponse;
window.processLovePassResponse = function(approved) {
  _origProcessLovePassResponse.apply(this, arguments);
  if (approved) {
    showToast('💌 Love Pass granted! Your partner accepted your word!', 'success', 4000);
  } else {
    showToast('💔 Love Pass denied! Keep typing!', 'warning', 3500);
  }
};

// Toast when a game is selected (brief confirmation)
const _origProcessSelectGame = processSelectGame;
window.processSelectGame = function(gameType) {
  _origProcessSelectGame.apply(this, arguments);
  const gameNames = {
    LETTER_LINK: 'Letter Link', SOS: 'SOS Classic', QUIZ: 'Sync Quiz',
    RPS: 'Rock Paper Scissors', DICE: 'Spicy Love Dice', TOD: 'Truth or Dare',
    NHIE: 'Never Have I Ever', ROLEPLAY: 'Erotic Roleplay',
    TEASE: 'Tease & Command', ROULETTE: 'Edge Roulette'
  };
  const name = gameNames[gameType] || gameType;
  showToast(`🎮 Starting ${name}!`, 'info', 2500);
};
