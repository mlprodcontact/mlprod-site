fetch('content.json?v=' + Date.now())
  .then(r => r.json())
  .then(data => {
    // Accueil
    const fondVideo = document.getElementById('heroVideo');
fondVideo.muted = true;
fondVideo.src = data.accueil.videoFond;
fondVideo.play().catch(() => {});
    document.getElementById('heroTitre').textContent = data.accueil.titre;
    document.getElementById('heroSlogan').textContent = data.accueil.slogan;

    // Vidéos
    const galerie = document.getElementById('galerie');
    data.videos.forEach(v => {
      galerie.innerHTML += `
        <div class="carte">
          <iframe src="https://www.youtube.com/embed/${v.youtube}" allowfullscreen loading="lazy"></iframe>
          <div><h3>${v.titre}</h3><span>${v.lieu}</span></div>
        </div>`;
    });

    // À propos
    document.getElementById('aproposPhoto').src = data.apropos.photo;
    document.getElementById('aproposTitre').textContent = data.apropos.titre;
    document.getElementById('aproposTexte').textContent = data.apropos.texte;

    // Contact
    document.getElementById('formContact').action = 'https://formsubmit.co/' + data.contact.email;
    document.getElementById('infosContact').textContent = data.contact.email + ' · ' + data.contact.telephone;
  });

// Menu burger sur mobile
const menu = document.querySelector('.menu');
document.querySelector('.burger').onclick = () => menu.classList.toggle('ouvert');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('ouvert'));
