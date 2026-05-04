// Audio Context setup
let audioCtx;

// Violin Frequencies
const frequencies = {
    'Do': 261.63, // C4
    'Re': 293.66, // D4
    'Mi': 329.63, // E4
    'Sol': 392.00 // G4
};

// Map keys to notes
const keyMap = {
    '1': 'Do',
    '2': 'Re',
    '3': 'Mi',
    '4': 'Sol'
};

// Store active oscillators
const activeOscillators = {};

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playNote(note) {
    initAudio();
    
    if (activeOscillators[note]) return; // Zaten çalıyorsa tekrar başlatma

    const freq = frequencies[note];
    if (!freq) return;

    // Keman benzeri ses için oscillator (sawtooth)
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Titreşim (vibrato) efekti ekleme
    const vibrato = audioCtx.createOscillator();
    vibrato.frequency.value = 6; // 6 Hz titreşim
    const vibratoGain = audioCtx.createGain();
    vibratoGain.gain.value = freq * 0.02; // Titreşim derinliği
    vibrato.connect(vibratoGain);
    vibratoGain.connect(oscillator.frequency);
    vibrato.start();

    // Filtre - yüksek frekansları yumuşatmak için
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = freq * 2.5; // Parlaklığı ayarlar
    filter.Q.value = 1;

    // Gain (Ses seviyesi) kontrolü - Attack ve Release zarfı (Envelope)
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1); // Attack

    // Bağlantılar
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    // Çalan oscillator'u kaydet
    activeOscillators[note] = {
        oscillator: oscillator,
        gainNode: gainNode,
        vibrato: vibrato
    };

    // UI'ı güncelle
    const stringElement = document.querySelector(`.string-wrapper[data-note="${note}"]`);
    if (stringElement) {
        stringElement.classList.add('playing');
    }
}

function stopNote(note) {
    if (!activeOscillators[note]) return;

    const { oscillator, gainNode, vibrato } = activeOscillators[note];
    
    // Release
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);

    setTimeout(() => {
        try {
            oscillator.stop();
            vibrato.stop();
            oscillator.disconnect();
            vibrato.disconnect();
        } catch(e) {}
    }, 200);

    delete activeOscillators[note];

    // UI'ı güncelle
    const stringElement = document.querySelector(`.string-wrapper[data-note="${note}"]`);
    if (stringElement) {
        stringElement.classList.remove('playing');
    }
}

// Event Listeners for UI
document.querySelectorAll('.string-wrapper').forEach(wrapper => {
    const note = wrapper.getAttribute('data-note');

    // Fare olayları
    wrapper.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Metin seçimini engelle
        playNote(note);
    });
    wrapper.addEventListener('mouseup', () => stopNote(note));
    wrapper.addEventListener('mouseleave', () => stopNote(note));
    
    // Sürükleyerek çalma desteği için
    wrapper.addEventListener('mouseenter', (e) => {
        if (e.buttons === 1) { // Fare sol tuşu basılıysa
            playNote(note);
        }
    });

    // Dokunmatik cihaz olayları
    wrapper.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playNote(note);
    });
    wrapper.addEventListener('touchend', () => stopNote(note));
    wrapper.addEventListener('touchcancel', () => stopNote(note));
});

// Klavye olayları
document.addEventListener('keydown', (e) => {
    if (e.repeat) return; // Tuşa basılı tutmayı yoksay
    const key = e.key;
    if (keyMap[key]) {
        playNote(keyMap[key]);
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key;
    if (keyMap[key]) {
        stopNote(keyMap[key]);
    }
});

// Tarayıcı sekmesi odağı kaybettiğinde tüm sesleri durdur
window.addEventListener('blur', () => {
    Object.keys(activeOscillators).forEach(note => stopNote(note));
});
