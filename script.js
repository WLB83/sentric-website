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


// Battery Finder Logic
const makeSelect = document.getElementById('finder-make');
const modelSelect = document.getElementById('finder-model');
const yearSelect = document.getElementById('finder-year');
const findBtn = document.getElementById('finder-btn');
const resultDiv = document.getElementById('finder-result');
const resultType = document.getElementById('result-type');
const resultDesc = document.getElementById('result-desc');
const resultLink = document.getElementById('result-link');

const cars = {
    honda: {
        models: ['Civic', 'Accord', 'CR-V'],
        type: 'JIS (Asya) Standart',
        desc: 'Japon menşeli aracınız için JIS standartlarında (Dar Kasa) üretilmiş, yüksek marş basma gücüne sahip Asya tipi akü kullanmanız önerilmektedir.',
        link: 'smf.html?filter=jis'
    },
    toyota: {
        models: ['Corolla', 'Yaris', 'Hilux'],
        type: 'JIS (Asya) Standart / EFB',
        desc: 'Aracınızın donanımına göre Standart JIS kasa veya yeni nesil Start-Stop sistemleri için EFB (Asya Kasa) serisi uygundur.',
        link: 'efb.html'
    },
    vw: {
        models: ['Golf', 'Passat', 'Polo'],
        type: 'DIN (Avrupa) Standart / AGM',
        desc: 'Avrupa standartlarına uygun DIN tipi (Alçak/Geniş Kasa) aküler. Start-Stop özelliğiniz varsa AGM serisini inceleyin.',
        link: 'agm.html'
    },
    mercedes: {
        models: ['C-Class', 'E-Class', 'GLC'],
        type: 'AGM (Premium Start-Stop)',
        desc: 'Üst segment Avrupa aracınızın yüksek enerji gereksinimi ve akıllı şarj yönetimi için kesinlikle AGM tipi akü kullanılmalıdır.',
        link: 'agm.html'
    },
    ford: {
        models: ['Focus', 'Fiesta', 'Ranger'],
        type: 'DIN (Avrupa) / BCI (Amerikan)',
        desc: 'Ford araçlar genel olarak DIN (Avrupa) standardı aküler kullanır. Bazı ithal kasalarda BCI normu da görülebilir.',
        link: 'smf.html?filter=din'
    }
};

if (makeSelect) {
    makeSelect.addEventListener('change', function() {
        const make = this.value;
        modelSelect.innerHTML = '<option value="">2. Model Seçin</option>';
        yearSelect.innerHTML = '<option value="">3. Üretim Yılı</option>';
        yearSelect.disabled = true;
        findBtn.disabled = true;
        resultDiv.style.display = 'none';

        if (make && cars[make]) {
            cars[make].models.forEach(model => {
                const opt = document.createElement('option');
                opt.value = model.toLowerCase();
                opt.textContent = model;
                modelSelect.appendChild(opt);
            });
            modelSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
        }
    });

    modelSelect.addEventListener('change', function() {
        if (this.value) {
            yearSelect.disabled = false;
            // Populate years 2010-2025
            yearSelect.innerHTML = '<option value="">3. Üretim Yılı</option>';
            for(let y = 2025; y >= 2010; y--) {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y;
                yearSelect.appendChild(opt);
            }
        } else {
            yearSelect.disabled = true;
            findBtn.disabled = true;
        }
    });

    yearSelect.addEventListener('change', function() {
        findBtn.disabled = !this.value;
    });

    findBtn.addEventListener('click', function() {
        const make = makeSelect.value;
        if (make && cars[make]) {
            resultType.textContent = cars[make].type;
            resultDesc.textContent = cars[make].desc;
            resultLink.href = cars[make].link;
            
            resultDiv.style.display = 'block';
            resultDiv.classList.add('fade-in');
        }
    });
}


// Table Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const specRows = document.querySelectorAll('.spec-row');

if (filterBtns.length > 0) {
    // Check URL for filter param
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    function applyFilter(filterValue) {
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filterValue) {
                btn.classList.add('active');
                btn.style.color = 'var(--text-main)';
                btn.style.borderBottom = '2px solid var(--primary)';
            } else {
                btn.classList.remove('active');
                btn.style.color = 'var(--text-muted)';
                btn.style.borderBottom = 'none';
            }
        });

        specRows.forEach(row => {
            if (filterValue === 'all' || row.classList.contains(filterValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (filterParam) {
        applyFilter(filterParam);
    } else {
        // Default style for 'all' btn
        document.querySelector('.filter-btn[data-filter="all"]').style.color = 'var(--text-main)';
        document.querySelector('.filter-btn[data-filter="all"]').style.borderBottom = '2px solid var(--primary)';
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            applyFilter(filterValue);
            
            // Update URL without reloading
            const newUrl = window.location.pathname + '?filter=' + filterValue;
            window.history.pushState({path: newUrl}, '', newUrl);
        });
    });
}
