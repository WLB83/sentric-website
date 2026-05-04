document.addEventListener('DOMContentLoaded', () => {
    let happiness = 50;
    let hunger = 50;

    const happinessBar = document.getElementById('happiness-bar');
    const hungerBar = document.getElementById('hunger-bar');
    const kittenStatic = document.getElementById('kitten-img-static');
    const kittenVideo = document.getElementById('kitten-video');
    const petArea = document.getElementById('pet-area');
    
    const btnFeed = document.getElementById('btn-feed');
    const btnPet = document.getElementById('btn-pet');
    const btnPlay = document.getElementById('btn-play');

    // VIDEO URLS
    const videoIdle = "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.mp4";
    const videoEat = "https://media.giphy.com/media/11Mj6zGUCbbE0U/giphy.mp4"; // Eating cat
    const videoPet = "https://media.giphy.com/media/M3a51DMeWvYUo/giphy.mp4"; // Petting cat
    const videoPlay = "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.mp4"; // Playing cat

    let stateTimeout;

    function setVideoState(stateUrl, duration) {
        kittenStatic.style.display = 'none';
        kittenVideo.style.display = 'block';
        if (kittenVideo.src !== stateUrl) {
            kittenVideo.src = stateUrl;
        }
        clearTimeout(stateTimeout);
        stateTimeout = setTimeout(() => {
            kittenVideo.style.display = 'none';
            kittenStatic.style.display = 'block';
            kittenVideo.src = ""; // reset video
        }, duration);
    }

    // Background particles
    const bgParticles = document.createElement('div');
    bgParticles.id = 'bg-particles';
    document.body.appendChild(bgParticles);

    function createBgSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.fontSize = `${Math.random() * 15 + 10}px`;
        sparkle.style.opacity = Math.random();
        sparkle.style.transition = 'all 2s linear';
        bgParticles.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.transform = `translateY(-50px) scale(0)`;
            sparkle.style.opacity = 0;
        }, 100);

        setTimeout(() => {
            sparkle.remove();
        }, 2100);
    }
    
    setInterval(createBgSparkle, 300); // constantly spawn sparkles

    // Audio Context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playSound(type) {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if (type === 'meow') {
            osc.type = 'sine';
            // Cute high pitched meow
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
            osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } else if (type === 'purr') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(50, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            
            // Pulsing purr
            for(let i=0; i<8; i++){
                gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + i*0.15 + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + i*0.15 + 0.15);
            }
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
        } else if (type === 'pop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        }
    }

    function updateBars() {
        happinessBar.style.width = `${happiness}%`;
        hungerBar.style.width = `${hunger}%`;
        
        if (happiness < 25) happinessBar.style.background = 'linear-gradient(90deg, #d32f2f, #f44336)';
        else happinessBar.style.background = 'linear-gradient(90deg, #ff8a80, #ff5252)';
        
        if (hunger < 25) hungerBar.style.background = 'linear-gradient(90deg, #e65100, #ff9800)';
        else hungerBar.style.background = 'linear-gradient(90deg, #ffd180, #ff9800)';
    }

    function createHeart(x, y) {
        const emojis = ['❤️', '💖', '✨', '😻'];
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        petArea.appendChild(heart);
        
        setTimeout(() => { heart.remove(); }, 1200);
    }

    function createExplosion(x, y) {
        for(let i=0; i<8; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.innerHTML = '✨';
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            // Random direction
            const tx = (Math.random() - 0.5) * 100;
            const ty = (Math.random() - 0.5) * 100;
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            petArea.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    function decreaseStats() {
        happiness = Math.max(0, happiness - 1);
        hunger = Math.max(0, hunger - 2);
        updateBars();
    }

    setInterval(decreaseStats, 3000);

    function getActiveKitten() {
        return kittenVideo.style.display === 'none' ? kittenStatic : kittenVideo;
    }

    btnFeed.addEventListener('click', (e) => {
        hunger = Math.min(100, hunger + 25);
        happiness = Math.min(100, happiness + 5);
        updateBars();
        playSound('pop');
        
        // Video State: Yeme
        setVideoState(videoEat, 3000);
        kittenVideo.classList.add('eat');
        setTimeout(() => kittenVideo.classList.remove('eat'), 500);
        
        // Button effect
        const btnRect = btnFeed.getBoundingClientRect();
        createHeart(btnRect.left - petArea.getBoundingClientRect().left + 50, btnRect.top - petArea.getBoundingClientRect().top);
    });

    btnPet.addEventListener('click', () => {
        happiness = Math.min(100, happiness + 20);
        updateBars();
        playSound('purr');
        
        // Video State: Sevilme
        setVideoState(videoPet, 3000);

        for(let i=0; i<5; i++) {
            setTimeout(() => {
                const x = Math.random() * 200 + 30;
                const y = Math.random() * 200 + 30;
                createHeart(x, y);
            }, i * 150);
        }
    });

    btnPlay.addEventListener('click', () => {
        if (hunger < 30) {
            const active = getActiveKitten();
            active.style.transform = 'scale(0.9)';
            setTimeout(() => active.style.transform = 'none', 300);
            return;
        }
        happiness = Math.min(100, happiness + 25);
        hunger = Math.max(0, hunger - 15);
        updateBars();
        playSound('meow');
        createExplosion(petArea.clientWidth/2, petArea.clientHeight/2);
        
        // Video State: Oynama
        setVideoState(videoPlay, 3000);
        kittenVideo.classList.add('bounce');
        setTimeout(() => kittenVideo.classList.remove('bounce'), 600);
    });

    petArea.addEventListener('click', (e) => {
        const rect = petArea.getBoundingClientRect();
        const x = e.clientX - rect.left - 15;
        const y = e.clientY - rect.top - 15;
        createHeart(x, y);
        happiness = Math.min(100, happiness + 8);
        updateBars();
        playSound('pop');
    });

    updateBars();
});
