const cursor = document.getElementById('cursor');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

document.querySelectorAll('a, .skill-word, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.style.transitionDelay || 0) * 1000;
      setTimeout(() => entry.target.classList.add('visible'), delay > 0 ? 0 : 0);
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const scroll = document.getElementById('projectsScroll');
let isDown = false, startX, scrollLeft;
scroll.addEventListener('mousedown', e => {
  isDown = true; scroll.classList.add('active');
  startX = e.pageX - scroll.offsetLeft;
  scrollLeft = scroll.scrollLeft;
});
scroll.addEventListener('mouseleave', () => { isDown = false; });
scroll.addEventListener('mouseup', () => { isDown = false; });
scroll.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scroll.offsetLeft;
  scroll.scrollLeft = scrollLeft - (x - startX) * 1.2;
});
