/* Calculator Lab widget: a working calculator you can recolour, check for colour vision
   deficiency, and test with edge cases. Usage: mountCalc(rootElement, { scale: 1 }) */
(function () {
  const CSS = `
.kc{--g0:#3A86FF;--g1:#FF8A5C;--g2:#8E6CEF;--g3:#2A9D8F;display:grid;gap:14px;font-family:'Nunito',system-ui,sans-serif;color:#2A2238}
.kc *{box-sizing:border-box}
.kc-wrap{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:start}
.kc-body{width:360px;padding:18px;border-radius:30px;background:linear-gradient(160deg,#ffffff,#f4eee9);box-shadow:0 14px 0 #e8dcd2,0 30px 50px -24px rgba(90,50,30,.35);transform:perspective(900px) rotateY(8deg) rotateX(4deg);transition:transform .4s}
.kc-body:hover{transform:none}
.kc-disp{background:#fffdf8;border:3px solid #eadfd5;border-radius:18px;padding:10px 14px;text-align:right;margin-bottom:12px;min-height:92px;display:grid;align-content:end}
.kc-exp{font:700 18px/1.2 'JetBrains Mono',monospace;color:#8a7d8f;min-height:22px;word-break:break-all}
.kc-res{font:800 38px/1.1 'Baloo 2','Nunito',sans-serif;word-break:break-all}
.kc-res.err{color:#D7263D;font-size:26px}
.kc-keys{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
.kc-k{height:56px;border:0;border-radius:15px;color:#fff;font:800 24px/1 'Baloo 2','Nunito',sans-serif;box-shadow:0 5px 0 rgba(0,0,0,.18);cursor:pointer;transition:transform .08s}
.kc-k:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.18)}
.kc-k.g0{background:var(--g0)}.kc-k.g1{background:var(--g1)}.kc-k.g2{background:var(--g2);font-size:19px}.kc-k.g3{background:var(--g3)}
.kc-side{display:grid;gap:12px;min-width:0}
.kc-card{background:#fff;border-radius:20px;padding:14px 16px;box-shadow:0 6px 0 #efe3d9}
.kc-h{font:900 13px/1 'Nunito',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#B2452F;margin-bottom:10px}
.kc-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.kc-b{border:0;border-radius:12px;padding:9px 13px;background:#FFF1E8;color:#2A2238;font:800 16px/1 'Nunito',sans-serif;cursor:pointer;box-shadow:0 3px 0 #f0d9c8}
.kc-b.on{background:linear-gradient(135deg,#FF8A5C,#F25F5C);color:#fff;box-shadow:0 3px 0 #C9443F}
.kc-sw{display:flex;align-items:center;gap:6px;font:700 14px/1 'Nunito',sans-serif}
.kc-sw input{width:40px;height:34px;border:0;padding:0;background:none;cursor:pointer}
.kc-msg{font:800 16px/1.35 'Nunito',sans-serif;padding:10px 12px;border-radius:12px;background:#F3FBF9;color:#1F7A6F}
.kc-msg.bad{background:#FFF1F1;color:#B3261E}
.kc-hist{font:700 15px/1.5 'JetBrains Mono',monospace;max-height:120px;overflow:auto;color:#5a4f63}
.kc-tests{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.kc-t{border:0;border-radius:14px;padding:10px;background:#F7F2FF;text-align:left;cursor:pointer;box-shadow:0 3px 0 #e6dcfb}
.kc-t b{display:block;font:800 18px/1.1 'JetBrains Mono',monospace;color:#5b3fbf}
.kc-t small{font:700 13px/1.2 'Nunito',sans-serif;color:#6E6280}
.kc-t.done{background:#E9FAF3;box-shadow:0 3px 0 #c6eedd}
.kc-t.done b{color:#1F7A6F}
.kc-note{font:700 14px/1.35 'Nunito',sans-serif;color:#6E6280}
.kc svg.kc-defs{position:absolute;width:0;height:0}
@media (max-width:760px){.kc-wrap{grid-template-columns:1fr}.kc-body{width:100%;transform:none}}
`;
  const PALETTES = {
    good: { name: 'Contrasting ✓', c: ['#3A86FF', '#FF8A5C', '#8E6CEF', '#2A9D8F'] },
    rg: { name: 'Red + green ✗', c: ['#D62828', '#2B9348', '#D62828', '#2B9348'] },
    grey: { name: 'All grey ✗', c: ['#B9B9B9', '#C4C4C4', '#BDBDBD', '#C0C0C0'] },
  };
  // colour vision deficiency matrices (Machado et al., severity 1.0)
  const CVD = {
    normal: null,
    protan: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
    deutan: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881],
    gray: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
  };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const lin = (v) => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
  const lum = (rgb) => .2126 * lin(rgb[0]) + .7152 * lin(rgb[1]) + .0722 * lin(rgb[2]);
  const contrastWhite = (h) => 1.05 / (lum(hex(h)) + .05);
  const sim = (rgb, m) => !m ? rgb : [0, 1, 2].map((r) => Math.max(0, Math.min(255, m[r * 3] * rgb[0] + m[r * 3 + 1] * rgb[1] + m[r * 3 + 2] * rgb[2])));
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  let uid = 0;

  window.mountCalc = function (root, opts) {
    opts = opts || {};
    if (!document.getElementById('kc-css')) { const st = document.createElement('style'); st.id = 'kc-css'; st.textContent = CSS; document.head.appendChild(st); }
    const id = 'kc' + (++uid);
    const KEYS = [['C', 'g1'], ['(', 'g1'], [')', 'g1'], ['÷', 'g1'], ['7', 'g0'], ['8', 'g0'], ['9', 'g0'], ['×', 'g1'], ['4', 'g0'], ['5', 'g0'], ['6', 'g0'], ['−', 'g1'], ['1', 'g0'], ['2', 'g0'], ['3', 'g0'], ['+', 'g1'], ['0', 'g0'], ['.', 'g0'], ['**', 'g1'], ['=', 'g3'], ['sqrt', 'g2'], ['sin', 'g2'], ['cos', 'g2'], ['tan', 'g2']];
    root.innerHTML = `<div class="kc" id="${id}">
      <svg class="kc-defs" aria-hidden="true"><filter id="${id}-f"><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></svg>
      <div class="kc-wrap">
        <div class="kc-body"><div class="kc-disp"><div class="kc-exp"></div><div class="kc-res">0</div></div>
          <div class="kc-keys">${KEYS.map(([k, g]) => `<button class="kc-k ${g}" data-k="${k}">${k === '**' ? 'xʸ' : k === 'sqrt' ? '√' : k}</button>`).join('')}</div></div>
        <div class="kc-side">
          <div class="kc-card"><div class="kc-h">🎨 Button colours (4 groups)</div>
            <div class="kc-row kc-pal">${Object.entries(PALETTES).map(([k, p]) => `<button class="kc-b" data-p="${k}">${p.name}</button>`).join('')}</div>
            <div class="kc-row" style="margin-top:10px">${['Digits', 'Operators', 'Advanced', 'Equals'].map((n, i) => `<label class="kc-sw"><input type="color" data-g="${i}">${n}</label>`).join('')}</div></div>
          <div class="kc-card"><div class="kc-h">👁 Colour vision check</div>
            <div class="kc-row kc-cvd"><button class="kc-b on" data-v="normal">Normal</button><button class="kc-b" data-v="protan">Protanopia</button><button class="kc-b" data-v="deutan">Deuteranopia</button><button class="kc-b" data-v="gray">No colour</button></div>
            <div class="kc-msg" style="margin-top:10px"></div></div>
          ${opts.tests === false ? '' : `<div class="kc-card"><div class="kc-h">🧪 Test the edge cases</div><div class="kc-tests">
            <button class="kc-t" data-t="10**20"><b>10**20</b><small>Large number</small></button>
            <button class="kc-t" data-t="−7×3"><b>−7 × 3</b><small>Negative</small></button>
            <button class="kc-t" data-t="0.1+0.2"><b>0.1 + 0.2</b><small>Decimals</small></button>
            <button class="kc-t" data-t="5÷0"><b>5 ÷ 0</b><small>Divide by 0</small></button></div>
            <div class="kc-note kc-tn" style="margin-top:8px">Tap a test: the calculator types it and presses =.</div></div>`}
          <div class="kc-card"><div class="kc-h">🕘 History</div><div class="kc-hist">No calculations yet.</div></div>
        </div></div></div>`;
    const R = root.querySelector('#' + id), $q = (s) => R.querySelector(s), $$q = (s) => [...R.querySelectorAll(s)];
    let exp = '', hist = [], cols = PALETTES.good.c.slice(), view = 'normal';
    const beepF = (t) => { try { if (window.beep) window.beep(t); else if (typeof SFX !== 'undefined') (t === 'bad' ? SFX.bad() : t === 'good' ? SFX.good() : SFX.click()); } catch (e) { } };
    const show = (res, err) => { $q('.kc-exp').textContent = exp; const r = $q('.kc-res'); r.textContent = res; r.classList.toggle('err', !!err); };
    const pretty = (v) => { if (typeof v !== 'number' || !isFinite(v)) return String(v); if (Number.isInteger(v) && Math.abs(v) < 1e21) return BigInt(Math.round(v)).toString(); return String(v); };
    function evaluate(e) {
      const js = e.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/sqrt\(/g, 'Math.sqrt(').replace(/sin\(/g, 'S(').replace(/cos\(/g, 'Co(').replace(/tan\(/g, 'T(');
      if (!/^[0-9+\-*/().\sMathsqrtSCoT]*$/.test(js)) throw new Error('bad');
      const r = Function('S', 'Co', 'T', '"use strict";return (' + js + ')')((d) => Math.sin(d * Math.PI / 180), (d) => Math.cos(d * Math.PI / 180), (d) => Math.tan(d * Math.PI / 180));
      if (!isFinite(r)) return { err: 'Cannot divide by 0' };
      return { v: r };
    }
    function press(k) {
      if (k === 'C') { exp = ''; show('0'); return; }
      if (k === '=') {
        if (!exp) return;
        let out;
        try { out = evaluate(exp); } catch (e) { out = { err: 'Invalid input' }; }
        if (out.err) { show(out.err, true); hist.unshift(`${exp} → ${out.err}`); beepF('bad'); }
        else { const p = pretty(+out.v.toPrecision(17) === out.v ? out.v : out.v); show(p); hist.unshift(`${exp} = ${p}`); beepF('good'); }
        hist = hist.slice(0, 8); $q('.kc-hist').innerHTML = hist.map((h) => `<div>${h.replace(/</g, '&lt;')}</div>`).join('');
        exp = ''; return;
      }
      if (['sqrt', 'sin', 'cos', 'tan'].includes(k)) exp += k + '(';
      else exp += k;
      show($q('.kc-res').textContent === '0' || $q('.kc-res').classList.contains('err') ? '…' : '…');
      $q('.kc-exp').textContent = exp; beepF('tap');
    }
    $$q('.kc-k').forEach((b) => b.onclick = () => press(b.dataset.k));
    // tests
    $$q('.kc-t').forEach((b) => b.onclick = async () => {
      exp = ''; const t = b.dataset.t;
      for (const ch of t.match(/\*\*|./g)) { press(ch); await new Promise((r) => setTimeout(r, 120)); }
      press('='); b.classList.add('done');
      const notes = { '10**20': 'Large numbers work: 100000000000000000000.', '−7×3': 'Negatives work: −7 × 3 = −21.', '0.1+0.2': 'Surprise! Computers store decimals in binary, so 0.1 + 0.2 = 0.30000000000000004. Round the result.', '5÷0': 'No crash: the error is handled with a message (like try-except in Python).' };
      $q('.kc-tn').textContent = notes[t];
    });
    // colours
    const paint = () => {
      cols.forEach((c, i) => R.style.setProperty('--g' + i, c));
      $$q('[data-g]').forEach((inp) => inp.value = cols[+inp.dataset.g]);
      const m = CVD[view], f = R.querySelector('feColorMatrix');
      f.setAttribute('values', m ? `${m[0]} ${m[1]} ${m[2]} 0 0 ${m[3]} ${m[4]} ${m[5]} 0 0 ${m[6]} ${m[7]} ${m[8]} 0 0 0 0 0 1 0` : '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
      $q('.kc-body').style.filter = m ? `url(#${id}-f)` : 'none';
      // check: white labels readable + groups distinguishable in every view
      const low = cols.map((c, i) => [i, contrastWhite(c)]).filter(([, r]) => r < 2.6).map(([i]) => ['digits', 'operators', 'advanced', 'equals'][i]);
      let worst = 1e9;
      for (const v of ['normal', 'protan', 'deutan']) { const s = cols.map((c) => sim(hex(c), CVD[v])); for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) worst = Math.min(worst, dist(s[a], s[b])); }
      const msg = $q('.kc-msg');
      if (low.length) { msg.className = 'kc-msg bad'; msg.textContent = `⚠ White labels are hard to read on the ${low.join(', ')} buttons. Use darker colours.`; }
      else if (worst < 60) { msg.className = 'kc-msg bad'; msg.textContent = '⚠ Some button groups look almost the same for people with colour vision deficiency. Pick more contrasting colours.'; }
      else { msg.className = 'kc-msg'; msg.textContent = '✓ Accessible: four clearly different colours, and white labels are easy to read.'; }
    };
    $$q('[data-p]').forEach((b) => b.onclick = () => { cols = PALETTES[b.dataset.p].c.slice(); $$q('[data-p]').forEach((x) => x.classList.toggle('on', x === b)); paint(); beepF('tap'); });
    $$q('[data-g]').forEach((inp) => inp.oninput = () => { cols[+inp.dataset.g] = inp.value; $$q('[data-p]').forEach((x) => x.classList.remove('on')); paint(); });
    $$q('[data-v]').forEach((b) => b.onclick = () => { view = b.dataset.v; $$q('[data-v]').forEach((x) => x.classList.toggle('on', x === b)); paint(); beepF('tap'); });
    $q('[data-p="good"]').classList.add('on');
    paint(); show('0');
    return {
      palette(k) { const b = $q(`[data-p="${k}"]`); b && b.click(); },
      view(v) { const b = $q(`[data-v="${v}"]`); b && b.click(); },
      test(i) { const b = $$q('.kc-t')[i]; b && b.click(); },
      press,
    };
  };
})();
