// Main JS file for Vebly Agency Website

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header scroll background transition
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      header.classList.remove('bg-transparent', 'py-6');
    } else {
      header.classList.add('bg-transparent', 'py-6');
      header.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-4');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case user loads page scrolled down

  // 2. Mobile Menu toggle drawer
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = () => {
    const isOpen = mobileNav.classList.contains('translate-x-0');
    if (isOpen) {
      mobileNav.classList.remove('translate-x-0');
      mobileNav.classList.add('translate-x-full');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
      document.body.classList.remove('overflow-hidden'); // unlock scroll
    } else {
      mobileNav.classList.remove('translate-x-full');
      mobileNav.classList.add('translate-x-0');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
      document.body.classList.add('overflow-hidden'); // lock scroll
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // 3. Bento Card 1: 3D Mouse Move Tilt Effect
  const tiltCard = document.getElementById('tilt-card');
  const cardInner = document.getElementById('tilt-card-inner');

  if (tiltCard && cardInner) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles
      const rotateY = ((x - centerX) / centerX) * 15; // Max 15 deg
      const rotateX = -((y - centerY) / centerY) * 10; // Max 10 deg
      
      cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      cardInner.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // 4. Scroll Reveal triggers using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .progress-bar-fill');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 5. Contact Form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic input verification
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const businessInput = document.getElementById('business');
      const detailsInput = document.getElementById('details');
      
      if (!nameInput.value || !emailInput.value) {
        alert('Please fill out your Name and Email.');
        return;
      }
      
      alert(`Thank you, ${nameInput.value}! Your message has been received. We will get back to you shortly.`);
      contactForm.reset();
    });
  }

  // 6. Dynamic Footer Copyright Year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
  
  // Re-run Lucide SVG icon generation (for safety)
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 7. Jay Durga Caterers case study interactive mockups switcher
  const catererFeatures = document.querySelectorAll('.caterer-feature-card');
  const mockupFrame = document.getElementById('mockup-frame');

  if (catererFeatures.length > 0) {
    catererFeatures.forEach(card => {
      const activateFeature = () => {
        const targetId = card.getAttribute('data-target');
        
        // Update active class on feature cards
        catererFeatures.forEach(c => {
          c.classList.remove('active');
          const h4 = c.querySelector('h4');
          if (h4) {
            h4.classList.remove('text-white');
            h4.classList.add('text-slate-200');
          }
        });
        card.classList.add('active');
        const activeH4 = card.querySelector('h4');
        if (activeH4) {
          activeH4.classList.remove('text-slate-200');
          activeH4.classList.add('text-white');
        }

        // Add 3D frame wiggle rotation depending on target
        if (mockupFrame) {
          let rotX = 10;
          let rotY = -10;
          if (targetId === 'enquiry-preview') { rotX = 5; rotY = -15; }
          else if (targetId === 'contact-preview') { rotX = 15; rotY = -5; }
          else if (targetId === 'responsive-preview') { rotX = 8; rotY = -8; }
          else if (targetId === 'usability-preview') { rotX = 12; rotY = -12; }
          
          mockupFrame.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        }
      };

      card.addEventListener('mouseenter', activateFeature);
      card.addEventListener('click', activateFeature);
    });
  }
});
