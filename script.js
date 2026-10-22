document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                
                // If it contains a counter, trigger it
                if (entry.target.classList.contains('hero-stats-bar')) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // lower is faster
                
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('active'); // Close mobile menu if open
            if(hamburger) {
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});




// ==========================================
// BATTERY FINDER (API SIMULATION & CUSTOM SEARCHABLE DROPDOWNS)
// ==========================================
let db = {};
let currentSelections = { make: null, model: null, year: null, engine: null };

async function fetchCarData() {
    const makeInput = document.querySelector('.custom-select[data-step="make"] input');
    if (!makeInput) return; // not on index page
    
    makeInput.placeholder = "Veritabanı Yükleniyor...";
    
    try {
        const response = await fetch('data/cars_db.json');
        if (!response.ok) throw new Error('Veritabanı okunamadı!');
        
        db = await response.json();
        
        makeInput.placeholder = "Marka Seçin...";
        makeInput.disabled = false; // enable after load
        setupCustomSelects(); // Initialize UI only after data is ready
        
    } catch (error) {
        console.error("API Error:", error);
        makeInput.placeholder = "Veri Yüklenemedi!";
    }
}

// Global Brands Drag to Scroll
const slider = document.querySelector('.global-brands-wrapper');
let isDown = false;
let startX;
let scrollLeft;

if(slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
}

function setupCustomSelects() {
    const selects = document.querySelectorAll('.custom-select');
    if(selects.length === 0) return;

    // Build the "Make" list
    const makeSelect = document.querySelector('.custom-select[data-step="make"]');
    if(makeSelect) {
        const ul = makeSelect.querySelector('ul');
        ul.innerHTML = '';
        
        let popHtml = '<li class="category-header">Popüler Markalar</li>';
        let otherHtml = '<li class="category-header">Diğer Markalar</li>';
        
        Object.keys(db).sort().forEach(make => {
            const li = `<li data-value="${make}">${make}</li>`;
            if(db[make].popular) popHtml += li;
            else otherHtml += li;
        });
        
        ul.innerHTML = popHtml + otherHtml;
    }

    // Attach events
    selects.forEach(select => {
        const input = select.querySelector('input.select-search');
        const ul = select.querySelector('ul');
        const step = select.dataset.step;

        // Open/close logic
        input.addEventListener('click', (e) => {
            if(input.disabled) return;
            e.stopPropagation();
            
            // Close others
            selects.forEach(s => { if(s !== select) s.classList.remove('open'); });
            
            select.classList.toggle('open');
            if(select.classList.contains('open')) {
                input.readOnly = false;
                input.value = ''; // clear to search
                input.focus();
                filterList(ul, ''); // show all
            } else {
                input.readOnly = true;
                input.value = currentSelections[step] || '';
            }
        });

        // Type to search
        input.addEventListener('input', (e) => {
            filterList(ul, e.target.value);
        });

        // Click on item
        ul.addEventListener('click', (e) => {
            e.stopPropagation();
            if(e.target.tagName === 'LI' && !e.target.classList.contains('category-header')) {
                const val = e.target.dataset.value;
                input.value = val;
                input.readOnly = true;
                currentSelections[step] = val;
                select.classList.remove('open');
                
                // Highlight selected
                ul.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                e.target.classList.add('selected');
                
                handleSelectionChange(step);
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', () => {
        selects.forEach(s => {
            s.classList.remove('open');
            const input = s.querySelector('input.select-search');
            const step = s.dataset.step;
            input.readOnly = true;
            if(!input.value || !currentSelections[step] || input.value !== currentSelections[step]) {
                 input.value = currentSelections[step] || ''; // restore text
            }
        });
    });
}

function filterList(ul, query) {
    const items = ul.querySelectorAll('li');
    query = query.toLowerCase();
    let hasVisible = false;
    
    items.forEach(li => {
        if(li.classList.contains('category-header')) {
            // headers are handled later if needed, just show them for now
            li.style.display = 'block';
        } else {
            const text = li.textContent.toLowerCase();
            if(text.includes(query)) {
                li.style.display = 'block';
                hasVisible = true;
            } else {
                li.style.display = 'none';
            }
        }
    });
}


const hardwareProfiles = [
   { id: "ss_yok_benzin", label: "Benzin / LPG (Start-Stop Yok)" },
   { id: "ss_yok_dizel", label: "Dizel (Start-Stop Yok)" },
   { id: "ss_var_temel", label: "Start-Stop VAR (Standart)" },
   { id: "ss_var_gelismis", label: "Start-Stop VAR (Dizel/Gelişmiş)" },
   { id: "mhev", label: "Yarı Hibrit (MHEV) / Hibrit" }
];

function handleSelectionChange(step) {
    const make = currentSelections.make;
    const model = currentSelections.model;
    const year = currentSelections.year;
    
    const wrapperModel = document.getElementById('wrapper-model');
    const inputModel = wrapperModel.querySelector('input');
    const ulModel = wrapperModel.querySelector('ul');
    
    const wrapperYear = document.getElementById('wrapper-year');
    const inputYear = wrapperYear.querySelector('input');
    const ulYear = wrapperYear.querySelector('ul');
    
    const wrapperEngine = document.getElementById('wrapper-engine');
    const inputEngine = wrapperEngine.querySelector('input');
    const ulEngine = wrapperEngine.querySelector('ul');
    
    const btn = document.getElementById('finder-btn');
    const res = document.getElementById('finder-result');
    
    res.style.display = 'none';

    if (step === 'make') {
        currentSelections.model = null;
        currentSelections.year = null;
        currentSelections.engine = null;
        
        inputModel.value = ''; inputModel.placeholder = 'Model Seçin...';
        inputYear.value = ''; inputYear.placeholder = 'Önce Model Seçin';
        inputEngine.value = ''; inputEngine.placeholder = 'Önce Yıl Seçin';
        
        wrapperModel.classList.remove('disabled');
        inputModel.disabled = false;
        
        wrapperYear.classList.add('disabled'); inputYear.disabled = true;
        wrapperEngine.classList.add('disabled'); inputEngine.disabled = true;
        btn.disabled = true;
        
        // Populate models
        ulModel.innerHTML = '';
        Object.keys(db[make].models).sort().forEach(m => {
            ulModel.innerHTML += `<li data-value="${m}">${m}</li>`;
        });
    }
    
    if (step === 'model') {
        currentSelections.year = null;
        currentSelections.engine = null;
        
        inputYear.value = ''; inputYear.placeholder = 'Üretim Yılı Seçin...';
        inputEngine.value = ''; inputEngine.placeholder = 'Önce Yıl Seçin';
        
        wrapperYear.classList.remove('disabled');
        inputYear.disabled = false;
        
        wrapperEngine.classList.add('disabled'); inputEngine.disabled = true;
        btn.disabled = true;
        
        // Populate years
        ulYear.innerHTML = '';
        db[make].models[model].years.forEach(y => {
            ulYear.innerHTML += `<li data-value="${y}">${y}</li>`;
        });
    }
    
    if (step === 'year') {
        currentSelections.engine = null;
        
        inputEngine.value = ''; inputEngine.placeholder = 'Donanım Seçin...';
        
        wrapperEngine.classList.remove('disabled');
        inputEngine.disabled = false;
        btn.disabled = true;
        
        // Populate hardware profiles
        ulEngine.innerHTML = '';
        hardwareProfiles.forEach(hp => {
            ulEngine.innerHTML += `<li data-value="${hp.id}">${hp.label}</li>`;
        });
    }
    
    if (step === 'engine') {
        btn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCarData(); // Async load from JSON
    
    const btn = document.getElementById('finder-btn');
    if(btn) {
        btn.addEventListener('click', () => {
            const {make, model, year, engine} = currentSelections;
            const isAsian = db[make].isAsian;
            
            let resultType = "";
            let resultDesc = "";
            let resultLink = "";
            
            if (engine === "ss_yok_benzin") {
                if (isAsian) {
                    resultType = "JIS (Asya) Standart SMF";
                    resultDesc = "Aracınız Asya üretimi olduğu için dar kasa (JIS standardı) tam bakımsız SMF akü gerektirir.";
                    resultLink = "smf.html?filter=jis";
                } else {
                    resultType = "Avrupa (DIN) Standart SMF";
                    resultDesc = "Standart donanımlı aracınız için Avrupa (L2/L3) kasa tam bakımsız SMF akü yeterlidir.";
                    resultLink = "smf.html?filter=din";
                }
            } else if (engine === "ss_yok_dizel") {
                if (isAsian) {
                    resultType = "JIS (Asya) Yüksek Kapasite SMF";
                    resultDesc = "Dizel motor yüksek marş gücü ister. Asya kasa yüksek amperli (D26/D31) SMF akü uygundur.";
                    resultLink = "smf.html?filter=jis";
                } else {
                    resultType = "Avrupa (DIN) Yüksek Kapasite SMF";
                    resultDesc = "Dizel motorun ilk çalışma gücünü karşılamak için büyük (L3/L4) kasa SMF akü gereklidir.";
                    resultLink = "smf.html?filter=din";
                }
            } else if (engine === "ss_var_temel") {
                if (isAsian) {
                    resultType = "JIS (Asya) EFB Akü";
                    resultDesc = "Asya kasa Start-Stoplu araçlar için güçlendirilmiş JIS EFB akü kullanılmalıdır.";
                    resultLink = "efb.html";
                } else {
                    resultType = "Avrupa (DIN) EFB Akü";
                    resultDesc = "Standart Start-Stop donanımı için yüksek çevrim ömürlü Avrupa kasa EFB akü idealdir.";
                    resultLink = "efb.html";
                }
            } else if (engine === "ss_var_gelismis" || engine === "mhev") {
                if (isAsian) {
                    resultType = "AGM veya Gelişmiş EFB (Asya)";
                    resultDesc = "Yoğun elektronik donanım veya yarı hibrit sistem için AGM (Absorbed Glass Mat) teknolojisi şarttır.";
                    resultLink = "agm.html";
                } else {
                    resultType = "AGM (Start-Stop) Akü";
                    resultDesc = "Dizel Start-Stop veya MHEV (Hibrit) sistemlerin yüksek akım ihtiyacı için kesinlikle AGM akü gereklidir.";
                    resultLink = "agm.html";
                }
            }
            
            document.getElementById('result-type').textContent = resultType;
            document.getElementById('result-desc').textContent = resultDesc;
            document.getElementById('result-link').href = resultLink;
            
            const res = document.getElementById('finder-result');
            res.style.display = 'block';
            res.classList.add('fade-in');
        });
    }

    // Products Carousel Drag-to-Scroll & Smooth Edge Auto-Scroll
    const slider = document.getElementById('productsCarousel');
    const btnPrev = document.getElementById('carouselPrev');
    const btnNext = document.getElementById('carouselNext');

    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationFrameId = null;
        let autoScrollDirection = 0;

        // Navigation Buttons
        if (btnPrev && btnNext) {
            btnPrev.addEventListener('click', () => {
                slider.scrollBy({ left: -350, behavior: 'smooth' });
            });
            btnNext.addEventListener('click', () => {
                slider.scrollBy({ left: 350, behavior: 'smooth' });
            });
        }

        const stopAutoScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
                autoScrollDirection = 0;
            }
        };

        const scrollLoop = () => {
            if (autoScrollDirection !== 0) {
                slider.scrollLeft += autoScrollDirection * 5; // 5 pixels per frame for buttery smooth, manageable speed
                animationFrameId = requestAnimationFrame(scrollLoop);
            }
        };

        const startAutoScroll = (direction) => {
            if (autoScrollDirection === direction) return;
            stopAutoScroll();
            autoScrollDirection = direction;
            animationFrameId = requestAnimationFrame(scrollLoop);
        };

        // Drag events
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            stopAutoScroll();
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
            stopAutoScroll();
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            stopAutoScroll();
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (isDown) {
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.5;
                slider.scrollLeft = scrollLeft - walk;
                return;
            }

            // Smooth Edge Auto-Scroll logic
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const edgeThreshold = 100; // Activation zone width in pixels

            if (x < edgeThreshold) {
                startAutoScroll(-1);
            } else if (x > rect.width - edgeThreshold) {
                startAutoScroll(1);
            } else {
                stopAutoScroll();
            }
        });

        // Cancel auto-scroll if user uses trackpad/mousewheel
        slider.addEventListener('wheel', () => {
            stopAutoScroll();
        });
    }
    // Contact Form Background Submission (AJAX)
    const contactForm = document.getElementById('contactForm');
    const formSuccessMsg = document.getElementById('form-success');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Gönderiliyor... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                formSuccessMsg.style.display = 'block';
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formSuccessMsg.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                console.error("Form submission error:", error);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            });
        });
    }

});

// ==========================================
// ANTIGRAVITY PREMIUM HERO SECTION LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Staggered Entrance Animations
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.parallax-container');
    const heroStats = document.querySelector('.glassmorphism-premium');
    
    // Trigger animations after a tiny delay for smooth rendering
    setTimeout(() => {
        if(heroContent) heroContent.classList.add('is-visible');
        if(heroVisual) heroVisual.classList.add('is-visible');
        if(heroStats) {
            heroStats.classList.add('is-visible');
            // Trigger counters since we bypassed IntersectionObserver for the hero stats
            const counters = document.querySelectorAll('.hero-stats-bar .counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const inc = target / 200;
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, 100);

    // 2. 3D Parallax Effect on Mouse Move
    const hero = document.querySelector('.hero');
    const layers = document.querySelectorAll('.bat-layer');

    if (hero && layers.length > 0) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2);
            const y = (e.clientY - window.innerHeight / 2);

            layers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth'));
                // Inverse movement based on depth
                const moveX = (x * depth * -0.05);
                const moveY = (y * depth * -0.05);
                
                layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        });
        
        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            layers.forEach(layer => {
                layer.style.transform = `translate3d(0px, 0px, 0)`;
            });
        });
    }
});



// ==========================================
// SENTRIC SMART VISITOR & ACTION TRACKING
// ==========================================
(function() {
    const ACCESS_KEY = '4a6c6fa4-ca23-4189-99e2-1b1a40536094';
    
    // Ignore automated bots, scrapers, and headless crawlers
    const ua = navigator.userAgent || '';
    const isBot = /bot|crawl|spider|slurp|lighthouse|headlesschrome|googlebot|bingbot|yandex|duckduckbot/i.test(ua);
    if (isBot) return;

    // Helper: Deliver email notification via Web3Forms
    function sendAlert(subject, details) {
        try {
            const formData = new FormData();
            formData.append('access_key', ACCESS_KEY);
            formData.append('subject', subject);
            formData.append('from_name', 'Sentric Web Takip');
            
            for (const [key, value] of Object.entries(details)) {
                formData.append(key, value);
            }

            // Primary: fetch
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            }).catch(() => {
                // Fallback: silent hidden iframe submit if fetch fails (e.g. adblocker)
                const iframe = document.createElement('iframe');
                iframe.name = 'track_frame_' + Date.now();
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                const form = document.createElement('form');
                form.target = iframe.name;
                form.action = 'https://api.web3forms.com/submit';
                form.method = 'POST';
                form.style.display = 'none';

                for (const [k, v] of formData.entries()) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = k;
                    input.value = v;
                    form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();
                setTimeout(() => {
                    form.remove();
                    iframe.remove();
                }, 5000);
            });
        } catch (e) {
            // Silently fail without interrupting user experience
        }
    }

    // Determine referrer origin
    function getReferrerInfo() {
        const ref = document.referrer || '';
        if (!ref) return '🌐 Doğrudan Giriş (Direkt URL / Yer İmi)';
        if (/google\./i.test(ref)) return '🔍 Google Arama Sonuçları (' + ref + ')';
        if (/yandex\./i.test(ref)) return '🔍 Yandex Arama Sonuçları (' + ref + ')';
        if (/bing\./i.test(ref)) return '🔍 Bing Arama Sonuçları (' + ref + ')';
        if (/instagram|facebook|linkedin|t\.co|twitter/i.test(ref)) return '📱 Sosyal Medya (' + ref + ')';
        return '🔗 Harici Bağlantı (' + ref + ')';
    }

    // Determine device
    function getDeviceInfo() {
        const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(ua);
        let os = 'Bilinmeyen İşletim Sistemi';
        if (/Windows/i.test(ua)) os = 'Windows PC';
        else if (/Macintosh|Mac OS/i.test(ua)) os = 'Mac OS';
        else if (/iPhone/i.test(ua)) os = 'iPhone (iOS)';
        else if (/iPad/i.test(ua)) os = 'iPad (iPadOS)';
        else if (/Android/i.test(ua)) os = 'Android';
        else if (/Linux/i.test(ua)) os = 'Linux';

        return (isMobile ? '📱 Mobil' : '💻 Masaüstü') + ' - ' + os + ' (' + window.screen.width + 'x' + window.screen.height + ')';
    }

    // 1. Visit Notification (Once per session to prevent spam)
    if (!sessionStorage.getItem('sentric_visit_alert_sent')) {
        sessionStorage.setItem('sentric_visit_alert_sent', 'true');

        const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
        const pageTitle = document.title || 'Sentric Web Sitesi';
        const pagePath = window.location.pathname.split('/').pop() || 'Ana Sayfa';
        const refInfo = getReferrerInfo();
        const devInfo = getDeviceInfo();

        // Query free geolocation API with 2.5s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        fetch('https://freeipapi.com/api/json', { signal: controller.signal })
            .then(res => res.json())
            .then(geo => {
                clearTimeout(timeoutId);
                const city = geo.cityName || 'Bilinmiyor';
                const country = geo.countryName || 'Türkiye';
                const subject = '🔔 Yeni Ziyaretçi: ' + city + ', ' + country + ' | ' + pagePath;
                
                sendAlert(subject, {
                    'Konum': city + ', ' + country + ' (IP: ' + (geo.ipAddress || 'Mevcut') + ')',
                    'İlk_Giriş_Sayfası': pageTitle + ' (' + window.location.href + ')',
                    'Geliş_Kaynağı': refInfo,
                    'Cihaz': devInfo,
                    'Giriş_Saati': now
                });
            })
            .catch(() => {
                // If geo fails, still send the visit notification!
                const subject = '🔔 Yeni Ziyaretçi: ' + pagePath;
                sendAlert(subject, {
                    'Konum': 'Tespit Edilemedi (Adblocker veya Gizli Sekme)',
                    'İlk_Giriş_Sayfası': pageTitle + ' (' + window.location.href + ')',
                    'Geliş_Kaynağı': refInfo,
                    'Cihaz': devInfo,
                    'Giriş_Saati': now
                });
            });
    }

    // 2. Action Detection: Screenshot (Desktop) & Text Copying (Max 2 action alerts per session)
    let actionCount = parseInt(sessionStorage.getItem('sentric_action_count') || '0', 10);

    function reportAction(actionType, extraInfo) {
        if (actionCount >= 2) return;
        actionCount++;
        sessionStorage.setItem('sentric_action_count', actionCount.toString());

        const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
        const pageTitle = document.title || 'Sentric';
        const pagePath = window.location.pathname.split('/').pop() || 'Ana Sayfa';

        sendAlert('⚡ Ziyaretçi Aksiyonu: ' + actionType + ' | ' + pagePath, {
            'Aksiyon_Türü': actionType,
            'İlgili_İçerik': extraInfo || 'Detay yok',
            'Sayfa': pageTitle + ' (' + window.location.href + ')',
            'Cihaz': getDeviceInfo(),
            'Zaman': now
        });
    }

    // Desktop Screenshot Key (PrintScreen)
    window.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            reportAction('📸 Ekran Görüntüsü Alındı (PrintScreen Tuşu)');
        }
    });

    // Desktop Print / Save as PDF
    window.addEventListener('beforeprint', function() {
        reportAction('🖨️ Sayfa Yazdırılıyor / PDF Olarak Kaydediliyor');
    });

    // Text / Spec / Contact Copy Event
    document.addEventListener('copy', function() {
        try {
            const selection = window.getSelection().toString().trim();
            if (selection.length >= 4) {
                reportAction('📋 Metin Kopyalandı', selection.slice(0, 150));
            }
        } catch(e) {}
    });
})();
