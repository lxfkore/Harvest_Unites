/* ==========================================================================
   main.js — Global JavaScript
   Handles: navbar scroll state, hamburger menu, active nav link
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Navbar
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run on load in case page is already scrolled


  /* --------------------------------------------------------------------------
     Hamburger: mobile menu toggle
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu   = document.getElementById('mobileMenu');

  function toggleMobileMenu(isOpen) {
    if (!hamburgerBtn || !mobileMenu) return;
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      const isCurrentlyOpen = hamburgerBtn.classList.contains('open');
      toggleMobileMenu(!isCurrentlyOpen);
    });
  }

  // Close mobile menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMobileMenu(false);
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navbar) return;
    if (!navbar.contains(e.target)) {
      toggleMobileMenu(false);
    }
  });


  /* --------------------------------------------------------------------------
     Active nav link
     -------------------------------------------------------------------------- */
  function setActiveNavLink() {
    const currentPath = window.location.pathname;

    // Gather all nav links (desktop + mobile)
    const allLinks = document.querySelectorAll('.navbar__link, .navbar__mobile-link');

    allLinks.forEach(function (link) {
      const linkPath = new URL(link.href, window.location.origin).pathname;

      // Normalize: treat /index.html and / as the same
      const normCurrent = currentPath.replace(/\/index\.html$/, '/');
      const normLink    = linkPath.replace(/\/index\.html$/, '/');

      if (normCurrent === normLink || (normCurrent === '/' && normLink === '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  /* --------------------------------------------------------------------------
     4. HERO SLIDESHOW
     -------------------------------------------------------------------------- */
  const slides    = document.querySelectorAll('.hero__slide');
  const dots      = document.querySelectorAll('.hero__dot');
  const slideshow = document.querySelector('.hero__slideshow');
 
  if (slides.length && dots.length) {
 
    let currentIndex  = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 3000; // ms
 
    function goToSlide(nextIndex) {
      if (nextIndex === currentIndex) return;
 
      const current = slides[currentIndex];
      const next    = slides[nextIndex];
 
      // Exit current slide
      current.classList.remove('active');
      current.classList.add('exit');
      current.addEventListener('transitionend', function onExit() {
        current.classList.remove('exit');
        current.removeEventListener('transitionend', onExit);
      });
 
      // Activate next slide
      next.classList.add('active');
 
      // Sync dots
      dots[currentIndex].classList.remove('active');
      dots[nextIndex].classList.add('active');
 
      currentIndex = nextIndex;
    }
 
    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }
 
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }
 
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
 
    // Dot click controls
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        stopAutoplay();
        goToSlide(index);
        startAutoplay();
      });
    });
 
    // Pause on hover / focus
    if (slideshow) {
      slideshow.addEventListener('mouseenter', stopAutoplay);
      slideshow.addEventListener('mouseleave', startAutoplay);
      slideshow.addEventListener('focusin',    stopAutoplay);
      slideshow.addEventListener('focusout',   startAutoplay);
 
      // Keyboard arrow navigation
      slideshow.setAttribute('tabindex', '0');
      slideshow.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
          stopAutoplay();
          nextSlide();
          startAutoplay();
        } else if (e.key === 'ArrowLeft') {
          stopAutoplay();
          goToSlide((currentIndex - 1 + slides.length) % slides.length);
          startAutoplay();
        }
      });
    }
 
    // Pause when tab is hidden
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stopAutoplay() : startAutoplay();
    });
 
    // Kick off
    startAutoplay();
  }

})();