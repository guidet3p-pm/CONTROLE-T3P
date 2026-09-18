// Favoris — T3P Contrôle
// Stockage local (par appareil). Clé : t3p_favoris -> [{type, id, label}]
// type: 'natinf' | 'fiche_reflexe' | 'fiche_technique'

function getFavoris() {
  try {
    return JSON.parse(localStorage.getItem('t3p_favoris') || '[]');
  } catch (e) {
    return [];
  }
}

function isFavori(type, id) {
  return getFavoris().some(f => f.type === type && f.id === id);
}

function toggleFavori(type, id, label) {
  const favs = getFavoris();
  const idx = favs.findIndex(f => f.type === type && f.id === id);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push({ type, id, label });
  }
  try {
    localStorage.setItem('t3p_favoris', JSON.stringify(favs));
  } catch (e) { /* stockage indisponible — favori non persisté cette session */ }
  return idx < 0; // true si vient d'être ajouté
}

function starButton(type, id, label) {
  const active = isFavori(type, id);
  return `<button type="button" class="star-btn ${active ? 'active' : ''}" data-fav-type="${type}" data-fav-id="${id}" data-fav-label="${label.replace(/"/g, '&quot;')}" aria-label="Favori">${active ? '⭐' : '☆'}</button>`;
}

function wireStarButtons(root) {
  (root || document).querySelectorAll('.star-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const { favType, favId, favLabel } = btn.dataset;
      const added = toggleFavori(favType, favId, favLabel);
      btn.textContent = added ? '⭐' : '☆';
      btn.classList.toggle('active', added);
    };
  });
}
