/**
 * Localized particle burst micro-interaction for primary CTAs and interactive cards.
 * Respects user's reduced-motion preferences and cleanly self-terminates.
 */
export function triggerParticleBurst(event) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const button = event.currentTarget;
  if (!button) return;

  const rect = button.getBoundingClientRect();
  const clickX = event.clientX ? event.clientX - rect.left : rect.width / 2;
  const clickY = event.clientY ? event.clientY - rect.top : rect.height / 2;

  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.position = 'absolute';
  container.style.inset = '0';
  container.style.pointerEvents = 'none';
  container.style.overflow = 'hidden';
  container.style.borderRadius = window.getComputedStyle(button).borderRadius || '12px';
  container.style.zIndex = '40';

  if (window.getComputedStyle(button).position === 'static') {
    button.style.position = 'relative';
  }

  button.appendChild(container);

  const colors = ['#E51D25', '#FF4D55', '#FFFFFF', '#FCD34D'];
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.6;
    const distance = 20 + Math.random() * 28;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    const size = 3 + Math.random() * 2.5;
    const color = colors[i % colors.length];

    particle.style.position = 'absolute';
    particle.style.left = `${clickX}px`;
    particle.style.top = `${clickY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = `0 0 4px ${color}`;
    particle.style.transform = 'translate(-50%, -50%) scale(1)';
    particle.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out';
    particle.style.opacity = '1';
    particle.style.pointerEvents = 'none';

    container.appendChild(particle);

    // Trigger animation next frame
    requestAnimationFrame(() => {
      particle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
      particle.style.opacity = '0';
    });
  }

  setTimeout(() => {
    container.remove();
  }, 500);
}
