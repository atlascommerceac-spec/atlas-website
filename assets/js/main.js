const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const closeNav = () => {
  if (siteNav) {
    siteNav.classList.remove('open');
  }
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
};

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialNav = document.querySelectorAll('.testimonial-nav');
const dotsContainer = document.querySelector('.dot-group');

let activeIndex = 0;

if (testimonialTrack && testimonialCards.length) {
  testimonialCards.forEach((card, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    dot.addEventListener('click', () => showTestimonial(index));
    dotsContainer?.appendChild(dot);
  });

  const dots = Array.from(dotsContainer?.children || []);

  const showTestimonial = (index) => {
    activeIndex = (index + testimonialCards.length) % testimonialCards.length;
    testimonialCards.forEach((card, cardIndex) => {
      card.classList.toggle('active', cardIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  };

  testimonialNav.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.getAttribute('data-direction') === 'next' ? 1 : -1;
      showTestimonial(activeIndex + direction);
    });
  });

  showTestimonial(0);
}
