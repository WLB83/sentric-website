const fs = require('fs');

let js = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', 'utf8');

const filterLogic = `
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
`;

js += '\n' + filterLogic;
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', js);
console.log('Table filter logic added.');
