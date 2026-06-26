(function () {
  'use strict';

  const root = document.getElementById('footer-root');
  if (!root) return;

  const base = root.getAttribute('data-base') || '../';

  const footer = `
    <footer class="footer">
      <div class="container footer__inner">

        <!-- Col 1: Brand Info -->
        <div class="footer__brand">
          <div class="footer__logo">
            <img
              src="${base}assets/images/logo2.png"
              alt="Harvest Unites Logo"
              class="footer__logo-img"
            />
            <span class="footer__logo-name">Harvest Unites Enterprise Sdn. Bhd.</span>
          </div>

          <ul class="footer__contact-list">
            <li>
              <svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              <address>77, Persiaran Klebang 1, Kawasan Perindustrian IGB,<br />Off Jalan Kuala Kangsa, 30100, Ipoh, Perak, Malaysia.</address>
            </li>

            <li>
              <svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z"/></svg>
              <a href="tel:+60125002383">+6012 500 2383</a>
            </li>

            <li>
              <svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:harvest.unites@gmail.com">harvest.unites@gmail.com</a>
            </li>
          </ul>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="footer__links">
          <h3 class="footer__col-title">Quick Links</h3>
          <ul>
            <li><a href="${base}pages/about.html">About Us</a></li>
            <li><a href="${base}pages/products.html">Our Products</a></li>
            <li><a href="${base}pages/bts.html">Behind the Scenes</a></li>
            <li><a href="${base}pages/contact.html">Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 3: Follow Us -->
        <div class="footer__social">
          <h3 class="footer__col-title">Follow Us</h3>
          <div class="footer__social-icons">
            <a href="#" class="footer__social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>

            <a
              href="https://wa.me/60125002383"
              class="footer__social-btn"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.428a.5.5 0 00.515.572l5.701-1.496A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.218-1.437l-.374-.222-3.884 1.019 1.034-3.772-.243-.386A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
          </div>
        </div>

      </div>

      <div class="footer__bottom">
        <div class="container">
          <p>Copyright 2026 · Harvest Unites Enterprise Sdn Bhd, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  `;

  root.innerHTML = footer;
  
})();

