(function () {
  'use strict';

  const root = document.getElementById('navbar-root');
  if (!root) return;

  const variant = root.getAttribute('data-navbar-variant') || 'default';

  // Allow pages to override link base if needed.
  // Example: on /pages/about.html set base="../" so links become ../pages/about.html etc.
  const base = root.getAttribute('data-base') || '';

  const isDark = variant === 'dark';

  const navbarClass = isDark ? 'navbar navbar--dark' : 'navbar';
  const logoImg = isDark ? '../assets/images/logo2.png' : 'assets/images/logo.png';

  // Links
  const aboutHref = base + 'pages/about.html';
  const productsHref = base + 'pages/products.html';
  const btsHref = base + 'pages/bts.html';
  const contactHref = base + 'pages/contact.html';

  root.innerHTML = `
    <header class="${navbarClass}" id="navbar">
      <div class="navbar__inner container">

        <a href="${base}index.html" class="navbar__logo">
          <img src="${logoImg}" alt="Harvest Unites Logo" class="navbar__logo-img" />
          <div class="navbar__logo-text">
            <span class="navbar__logo-name">Harvest Unites Enterprise Sdn. Bhd.</span>
            <span class="navbar__logo-sub"><em>(862199-X)</em></span>
          </div>
        </a>

        <nav class="navbar__nav" aria-label="Main navigation">
          <a href="${aboutHref}" class="navbar__link">About Us</a>
          <a href="${productsHref}" class="navbar__link">Our Products</a>
          <a href="${btsHref}" class="navbar__link">Behind the Scenes</a>
          <a href="${contactHref}" class="navbar__link">Contact Us</a>
        </nav>

        <button class="navbar__hamburger" id="hamburgerBtn" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      <div class="navbar__mobile-overlay" id="mobileOverlay" aria-hidden="true"></div>
      <nav class="navbar__mobile-menu" id="mobileMenu" aria-hidden="true">
        <a href="${aboutHref}" class="navbar__mobile-link">About Us</a>
        <a href="${productsHref}" class="navbar__mobile-link">Our Products</a>
        <a href="${btsHref}" class="navbar__mobile-link">Behind the Scenes</a>
        <a href="${contactHref}" class="navbar__mobile-link">Contact Us</a>
      </nav>

    </header>
  `;
})();
