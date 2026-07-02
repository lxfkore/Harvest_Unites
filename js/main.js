/* ==========================================================================
   main.js — Global JavaScript
   Handles: navbar scroll state, hamburger menu, active nav link,
            hero slideshow, and product image modal
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
    const overlay = document.getElementById('mobileOverlay');

    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));

    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));

    if (overlay) {
      overlay.classList.toggle('open', isOpen);
      overlay.setAttribute('aria-hidden', String(!isOpen));
    }
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
     HERO SLIDESHOW
     -------------------------------------------------------------------------- */
  const slides    = document.querySelectorAll('.hero__slide');
  const dots      = document.querySelectorAll('.hero__dot');
  const slideshow = document.querySelector('.hero__slideshow');
 
  if (slides.length && dots.length) {
 
    let currentIndex  = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 2000; // ms
 
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

  /* --------------------------------------------------------------------------
     NEW: Product Image Modal
     -------------------------------------------------------------------------- */
  window.openImageModal = function (button) {
    // Find the related product row and image
    const productRow = button.closest('.product-row');
    if (!productRow) return;

    const imageSrc = productRow.querySelector('img').src;
    const imageAlt = productRow.querySelector('img').alt;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.88);
      display: grid;
      place-items: center;
      z-index: 99999;
      padding: 1.5rem;
      cursor: pointer;
    `;

    // Modal content
    modal.innerHTML = `
      <div style="position: relative; max-width: 92vw; max-height: 92vh;">
        <img 
          src="${imageSrc}" 
          alt="${imageAlt}" 
          style="width: 100%; height: auto; max-height: 90vh; object-fit: contain; border-radius: 8px; box-shadow: 0 5px 25px rgba(0,0,0,0.3);"
        >
        <button 
          aria-label="Close image"
          style="
            position: absolute;
            top: -12px;
            right: -12px;
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;
            border: none;
            background: #ffffff;
            color: #111111;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            display: grid;
            place-items: center;
            line-height: 1;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          "
        >&times;</button>
      </div>
    `;

    // Close when clicking overlay or close button
    function closeModal() {
      modal.remove();
      document.body.style.overflow = '';
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.tagName === 'BUTTON') {
        closeModal();
      }
    });

    // Allow closing with Escape key
    document.addEventListener('keydown', function closeOnEsc(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', closeOnEsc);
      }
    });

    // Lock background scroll
    document.body.style.overflow = 'hidden';

    // Add modal to page
    document.body.appendChild(modal);
  };

 /* --------------------------------------------------------------------------
     5. CONTACT FORM
     Only runs if the contact form exists on the current page.
     Handles: file name display, inline validation, mailto: dispatch,
              success banner, form reset.
     -------------------------------------------------------------------------- */
  const contactForm    = document.getElementById('contactForm');
  const successBanner  = document.getElementById('contactSuccess');
  const submitBtn      = document.getElementById('submitBtn');
 
  if (contactForm) {
 
    const fields = {
      name:    document.getElementById('contactName'),
      email:   document.getElementById('contactEmail'),
      phone:   document.getElementById('contactPhone'),
      product: document.getElementById('contactProduct'),
      file:    document.getElementById('contactFile'),
      message: document.getElementById('contactMessage'),
    };
 
    const errors = {
      name:    document.getElementById('nameError'),
      email:   document.getElementById('emailError'),
      phone:   document.getElementById('phoneError'),
      file:    document.getElementById('fileError'),
      message: document.getElementById('messageError'),
    };
 
    const fileDisplay = document.getElementById('fileNameDisplay');
 
    /* ---- File input: show selected filename + size guard ---- */
    if (fields.file) {
      fields.file.addEventListener('change', function () {
        var file = this.files[0];
        if (!file) {
          if (fileDisplay) fileDisplay.textContent = 'Choose file';
          return;
        }
        var MAX_MB = 10;
        if (file.size > MAX_MB * 1024 * 1024) {
          if (errors.file) errors.file.textContent = 'File exceeds 10 MB. Please choose a smaller file.';
          if (fileDisplay) fileDisplay.textContent = 'Choose file';
          this.value = '';
          return;
        }
        if (errors.file) errors.file.textContent = '';
        if (fileDisplay) fileDisplay.textContent = file.name;
      });
    }
 
    /* ---- Validation helpers ---- */
    function isValidEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }
 
    function isValidPhone(val) {
      return /^[\d\s\+\-\(\)]{7,20}$/.test(val.trim());
    }
 
    function setError(field, errorEl, message) {
      if (!field || !errorEl) return;
      field.classList.add('invalid');
      errorEl.textContent = message;
    }
 
    function clearError(field, errorEl) {
      if (!field || !errorEl) return;
      field.classList.remove('invalid');
      errorEl.textContent = '';
    }
 
    // Live-clear errors on user input
    Object.keys(errors).forEach(function (key) {
      if (!fields[key] || !errors[key]) return;
      fields[key].addEventListener('input', function () {
        clearError(fields[key], errors[key]);
      });
    });
 
    /* ---- Full form validation ---- */
    function validateForm() {
      var valid = true;
 
      // Name
      if (!fields.name || !fields.name.value.trim()) {
        setError(fields.name, errors.name, 'Please enter your name or company name.');
        valid = false;
      } else {
        clearError(fields.name, errors.name);
      }
 
      // Email
      if (!fields.email || !fields.email.value.trim()) {
        setError(fields.email, errors.email, 'Please enter your email address.');
        valid = false;
      } else if (!isValidEmail(fields.email.value)) {
        setError(fields.email, errors.email, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(fields.email, errors.email);
      }
 
      // Phone
      if (!fields.phone || !fields.phone.value.trim()) {
        setError(fields.phone, errors.phone, 'Please enter your contact number.');
        valid = false;
      } else if (!isValidPhone(fields.phone.value)) {
        setError(fields.phone, errors.phone, 'Please enter a valid phone number.');
        valid = false;
      } else {
        clearError(fields.phone, errors.phone);
      }
 
      // Message
      if (!fields.message || !fields.message.value.trim()) {
        setError(fields.message, errors.message, 'Please describe your enquiry.');
        valid = false;
      } else if (fields.message.value.trim().length < 10) {
        setError(fields.message, errors.message, 'Please provide a bit more detail (min. 10 characters).');
        valid = false;
      } else {
        clearError(fields.message, errors.message);
      }
 
      return valid;
    }
 
    /* ---- Build formatted email body ---- */
    function buildEmailBody() {
      var name    = fields.name    ? fields.name.value.trim()    : '';
      var email   = fields.email   ? fields.email.value.trim()   : '';
      var phone   = fields.phone   ? fields.phone.value.trim()   : '';
      var product = fields.product && fields.product.value ? fields.product.value : 'Not specified';
      var message = fields.message ? fields.message.value.trim() : '';
      var file    = (fields.file && fields.file.files[0]) ? fields.file.files[0].name : 'No attachment';
 
      var body = '';
      body += 'You have received a new enquiry from your website.\n';
      body += '================================================\n\n';
      body += 'NAME / COMPANY\n';
      body += name + '\n\n';
      body += 'EMAIL ADDRESS\n';
      body += email + '\n\n';
      body += 'CONTACT NUMBER\n';
      body += phone + '\n\n';
      body += 'PRODUCT OF INTEREST\n';
      body += product + '\n\n';
      body += 'ATTACHMENT\n';
      body += file + '\n\n';
      body += 'ENQUIRY\n';
      body += '-------\n';
      body += message + '\n\n';
      body += '================================================\n';
      body += 'Sent via Harvest Unites Enterprise website contact form.';
 
      return body;
    }
 
    /* ---- Form submit ---- */
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
 
      if (!validateForm()) {
        var firstInvalid = contactForm.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
        return;
      }
 
      // Build mailto link
      var name    = fields.name ? fields.name.value.trim() : 'Customer';
      var subject = 'Inquiry from ' + name;
      var body    = buildEmailBody();
 
      var mailto = 'mailto:harvest.unites@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body='    + encodeURIComponent(body);
 
      // Loading state
      if (submitBtn) {
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.textContent = 'Opening email…';
      }

      // Build direct Gmail web compose URL (matching product page logic)
      const recipientEmail = "harvest.unites@gmail.com";
      const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // Open Gmail new tab
      const newGmailTab = window.open(gmailComposeLink, "_blank", "noopener,noreferrer");
      // Fallback for popup blockers / users without Gmail
      if (!newGmailTab) {
        window.location.href = mailto;
      }
 
      // Show success banner + reset after short delay
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.removeAttribute('aria-busy');
          submitBtn.innerHTML = 'Send Enquiry <span class="btn__arrow">→</span>';
        }
 
        if (successBanner) {
          successBanner.removeAttribute('hidden');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
 
        contactForm.reset();
        if (fileDisplay) fileDisplay.textContent = 'Choose file';
 
      }, 1200);
    });
 
  } // end if (contactForm)

})();