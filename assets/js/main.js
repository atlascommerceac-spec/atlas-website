const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function setNavState(isOpen) {
  if (!navToggle) return;
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeNav() {
  if (!siteNav) return;
  siteNav.classList.remove('open');
  setNavState(false);
}

function toggleNav(event) {
  if (!siteNav) return;
  event.stopPropagation();
  const isOpen = !siteNav.classList.contains('open');
  siteNav.classList.toggle('open');
  setNavState(isOpen);
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', toggleNav);

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (event) => {
    if (
      siteNav.classList.contains('open') &&
      !siteNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('open')) {
      closeNav();
      navToggle.focus();
    }
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const previewCards = document.querySelectorAll('.site-preview');

function filterPreviews(category) {
  previewCards.forEach((card) => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    filterPreviews(button.dataset.filter);
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

