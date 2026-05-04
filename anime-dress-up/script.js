document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('character-svg');
    
    // --- EXACT PROPORTIONS NEZUKO SVG ---
    const svgBase = `
        <svg viewBox="0 0 500 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.3"/>
                </filter>
                <!-- Hair Gradients -->
                <linearGradient id="hair-grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#111" />
                    <stop offset="50%" stop-color="#111" />
                    <stop offset="80%" stop-color="#8a3019" />
                    <stop offset="100%" stop-color="#d96a26" />
                </linearGradient>
                <linearGradient id="hair-grad-right" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#111" />
                    <stop offset="50%" stop-color="#111" />
                    <stop offset="80%" stop-color="#8a3019" />
                    <stop offset="100%" stop-color="#d96a26" />
                </linearGradient>
                <!-- Eye Gradient -->
                <linearGradient id="eye-iris" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#E86D9C" />
                    <stop offset="100%" stop-color="#FCA3B7" />
                </linearGradient>
                <!-- Patterns -->
                <pattern id="checkers" width="30" height="30" patternUnits="userSpaceOnUse">
                    <rect width="15" height="15" fill="#801C2A" />
                    <rect x="15" width="15" height="15" fill="#FFF" />
                    <rect y="15" width="15" height="15" fill="#FFF" />
                    <rect x="15" y="15" width="15" height="15" fill="#801C2A" />
                </pattern>
                <pattern id="asanoha" width="50" height="86.6" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 50 43.3 L 25 86.6 L 0 43.3 Z" fill="none" stroke="#E6A8B3" stroke-width="2"/>
                    <path d="M 0 43.3 L 50 43.3 M 25 0 L 25 86.6" stroke="#E6A8B3" stroke-width="2"/>
                    <path d="M 0 0 L 50 86.6 M 0 86.6 L 50 0" stroke="#E6A8B3" stroke-width="2"/>
                </pattern>
            </defs>

            <!-- ===================== BACK HAIR ===================== -->
            <g id="layer-hair-back" class="dynamic-layer">
                <g id="hair-back-style1">
                    <!-- Massive volume hair behind body -->
                    <path d="M 170 200 
                             C 80 400, 50 700, 110 750 
                             C 130 780, 150 650, 170 500 
                             L 330 500 
                             C 350 650, 370 780, 390 750 
                             C 450 700, 420 400, 330 200 Z" 
                          fill="url(#hair-grad-left)" />
                    <!-- Inner dark strands -->
                    <path d="M 140 400 Q 120 600 160 700 Q 140 500 170 400" fill="#111" />
                    <path d="M 360 400 Q 380 600 340 700 Q 360 500 330 400" fill="#111" />
                </g>
                <path id="hair-back-style2" d="" fill="#111" style="display:none;" />
                <path id="hair-back-style3" d="M 120 200 C 60 350, 70 500, 100 550 C 130 450, 110 300, 140 220 Z M 280 200 C 340 350, 330 500, 300 550 C 270 450, 290 300, 260 220 Z" fill="#111" style="display:none;" />
            </g>

            <!-- ===================== BODY (SKIN) ===================== -->
            <g id="layer-body">
                <!-- Neck (thin) -->
                <rect x="238" y="240" width="24" height="40" fill="#FCE1D5" />
                <path d="M 238 270 Q 250 285 262 270" fill="#F2C8B3" opacity="0.6" /> 

                <!-- Legs (thick with wraps later) -->
                <path d="M 210 500 L 220 880 L 190 880 L 180 500 Z" fill="#FCE1D5" />
                <path d="M 290 500 L 280 880 L 310 880 L 320 500 Z" fill="#FCE1D5" />

                <!-- Arms (Slim, A-pose) -->
                <path d="M 190 280 Q 140 400 145 550 L 165 550 Q 170 400 210 290 Z" fill="#FCE1D5" />
                <path d="M 310 280 Q 360 400 355 550 L 335 550 Q 330 400 290 290 Z" fill="#FCE1D5" />

                <!-- Hands -->
                <path d="M 145 550 Q 135 580 145 600 Q 155 600 165 550 Z" fill="#FCE1D5" />
                <path d="M 355 550 Q 365 580 355 600 Q 345 600 335 550 Z" fill="#FCE1D5" />

                <!-- Head (Rounder, large anime proportions) -->
                <path d="M 180 160 C 170 70, 330 70, 320 160 C 320 220, 280 260, 250 265 C 220 260, 180 220, 180 160 Z" fill="#FCE1D5" filter="url(#shadow)" />
            </g>

            <!-- ===================== FACE ===================== -->
            <g id="layer-face">
                <!-- Eyebrows (Slanted down slightly, worried/gentle look) -->
                <path d="M 185 160 Q 205 145 220 160" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M 315 160 Q 295 145 280 160" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round" />

                <!-- Eyes Base (HUGE) -->
                <ellipse cx="205" cy="185" rx="18" ry="24" fill="#FFF" />
                <ellipse cx="295" cy="185" rx="18" ry="24" fill="#FFF" />
                
                <!-- Irises -->
                <ellipse cx="205" cy="185" rx="14" ry="20" fill="url(#eye-iris)" />
                <ellipse cx="295" cy="185" rx="14" ry="20" fill="url(#eye-iris)" />

                <!-- Pupils (Slit-like) -->
                <ellipse cx="205" cy="185" rx="4" ry="12" fill="#111" />
                <ellipse cx="295" cy="185" rx="4" ry="12" fill="#111" />

                <!-- Highlights -->
                <circle cx="196" cy="175" r="5" fill="#FFF" />
                <circle cx="212" cy="198" r="2.5" fill="#FFF" opacity="0.8" />
                <circle cx="286" cy="175" r="5" fill="#FFF" />
                <circle cx="302" cy="198" r="2.5" fill="#FFF" opacity="0.8" />

                <!-- Eyelashes (Thick) -->
                <path d="M 182 178 C 190 160, 215 160, 226 175 M 180 185 C 182 170, 195 165, 205 163" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round" />
                <path d="M 318 178 C 310 160, 285 160, 274 175 M 320 185 C 318 170, 305 165, 295 163" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round" />

                <!-- Nose -->
                <path d="M 248 215 L 250 218 L 252 215" stroke="#DCAE91" stroke-width="2" fill="none" stroke-linecap="round" />

                <!-- Mouth -->
                <path d="M 242 235 Q 250 240 258 235" stroke="#C86A78" stroke-width="2" fill="none" stroke-linecap="round" />
            </g>

            <!-- ===================== NAILS ===================== -->
            <g id="layer-nails" class="dynamic-layer">
                <polygon points="144,595 147,605 150,595" fill="transparent" class="nail-color" />
                <polygon points="350,595 353,605 356,595" fill="transparent" class="nail-color" />
            </g>

            <!-- ===================== BOTTOMS ===================== -->
            <g id="layer-bottom" class="dynamic-layer">
                <g id="bottom-kimono_bottom" style="display:none;">
                    <!-- Pink Kimono Skirt (Wrapped) -->
                    <path d="M 200 480 L 300 480 L 320 850 C 280 870, 220 870, 180 850 Z" fill="#FFB7C5" filter="url(#shadow)" />
                    <path d="M 200 480 L 300 480 L 320 850 C 280 870, 220 870, 180 850 Z" fill="url(#asanoha)" />
                    
                    <!-- White Fold/Wrap at bottom (Iconic Nezuko) -->
                    <path d="M 170 780 C 200 850, 260 850, 330 780 L 330 810 C 260 890, 200 890, 170 810 Z" fill="#FFF" filter="url(#shadow)" />
                    <path d="M 180 750 C 210 820, 250 850, 310 830 L 320 860 C 250 880, 200 850, 170 780 Z" fill="#F4F4F4" />
                </g>
                <g id="bottom-jeans" style="display:none;">
                    <path d="M 200 480 L 300 480 L 310 880 L 270 880 L 260 550 L 240 550 L 230 880 L 190 880 Z" fill="#5E81AC" filter="url(#shadow)" />
                </g>
                <g id="bottom-skirt1" style="display:none;">
                    <path d="M 200 480 L 300 480 L 330 650 C 280 660, 220 660, 170 650 Z" fill="#2E3440" filter="url(#shadow)" />
                </g>
            </g>

            <!-- ===================== TOPS ===================== -->
            <g id="layer-top" class="dynamic-layer">
                <g id="top-kimono_top" style="display:none;">
                    <!-- Pink Kimono Top -->
                    <path d="M 180 270 L 320 270 L 310 480 L 190 480 Z" fill="#FFB7C5" filter="url(#shadow)" />
                    <path d="M 180 270 L 320 270 L 310 480 L 190 480 Z" fill="url(#asanoha)" />
                    
                    <!-- Collar -->
                    <path d="M 238 270 L 250 330 L 195 400" stroke="#FFF" stroke-width="8" fill="none" />
                    <path d="M 262 270 L 250 330 L 305 400" stroke="#FFF" stroke-width="8" fill="none" />
                    <!-- Green lining -->
                    <path d="M 240 270 L 250 325 L 205 385" stroke="#A4CD7D" stroke-width="3" fill="none" />

                    <!-- Kimono Sleeves (Under Haori) -->
                    <path d="M 180 270 Q 140 400 145 550 L 185 550 Q 185 400 200 290 Z" fill="#FFB7C5" />
                    <path d="M 320 270 Q 360 400 355 550 L 315 550 Q 315 400 300 290 Z" fill="#FFB7C5" />
                </g>
                <g id="top-shirt1" style="display:none;">
                    <path d="M 180 270 L 320 270 L 310 480 L 190 480 Z" fill="#FFFFFF" filter="url(#shadow)" />
                    <path d="M 180 270 Q 140 400 145 550 L 175 550 Q 180 400 200 290 Z" fill="#FFFFFF" />
                    <path d="M 320 270 Q 360 400 355 550 L 325 550 Q 320 400 300 290 Z" fill="#FFFFFF" />
                </g>
                <g id="top-tshirt1" style="display:none;">
                    <path d="M 180 270 L 320 270 L 310 480 L 190 480 Z" fill="#EBCB8B" filter="url(#shadow)" />
                </g>
            </g>

            <!-- ===================== OBI (BELT) ===================== -->
            <g id="layer-obi" class="dynamic-layer">
                <g id="obi-checkered" style="display:none;">
                    <!-- Obi Base -->
                    <rect x="194" y="400" width="112" height="70" fill="url(#checkers)" filter="url(#shadow)" />
                    
                    <!-- Orange string tied around obi -->
                    <line x1="194" y1="435" x2="306" y2="435" stroke="#D95A26" stroke-width="4" filter="url(#shadow)" />
                    <!-- Knot -->
                    <path d="M 240 435 Q 250 420 260 435 Q 250 450 240 435 Z" fill="#D95A26" />
                    
                    <!-- Green sash above Obi -->
                    <rect x="195" y="385" width="110" height="15" fill="#A4CD7D" />
                </g>
                <g id="obi-green" style="display:none;">
                    <rect x="194" y="400" width="112" height="50" fill="#A4CD7D" filter="url(#shadow)" />
                </g>
            </g>

            <!-- ===================== OUTERWEAR (HAORI) ===================== -->
            <g id="layer-outer" class="dynamic-layer">
                <g id="outer-haori" style="display:none;">
                    <!-- Dark Brown Haori Base (Behind arms) -->
                    <!-- Left Side draped down -->
                    <path d="M 180 270 L 220 280 L 190 800 L 110 800 L 130 500 Z" fill="#2a1f1d" filter="url(#shadow)" />
                    <!-- Right Side draped down -->
                    <path d="M 320 270 L 280 280 L 310 800 L 390 800 L 370 500 Z" fill="#2a1f1d" filter="url(#shadow)" />
                    
                    <!-- Massive Sleeves (Front) -->
                    <path d="M 180 270 C 120 300, 70 500, 80 650 L 140 650 C 140 500, 170 350, 200 300 Z" fill="#3b2b29" filter="url(#shadow)" />
                    <path d="M 320 270 C 380 300, 430 500, 420 650 L 360 650 C 360 500, 330 350, 300 300 Z" fill="#3b2b29" filter="url(#shadow)" />
                </g>
                <g id="outer-jacket1" style="display:none;">
                    <path d="M 180 270 L 220 280 L 210 500 L 170 500 Z" fill="#81A1C1" />
                    <path d="M 180 270 C 130 350, 130 450, 135 550 L 175 550 C 170 450, 180 350, 200 290 Z" fill="#81A1C1" />
                    <path d="M 320 270 L 280 280 L 290 500 L 330 500 Z" fill="#81A1C1" />
                    <path d="M 320 270 C 370 350, 370 450, 365 550 L 325 550 C 330 450, 320 350, 300 290 Z" fill="#81A1C1" />
                </g>
            </g>

            <!-- ===================== FRONT HAIR ===================== -->
            <g id="layer-hair-front" class="dynamic-layer">
                <g id="hair-front-style1">
                    <!-- Top Bangs -->
                    <path d="M 180 160 C 180 50, 320 50, 320 160 C 300 180, 260 120, 250 140 C 240 120, 200 180, 180 160 Z" fill="#111" filter="url(#shadow)" />
                    
                    <!-- Thick front locks framing the face (gradient) -->
                    <!-- Left lock -->
                    <path d="M 160 160 C 140 250, 140 400, 160 550 C 180 400, 180 250, 180 160 Z" fill="url(#hair-grad-left)" />
                    <!-- Right lock -->
                    <path d="M 340 160 C 360 250, 360 400, 340 550 C 320 400, 320 250, 320 160 Z" fill="url(#hair-grad-right)" />

                    <!-- Side sweeping strands -->
                    <path d="M 180 160 C 160 300, 110 450, 120 600 C 140 450, 160 300, 200 160 Z" fill="url(#hair-grad-left)" />
                    <path d="M 320 160 C 340 300, 390 450, 380 600 C 360 450, 340 300, 300 160 Z" fill="url(#hair-grad-right)" />
                </g>
            </g>

            <!-- ===================== SHOES & LEGS ===================== -->
            <g id="layer-shoes" class="dynamic-layer">
                <g id="shoes-sandals" style="display:none;">
                    <!-- Black Kyahan (Leg wraps base) -->
                    <path d="M 202 810 L 217 880 L 193 880 L 180 810 Z" fill="#111" />
                    <path d="M 298 810 L 283 880 L 307 880 L 320 810 Z" fill="#111" />
                    
                    <!-- White Straps -->
                    <line x1="180" y1="830" x2="210" y2="830" stroke="#FFF" stroke-width="4" />
                    <line x1="185" y1="850" x2="215" y2="850" stroke="#FFF" stroke-width="4" />
                    <line x1="190" y1="870" x2="215" y2="870" stroke="#FFF" stroke-width="4" />
                    
                    <line x1="290" y1="830" x2="320" y2="830" stroke="#FFF" stroke-width="4" />
                    <line x1="285" y1="850" x2="315" y2="850" stroke="#FFF" stroke-width="4" />
                    <line x1="285" y1="870" x2="310" y2="870" stroke="#FFF" stroke-width="4" />

                    <!-- Feet (Socks) -->
                    <path d="M 193 880 L 217 880 C 220 900, 200 920, 180 920 C 180 900, 190 890, 193 880 Z" fill="#FFF" />
                    <path d="M 307 880 L 283 880 C 280 900, 300 920, 320 920 C 320 900, 310 890, 307 880 Z" fill="#FFF" />

                    <!-- Zori (Sandals) Base -->
                    <ellipse cx="200" cy="920" rx="25" ry="8" fill="#C19A6B" />
                    <ellipse cx="300" cy="920" rx="25" ry="8" fill="#C19A6B" />

                    <!-- Pink Sandal Straps -->
                    <path d="M 180 920 Q 200 905, 215 920" stroke="#FFB7C5" stroke-width="3" fill="none" />
                    <path d="M 320 920 Q 300 905, 285 920" stroke="#FFB7C5" stroke-width="3" fill="none" />
                    <!-- Between toes -->
                    <line x1="190" y1="920" x2="195" y2="910" stroke="#FFB7C5" stroke-width="3" />
                    <line x1="310" y1="920" x2="305" y2="910" stroke="#FFB7C5" stroke-width="3" />
                </g>
                <g id="shoes-sneakers" style="display:none;">
                    <path d="M 180 880 L 220 880 L 230 920 L 170 920 Z" fill="#ECEFF4" filter="url(#shadow)" />
                    <path d="M 280 880 L 320 880 L 330 920 L 270 920 Z" fill="#ECEFF4" filter="url(#shadow)" />
                </g>
            </g>

            <!-- ===================== ACCESSORIES ===================== -->
            <g id="layer-accessory" class="dynamic-layer">
                <g id="accessory-bamboo" style="display:none;">
                    <!-- Bamboo Muzzle (Large, centered) -->
                    <rect x="210" y="220" width="80" height="25" rx="5" fill="#A4CD7D" filter="url(#shadow)" />
                    <!-- Bamboo joints -->
                    <line x1="225" y1="220" x2="225" y2="245" stroke="#5E8A38" stroke-width="3" />
                    <line x1="275" y1="220" x2="275" y2="245" stroke="#5E8A38" stroke-width="3" />
                    <!-- Red strap tying it -->
                    <path d="M 210 232 Q 180 232 170 190" stroke="#801C2A" stroke-width="3" fill="none" />
                    <path d="M 290 232 Q 320 232 330 190" stroke="#801C2A" stroke-width="3" fill="none" />
                </g>
                <g id="accessory-ribbon" style="display:none;">
                    <!-- Nezuko's Pink Hair Ribbon (Left side of head) -->
                    <path d="M 300 110 L 330 90 L 320 120 Z" fill="#FFB7C5" />
                    <path d="M 330 140 L 350 110 L 320 120 Z" fill="#FFB7C5" />
                    <circle cx="320" cy="115" r="5" fill="#D98A9A" />
                </g>
            </g>

        </svg>
    `;

    svgContainer.innerHTML = svgBase;

    // State management
    const state = {
        hair: 'style1',
        accessory: 'bamboo',
        obi: 'checkered',
        nails: '#FFB7B2',
        top: 'kimono_top',
        bottom: 'kimono_bottom',
        outer: 'haori',
        shoes: 'sandals'
    };

    function updateCharacter() {
        ['style1', 'style2', 'style3'].forEach(style => {
            const front = document.getElementById(`hair-front-${style}`);
            const back = document.getElementById(`hair-back-${style}`);
            if (front) front.style.display = state.hair === style ? 'block' : 'none';
            if (back) back.style.display = state.hair === style ? 'block' : 'none';
        });

        ['bamboo', 'ribbon', 'cat'].forEach(acc => {
            const el = document.getElementById(`accessory-${acc}`);
            if (el) el.style.display = state.accessory === acc ? 'block' : 'none';
        });

        ['checkered', 'green'].forEach(item => {
            const el = document.getElementById(`obi-${item}`);
            if (el) el.style.display = state.obi === item ? 'block' : 'none';
        });

        const nails = document.querySelectorAll('.nail-color');
        nails.forEach(nail => nail.setAttribute('fill', state.nails));

        ['kimono_top', 'shirt1', 'tshirt1'].forEach(item => {
            const el = document.getElementById(`top-${item}`);
            if (el) el.style.display = state.top === item ? 'block' : 'none';
        });

        ['kimono_bottom', 'jeans', 'skirt1'].forEach(item => {
            const el = document.getElementById(`bottom-${item}`);
            if (el) el.style.display = state.bottom === item ? 'block' : 'none';
        });

        ['haori', 'jacket1'].forEach(item => {
            const el = document.getElementById(`outer-${item}`);
            if (el) el.style.display = state.outer === item ? 'block' : 'none';
        });

        ['sandals', 'sneakers', 'boots'].forEach(item => {
            const el = document.getElementById(`shoes-${item}`);
            if (el) el.style.display = state.shoes === item ? 'block' : 'none';
        });
    }

    function createConfetti() {
        const colors = ['#FFB7C5', '#A4CD7D', '#E88497', '#801C2A'];
        const container = document.getElementById('confetti');
        container.innerHTML = '';
        
        for (let i = 0; i < 30; i++) {
            const conf = document.createElement('div');
            conf.classList.add('confetti');
            conf.style.left = Math.random() * 100 + '%';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.animation = `fall ${Math.random() * 2 + 1}s linear`;
            container.appendChild(conf);
        }

        setTimeout(() => {
            container.innerHTML = '';
        }, 3000);
    }

    const buttons = document.querySelectorAll('.item-btn, .color-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-target');
            const value = btn.getAttribute('data-value');
            
            if (target && value) {
                state[target] = value;
            }

            const parent = btn.parentElement;
            parent.querySelectorAll('.active').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            createConfetti();
            updateCharacter();
        });
    });

    document.getElementById('btn-randomize').addEventListener('click', () => {
        const categories = {
            hair: ['style1'], // Only style1 is perfectly modeled for Nezuko now
            accessory: ['none', 'bamboo', 'ribbon'],
            obi: ['none', 'checkered', 'green'],
            nails: ['#FFB7B2', '#A4CD7D', '#111111', '#C5A3FF', 'transparent'],
            top: ['none', 'kimono_top', 'shirt1'],
            bottom: ['none', 'kimono_bottom', 'jeans'],
            outer: ['none', 'haori', 'jacket1'],
            shoes: ['none', 'sandals', 'sneakers']
        };

        for (let key in categories) {
            const arr = categories[key];
            const randomVal = arr[Math.floor(Math.random() * arr.length)];
            state[key] = randomVal;

            const btns = document.querySelectorAll(`[data-target="${key}"]`);
            btns.forEach(b => b.classList.remove('active'));
            const activeBtn = Array.from(btns).find(b => b.getAttribute('data-value') === randomVal);
            if (activeBtn) activeBtn.classList.add('active');
        }

        createConfetti();
        updateCharacter();
    });

    document.getElementById('btn-save').addEventListener('click', () => {
        alert("✨ Nezuko harika görünüyor! ✨");
        createConfetti();
    });

    // Initialize UI active classes based on default state
    ['hair', 'accessory', 'obi', 'nails', 'top', 'bottom', 'outer', 'shoes'].forEach(key => {
        const val = state[key];
        const btn = document.querySelector(`[data-target="${key}"][data-value="${val}"]`);
        if (btn) btn.classList.add('active');
    });

    updateCharacter();
});
