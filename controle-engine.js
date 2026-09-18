// Moteur du module Contrôle — T3P Contrôle
// Générique : lit ?p=<profession> et s'appuie sur PROFESSIONS (data-professions.js)
// et NATINF_DB (data-natinf.js). Une seule page pour toutes les professions.

const CYCLES = {
  standard: { states: ['unchecked', 'ok', 'bad'], labels: { unchecked: 'Non vérifié', ok: 'Présent', bad: 'Absent' } },
  carte: { states: ['unchecked', 'ok', 'warn', 'bad'], labels: { unchecked: 'Non vérifié', ok: 'Présente', warn: 'Non présentée', bad: 'Absente' } },
  carte_vtc: { states: ['unchecked', 'ok', 'non_apposee', 'non_presentee'], labels: { unchecked: 'Non vérifié', ok: 'Présente et apposée', non_apposee: 'Non apposée', non_presentee: 'Non présentée' } },
  ticket: { states: ['unchecked', 'ok', 'bad'], labels: { unchecked: 'Non vérifié', ok: 'Délivré', bad: 'Refusé' } },
  na: { states: ['unchecked', 'ok', 'na', 'bad'], labels: { unchecked: 'Non vérifié', ok: 'Justifié', na: 'Non applicable', bad: 'Absent' } },
};
// États qui NE déclenchent PAS de signalement dans l'analyse finale
const OK_STATES = new Set(['unchecked', 'ok', 'na']);
// Classe visuelle par état (pastille)
const STATE_TONE = { unchecked: '', ok: 'ok', na: 'ok', bad: 'bad', warn: 'warn', non_apposee: 'warn', non_presentee: 'bad' };

const params = new URLSearchParams(location.search);
const profKey = params.get('p') || 'taxi';
const prof = PROFESSIONS[profKey];

const state = {};
if (prof) prof.items.forEach(it => state[it.id] = CYCLES[it.cycle].states[0]);

function itemLabel(item) {
  const s = state[item.id];
  return CYCLES[item.cycle].labels[s];
}

function renderChecklist() {
  document.getElementById('pageTitle').textContent = `${prof.icon} Contrôle — ${prof.label}`;
  const byCat = {};
  prof.items.forEach(it => { (byCat[it.cat] = byCat[it.cat] || []).push(it); });

  let html = '';
  ['conducteur', 'exploitant', 'vehicule', 'course'].forEach(cat => {
    if (!byCat[cat]) return;
    html += `<div class="ctrl-group-title">${CAT_LABELS[cat]}</div><div class="ctrl-grid">`;
    byCat[cat].forEach(it => {
      const s = state[it.id];
      html += `
        <button type="button" class="ctrl-tile" data-id="${it.id}" data-state="${STATE_TONE[s]}">
          <span class="ctrl-tile-name">${it.name}</span>
          <span class="ctrl-tile-desc">${it.desc || ''}</span>
          <span class="ctrl-pill">${itemLabel(it)}</span>
        </button>`;
    });
    html += `</div>`;
  });
  document.getElementById('checklistView').innerHTML = html;

  document.querySelectorAll('.ctrl-tile').forEach(btn => {
    btn.onclick = () => {
      const item = prof.items.find(x => x.id === btn.dataset.id);
      const cyc = CYCLES[item.cycle];
      const next = cyc.states[(cyc.states.indexOf(state[item.id]) + 1) % cyc.states.length];
      state[item.id] = next;
      btn.dataset.state = STATE_TONE[next];
      btn.querySelector('.ctrl-pill').textContent = itemLabel(item);
      updateProgress();
    };
  });
  updateProgress();
}

function updateProgress() {
  const total = prof.items.length;
  const done = prof.items.filter(it => state[it.id] !== 'unchecked').length;
  document.getElementById('progressLine').textContent = `${done} / ${total} éléments renseignés`;
}

document.getElementById('analyzeBtn').onclick = () => {
  const flagged = prof.items.filter(it => !OK_STATES.has(state[it.id]));
  const checklistView = document.getElementById('checklistView');
  const resultView = document.getElementById('resultView');
  const progressWrap = document.getElementById('progressWrap');

  let html = `<div class="disclaimer">Résultat indicatif basé sur le tableau NATINF du guide (${prof.chapitre}). La qualification définitive et la conduite à tenir relèvent de l'agent, sous l'autorité de l'OPJ compétent.</div>`;

  if (flagged.length === 0) {
    html += `<div class="empty-ok">✅ Rien de signalé comme absent ou non conforme.</div>`;
  } else {
    flagged.forEach(it => {
      const code = it.natinf && it.natinf[state[it.id]];
      const n = code ? natinfFor(code) : null;
      html += `<div class="result-item">
        <div class="ri-name">${it.name} — ${itemLabel(it)}</div>
        ${n ? `
          <div class="ri-natinf">
            NATINF ${n.code} — ${n.infraction}
            <span class="tag tag-${n.tag}">${n.tag === 'rapport' ? 'RAPPORT' : 'PVE'}</span>
            ${starButton('natinf', n.code, `NATINF ${n.code}`)}
          </div>
          <div class="ri-meta">${n.classe}${n.opj ? ' · fait relevant de l\u2019OPJ' : ''}</div>
          ${it.note ? `<div class="ri-meta">${it.note}</div>` : ''}
        ` : `<div class="ri-meta">Pas de NATINF dédié dans le tableau du guide — à qualifier selon la situation.${it.note ? ' ' + it.note : ''}</div>`}
      </div>`;
    });
  }
  html += `<button type="button" class="ctrl-analyze-btn" id="backBtn" style="margin-top:10px;background:var(--white);color:var(--ink);border:1px solid var(--line);">← Revenir au contrôle</button>`;

  resultView.innerHTML = html;
  wireStarButtons(resultView);
  resultView.style.display = 'block';
  checklistView.style.display = 'none';
  progressWrap.style.display = 'none';
  document.querySelector('.ctrl-bar').style.display = 'none';
  document.getElementById('backBtn').onclick = () => {
    resultView.style.display = 'none';
    checklistView.style.display = 'block';
    progressWrap.style.display = 'block';
    document.querySelector('.ctrl-bar').style.display = 'block';
  };
};

if (!prof) {
  document.getElementById('checklistView').innerHTML = '<p>Profession inconnue.</p>';
  document.querySelector('.ctrl-bar').style.display = 'none';
} else {
  renderChecklist();
}
