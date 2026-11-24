/**
 * Coastal Paradise Digital - Interactive UX & Lead-Gen Engine
 */

// Configure this with your Formspree / Web3Forms endpoint once email forwarding is ready.
// Example Formspree: 'https://formspree.io/f/yourFormId'
const FORM_ENDPOINT = '';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initChatbotEngine();
  initPaymentModal();
  initCopyButtons();
});

/* ========================================================
   1. STICKY HEADER SCROLL STATE
   ======================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 36);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ========================================================
   2. MOBILE NAVIGATION & COLLAPSIBLE SERVICES ACCORDION
   ======================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownParent = document.querySelector('.nav-item.has-dropdown');
  const dropdownToggle = document.querySelector('.dropdown-arrow-btn');
  if (!toggleBtn || !navMenu) return;

  const closeMenu = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const expanded = dropdownParent.classList.toggle('mobile-open');
      dropdownToggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/* ========================================================
   3. DIGITAL CONCIERGE CHATBOT (ALL 9 SERVICES + LEAD GEN)
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
    const isOpen = chatWindow.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      if (unreadBadge) unreadBadge.style.display = 'none';
      if (!hasOpened) {
        sendBotGreeting();
        hasOpened = true;
      }
      setTimeout(() => inputEl.focus(), 200);
    }
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  function appendMessage(sender, html, quickReplies = []) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = html;
    messagesContainer.appendChild(bubble);

    if (quickReplies.length > 0) {
      const qrContainer = document.createElement('div');
      qrContainer.className = 'chat-quick-replies';
      quickReplies.forEach((qr) => {
        const pill = document.createElement('button');
        pill.type = 'button';
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
       Looking for more qualified phone calls, a faster website, or an honest review of your current ad spend?`,
      [
        { label: 'Free Marketing Audit', action: 'contact' },
        { label: 'Explore 9 Services', action: 'services' },
        { label: 'View Case Studies', action: 'cases' },
        { label: 'Call 941-500-2566', action: 'call' },
      ]
    );
  }

  function handleBotResponse(input) {
    const q = input.toLowerCase();

    setTimeout(() => {
      if (q === 'contact' || q.includes('audit') || q.includes('quote') || q.includes('form')) {
        window.location.href = 'contact.html';
      } else if (q === 'services-page') {
        window.location.href = 'services.html';
      } else if (q === 'cases' || q.includes('case') || q.includes('result')) {
        window.location.href = 'cases.html';
      } else if (q === 'call') {
        window.location.href = 'tel:9415002566';
      } else if (q.includes('payment') || q.includes('zelle') || q.includes('invoice') || q.includes('retainer')) {
        openPaymentModal();
      } else if (q.includes('service') || q === 'services') {
        appendMessage(
          'bot',
          `We offer 9 full-service marketing &amp; creative solutions for small and mid-sized businesses:
           <br><br>
           1. <strong>Google &amp; Microsoft Ads</strong><br>
           2. <strong>Local SEO &amp; Digital Maps</strong><br>
           3. <strong>Website Design &amp; E-Commerce</strong><br>
           4. <strong>Social Media Advertising</strong><br>
           5. <strong>TV, Radio, Billboards &amp; Print</strong><br>
           6. <strong>Google Business Profile &amp; Reviews</strong><br>
           7. <strong>Customer Messaging &amp; AI Chat</strong><br>
           8. <strong>Marketing &amp; Business Consulting</strong><br>
           9. <strong>Graphic Design &amp; 4K Drone Video</strong>`,
          [
            { label: 'Request Free Audit', action: 'contact' },
            { label: 'See All Services', action: 'services-page' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('area') || q.includes('zip') || q.includes('location') || q.includes('where')) {
        appendMessage(
          'bot',
          `Based in <strong>Fort Myers, FL</strong>, we serve businesses across Lee, Collier, and Charlotte counties (Fort Myers, Cape Coral, Naples, Marco Island, Bonita Springs, Estero, Sanibel, Captiva, and Punta Gorda)—plus national campaigns.`,
          [
            { label: 'Request Free Audit', action: 'contact' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('contract')) {
        appendMessage(
          'bot',
          `No long-term lock-in contracts—we work on clear month-to-month retainers and transparent project scopes tailored to your goals.<br><br>Want an honest breakdown for your business?`,
          [
            { label: 'Get Free Audit', action: 'contact' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else {
        appendMessage(
          'bot',
          `Our local Fort Myers team can review your website, ads, or Google visibility directly. Call <strong>941-500-2566</strong> or request a free marketing audit below.`,
          [
            { label: 'Free Marketing Audit', action: 'contact' },
            { label: 'View Case Studies', action: 'cases' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      }
    }, 280);
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    appendMessage('user', text.replace(/[<>]/g, ''));
    inputEl.value = '';
    handleBotResponse(text);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

/* ========================================================
   4. RETAINER PAYMENT MODAL (ACCESSIBLE)
   ======================================================== */
let lastFocusedBeforeModal = null;

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
  if (!modal) return;
  lastFocusedBeforeModal = document.activeElement;
  modal.classList.add('active');
  const closeBtn = document.getElementById('closePaymentModal');
  if (closeBtn) closeBtn.focus();
}
window.openPaymentModal = openPaymentModal;

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (!modal) return;
  modal.classList.remove('active');
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    lastFocusedBeforeModal.focus();
  }
}
window.closePaymentModal = closePaymentModal;

/* ========================================================
   5. COPY TO CLIPBOARD
   ======================================================== */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!navigator.clipboard) return;
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
   6. CONTACT FORM HANDLER (ENDPOINT READY + EMAIL FALLBACK)
   ======================================================== */
async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const alertBox = document.getElementById('formSuccessAlert');
  const mailtoFallbackLink = document.getElementById('formMailtoFallback');

  const name = document.getElementById('contactName')?.value.trim() || '';
  const business = document.getElementById('businessName')?.value.trim() || '';
  const email = document.getElementById('contactEmail')?.value.trim() || '';
  const phone = document.getElementById('contactPhone')?.value.trim() || '';
  const website = document.getElementById('websiteUrl')?.value.trim() || 'Not provided';
  const area = document.getElementById('serviceArea')?.value.trim() || '';
  const budget = document.getElementById('monthlyBudget')?.value || 'Not specified';
  const goals = document.getElementById('projectGoals')?.value.trim() || '';
  const selectedServices = Array.from(form.querySelectorAll('input[name="services"]:checked'))
    .map((el) => el.value);

  const payload = {
    name,
    business,
    email,
    phone,
    website,
    area,
    budget,
    services: selectedServices.join(', '),
    goals,
  };

  if (FORM_ENDPOINT) {
    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    } catch (err) {
      alert('We could not send your request automatically. Please call 941-500-2566 or email info@coastalparadisedigital.com directly.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Request My Free Audit';
      }
    }
    return;
  }

  // Fallback until FORM_ENDPOINT email forwarding is configured:
  const subject = encodeURIComponent(`Free Marketing Audit Request - ${business || name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\nService Area: ${area}\nMonthly Budget: ${budget}\nInterested In: ${selectedServices.join(', ') || 'General Inquiry'}\n\nGoals:\n${goals}`
  );
  const mailtoUrl = `mailto:info@coastalparadisedigital.com?subject=${subject}&body=${body}`;

  if (mailtoFallbackLink) {
    mailtoFallbackLink.href = mailtoUrl;
  }
  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  window.location.href = mailtoUrl;
}
window.handleContactSubmit = handleContactSubmit;
