// Carrossel do banner (hero)
(function () {
  const slides = document.querySelectorAll('#heroSlides .hero-slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
  }, 5000);
})();

// Menu mobile
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Cookie bar
const cookie = document.getElementById('cookie');
document.getElementById('cookie-ok')?.addEventListener('click', () => cookie.classList.add('hide'));

// Carrossel obras
const track = document.querySelector('.carousel-track');
if (track) {
  const step = () => Math.min(580, track.querySelector('figure').offsetWidth + 24);
  document.getElementById('cnext')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  document.getElementById('cprev')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  // auto-scroll suave
  let auto = setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) track.scrollTo({ left: 0, behavior: 'smooth' });
    else track.scrollBy({ left: step(), behavior: 'smooth' });
  }, 4000);
  ['mouseenter','touchstart'].forEach(ev => track.addEventListener(ev, () => clearInterval(auto)));
}

// Google Maps - estilo claro profissional
window.initMap = function () {
  const el = document.getElementById('map');
  if (!el || !window.google) return;
  const center = { lat: -20.1281, lng: -40.3078 }; // Serra / Grande Vitória - ES
  const style = [
    { elementType: 'geometry', stylers: [{ color: '#f5f6fa' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#6b7280' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#d8dbe6' }] },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e6efe2' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#f0f1f6' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e7e9f2' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#cfe0ef' }] }
  ];
  const map = new google.maps.Map(el, {
    center, zoom: 12, styles: style, disableDefaultUI: true, zoomControl: true,
    gestureHandling: 'greedy' // remove aviso "aperte Ctrl para dar zoom"
  });
  new google.maps.Marker({ position: center, map, title: 'Meio Kilo Gesso' });
};

// Reveal on scroll
const reveals = document.querySelectorAll('.about-inner, .card, .grid figure, .why-inner, .contact-inner');
reveals.forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity .6s ease, transform .6s ease'; });
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); }
  });
}, { threshold: .12 });
reveals.forEach(el => io.observe(el));
