// ====================================
// RESPONSIVE UTILITIES
// ====================================

// Check if device is mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Get current viewport width
function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

// Detect viewport changes and adjust layout
function handleViewportChange() {
  const width = getViewportWidth();
  const body = document.body;
  
  if (width <= 480) {
    body.classList.add('mobile-small');
    body.classList.remove('mobile-medium', 'tablet', 'desktop');
  } else if (width <= 768) {
    body.classList.add('mobile-medium');
    body.classList.remove('mobile-small', 'tablet', 'desktop');
  } else if (width <= 1024) {
    body.classList.add('tablet');
    body.classList.remove('mobile-small', 'mobile-medium', 'desktop');
  } else {
    body.classList.add('desktop');
    body.classList.remove('mobile-small', 'mobile-medium', 'tablet');
  }
}

// Listen for viewport changes
window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', handleViewportChange);

// ====================================
// CONTACT FORM HANDLING
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  handleViewportChange(); // Initial setup
  
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!fullName || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Show success message with better UX for mobile
      const message_text = `Thank you, ${fullName}! Your message has been sent. We'll contact you at ${email} soon.`;
      if (isMobileDevice()) {
        showNotification(message_text, 'success');
      } else {
        alert(message_text);
      }
      
      // Reset form
      contactForm.reset();
      
      // Optional: Send to backend (uncomment and configure as needed)
      // sendFormData(fullName, email, message);
    });
  }
});

// Custom notification for mobile
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    padding: 16px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add animation styles
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ====================================
// MOBILE MENU TOGGLE
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  if (menuToggle && mainMenu) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainMenu.classList.toggle('active');
      
      // Change toggle button text
      if (mainMenu.classList.contains('active')) {
        menuToggle.textContent = '✕';
        document.body.style.overflow = 'hidden'; // Prevent scrolling on mobile
      } else {
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mainMenu.classList.contains('active')) {
        if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
          mainMenu.classList.remove('active');
          menuToggle.textContent = '☰';
          document.body.style.overflow = '';
        }
      }
    });

    // Close menu when clicking a menu item
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Only close on mobile
        if (isMobileDevice()) {
          mainMenu.classList.remove('active');
          menuToggle.textContent = '☰';
          document.body.style.overflow = '';
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
      }
    });
  }
});

// ====================================
// SMOOTH SCROLLING & NAVIGATION
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offsetTop = target.offsetTop - 80; // Accounting for fixed nav
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.main-menu a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// ====================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and content blocks
  document.querySelectorAll(
    '.about-card, .detail-item, .service, .testimonial-card, .team-card, .faq-item, .result-item'
  ).forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
});

// Add scroll animation styles
if (!document.getElementById('scroll-animation-styles')) {
  const style = document.createElement('style');
  style.id = 'scroll-animation-styles';
  style.textContent = `
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in-up.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .active {
      color: #ffd700 !important;
      font-weight: 700;
    }
  `;
  document.head.appendChild(style);
}

// ====================================
// FAQ ACCORDION - MOBILE FRIENDLY
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.style.cursor = 'pointer';
      question.style.userSelect = 'none';
      
      // Add toggle icon
      question.insertAdjacentHTML('afterend', '<span class="faq-toggle" style="float: right; font-size: 18px;">+</span>');
      
      const answer = item.querySelector('.faq-answer');
      const toggle = item.querySelector('.faq-toggle');
      
      // Hide answer by default on mobile
      if (isMobileDevice()) {
        answer.style.display = 'none';
      }
      
      question.addEventListener('click', function(e) {
        e.preventDefault();
        const isVisible = answer.style.display !== 'none';
        
        // Close all other FAQs on mobile for better UX
        if (isMobileDevice()) {
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherToggle = otherItem.querySelector('.faq-toggle');
              otherAnswer.style.display = 'none';
              otherToggle.textContent = '+';
              otherToggle.style.color = '';
            }
          });
        }
        
        // Toggle current
        if (isVisible) {
          answer.style.display = 'none';
          toggle.textContent = '+';
          toggle.style.color = '';
        } else {
          answer.style.display = 'block';
          toggle.textContent = '−';
          toggle.style.color = '#ffd700';
        }
      });
    }
  });
});

// ====================================
// LAZY LOADING IMAGES
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img').forEach(img => {
      imageObserver.observe(img);
    });
  }
});

// ====================================
// TOUCH EVENT SUPPORT
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  // Improved touch interactions for cards
  const cards = document.querySelectorAll(
    '.about-card, .detail-item, .services, .testimonial-card, .team-card, .contact-info-card'
  );

  cards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });

    card.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });

  // Prevent double-tap zoom on buttons
  const buttons = document.querySelectorAll('button, a.button, a.button-outlined, a.btn');
  buttons.forEach(button => {
    let lastTouchEnd = 0;
    button.addEventListener('touchend', function(e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    });
  });
});

// Optional: Function to send form data to a backend service
// Uncomment and modify the email endpoint as needed
/*
function sendFormData(fullName, email, message) {
  const formData = {
    fullName: fullName,
    email: email,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  // Send to your backend endpoint
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Form sent successfully:', data);
  })
  .catch(error => {
    console.error('Error sending form:', error);
  });
}
*/

// ====================================
// FORM DATA PERSISTENCE (LocalStorage)
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Auto-save form data to localStorage as user types
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Load saved data if available
    formInputs.forEach(input => {
      const savedValue = localStorage.getItem(`contact_${input.id}`);
      if (savedValue) {
        input.value = savedValue;
      }
      
      // Save data on input
      input.addEventListener('input', function() {
        localStorage.setItem(`contact_${this.id}`, this.value);
      });
    });
    
    // Clear localStorage on successful submit
    contactForm.addEventListener('submit', function() {
      formInputs.forEach(input => {
        localStorage.removeItem(`contact_${input.id}`);
      });
    });
  }
});

// ====================================
// SCROLL TO TOP BUTTON
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  // Create scroll-to-top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scrollToTopBtn';
  scrollToTopBtn.textContent = '↑';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    color: #091323;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: none;
    z-index: 99;
    transition: all 300ms ease;
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'flex';
      scrollToTopBtn.style.alignItems = 'center';
      scrollToTopBtn.style.justifyContent = 'center';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effects
  scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// ====================================
// PERFORMANCE: IMAGE OPTIMIZATION
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  // Add loading attribute to images for lazy loading
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});
