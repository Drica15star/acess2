'use strict';
(() => {
  const KEY = 'acessibilidade-para-todos-v1';
  const DEFAULTS = {size:100, contrast:false, spacing:false, dyslexia:false};
  let state = {...DEFAULTS};
  let speech = null;
  const buttons = action => [...document.querySelectorAll(`[data-action="${action}"]`)];
  const announce = text => { document.getElementById('status').textContent = text; };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && typeof saved === 'object') {
      if (Number.isFinite(saved.size)) state.size = Math.max(90, Math.min(150, Math.round(saved.size / 10) * 10));
      for (const key of ['contrast','spacing','dyslexia']) state[key] = saved[key] === true;
    }
  } catch (_) { /* O painel continua funcionando sem armazenamento. */ }
  const apply = () => {
    document.documentElement.style.fontSize = `${state.size}%`;
    for (const [key, cls] of Object.entries({contrast:'contraste', spacing:'espacamento', dyslexia:'dislexia'})) {
      document.body.classList.toggle(cls, state[key]);
      buttons(key).forEach(button => button.setAttribute('aria-pressed', String(state[key])));
    }
    document.querySelectorAll('.font-value').forEach(output => { output.textContent = `${state.size}%`; });
    buttons('increase').forEach(button => { button.disabled = state.size >= 150; });
    buttons('decrease').forEach(button => { button.disabled = state.size <= 90; });
  };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} };
  const speechStatus = text => { const element = document.getElementById('speech-status'); if (element) element.textContent = text; announce(text); };
  const stop = (message = true) => {
    const previous = speech;
    speech = null;
    if (previous) { previous.onend = null; previous.onerror = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (message) speechStatus('Leitura interrompida.');
  };
  const read = () => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) { speechStatus('Leitura em voz alta indisponível neste navegador.'); return; }
    stop(false);
    const content = document.getElementById('leitura') || document.getElementById('conteudo');
    // Na tela informativa, ignora controles para narrar apenas o conteúdo.
    const copy = content.cloneNode(true);
    copy.querySelectorAll('button, .quick-bar').forEach(element => element.remove());
    const text = (copy.innerText || copy.textContent).replace(/\s+/g, ' ').trim();
    const utterance = new window.SpeechSynthesisUtterance(text);
    speech = utterance;
    utterance.lang = 'pt-BR'; utterance.rate = 0.9;
    const voice = window.speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase() === 'pt-br');
    if (voice) utterance.voice = voice;
    utterance.onend = () => { if (speech === utterance) { speech = null; speechStatus('Leitura concluída.'); } };
    utterance.onerror = () => { if (speech === utterance) { speech = null; speechStatus('Não foi possível reproduzir a leitura. Verifique as vozes do navegador.'); } };
    speechStatus('Lendo o conteúdo.');
    window.speechSynthesis.speak(utterance);
  };
  const labels = {contrast:'Alto contraste', spacing:'Espaçamento', dyslexia:'Leitura para dislexia'};
  document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'read') { read(); return; }
    if (action === 'stop') { stop(); return; }
    if (action === 'increase' || action === 'decrease') {
      state.size = Math.max(90, Math.min(150, state.size + (action === 'increase' ? 10 : -10)));
      announce(`Tamanho do texto: ${state.size}%.`);
    } else if (action in labels) {
      state[action] = !state[action];
      announce(`${labels[action]} ${state[action] ? 'ativado' : 'desativado'}.`);
    } else if (action === 'reset') {
      stop(false); state = {...DEFAULTS};
      speechStatus('Ajustes restaurados ao padrão.');
    }
    apply(); save();
  }));
  window.addEventListener('pagehide', () => stop(false));
  apply();
})();
