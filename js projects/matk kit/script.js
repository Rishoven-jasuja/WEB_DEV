/* ═══════════════════════════════════════════════════════════════════════════
   DISCRETE MATHEMATICS TOOLKIT — script.js
   Pure ES6+ JavaScript · No frameworks · Fully modular
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────────────────
   UTILITY HELPERS
─────────────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Show processing overlay for a minimum visual duration */
function withLoader(fn, delay = 320) {
  const overlay = $('#processingOverlay');
  overlay.classList.add('active');
  return new Promise(resolve => {
    setTimeout(async () => {
      try { await fn(); } finally {
        overlay.classList.remove('active');
        resolve();
      }
    }, delay);
  });
}

/** Animate a number counting up */
function animateCount(el, target, duration = 600) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/** Stagger animation delay on a list of elements */
function staggerIn(elements, baseDelay = 60) {
  elements.forEach((el, i) => {
    el.style.animationDelay = `${i * baseDelay}ms`;
  });
}

/** Show an error message */
function showError(el, msg) {
  el.textContent = msg;
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });
}

function clearError(el) { el.textContent = ''; }

/** Parse a comma-separated string into a cleaned array of unique strings */
function parseSet(str) {
  return [...new Set(
    str.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)
  )];
}

/** Compute factorial (BigInt for large n) */
function factorial(n) {
  if (n < 0) return null;
  let r = BigInt(1);
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return r;
}

/** Format BigInt / number with comma separators */
function formatBig(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Escape HTML characters */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ═══════════════════════════════════════════════════════════════════════════
   1 — NAVIGATION
═══════════════════════════════════════════════════════════════════════════ */
(function Navigation() {
  const navItems  = $$('.nav-item[data-module]');
  const modules   = $$('.module');
  const sidebar   = $('#sidebar');
  const overlay   = $('#sidebarOverlay');
  const hamburger = $('#hamburgerBtn');
  const topbarInd = $('#topbarIndicator');

  function activateModule(id) {
    modules.forEach(m => m.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const target = $(`#module-${id}`);
    const navBtn = $(`.nav-item[data-module="${id}"]`);

    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (navBtn) {
      navBtn.classList.add('active');
      topbarInd.textContent =
        navBtn.querySelector('.nav-label-text')?.textContent || id;
    }

    if (window.innerWidth <= 768) closeSidebar();
  }

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  navItems.forEach(btn =>
    btn.addEventListener('click', () => activateModule(btn.dataset.module))
  );

  hamburger.addEventListener('click', () =>
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar()
  );

  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

  activateModule('sets');
})();

/* ═══════════════════════════════════════════════════════════════════════════
   2 — TOOLTIPS
═══════════════════════════════════════════════════════════════════════════ */
(function Tooltips() {
  const box = $('#tooltipBox');
  let hideTimer;

  function show(anchor) {
    clearTimeout(hideTimer);
    const tip = anchor.dataset.tip;
    if (!tip) return;
    box.textContent = tip;
    box.classList.add('visible');
    position(anchor);
  }

  function hide() {
    hideTimer = setTimeout(() => box.classList.remove('visible'), 120);
  }

  function position(anchor) {
    const rect = anchor.getBoundingClientRect();
    const bw   = box.offsetWidth || 180;
    let left   = rect.left + rect.width / 2 - bw / 2;
    let top    = rect.bottom + 8;
    left = Math.max(8, Math.min(left, window.innerWidth - bw - 8));
    if (top + 80 > window.innerHeight) top = rect.top - 80;
    box.style.left = left + 'px';
    box.style.top  = top + 'px';
  }

  document.addEventListener('mouseover', e => {
    const a = e.target.closest('.tooltip-anchor');
    if (a) show(a);
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('.tooltip-anchor')) hide();
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   3 — SET OPERATIONS
═══════════════════════════════════════════════════════════════════════════ */
(function SetOperations() {

  const inputA      = $('#setA');
  const inputB      = $('#setB');
  const btnCompute  = $('#setsCompute');
  const btnClear    = $('#setsClear');
  const btnReset    = $('#setsReset');
  const errEl       = $('#setsError');
  const resultsWrap = $('#setsResults');
  const unionEl     = $('#unionResult');
  const interEl     = $('#intersectionResult');
  const diffABEl    = $('#diffABResult');
  const diffBAEl    = $('#diffBAResult');
  const unionCnt    = $('#unionCount');
  const interCnt    = $('#intersectionCount');
  const diffABCnt   = $('#diffABCount');
  const diffBACnt   = $('#diffBACount');
  const canvas      = $('#vennCanvas');
  const ctx         = canvas.getContext('2d');

  /* ── Set math ── */
  function computeSets(A, B) {
    const setA = new Set(A), setB = new Set(B);
    return {
      union:        [...new Set([...A, ...B])],
      intersection: A.filter(x => setB.has(x)),
      diffAB:       A.filter(x => !setB.has(x)),
      diffBA:       B.filter(x => !setA.has(x)),
    };
  }

  /* ── Render element chips ── */
  function renderSet(el, arr) {
    if (arr.length === 0) {
      el.innerHTML =
        '<span style="color:var(--text-muted);font-style:italic;">∅ (empty set)</span>';
      return;
    }
    el.innerHTML = arr.map((v, i) =>
      `<span class="set-chip" style="animation-delay:${i * 40}ms">${escapeHtml(v)}</span>`
    ).join('');
  }

  /* ── Venn Diagram canvas ── */
  function drawVenn(A, B, inter) {
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.offsetWidth  || 460;
    const H   = canvas.offsetHeight || 220;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, W, H);

    const cx     = W / 2;
    const cy     = H / 2;
    const r      = Math.min(W * 0.28, H * 0.52, 105);
    const offset = r * 0.5;
    const lx     = cx - offset;
    const rx     = cx + offset;

    /* Filled circles */
    ctx.save();
    ctx.shadowBlur   = 28;
    ctx.shadowColor  = 'rgba(59,130,246,0.5)';
    ctx.beginPath(); ctx.arc(lx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59,130,246,0.18)'; ctx.fill();

    ctx.shadowColor  = 'rgba(139,92,246,0.5)';
    ctx.beginPath(); ctx.arc(rx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139,92,246,0.18)'; ctx.fill();
    ctx.restore();

    /* Intersection highlight */
    if (inter.length > 0) {
      ctx.save();
      ctx.beginPath(); ctx.arc(lx, cy, r, 0, Math.PI * 2); ctx.clip();
      ctx.beginPath(); ctx.arc(rx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16,185,129,0.30)'; ctx.fill();
      ctx.restore();
    }

    /* Strokes */
    ctx.lineWidth    = 2;
    ctx.strokeStyle  = 'rgba(59,130,246,0.85)';
    ctx.beginPath(); ctx.arc(lx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle  = 'rgba(139,92,246,0.85)';
    ctx.beginPath(); ctx.arc(rx, cy, r, 0, Math.PI * 2); ctx.stroke();

    /* Circle labels */
    const labelSize = Math.max(14, r * 0.28);
    ctx.font         = `bold ${labelSize}px 'Sora', sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = 'rgba(147,197,253,0.9)';
    ctx.fillText('A', lx - r * 0.58, cy - r * 0.1);
    ctx.fillStyle    = 'rgba(196,181,253,0.9)';
    ctx.fillText('B', rx + r * 0.58, cy - r * 0.1);

    /* Element text inside each region */
    const onlyA = A.filter(x => !new Set(B).has(x));
    const onlyB = B.filter(x => !new Set(A).has(x));

    ctx.font      = `${Math.max(10, r * 0.17)}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = 'rgba(147,197,253,0.8)';
    placeItems(onlyA, lx - r * 0.6, cy, r * 0.4);

    ctx.fillStyle = 'rgba(196,181,253,0.8)';
    placeItems(onlyB, rx + r * 0.6, cy, r * 0.4);

    if (inter.length > 0) {
      ctx.fillStyle = 'rgba(110,231,183,0.95)';
      placeItems(inter, cx, cy, r * 0.38);
    }

    /* Empty state hint */
    if (A.length === 0 && B.length === 0) {
      ctx.font      = '13px Sora, sans-serif';
      ctx.fillStyle = 'rgba(75,96,128,0.8)';
      ctx.fillText('Enter sets above to visualize', cx, cy);
    }
  }

  function placeItems(items, cx, cy, maxW) {
    const maxShow = 4;
    const show    = items.slice(0, maxShow);
    const extra   = items.length - maxShow;
    const lineH   = 15;
    const totalH  = show.length * lineH;
    show.forEach((item, i) => {
      const txt = item.length > 5 ? item.slice(0, 4) + '…' : item;
      ctx.fillText(txt, cx, cy - totalH / 2 + i * lineH + lineH / 2);
    });
    if (extra > 0) {
      const prev = ctx.fillStyle;
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText(`+${extra}`, cx, cy + totalH / 2 + lineH * 0.6);
      ctx.fillStyle = prev;
    }
  }

  /* ── Compute ── */
  async function compute() {
    clearError(errEl);
    const rawA = inputA.value.trim();
    const rawB = inputB.value.trim();
    if (!rawA && !rawB) {
      showError(errEl, 'Please enter at least one set.');
      return;
    }

    const A = rawA ? parseSet(rawA) : [];
    const B = rawB ? parseSet(rawB) : [];

    await withLoader(() => {
      const res = computeSets(A, B);

      renderSet(unionEl,  res.union);
      renderSet(interEl,  res.intersection);
      renderSet(diffABEl, res.diffAB);
      renderSet(diffBAEl, res.diffBA);

      animateCount(unionCnt,   res.union.length);
      animateCount(interCnt,   res.intersection.length);
      animateCount(diffABCnt,  res.diffAB.length);
      animateCount(diffBACnt,  res.diffBA.length);

      resultsWrap.style.display = 'grid';
      requestAnimationFrame(() => drawVenn(A, B, res.intersection));
    });

    staggerIn($$('.result-card', resultsWrap));
  }

  function clear() {
    inputA.value = '';
    inputB.value = '';
    clearError(errEl);
    resultsWrap.style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function reset() {
    inputA.value = '1, 2, 3, 4, 5';
    inputB.value = '3, 4, 5, 6, 7';
    clearError(errEl);
    compute();
  }

  btnCompute.addEventListener('click', compute);
  btnClear.addEventListener('click', clear);
  btnReset.addEventListener('click', reset);
  [inputA, inputB].forEach(inp =>
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') compute(); })
  );

  window.addEventListener('resize', () => {
    if (resultsWrap.style.display !== 'none') {
      const A = parseSet(inputA.value);
      const B = parseSet(inputB.value);
      drawVenn(A, B, A.filter(x => new Set(B).has(x)));
    }
  });

})();

/* ═══════════════════════════════════════════════════════════════════════════
   4 — TRUTH TABLE GENERATOR
═══════════════════════════════════════════════════════════════════════════ */
(function TruthTable() {

  const exprInput   = $('#truthExpr');
  const btnGenerate = $('#truthGenerate');
  const btnClear    = $('#truthClear');
  const btnReset    = $('#truthReset');
  const errEl       = $('#truthError');
  const tableCard   = $('#truthTableCard');
  const tableEl     = $('#truthTable');
  const rowCountEl  = $('#truthRowCount');

  /* ── Operator quick-insert buttons ── */
  $$('.op-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const op  = btn.dataset.op;
      const pos = exprInput.selectionStart;
      const val = exprInput.value;
      exprInput.value = val.slice(0, pos) + op + val.slice(pos);
      const np = pos + op.length;
      exprInput.setSelectionRange(np, np);
      exprInput.focus();
    });
  });

  /* ── Variable extraction ── */
  function extractVars(expr) {
    const cleaned = expr
      .replace(/\b(AND|OR|NOT|XOR|NAND|NOR)\b/gi, ' ')
      .replace(/[()]/g, ' ');
    return [...new Set((cleaned.match(/\b[A-Z]\b/g) || []))].sort();
  }

  /* ── Tokeniser ── */
  function tokenize(expr) {
    const tokens = [];
    const re = /(NAND|NOR|XOR|AND|NOT|OR)|([A-Z])|([()])/g;
    let m;
    while ((m = re.exec(expr)) !== null) {
      if (m[1])      tokens.push({ type: 'OP',    val: m[1].toUpperCase() });
      else if (m[2]) tokens.push({ type: 'VAR',   val: m[2].toUpperCase() });
      else if (m[3]) tokens.push({ type: 'PAREN', val: m[3] });
    }
    return tokens;
  }

  /* ── Recursive-descent parser → AST ── */
  function parse(tokens) {
    let pos = 0;

    const peek    = ()  => tokens[pos];
    const consume = ()  => tokens[pos++];

    function parseExpr() { return parseOr(); }

    function parseOr() {
      let node = parseAnd();
      while (peek()?.val === 'OR') { consume(); node = { t:'OR',  l:node, r:parseAnd() }; }
      return node;
    }
    function parseAnd() {
      let node = parseXor();
      while (peek()?.val === 'AND') { consume(); node = { t:'AND', l:node, r:parseXor() }; }
      return node;
    }
    function parseXor() {
      let node = parseNand();
      while (peek()?.val === 'XOR') { consume(); node = { t:'XOR', l:node, r:parseNand() }; }
      return node;
    }
    function parseNand() {
      let node = parseNor();
      while (peek()?.val === 'NAND') { consume(); node = { t:'NAND',l:node, r:parseNor() }; }
      return node;
    }
    function parseNor() {
      let node = parseNot();
      while (peek()?.val === 'NOR') { consume(); node = { t:'NOR', l:node, r:parseNot() }; }
      return node;
    }
    function parseNot() {
      if (peek()?.val === 'NOT') { consume(); return { t:'NOT', o:parseNot() }; }
      return parseAtom();
    }
    function parseAtom() {
      const tk = peek();
      if (!tk) throw new Error('Unexpected end of expression');
      if (tk.type === 'VAR') { consume(); return { t:'VAR', name:tk.val }; }
      if (tk.val === '(') {
        consume();
        const n = parseExpr();
        if (peek()?.val !== ')') throw new Error('Missing closing parenthesis )');
        consume();
        return n;
      }
      throw new Error(`Unexpected token: "${tk.val}"`);
    }

    const ast = parseExpr();
    if (pos < tokens.length)
      throw new Error(`Unexpected token: "${tokens[pos].val}"`);
    return ast;
  }

  /* ── AST evaluator ── */
  function evaluate(node, env) {
    switch (node.t) {
      case 'VAR':  return env[node.name];
      case 'NOT':  return !evaluate(node.o, env);
      case 'AND':  return evaluate(node.l, env) && evaluate(node.r, env);
      case 'OR':   return evaluate(node.l, env) || evaluate(node.r, env);
      case 'XOR':  return evaluate(node.l, env) !== evaluate(node.r, env);
      case 'NAND': return !(evaluate(node.l, env) && evaluate(node.r, env));
      case 'NOR':  return !(evaluate(node.l, env) || evaluate(node.r, env));
      default: throw new Error('Unknown AST node: ' + node.t);
    }
  }

  /* ── Build full truth-table data ── */
  function buildTable(rawExpr) {
    const expr = rawExpr.toUpperCase();
    const vars = extractVars(expr);
    if (!vars.length) throw new Error('No variables found. Use uppercase letters like A, B, C.');
    if (vars.length > 6) throw new Error('Max 6 variables supported (would create 64+ rows).');

    const tokens = tokenize(expr);
    if (!tokens.length) throw new Error('Could not parse expression. Check your syntax.');
    const ast  = parse(tokens);
    const rows = Math.pow(2, vars.length);
    const data = [];

    for (let i = 0; i < rows; i++) {
      const env = {};
      vars.forEach((v, idx) => {
        env[v] = Boolean((i >> (vars.length - 1 - idx)) & 1);
      });
      data.push({ env, result: evaluate(ast, env) });
    }
    return { vars, data };
  }

  /* ── Render HTML table ── */
  function renderTable(vars, data) {
    tableEl.innerHTML = '';

    // Header
    const thead = document.createElement('thead');
    const hrow  = document.createElement('tr');
    vars.forEach(v => {
      const th = document.createElement('th');
      th.textContent = v;
      hrow.appendChild(th);
    });
    const thOut = document.createElement('th');
    thOut.textContent = 'Output';
    hrow.appendChild(thOut);
    thead.appendChild(hrow);
    tableEl.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    data.forEach(({ env, result }, ri) => {
      const tr = document.createElement('tr');
      tr.style.animationDelay = `${ri * 22}ms`;

      vars.forEach(v => {
        const td = document.createElement('td');
        td.textContent = env[v] ? '1' : '0';
        td.className   = env[v] ? 'val-true' : 'val-false';
        tr.appendChild(td);
      });

      const tdOut = document.createElement('td');
      tdOut.textContent = result ? '1' : '0';
      tdOut.className   = `output-col ${result ? 'val-true' : 'val-false'}`;
      tr.appendChild(tdOut);
      tbody.appendChild(tr);
    });
    tableEl.appendChild(tbody);
  }

  /* ── Generate ── */
  async function generate() {
    clearError(errEl);
    const expr = exprInput.value.trim();
    if (!expr) { showError(errEl, 'Please enter a Boolean expression.'); return; }

    await withLoader(() => {
      try {
        const { vars, data } = buildTable(expr);
        renderTable(vars, data);
        rowCountEl.textContent = `${data.length} rows · ${vars.length} variable${vars.length > 1 ? 's' : ''}`;
        tableCard.style.display = 'block';
      } catch (e) {
        showError(errEl, 'Error: ' + e.message);
        tableCard.style.display = 'none';
      }
    });
  }

  function clear() {
    exprInput.value = '';
    clearError(errEl);
    tableCard.style.display = 'none';
    tableEl.innerHTML = '';
  }

  function reset() {
    exprInput.value = '(A AND B) OR NOT C';
    clearError(errEl);
    generate();
  }

  btnGenerate.addEventListener('click', generate);
  btnClear.addEventListener('click', clear);
  btnReset.addEventListener('click', reset);
  exprInput.addEventListener('keydown', e => { if (e.key === 'Enter') generate(); });

})();

/* ═══════════════════════════════════════════════════════════════════════════
   5 — PERMUTATION & COMBINATION
═══════════════════════════════════════════════════════════════════════════ */
(function PermComb() {

  const inputN      = $('#pcN');
  const inputR      = $('#pcR');
  const btnCompute  = $('#pcCompute');
  const btnClear    = $('#pcClear');
  const btnReset    = $('#pcReset');
  const errEl       = $('#pcError');
  const resultsWrap = $('#pcResults');
  const permFormula = $('#permFormula');
  const permSteps   = $('#permSteps');
  const permAnswer  = $('#permAnswer');
  const combFormula = $('#combFormula');
  const combSteps   = $('#combSteps');
  const combAnswer  = $('#combAnswer');
  const factRow     = $('#factorialRow');

  /* ── nPr via multiplication loop ── */
  function nPr(n, r) {
    let res = BigInt(1);
    for (let i = n - r + 1; i <= n; i++) res *= BigInt(i);
    return res;
  }

  /* ── nCr via optimised loop ── */
  function nCr(n, r) {
    let rr = r > n - r ? n - r : r;
    let num = BigInt(1), den = BigInt(1);
    for (let i = 0; i < rr; i++) {
      num *= BigInt(n - i);
      den *= BigInt(i + 1);
    }
    return num / den;
  }

  /* ── Compute ── */
  async function compute() {
    clearError(errEl);
    const n = parseInt(inputN.value, 10);
    const r = parseInt(inputR.value, 10);

    if (isNaN(n) || isNaN(r)) { showError(errEl, 'Please enter valid integers for both n and r.'); return; }
    if (n < 0 || r < 0)       { showError(errEl, 'n and r must be non-negative integers.'); return; }
    if (r > n)                 { showError(errEl, 'r cannot be greater than n.'); return; }
    if (n > 20)                { showError(errEl, 'Maximum supported value is n = 20.'); return; }

    await withLoader(() => {
      const perm = nPr(n, r);
      const comb = nCr(n, r);
      const fnFmt = k => formatBig(factorial(k));

      /* Permutation */
      permFormula.innerHTML =
        `<b>nPr</b> = n! / (n − r)!<br>` +
        `P(${n}, ${r}) = <b>${n}!</b> / <b>${n - r}!</b>`;

      permSteps.innerHTML =
        `${n}! &nbsp;=&nbsp; <span>${fnFmt(n)}</span><br>` +
        `${n - r}! &nbsp;=&nbsp; <span>${fnFmt(n - r)}</span>`;

      permAnswer.textContent = '';
      permAnswer.textContent = formatBig(perm);

      /* Combination */
      combFormula.innerHTML =
        `<b>nCr</b> = n! / (r! × (n − r)!)<br>` +
        `C(${n}, ${r}) = <b>${n}!</b> / (<b>${r}!</b> × <b>${n - r}!</b>)`;

      combSteps.innerHTML =
        `${n}! &nbsp;=&nbsp; <span>${fnFmt(n)}</span><br>` +
        `${r}! &nbsp;=&nbsp; <span>${fnFmt(r)}</span><br>` +
        `${n - r}! &nbsp;=&nbsp; <span>${fnFmt(n - r)}</span>`;

      combAnswer.textContent = '';
      combAnswer.textContent = formatBig(comb);

      /* Factorial reference row */
      factRow.innerHTML = '';
      for (let i = 0; i <= n; i++) {
        const chip = document.createElement('div');
        chip.className = 'fact-chip';
        chip.style.animationDelay = `${i * 35}ms`;
        chip.innerHTML = `${i}! = <strong>${fnFmt(i)}</strong>`;
        factRow.appendChild(chip);
      }

      resultsWrap.style.display = 'grid';
    });
  }

  function clear() {
    inputN.value = '';
    inputR.value = '';
    clearError(errEl);
    resultsWrap.style.display = 'none';
  }

  function reset() {
    inputN.value = 10;
    inputR.value = 3;
    clearError(errEl);
    compute();
  }

  btnCompute.addEventListener('click', compute);
  btnClear.addEventListener('click', clear);
  btnReset.addEventListener('click', reset);
  [inputN, inputR].forEach(inp =>
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') compute(); })
  );

})();

/* ═══════════════════════════════════════════════════════════════════════════
   6 — GRAPH TOOL (Dijkstra + Interactive Canvas)
═══════════════════════════════════════════════════════════════════════════ */
(function GraphTool() {

  /* ── State ── */
  const graph = {
    nodes: new Map(), // id → { id, x, y }
    edges: [],        // { from, to, weight }
  };
  let highlightedPath = [];
  let draggingNode    = null;
  let dragOffX = 0, dragOffY = 0;
  let rafId = null;

  /* ── DOM ── */
  const canvas        = $('#graphCanvas');
  const ctx           = canvas.getContext('2d');
  const nodeIdInput   = $('#nodeId');
  const edgeFromInput = $('#edgeFrom');
  const edgeToInput   = $('#edgeTo');
  const edgeWtInput   = $('#edgeWeight');
  const addNodeBtn    = $('#addNodeBtn');
  const addEdgeBtn    = $('#addEdgeBtn');
  const edgeErrEl     = $('#graphEdgeError');
  const dijkFrom      = $('#dijkstraFrom');
  const dijkTo        = $('#dijkstraTo');
  const dijkBtn       = $('#dijkstraBtn');
  const dijkErrEl     = $('#graphDijkError');
  const dijkResultEl  = $('#dijkstraResult');
  const pathDisplayEl = $('#pathDisplay');
  const distValueEl   = $('#distanceValue');
  const nodeListEl    = $('#nodeList');
  const edgeListEl    = $('#edgeList');
  const resetBtn      = $('#graphReset');

  /* ── Canvas sizing ── */
  function cw() { return canvas.offsetWidth; }
  function ch() { return canvas.offsetHeight; }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = cw() * dpr;
    canvas.height = ch() * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ── Auto layout (circle) ── */
  function autoLayout() {
    const ids = [...graph.nodes.keys()];
    if (!ids.length) return;
    const cx = cw() / 2, cy = ch() / 2;
    const r  = Math.min(cw(), ch()) * 0.33;
    ids.forEach((id, i) => {
      const n = graph.nodes.get(id);
      if (!n.x) {
        const a = (2 * Math.PI * i) / ids.length - Math.PI / 2;
        n.x = cx + r * Math.cos(a);
        n.y = cy + r * Math.sin(a);
      }
    });
  }

  /* ── Add Node ── */
  function addNode() {
    const id = nodeIdInput.value.trim().toUpperCase();
    if (!id) return;
    if (graph.nodes.has(id)) {
      shakeInput(nodeIdInput);
      return;
    }
    graph.nodes.set(id, {
      id,
      x: cw() / 2 + (Math.random() - 0.5) * cw() * 0.45,
      y: ch() / 2 + (Math.random() - 0.5) * ch() * 0.45,
    });
    nodeIdInput.value = '';
    autoLayout();
    draw();
    renderLists();
  }

  /* ── Add Edge ── */
  function addEdge() {
    clearError(edgeErrEl);
    const from   = edgeFromInput.value.trim().toUpperCase();
    const to     = edgeToInput.value.trim().toUpperCase();
    const weight = parseFloat(edgeWtInput.value);

    if (!from || !to)               { showError(edgeErrEl, 'Enter both From and To node names.'); return; }
    if (!graph.nodes.has(from))     { showError(edgeErrEl, `Node "${from}" does not exist.`);    return; }
    if (!graph.nodes.has(to))       { showError(edgeErrEl, `Node "${to}" does not exist.`);      return; }
    if (from === to)                 { showError(edgeErrEl, 'Self-loops are not supported.');      return; }
    if (isNaN(weight) || weight <= 0){ showError(edgeErrEl, 'Weight must be a positive number.');  return; }

    const dup = graph.edges.find(e =>
      (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );
    if (dup) { showError(edgeErrEl, 'This edge already exists.'); return; }

    graph.edges.push({ from, to, weight });
    edgeFromInput.value = '';
    edgeToInput.value   = '';
    edgeWtInput.value   = 1;
    draw();
    renderLists();
  }

  /* ── Delete Edge ── */
  function deleteEdge(idx) {
    graph.edges.splice(idx, 1);
    highlightedPath = [];
    dijkResultEl.style.display = 'none';
    draw();
    renderLists();
  }

  /* ── Dijkstra ── */
  function dijkstra(startId, endId) {
    if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) return null;

    const dist    = new Map();
    const prev    = new Map();
    const visited = new Set();
    const queue   = [];

    graph.nodes.forEach((_, id) => dist.set(id, Infinity));
    dist.set(startId, 0);
    queue.push({ id: startId, cost: 0 });

    while (queue.length) {
      queue.sort((a, b) => a.cost - b.cost);
      const { id: u } = queue.shift();
      if (visited.has(u)) continue;
      visited.add(u);
      if (u === endId) break;

      graph.edges
        .filter(e => e.from === u || e.to === u)
        .forEach(e => {
          const v   = e.from === u ? e.to : e.from;
          const alt = dist.get(u) + e.weight;
          if (!visited.has(v) && alt < dist.get(v)) {
            dist.set(v, alt);
            prev.set(v, u);
            queue.push({ id: v, cost: alt });
          }
        });
    }

    if (!isFinite(dist.get(endId))) return null;

    const path = [];
    let cur = endId;
    while (cur !== undefined) { path.unshift(cur); cur = prev.get(cur); }
    return { path, distance: dist.get(endId) };
  }

  function runDijkstra() {
    clearError(dijkErrEl);
    const from = dijkFrom.value.trim().toUpperCase();
    const to   = dijkTo.value.trim().toUpperCase();

    if (!from || !to)           { showError(dijkErrEl, 'Enter both source and target nodes.'); return; }
    if (!graph.nodes.has(from)) { showError(dijkErrEl, `Node "${from}" not found.`);           return; }
    if (!graph.nodes.has(to))   { showError(dijkErrEl, `Node "${to}" not found.`);             return; }
    if (from === to)             { showError(dijkErrEl, 'Source and target are the same.');      return; }

    const result = dijkstra(from, to);
    if (!result) {
      showError(dijkErrEl, `No path exists between "${from}" and "${to}".`);
      highlightedPath = [];
      dijkResultEl.style.display = 'none';
    } else {
      highlightedPath = result.path;

      pathDisplayEl.innerHTML = result.path.map((node, i) => {
        const isFirst = i === 0;
        const isLast  = i === result.path.length - 1;
        const cls     = isFirst ? 'path-node path-start'
                      : isLast  ? 'path-node path-end'
                      : 'path-node';
        const arrow   = i < result.path.length - 1
          ? '<span class="path-arrow">→</span>' : '';
        return `<span class="${cls}" style="animation-delay:${i * 80}ms">${node}</span>${arrow}`;
      }).join('');

      distValueEl.style.animation = 'none';
      distValueEl.textContent     = result.distance;
      requestAnimationFrame(() => { distValueEl.style.animation = ''; });

      dijkResultEl.style.display = 'block';
    }
    draw();
  }

  /* ── Render sidebar lists ── */
  function renderLists() {
    // Nodes
    if (!graph.nodes.size) {
      nodeListEl.innerHTML = '<span class="empty-hint">No nodes yet</span>';
    } else {
      nodeListEl.innerHTML = '';
      graph.nodes.forEach((node, id) => {
        const tag = document.createElement('div');
        tag.className = 'node-tag';
        tag.textContent = id;
        tag.title = `Click to delete node ${id}`;
        tag.addEventListener('click', () => {
          graph.nodes.delete(id);
          graph.edges    = graph.edges.filter(e => e.from !== id && e.to !== id);
          highlightedPath = [];
          dijkResultEl.style.display = 'none';
          draw(); renderLists();
        });
        nodeListEl.appendChild(tag);
      });
    }

    // Edges
    if (!graph.edges.length) {
      edgeListEl.innerHTML = '<span class="empty-hint">No edges yet</span>';
    } else {
      edgeListEl.innerHTML = '';
      graph.edges.forEach((edge, i) => {
        const row = document.createElement('div');
        row.className = 'edge-row';
        row.innerHTML = `
          <span style="color:var(--text-primary)">${edge.from}</span>
          &nbsp;↔&nbsp;
          <span style="color:var(--text-primary)">${edge.to}</span>
          &nbsp;
          <span>w:${edge.weight}</span>
          <button class="edge-delete" title="Remove">✕</button>`;
        row.querySelector('.edge-delete').addEventListener('click', () => deleteEdge(i));
        edgeListEl.appendChild(row);
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     CANVAS DRAWING ENGINE
  ═══════════════════════════════════════════════════════════ */
  function draw() {
    const W = cw(), H = ch();
    ctx.clearRect(0, 0, W, H);

    /* Subtle grid */
    ctx.strokeStyle = 'rgba(30,41,59,0.45)';
    ctx.lineWidth   = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    if (!graph.nodes.size) {
      ctx.font         = '13px Sora, sans-serif';
      ctx.fillStyle    = 'rgba(75,96,128,0.6)';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Add nodes and edges to build your graph', W / 2, H / 2);
      return;
    }

    /* Build highlighted edge key set */
    const hlEdgeKeys = new Set();
    if (highlightedPath.length > 1) {
      for (let i = 0; i < highlightedPath.length - 1; i++) {
        const a = highlightedPath[i], b = highlightedPath[i + 1];
        hlEdgeKeys.add(`${a}|${b}`);
        hlEdgeKeys.add(`${b}|${a}`);
      }
    }

    /* Draw edges */
    graph.edges.forEach(edge => {
      const a = graph.nodes.get(edge.from);
      const b = graph.nodes.get(edge.to);
      if (!a || !b) return;

      const isHL = hlEdgeKeys.has(`${edge.from}|${edge.to}`);

      ctx.save();
      ctx.lineWidth   = isHL ? 3.5 : 1.5;
      ctx.strokeStyle = isHL ? '#10b981' : 'rgba(100,116,139,0.5)';
      if (isHL) { ctx.shadowColor = 'rgba(16,185,129,0.55)'; ctx.shadowBlur = 16; }
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.restore();

      /* Weight label */
      const mx  = (a.x + b.x) / 2;
      const my  = (a.y + b.y) / 2;
      const dx  = b.x - a.x, dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx  = (-dy / len) * 13;
      const ny  = ( dx / len) * 13;

      ctx.save();
      ctx.font         = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';

      /* Weight label background pill */
      const lw = ctx.measureText(edge.weight).width + 10;
      ctx.fillStyle = 'rgba(9,12,20,0.7)';
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(mx + nx - lw/2, my + ny - 9, lw, 18, 4)
        : ctx.rect(mx + nx - lw/2, my + ny - 9, lw, 18);
      ctx.fill();

      ctx.fillStyle = isHL ? '#6ee7b7' : 'rgba(148,163,184,0.85)';
      ctx.fillText(edge.weight, mx + nx, my + ny);
      ctx.restore();
    });

    /* Draw nodes */
    const NODE_R = Math.max(17, Math.min(25, Math.min(W, H) * 0.045));

    graph.nodes.forEach(node => {
      const isHL    = highlightedPath.includes(node.id);
      const isStart = highlightedPath[0] === node.id;
      const isEnd   = highlightedPath[highlightedPath.length - 1] === node.id;

      ctx.save();

      /* Outer ring for path nodes */
      if (isHL) {
        const ringColor = isStart ? 'rgba(59,130,246,0.35)'
                        : isEnd   ? 'rgba(244,63,94,0.35)'
                        : 'rgba(16,185,129,0.3)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R + 7, 0, Math.PI * 2);
        ctx.fillStyle = ringColor;
        ctx.fill();
      }

      /* Node fill */
      const grad = ctx.createRadialGradient(
        node.x - NODE_R * 0.3, node.y - NODE_R * 0.3, 1,
        node.x, node.y, NODE_R
      );
      if (isStart) {
        grad.addColorStop(0, '#60a5fa'); grad.addColorStop(1, '#1d4ed8');
        ctx.shadowColor = 'rgba(59,130,246,0.7)'; ctx.shadowBlur = 20;
      } else if (isEnd) {
        grad.addColorStop(0, '#fb7185'); grad.addColorStop(1, '#be123c');
        ctx.shadowColor = 'rgba(244,63,94,0.7)';  ctx.shadowBlur = 20;
      } else if (isHL) {
        grad.addColorStop(0, '#34d399'); grad.addColorStop(1, '#065f46');
        ctx.shadowColor = 'rgba(16,185,129,0.6)'; ctx.shadowBlur = 18;
      } else {
        grad.addColorStop(0, '#374151'); grad.addColorStop(1, '#111827');
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = isStart ? '#93c5fd'
                      : isEnd   ? '#fca5a5'
                      : isHL    ? '#6ee7b7'
                      : 'rgba(100,116,139,0.55)';
      ctx.lineWidth   = isHL ? 2.5 : 1.5;
      ctx.stroke();
      ctx.restore();

      /* Node label */
      ctx.font         = `bold ${Math.max(11, NODE_R * 0.58)}px Sora, sans-serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle    = '#f0f4ff';
      const label      = node.id.length > 3 ? node.id.slice(0, 3) : node.id;
      ctx.fillText(label, node.x, node.y);
    });
  }

  /* ═══════════════════════════════════════════════════════════
     DRAG / TOUCH INTERACTION
  ═══════════════════════════════════════════════════════════ */
  function getPos(e) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.offsetWidth  / rect.width;
    const scaleY = canvas.offsetHeight / rect.height;
    const src    = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  }

  function nodeAt(x, y) {
    const R = Math.max(17, Math.min(25, Math.min(cw(), ch()) * 0.045)) + 4;
    for (const n of graph.nodes.values()) {
      if ((x - n.x) ** 2 + (y - n.y) ** 2 <= R * R) return n;
    }
    return null;
  }

  canvas.addEventListener('mousedown', e => {
    const { x, y } = getPos(e);
    const n = nodeAt(x, y);
    if (n) { draggingNode = n; dragOffX = x - n.x; dragOffY = y - n.y; canvas.style.cursor = 'grabbing'; }
  });

  canvas.addEventListener('mousemove', e => {
    const { x, y } = getPos(e);
    if (draggingNode) {
      const R   = 26;
      draggingNode.x = Math.max(R, Math.min(cw() - R, x - dragOffX));
      draggingNode.y = Math.max(R, Math.min(ch() - R, y - dragOffY));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(draw);
    } else {
      canvas.style.cursor = nodeAt(x, y) ? 'grab' : 'default';
    }
  });

  const endDrag = () => { draggingNode = null; canvas.style.cursor = 'default'; };
  canvas.addEventListener('mouseup',    endDrag);
  canvas.addEventListener('mouseleave', endDrag);

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const { x, y } = getPos(e);
    const n = nodeAt(x, y);
    if (n) { draggingNode = n; dragOffX = x - n.x; dragOffY = y - n.y; }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!draggingNode) return;
    const { x, y } = getPos(e);
    const R = 26;
    draggingNode.x = Math.max(R, Math.min(cw() - R, x - dragOffX));
    draggingNode.y = Math.max(R, Math.min(ch() - R, y - dragOffY));
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(draw);
  }, { passive: false });

  canvas.addEventListener('touchend', endDrag);

  /* ── Button wiring ── */
  addNodeBtn.addEventListener('click', addNode);
  nodeIdInput.addEventListener('keydown', e => { if (e.key === 'Enter') addNode(); });

  addEdgeBtn.addEventListener('click', addEdge);
  [edgeFromInput, edgeToInput, edgeWtInput].forEach(inp =>
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') addEdge(); })
  );

  dijkBtn.addEventListener('click', runDijkstra);
  [dijkFrom, dijkTo].forEach(inp =>
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') runDijkstra(); })
  );

  resetBtn.addEventListener('click', () => {
    graph.nodes.clear();
    graph.edges.length = 0;
    highlightedPath    = [];
    dijkResultEl.style.display = 'none';
    clearError(edgeErrEl);
    clearError(dijkErrEl);
    loadSample();
  });

  /* ── Sample graph ── */
  function loadSample() {
    ['A','B','C','D','E','F'].forEach(id =>
      graph.nodes.set(id, { id, x: 0, y: 0 })
    );
    [
      { from:'A', to:'B', weight:4 },
      { from:'A', to:'C', weight:2 },
      { from:'B', to:'C', weight:1 },
      { from:'B', to:'D', weight:5 },
      { from:'C', to:'D', weight:8 },
      { from:'C', to:'E', weight:10},
      { from:'D', to:'E', weight:2 },
      { from:'D', to:'F', weight:6 },
      { from:'E', to:'F', weight:3 },
    ].forEach(e => graph.edges.push(e));

    autoLayout();
    draw();
    renderLists();
  }

  /* ── Init ── */
  window.addEventListener('resize', () => {
    resizeCanvas();
    autoLayout();
    draw();
  });

  requestAnimationFrame(() => {
    resizeCanvas();
    loadSample();
  });

})();

/* ═══════════════════════════════════════════════════════════════════════════
   HELPER — Input shake animation (injected stylesheet)
═══════════════════════════════════════════════════════════════════════════ */
(function InjectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes shake {
      0%,100%{ transform:translateX(0); }
      20%    { transform:translateX(-6px); }
      40%    { transform:translateX(6px); }
      60%    { transform:translateX(-4px); }
      80%    { transform:translateX(4px); }
    }
    .shake { animation:shake .4s cubic-bezier(0.16,1,0.3,1) !important; }
    .path-start {
      background:rgba(59,130,246,0.18) !important;
      border-color:rgba(59,130,246,0.5) !important;
      color:#93c5fd !important;
    }
    .path-end {
      background:rgba(244,63,94,0.18) !important;
      border-color:rgba(244,63,94,0.5) !important;
      color:#fca5a5 !important;
    }
  `;
  document.head.appendChild(s);

  function shakeInput(el) {
    el.classList.remove('shake');
    requestAnimationFrame(() => el.classList.add('shake'));
    el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
  }
  window.shakeInput = shakeInput;
})();

/* ═══════════════════════════════════════════════════════════════════════════
   KEYBOARD SHORTCUTS  (1–4 = modules, ? = help)
═══════════════════════════════════════════════════════════════════════════ */
(function KeyboardShortcuts() {
  const map = { '1':'sets', '2':'truth', '3':'permcomb', '4':'graph', '?':'help' };
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const overlay = document.querySelector('#landingScreen');
    if (overlay && !overlay.classList.contains('hidden')) return;
    const mod = map[e.key];
    if (mod) document.querySelector(`.nav-item[data-module="${mod}"]`)?.click();
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   LANDING SCREEN
═══════════════════════════════════════════════════════════════════════════ */
(function LandingScreen() {
  const overlay   = $('#landingScreen');
  const enterBtn  = $('#landingEnter');
  const skipToggle = $('#landingSkip');
  const STORAGE_KEY = 'dmToolkit:landingSkip';

  if (!overlay || !enterBtn || !skipToggle) return;

  const skipLanding = localStorage.getItem(STORAGE_KEY) === '1';
  if (skipLanding) {
    overlay.remove();
    return;
  }

  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => overlay.classList.add('visible'));

  function close() {
    overlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    setTimeout(() => overlay.remove(), 420);
  }

  function persistSetting() {
    if (skipToggle.checked) localStorage.setItem(STORAGE_KEY, '1');
    else localStorage.removeItem(STORAGE_KEY);
  }

  function navigateToModule(moduleId) {
    const navBtn = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
    if (navBtn) navBtn.click();
  }

  $$('.landing-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleId = btn.dataset.module;
      if (moduleId) navigateToModule(moduleId);
      persistSetting();
      close();
    });
  });

  enterBtn.addEventListener('click', () => {
    persistSetting();
    close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !overlay.classList.contains('hidden')) {
      enterBtn.click();
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   WELCOME TOAST
═══════════════════════════════════════════════════════════════════════════ */
(function WelcomeToast() {
  const ks = document.createElement('style');
  ks.textContent = `
    @keyframes toastIn  { from{opacity:0;transform:translateY(16px) scale(.95)} to{opacity:1;transform:none} }
    @keyframes toastOut { to  {opacity:0;transform:translateY(8px)  scale(.95)} }
  `;
  document.head.appendChild(ks);

  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:700;
    background:var(--bg-elevated);
    border:1px solid var(--border-light);
    border-radius:12px; padding:.8rem 1.1rem;
    box-shadow:0 8px 32px rgba(0,0,0,.55);
    font-family:var(--font-ui); font-size:.82rem; color:var(--text-secondary);
    display:flex; align-items:center; gap:.6rem;
    animation:toastIn .5s cubic-bezier(0.34,1.56,0.64,1) .9s both;
    max-width:270px; line-height:1.4;
  `;
  toast.innerHTML = `
    <span style="font-size:1.05rem">⌨️</span>
    <span>Press <strong style="color:var(--text-primary);font-family:var(--font-mono)">1–4</strong> to switch modules quickly</span>
    <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:.95rem;padding:0 2px;margin-left:4px" id="toastClose">✕</button>
  `;
  document.body.appendChild(toast);

  function dismiss() {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }

  $('#toastClose').addEventListener('click', dismiss);
  setTimeout(dismiss, 5500);
})();