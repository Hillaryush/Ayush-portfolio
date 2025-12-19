const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  link.addEventListener('click', e => {
    if (link.hash) {
      e.preventDefault();
      document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('open');
      history.replaceState(null, '', link.hash);
    }
  });
});

const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = sections[0].id;

  sections.forEach(sec => {
    if (y >= sec.offsetTop) current = sec.id;
  });

  links.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`)
  );

  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.querySelector('.progress').style.width = `${scrolled}%`;
});

/* Typed Text */
const typedEl = document.getElementById('typed');
const titles = [
  'Full-Stack Developer',
  'React & Node.js Enthusiast',
  'B.Tech CSE Student',
  'Open to Internships'
];

let ti = 0, ci = 0, dir = 1, pause = 0;

function typeLoop() {
  if (!typedEl) return;

  if (pause > 0) {
    pause--;
    return requestAnimationFrame(typeLoop);
  }

  const word = titles[ti];
  ci += dir;
  typedEl.textContent = word.slice(0, ci);

  if (dir === 1 && ci === word.length) {
    pause = 40;
    dir = -1;
  }

  if (dir === -1 && ci === 0) {
    dir = 1;
    ti = (ti + 1) % titles.length;
    pause = 12;
  }

  setTimeout(typeLoop, 50);
}

typeLoop();

/* Reveal animations */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-pop')
  .forEach(el => observer.observe(el));

/* Contact form demo */
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks! Your message has been sent.');
  e.target.reset();
});
