// T3P Contrôle — amorçage de l'application (étape 1/fondation)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.error('Échec de l’enregistrement du service worker :', err);
    });
  });
}

function updateOfflineBanner() {
  const banner = document.getElementById('offlineBanner');
  if (!banner) return;
  banner.classList.toggle('visible', !navigator.onLine);
}

window.addEventListener('online', updateOfflineBanner);
window.addEventListener('offline', updateOfflineBanner);
document.addEventListener('DOMContentLoaded', updateOfflineBanner);
