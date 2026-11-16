/**
 * Coastal Paradise Digital - Main Interactive Engine
 * Responsive Navigation, Contact Dispatch, Modal Handlers & Digital Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixCanvas();
  initHeaderScroll();
  initMobileMenu();
  initCard3DTilt();
  initEstimatorEngine();
  initChatbotEngine();
  initPaymentModal();
  initCopyButtons();
});

/* ========================================================
   1. BACKGROUND CANVAS (DISABLED FOR CLEAN VIDEO DISPLAY)
   ======================================================== */
function initMatrixCanvas() {
  // Canvas drawing disabled so background video remains bright, vivid, and prominent.
}

/* ========================================================
   2. STICKY HEADER & SCROLL BEHAVIOR
   ======================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ========================================================
   3. MOBILE NAVIGATION MENU
   ======================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close when clicking nav items
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

/* ========================================================
   4. INTERACTIVE 3D CARD TILT EFFECT
   ======================================================== */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.pillar-card, .region-card, .hud-metric-box, .pedigree-badge');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ========================================================
   5. ESTIMATOR (LEGACY GUARD)
   ======================================================== */
function initEstimatorEngine() {
  // Estimator engine disabled in favor of personalized consultation
}

/* ========================================================
   6. DIGITAL CONCIERGE CHATBOT
   ======================================================== */
function initChatbotEngine() {
  const toggleBtn = document.getElementById('chatbotToggleBtn');
  const chatWindow = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotCloseBtn');
  const messagesContainer = document.getElementById('chatbotMessages');
  const inputEl = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSendBtn');
  const unreadBadge = document.querySelector('.chatbot-unread-badge');

  if (!toggleBtn || !chatWindow || !messagesContainer || !inputEl || !sendBtn) return;

  let hasOpened = false;

  function toggleChat() {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      if (unreadBadge) unreadBadge.style.display = 'none';
      if (!hasOpened) {
        sendBotGreeting();
        hasOpened = true;
      }
      setTimeout(() => inputEl.focus(), 300);
    }
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  function appendMessage(sender, text, quickReplies = []) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);

    if (quickReplies.length > 0) {
      const qrContainer = document.createElement('div');
      qrContainer.className = 'chat-quick-replies';
      quickReplies.forEach((qr) => {
        const pill = document.createElement('button');
        pill.className = 'quick-reply-pill';
        pill.textContent = qr.label;
        pill.addEventListener('click', () => {
          appendMessage('user', qr.label);
          qrContainer.remove();
          handleBotResponse(qr.action);
        });
        qrContainer.appendChild(pill);
      });
      messagesContainer.appendChild(qrContainer);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function sendBotGreeting() {
    appendMessage(
      'bot',
      `<strong>Welcome to Coastal Paradise Digital!</strong><br />
       How can our local team help you grow your business in Southwest Florida today?`,
      [
        { label: 'Explore Services', action: 'services' },
        { label: 'Areas We Serve', action: 'areas' },
        { label: 'Contact Our Team', action: 'contact' },
        { label: 'Call 941-500-2566', action: 'call' },
      ]
    );
  }

  function handleBotResponse(input) {
    const q = input.toLowerCase();

    setTimeout(() => {
      if (q.includes('service') || q === 'services') {
        appendMessage(
          'bot',
          `Here are the core marketing and design services we provide for local businesses:
           <br><br>
           1. <strong>Google Ads:</strong> Show up at the top of Google when local customers search for your services.<br>
           2. <strong>Local SEO &amp; Google Maps:</strong> Rank in the Google 3-Pack so nearby customers find you first.<br>
           3. <strong>Website Design:</strong> Fast, mobile-friendly websites designed to convert visitors into phone calls.<br>
           4. <strong>Facebook &amp; Instagram Ads:</strong> Targeted local social media advertising.<br>
           5. <strong>Local TV, Radio &amp; Billboards:</strong> High-impact outdoor and broadcast campaigns across SWFL.<br>
           6. <strong>Google Business Profile:</strong> Review management and 5-star reputation optimization.<br>
           7. <strong>Customer Messaging &amp; AI Chat:</strong> 24/7 instant lead answering.<br>
           8. <strong>Marketing &amp; Business Consulting:</strong> Help your team streamline processes and eliminate wasted ad spend.`,
          [
            { label: 'Contact Us', action: 'contact' },
            { label: 'View All Services', action: 'services-page' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('area') || q.includes('zip') || q.includes('location') || q.includes('where') || q === 'areas') {
        appendMessage(
          'bot',
          `We are based right here in <strong>Fort Myers, FL (33919)</strong> and serve businesses across Southwest Florida:
           <br><br>
           • <strong>Lee County:</strong> Fort Myers, Cape Coral, Sanibel, Captiva, Bonita Springs, Estero, Lehigh Acres.<br>
           • <strong>Collier County:</strong> Naples, Marco Island, Pelican Bay.<br>
           • <strong>Charlotte County:</strong> Punta Gorda and Port Charlotte.`,
          [
            { label: 'Contact Us', action: 'contact' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('pricing') || q.includes('cost') || q.includes('quote') || q.includes('estimate') || q.includes('price')) {
        appendMessage(
          'bot',
          `Every business is unique. We provide transparent, honest pricing with zero hidden fees. We work with local small businesses as well as larger regional brands.<br><br>
           Reach out today for a free, no-obligation conversation and clear pricing!`,
          [
            { label: 'Contact Us', action: 'contact' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('contact') || q.includes('call') || q.includes('phone') || q.includes('email') || q === 'book') {
        appendMessage(
          'bot',
          `You can reach our local team directly anytime:
           <br><br>
           📞 <strong>Phone:</strong> <a href="tel:9415002566" style="color:var(--teal-light); text-decoration:underline;">941-500-2566</a><br>
           ✉️ <strong>Email:</strong> <a href="mailto:info@coastalparadisedigital.com" style="color:var(--teal-light); text-decoration:underline;">info@coastalparadisedigital.com</a><br>
           📍 <strong>Location:</strong> Fort Myers, FL 33919<br><br>
           Or click below to send us a quick note!`,
          [
            { label: 'Go to Contact Page', action: 'contact' },
            { label: 'Pay Retainer', action: 'payment' },
          ]
        );
      } else if (q === 'contact' || q.includes('form')) {
        window.location.href = 'contact.html';
      } else if (q === 'services-page') {
        window.location.href = 'services.html';
      } else if (q === 'call') {
        window.location.href = 'tel:9415002566';
      } else if (q.includes('payment') || q.includes('zelle') || q.includes('invoice')) {
        openPaymentModal();
      } else {
        appendMessage(
          'bot',
          `Thank you for your message! To get direct answers about your website, ads, or local search visibility, give us a call or send us a quick message.`,
          [
            { label: 'Contact Us', action: 'contact' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      }
    }, 400);
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    appendMessage('user', text);
    inputEl.value = '';
    handleBotResponse(text);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

/* ========================================================
   7. RETAINER PAYMENT MODAL
   ======================================================== */
function initPaymentModal() {
  const modal = document.getElementById('paymentModal');
  const closeBtn = document.getElementById('closePaymentModal');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closePaymentModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePaymentModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePaymentModal();
    }
  });
}

function openPaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.add('active');
}
window.openPaymentModal = openPaymentModal;

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}
window.closePaymentModal = closePaymentModal;

/* ========================================================
   8. COPY TO CLIPBOARD HELPER
   ======================================================== */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      });
    });
  });
}

/* ========================================================
   9. CONTACT FORM DISPATCH HANDLER
   ======================================================== */
function handleContactSubmit(e) {
  e.preventDefault();
  const alertBox = document.getElementById('formSuccessAlert');
  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  const form = document.getElementById('contactForm') || document.getElementById('proposalForm');
  if (form) form.reset();
}
window.handleContactSubmit = handleContactSubmit;
