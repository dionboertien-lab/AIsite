
(function () {
  const form = document.getElementById('promptForm');
  const out = document.getElementById('promptOut');
  const copyBtn = document.getElementById('copyBtn');
  const buildBtn = document.getElementById('buildBtn');
  const suggestBtn = document.getElementById('suggestBtn');
  const suggestions = document.getElementById('suggestions');

  function formToObject(f) {
    const obj = {}; if (!f) return obj; const fd = new FormData(f);
    fd.forEach((v, k) => { obj[k] = v; });
    return obj;
  }

  function buildPrompt() {
    const data = formToObject(form), lines = [];
    if (data.role) lines.push(`Role: ${data.role}`);
    if (data.task) lines.push(`Task: ${data.task}`);
    if (data.context) lines.push(`Context: ${data.context}`);
    if (data.constraints) lines.push(`Constraints: ${data.constraints}`);
    if (data.format) lines.push(`Output format: ${data.format}`);
    if (data.style && data.style !== 'Neutraal') lines.push(`Stijl: ${data.style}`);
    if (data.lang) lines.push(`Taal: ${data.lang}`);
    if (data.examples && data.examples.trim()) lines.push('
Voorbeelden (few-shot):
' + data.examples.trim());
    if (out) out.textContent = lines.join('
');
  }

  function showSuggestions() {
    const blocks = [
      `Refine
— Verduidelijk het doel + 2–3 acceptatiecriteria.
— Noem expliciet doelgroep en toon.`,
      `Expand
— Voeg 3 concrete voorbeelden toe.
— Verwijs naar 2 recente bronnen.`,
      `Reduce
— Beperk tot 120 woorden.
— Max 5 bullets met werkwoorden vooraan.`,
      `Reframe
— Herschrijf voor andere doelgroep.
— Verander format naar stappenplan/checklist.`
    ];
    if (suggestions) {
      suggestions.innerHTML = '<pre class="codeblock">' + blocks.join('

') + '</pre>';
      suggestions.hidden = !suggestions.hidden;
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (copyBtn) { copyBtn.textContent = 'Gekopieerd!'; setTimeout(() => copyBtn.textContent = 'Kopieer', 1200); }
  }

  function copyOutput() {
    if (!out) return;
    const txt = out.textContent || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(() => {
        if (copyBtn) { copyBtn.textContent = 'Gekopieerd!'; setTimeout(() => copyBtn.textContent = 'Kopieer', 1200); }
      }).catch(() => fallbackCopy(txt));
    } else {
      fallbackCopy(txt);
    }
  }

  if (buildBtn) buildBtn.addEventListener('click', buildPrompt);
  if (copyBtn) copyBtn.addEventListener('click', copyOutput);
  if (suggestBtn) suggestBtn.addEventListener('click', showSuggestions);

  window.addEventListener('DOMContentLoaded', () => {
    if (!form) return;
    const setIfEmpty = (name, val) => { const el = form.elements[name]; if (el && !el.value) el.value = val; };
    setIfEmpty('task', 'Maak een korte handleiding (150 woorden) met 3 bullets en een afsluitende tip.');
    setIfEmpty('role', 'Je bent een Nederlandse AI-trainer.');
    setIfEmpty('context', 'Voor marketingprofessionals die ChatGPT gebruiken. Focus op duidelijkheid en toepasbaarheid.');
    setIfEmpty('constraints', 'Max 150 woorden, neutrale toon, citeer indien relevant.');
    setIfEmpty('format', 'Markdown met H2 en bullets.');
  });
})();
