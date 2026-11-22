// Réglages de la galerie
const NB_PHOTOS = 28;
const DEBUT_NOM = 'photos/Photo';
const EXTENSION = '.jpeg';

fetch('content.json?v=' + Date.now())
  .then(r => r.json())
  .then(data => {
    // Vidéo de fond
    const fondVideo = document.getElementById('heroVideo');
    fondVideo.muted = true;
    fondVideo.setAttribute('playsinline', '');
    fondVideo.setAttribute('disablepictureinpicture', '');
    fondVideo.addEventListener('timeupdate', () => {
      if (fondVideo.currentTime > 1.5) fondVideo.classList.add('lecture');
    });
    fondVideo.src = data.accueil.videoFond;
    fondVideo.play().catch(() => {});

    // Titre et slogan
    document.getElementById('heroTitre').textContent = data.accueil.titre;
    document.getElementById('heroSlogan').textContent = data.accueil.slogan;

    // À propos
    document.getElementById('aproposPhoto').src = data.apropos.photo;
    document.getElementById('aproposTitre').textContent = data.apropos.titre;
    document.getElementById('aproposTexte').textContent = data.apropos.texte;

    // Contact
    document.getElementById('formContact').action = 'https://formsubmit.co/' + data.contact.email;
    document.getElementById('infosContact').textContent = data.contact.email + ' · ' + data.contact.telephone;
  });

// Galerie photos
const grille = document.getElementById('photosGrille');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

for (let i = 1; i <= NB_PHOTOS; i++) {
  const url = DEBUT_NOM + i + EXTENSION;
  const img = document.createElement('img');
  img.src = url;
  img.loading = 'lazy';
  img.alt = 'Photo ML Prod ' + i;
  img.onclick = () => { lightboxImg.src = url; lightbox.classList.add('ouverte'); };
  grille.appendChild(img);
}

// Fermer l'agrandissement en cliquant à côté ou avec Échap
lightbox.onclick = () => lightbox.classList.remove('ouverte');
document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('ouverte'); });

// Menu burger sur mobile
const menu = document.querySelector('.menu');
document.querySelector('.burger').onclick = () => menu.classList.toggle('ouvert');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('ouvert'));
