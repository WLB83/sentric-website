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

    // Products Carousel Drag-to-Scroll & Edge Auto-Scroll
    const slider = document.getElementById('productsCarousel');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollInterval = null;

        const stopAutoScroll = () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        };

        const startAutoScroll = (direction) => {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                slider.scrollLeft += direction * 6; // Scroll speed
            }, 16); // ~60fps
        };

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
                const walk = (x - startX) * 2; // scroll-fast
                slider.scrollLeft = scrollLeft - walk;
                return;
            }

            // Auto-scroll when mouse is near edges
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const edgeThreshold = 100; // pixels from edge to trigger auto-scroll

            if (x < edgeThreshold) {
                // Near left edge
                startAutoScroll(-1);
            } else if (x > rect.width - edgeThreshold) {
                // Near right edge
                startAutoScroll(1);
            } else {
                stopAutoScroll();
            }
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
