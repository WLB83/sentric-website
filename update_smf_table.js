const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\smf.html', 'utf8');

const tableSection = `
    <!-- Specification Table with Filtering -->
    <section class="section dark-bg">
        <div class="container">
            <div class="section-header fade-in">
                <h4 class="section-subtitle">Bayi ve Toptancı Bilgilendirmesi</h4>
                <h2 class="section-title">SMF Teknik Spesifikasyonları</h2>
            </div>
            
            <div class="glassmorphism fade-in-up" style="padding: 2rem; border-radius: 16px;">
                <!-- Filter Tabs -->
                <div class="filter-tabs" style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem;">
                    <button class="filter-btn active" data-filter="all" style="background: none; border: none; color: var(--text-main); font-family: var(--font-heading); font-size: 1.1rem; cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: var(--transition);">Tümü</button>
                    <button class="filter-btn" data-filter="din" style="background: none; border: none; color: var(--text-muted); font-family: var(--font-heading); font-size: 1.1rem; cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: var(--transition);">Avrupa Araçları (DIN)</button>
                    <button class="filter-btn" data-filter="jis" style="background: none; border: none; color: var(--text-muted); font-family: var(--font-heading); font-size: 1.1rem; cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: var(--transition);">Asya Araçları (JIS)</button>
                    <button class="filter-btn" data-filter="bci" style="background: none; border: none; color: var(--text-muted); font-family: var(--font-heading); font-size: 1.1rem; cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: var(--transition);">Amerikan Araçları (BCI)</button>
                </div>

                <div style="overflow-x: auto;">
                    <table class="specs-table" style="width: 100%; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--primary);">
                                <th style="padding: 1rem; color: var(--primary);">Model (Tip)</th>
                                <th style="padding: 1rem; color: var(--primary);">Standart</th>
                                <th style="padding: 1rem; color: var(--primary);">Ah (20HR)</th>
                                <th style="padding: 1rem; color: var(--primary);">CCA (EN)</th>
                                <th style="padding: 1rem; color: var(--primary);">Boyutlar (UxGxY) mm</th>
                                <th style="padding: 1rem; color: var(--primary);">Kutu Tipi</th>
                            </tr>
                        </thead>
                        <tbody id="specs-body">
                            <!-- DIN Models -->
                            <tr class="spec-row din" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF 54459</td>
                                <td style="padding: 1rem;"><span style="background: rgba(0,210,255,0.1); color: var(--primary); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">DIN</span></td>
                                <td style="padding: 1rem;">44</td>
                                <td style="padding: 1rem;">360</td>
                                <td style="padding: 1rem;">207 x 175 x 190</td>
                                <td style="padding: 1rem;">L1</td>
                            </tr>
                            <tr class="spec-row din" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF 56030</td>
                                <td style="padding: 1rem;"><span style="background: rgba(0,210,255,0.1); color: var(--primary); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">DIN</span></td>
                                <td style="padding: 1rem;">60</td>
                                <td style="padding: 1rem;">540</td>
                                <td style="padding: 1rem;">242 x 175 x 190</td>
                                <td style="padding: 1rem;">L2</td>
                            </tr>
                            <tr class="spec-row din" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF 57539</td>
                                <td style="padding: 1rem;"><span style="background: rgba(0,210,255,0.1); color: var(--primary); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">DIN</span></td>
                                <td style="padding: 1rem;">75</td>
                                <td style="padding: 1rem;">650</td>
                                <td style="padding: 1rem;">277 x 175 x 190</td>
                                <td style="padding: 1rem;">L3</td>
                            </tr>
                            
                            <!-- JIS Models -->
                            <tr class="spec-row jis" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF NS40ZL</td>
                                <td style="padding: 1rem;"><span style="background: rgba(255,100,100,0.1); color: #ff6b6b; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">JIS</span></td>
                                <td style="padding: 1rem;">35</td>
                                <td style="padding: 1rem;">300</td>
                                <td style="padding: 1rem;">196 x 128 x 225</td>
                                <td style="padding: 1rem;">B19</td>
                            </tr>
                            <tr class="spec-row jis" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF 55D23L</td>
                                <td style="padding: 1rem;"><span style="background: rgba(255,100,100,0.1); color: #ff6b6b; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">JIS</span></td>
                                <td style="padding: 1rem;">60</td>
                                <td style="padding: 1rem;">500</td>
                                <td style="padding: 1rem;">230 x 172 x 220</td>
                                <td style="padding: 1rem;">D23</td>
                            </tr>
                            <tr class="spec-row jis" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF 80D26L</td>
                                <td style="padding: 1rem;"><span style="background: rgba(255,100,100,0.1); color: #ff6b6b; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">JIS</span></td>
                                <td style="padding: 1rem;">70</td>
                                <td style="padding: 1rem;">600</td>
                                <td style="padding: 1rem;">258 x 172 x 220</td>
                                <td style="padding: 1rem;">D26</td>
                            </tr>

                            <!-- BCI Models -->
                            <tr class="spec-row bci" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">SMF 65-850</td>
                                <td style="padding: 1rem;"><span style="background: rgba(100,255,150,0.1); color: #4ade80; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">BCI</span></td>
                                <td style="padding: 1rem;">85</td>
                                <td style="padding: 1rem;">850</td>
                                <td style="padding: 1rem;">305 x 190 x 192</td>
                                <td style="padding: 1rem;">Group 65</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
`;

html = html.replace(/<!-- NEW: Performance Charts -->[\s\S]*?(?=<!-- Footer -->)/, tableSection);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\smf.html', html);
console.log('SMF html updated with filterable table.');
