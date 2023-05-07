function scrollToSection(event, targetId) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    const windowHeight = window.innerHeight;
    const yOffset = -windowHeight * 0.15; // Position section 25% from the top
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    smoothScrollTo(y, 250); // 250 milliseconds duration
}

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress < 0.5 ? 2 * progress * progress : (4 - 2 * progress) * progress - 1;
        window.scrollTo(0, startY + difference * easeProgress);

        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        console.log("heyo")
        // entry.target.classList.toggle('show', entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    const gif = document.getElementById('gif');
    const gifObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const gifSrc = gif.getAttribute('data-src');
          gif.setAttribute('src', gifSrc);
          gif.style.opacity = 1;
          observer.disconnect();
        }
      });
    });
  
    gifObserver.observe(gif);
});