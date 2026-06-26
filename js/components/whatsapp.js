  (function () {
  'use strict';
  
  const whatsapp = `
    <a
      id="whatsappFloat"
      href="https://wa.me/60125006389"
      class="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.428a.5.5 0 00.515.572l5.701-1.496A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.218-1.437l-.374-.222-3.884 1.019 1.034-3.772-.243-.386A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  `;

  // Avoid duplicates if component is re-rendered.
  if (!document.querySelector('.whatsapp-float')) {
    document.body.insertAdjacentHTML('beforeend', whatsapp);
  }

  // Randomizer list for different contact numbers.
  const whatsappBtn = document.getElementById('whatsappFloat');

if (whatsappBtn) {
  const whatsappNumbers = [
    "60125006389",
    "60125002383",
    "60125173236"
  ];

  whatsappBtn.addEventListener('click', function () {
    const pick = whatsappNumbers[Math.floor(Math.random() * whatsappNumbers.length)];
    whatsappBtn.href = `https://wa.me/${pick}`;
  });
}


  })();