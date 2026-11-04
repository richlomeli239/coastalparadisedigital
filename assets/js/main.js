/**
 * Coastal Paradise Digital - Main Interactive Engine
 * M.C. Escher Geometric Particle Canvas, Salvador Dalí Fluid Reactivity,
 * Patrick Nagel High-Contrast Interactivity, and The Matrix Data Telemetry.
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
   1. M.C. ESCHER + MATRIX PARTICLE CONSTELLATION CANVAS
   ======================================================== */
function initMatrixCanvas() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 160 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(45, 212, 191, 0.8)' : 'rgba(213, 168, 83, 0.7)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Proximity Reaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Escher-like connecting constellation lines
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = 1 - dist / 130;
          ctx.strokeStyle = `rgba(45, 212, 191, ${alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    // Connect to mouse cursor
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = 1 - dist / mouse.radius;
          ctx.strokeStyle = `rgba(213, 168, 83, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================
   2. HEADER SCROLL & MOBILE MENU
   ======================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    navMenu.classList.toggle('active', isActive);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ========================================================
   3. 3D CARD PERSPECTIVE TILT
   ======================================================== */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.pillar-card, .hero-hud-card, .region-card');
  if (window.innerWidth < 768) return; // disable on touch/small devices

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ========================================================
   4. INTERACTIVE AD SPEND & ROI ESTIMATOR ENGINE
   ======================================================== */
function initEstimatorEngine() {
  const slider = document.getElementById('budgetSlider');
  const displayVal = document.getElementById('budgetDisplayVal');
  const industrySelect = document.getElementById('calcIndustry');
  const channelCheckboxes = document.querySelectorAll('.channel-checkbox');

  if (!slider || !displayVal) return;

  function calculateEstimates() {
    const budget = parseInt(slider.value, 10);
    displayVal.textContent = `$${budget.toLocaleString()}/mo`;

    // Multipliers by industry
    const industryMultipliers = {
      'home-services': { cpc: 9.5, cpl: 85, ticket: 3200, conv: 0.11 },
      'legal': { cpc: 28.0, cpl: 210, ticket: 7500, conv: 0.13 },
      'medical': { cpc: 7.2, cpl: 65, ticket: 1800, conv: 0.11 },
      'hospitality': { cpc: 3.8, cpl: 45, ticket: 2200, conv: 0.08 },
      'b2b': { cpc: 12.0, cpl: 110, ticket: 4800, conv: 0.09 },
      'retail': { cpc: 2.5, cpl: 28, ticket: 350, conv: 0.09 },
    };

    const selectedIndustry = industrySelect ? industrySelect.value : 'home-services';
    const config = industryMultipliers[selectedIndustry] || industryMultipliers['home-services'];

    // Channel weight & operational efficiency
    let activeChannels = 0;
    let hasOperationalConsulting = false;
    channelCheckboxes.forEach((cb) => {
      if (cb.checked) {
        activeChannels++;
        if (cb.value.toLowerCase().includes('operational')) {
          hasOperationalConsulting = true;
        }
      }
    });
    if (activeChannels === 0) activeChannels = 1;

    // Calculations: Operational efficiency improves lead conversion & deal yield
    const efficiencyMultiplier = hasOperationalConsulting ? 1.18 : 1.0;
    const avgCpc = config.cpc;
    const clicks = Math.round(budget / avgCpc);
    const impressions = Math.round(clicks * (Math.random() * 8 + 32));
    const leads = Math.max(Math.round(clicks * config.conv * efficiencyMultiplier), 4);
    const estimatedNewDeals = Math.max(Math.round(leads * (hasOperationalConsulting ? 0.32 : 0.28)), 1);
    const pipelineRevenue = Math.round(estimatedNewDeals * config.ticket);
    const roasMultiplier = (pipelineRevenue / budget).toFixed(1);

    // Update UI elements
    const impressionsEl = document.getElementById('estImpressions');
    const clicksEl = document.getElementById('estClicks');
    const leadsEl = document.getElementById('estLeads');
    const revenueEl = document.getElementById('estRevenue');
    const roasEl = document.getElementById('estRoas');

    if (impressionsEl) impressionsEl.textContent = impressions.toLocaleString();
    if (clicksEl) clicksEl.textContent = clicks.toLocaleString();
    if (leadsEl) leadsEl.textContent = `${leads.toLocaleString()} Qualified Leads`;
    if (revenueEl) revenueEl.textContent = `$${pipelineRevenue.toLocaleString()}`;
    if (roasEl) roasEl.textContent = `${roasMultiplier}x Return`;
  }

  slider.addEventListener('input', calculateEstimates);
  if (industrySelect) industrySelect.addEventListener('change', calculateEstimates);
  channelCheckboxes.forEach((cb) => cb.addEventListener('change', calculateEstimates));

  // Run initial calculation
  calculateEstimates();

  // "Lock In Estimate" Button Handler
  const lockBtn = document.getElementById('lockEstimateBtn');
  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      const budget = slider.value;
      const industry = industrySelect ? industrySelect.options[industrySelect.selectedIndex].text : '';
      const selectedChannels = [];
      channelCheckboxes.forEach((cb) => {
        if (cb.checked) selectedChannels.push(cb.value);
      });

      const params = new URLSearchParams({
        budget: budget,
        industry: industry,
        channels: selectedChannels.join(','),
      });

      window.location.href = `quote.html?${params.toString()}`;
    });
  }
}

/* ========================================================
   5. INTERACTIVE CLIENT-SIDE AI CHATBOT CONCIERGE
   ======================================================== */
function initChatbotEngine() {
  const toggleBtn = document.getElementById('chatbotToggleBtn');
  const chatWindow = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotCloseBtn');
  const messagesContainer = document.getElementById('chatbotMessages');
  const inputEl = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSendBtn');
  const unreadBadge = document.querySelector('.chatbot-unread-badge');

  if (!toggleBtn || !chatWindow) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = chatWindow.classList.toggle('active');
    if (isActive && unreadBadge) {
      unreadBadge.style.display = 'none';
      if (messagesContainer.children.length === 0) {
        sendBotGreeting();
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

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
       I'm your interactive Digital Concierge. How can we help scale your business in Southwest Florida today?`,
      [
        { label: 'Explore Services', action: 'services' },
        { label: 'Ad Spend & ROI Estimate', action: 'estimate' },
        { label: 'Areas Covered', action: 'areas' },
        { label: 'Why Server-Side Tracking?', action: 'tracking' },
        { label: 'Book Strategy Call', action: 'book' },
      ]
    );
  }

  function handleBotResponse(input) {
    const q = input.toLowerCase();

    // Delay simulated typing for natural feel
    setTimeout(() => {
      if (q.includes('service') || q === 'services') {
        appendMessage(
          'bot',
          `We deliver enterprise growth architecture engineered for Southwest Florida businesses:
           <br><br>
           1. <strong>Omnichannel Media Buying</strong> (TV, Radio, Billboards, Streaming)<br>
           2. <strong>Google Ads & Paid Search</strong> (PMax, Search, YouTube)<br>
           3. <strong>Local SEO & GEO</strong> (Google 3-Pack & AI Search)<br>
           4. <strong>High-Performance Web Design</strong> (Speed & UX)<br>
           5. <strong>Meta & Paid Social</strong> (Facebook, IG, LinkedIn)<br>
           6. <strong>Google My Business</strong> (5-Star Reputation Engine)<br>
           7. <strong>Server-Side Telemetry</strong> (sGTM & Meta CAPI - No signal loss)<br>
           8. <strong>AI Automation & Chatbots</strong> (24/7 lead capture)<br>
           9. <strong>Operational Consultancy & Transition</strong> (In-housing, process audits & data stream capture)<br><br>
           <em>Upcoming Q2 2027 Roadmap: Pillars 10–12 in Enterprise Networking, Cybersecurity & Threat Analysis (CompTIA Network+, Security+, CySA+).</em>`,
          [
            { label: 'Get a Custom Quote', action: 'quote' },
            { label: 'View 2027 Roadmap', action: 'roadmap' },
            { label: 'Book 15-Min Call', action: 'book' },
          ]
        );
      } else if (q.includes('cyber') || q.includes('security') || q.includes('network') || q.includes('cysa') || q.includes('comptia') || q.includes('dsdt') || q.includes('penetration') || q.includes('pentest') || q.includes('roadmap') || q.includes('2027')) {
        appendMessage(
          'bot',
          `<strong>Enterprise IT &amp; Cybersecurity Roadmap (Arriving Q2 2027):</strong><br><br>
           Agency founder Rich Lomeli is currently advancing through <strong>DSDT College's Technology Professional 6</strong> immersion program (networking, cybersecurity, server administration, cloud computing, and penetration testing), preparing for three premier CompTIA credentials in Q2 2027:<br><br>
           • <strong>Pillar 10: Enterprise Networking &amp; Cloud (CompTIA Network+):</strong> VLAN segmentation, hybrid cloud servers (AWS/GCP/Azure), router/switch provisioning, and encrypted IPsec VPNs.<br>
           • <strong>Pillar 11: Enterprise Cybersecurity (CompTIA Security+):</strong> Zero-Trust IAM, perimeter defense, endpoint protection (EDR), and compliance audits (NIST CSF, HIPAA, SOC 2).<br>
           • <strong>Pillar 12: Threat Intelligence &amp; Pentesting (CompTIA CySA+):</strong> Ethical hacking simulations, continuous vulnerability scanning (CVSS), SIEM telemetry, and proactive threat hunting.<br><br>
           <em>Early scoping is now open for organizations planning late-2027 IT and compliance initiatives!</em>`,
          [
            { label: 'Explore Full Roadmap', action: 'roadmap' },
            { label: 'Pre-Scope 2027 IT Project', action: 'quote' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('consult') || q.includes('operat') || q.includes('in-house') || q.includes('inhouse') || q.includes('transition') || q.includes('process')) {
        appendMessage(
          'bot',
          `<strong>Operational Consultancy & In-House Transition Services:</strong><br><br>
           • <strong>Agency-to-In-House Transition:</strong> Eliminate 20–35% in perpetual agency retainers. We audit contracts, build SOPs, train your internal staff, and execute a zero-downtime handoff.<br>
           • <strong>Business Process Streamlining:</strong> We review existing workflows to eliminate operational friction and expensive software bloat.<br>
           • <strong>Data Stream Capture:</strong> We integrate modern tech to capture previously uncaptured data streams (offline conversions, phone calls, CRM lifecycle events).<br><br>
           Engagements range from Diagnostic Audits ($3,500–$5,000 sprint) to Full Agency In-Sourcing Roadmaps ($5,000–$10,000/mo).`,
          [
            { label: 'Request Proposal', action: 'quote' },
            { label: 'Call 941-500-2566', action: 'call' },
          ]
        );
      } else if (q.includes('area') || q.includes('zip') || q.includes('location')) {
        appendMessage(
          'bot',
          `We are headquartered in <strong>Fort Myers, FL 33919</strong> and proudly serve all of Southwest Florida:
           <br><br>
           • <strong>Lee County:</strong> Fort Myers, Cape Coral, Sanibel, Captiva, Bonita Springs, Estero, Lehigh Acres.<br>
           • <strong>Collier County:</strong> Naples, Marco Island, Pelican Bay.<br>
           • <strong>Charlotte County:</strong> Punta Gorda & Port Charlotte.`,
          [
            { label: 'Check Availability', action: 'quote' },
            { label: 'Call Rich Directly', action: 'call' },
          ]
        );
      } else if (q.includes('tracking') || q.includes('capi') || q.includes('gtm')) {
        appendMessage(
          'bot',
          `<strong>Why Server-Side Tracking?</strong><br>
           Standard web tracking loses 20–30% of data due to iOS updates and ad-blockers. Rich Lomeli specializes in <strong>Server-Side Google Tag Manager (sGTM)</strong> and <strong>Meta Conversions API (CAPI)</strong>. This feeds 100% accurate customer data directly back to Google and Meta, lowering your cost per lead!`,
          [
            { label: 'See Technical Details', action: 'services' },
            { label: 'Schedule Tech Audit', action: 'book' },
          ]
        );
      } else if (q.includes('estimate') || q.includes('cost') || q.includes('price')) {
        appendMessage(
          'bot',
          `Our client campaigns range from targeted local search setups ($1,500/mo) to enterprise media buy portfolios ($15,000–$50,000+/mo).<br><br>
           You can use our <strong>Interactive Estimator Tool</strong> above to calculate your projected impressions, clicks, leads, and revenue in seconds!`,
          [
            { label: 'Open Quote Form', action: 'quote' },
            { label: 'Speak with Rich', action: 'call' },
          ]
        );
      } else if (q.includes('book') || q.includes('call') || q.includes('contact') || q.includes('phone')) {
        appendMessage(
          'bot',
          `You can connect directly with agency founder <strong>Rich Lomeli</strong> right now:
           <br><br>
           📞 <strong>Phone:</strong> <a href="tel:9415002566" style="color:var(--teal-light); text-decoration:underline;">941-500-2566</a><br>
           ✉️ <strong>Email:</strong> <a href="mailto:Info@coastalparadisedigital.com" style="color:var(--teal-light); text-decoration:underline;">Info@coastalparadisedigital.com</a><br>
           📍 <strong>Location:</strong> Fort Myers, FL 33919<br><br>
           Or click below to submit your project requirements!`,
          [
            { label: 'Go to Quote Form', action: 'quote' },
            { label: 'Pay Retainer Deposit', action: 'payment' },
          ]
        );
      } else if (q.includes('quote')) {
        window.location.href = 'quote.html';
      } else if (q === 'roadmap') {
        window.location.href = 'services.html#technology-roadmap';
      } else if (q.includes('payment') || q.includes('zelle') || q.includes('invoice')) {
        openPaymentModal();
      } else {
        appendMessage(
          'bot',
          `Thank you for your question! Because every business campaign is custom-engineered for your local market, we invite you to speak with Rich Lomeli directly at <strong>941-500-2566</strong> or request a custom proposal online.`,
          [
            { label: 'Request Proposal', action: 'quote' },
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
   6. RETAINER PAYMENT MODAL
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

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}

/* ========================================================
   7. COPY TO CLIPBOARD HELPER
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
