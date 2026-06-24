/* ==========================================================================
   modal.js — Video Modal Component
   Used on: Behind the Scenes page
   Handles: open/close modal, load/unload video src, keyboard trap (Escape)
   ========================================================================== */

(function () {
  'use strict';

  const modal       = document.getElementById('videoModal');
  const backdrop    = document.getElementById('videoModalBackdrop');
  const closeBtn    = document.getElementById('videoModalClose');
  const videoPlayer = document.getElementById('videoPlayer');
  const modalTitle  = document.getElementById('videoModalTitle');

  // Only run if modal elements exist on this page
  if (!modal || !videoPlayer) return;

  /* ---- Open modal ---- */
  function openModal(src, title) {
    videoPlayer.src = src;
    if (modalTitle) modalTitle.textContent = title || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';   // prevent background scroll
    if (closeBtn) closeBtn.focus();
  }

  /* ---- Close modal ---- */
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    videoPlayer.pause();
    videoPlayer.src = '';                      // unload video to stop buffering
    document.body.style.overflow = '';
  }

  /* ---- Attach play button listeners ---- */
  document.querySelectorAll('.bts-card__play').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const src   = btn.getAttribute('data-video-src');
      const title = btn.getAttribute('data-video-title');
      if (src) openModal(src, title);
    });
  });

  /* ---- Close on backdrop click ---- */
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  /* ---- Close on X button ---- */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  /* ---- Close on Escape key ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

})();