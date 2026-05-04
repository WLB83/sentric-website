const fs = require('fs');

let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

const customSelectCss = `
/* Custom Searchable Select */
.custom-select {
    position: relative;
    width: 100%;
}
.custom-select input.select-search {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.95rem;
    outline: none;
    transition: var(--transition);
    cursor: pointer;
}
.custom-select input.select-search:focus {
    border-color: var(--primary);
    box-shadow: 0 0 10px rgba(0, 210, 255, 0.2);
    background: rgba(0,0,0,0.8);
}
.custom-select input.select-search:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.custom-select .select-arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
    transition: transform 0.3s ease;
}
.custom-select.open .select-arrow {
    transform: translateY(-50%) rotate(180deg);
}
.custom-select .select-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    background: rgba(10, 11, 16, 0.98);
    border: 1px solid var(--primary);
    border-top: none;
    border-radius: 0 0 8px 8px;
    z-index: 100;
    display: none;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    margin-top: -2px;
}
.custom-select.open .select-options {
    display: block;
    animation: fadeInDown 0.2s ease-out;
}
.custom-select .select-options li {
    padding: 0.8rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.2s ease;
    font-size: 0.95rem;
}
.custom-select .select-options li:last-child {
    border-bottom: none;
}
.custom-select .select-options li:hover, .custom-select .select-options li.selected {
    background: rgba(0, 210, 255, 0.15);
    color: #fff;
}
.custom-select .select-options li.category-header {
    background: rgba(255,255,255,0.02);
    color: var(--primary);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: default;
    padding: 0.5rem 1rem;
}
.custom-select .select-options li.category-header:hover {
    background: rgba(255,255,255,0.02);
    color: var(--primary);
}

@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Hide the old finder-select CSS */
`;

css = css.replace(/\/\* Battery Finder Selects \*\/[\s\S]*?\.finder-select option \{[\s\S]*?\}/, customSelectCss);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);
console.log('CSS updated.');
