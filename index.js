// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
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
      
      // Show success message
      alert(`Thank you, ${fullName}! Your message has been sent. We'll contact you at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
      
      // Optional: Send to backend (uncomment and configure as needed)
      // sendFormData(fullName, email, message);
    });
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  if (menuToggle && mainMenu) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainMenu.classList.toggle('menu-open');
      const isOpen = mainMenu.classList.contains('menu-open');
      menuToggle.textContent = isOpen ? '✕' : '☰';
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
        mainMenu.classList.remove('menu-open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a menu item
    mainMenu.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        mainMenu.classList.remove('menu-open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when resizing to desktop widths
    window.addEventListener('resize', function() {
      if (window.innerWidth > 980) {
        mainMenu.classList.remove('menu-open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Services animation on scroll
document.addEventListener('DOMContentLoaded', function() {
  const services = document.querySelectorAll('.services');
  
  function checkVisibility() {
    services.forEach(service => {
      const rect = service.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        service.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Check on load
});

document.addEventListener('DOMContentLoaded', function() {
  const collapsibleParagraphs = document.querySelectorAll('#about .about-left p.collapsible-content, #about .detail-item p.collapsible-content, #PracticeArea .heading-container p.collapsible-content, #PracticeArea .services .content p.collapsible-content');

  collapsibleParagraphs.forEach(paragraph => {
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsible-wrapper';

    const body = document.createElement('div');
    body.className = 'collapsible-body collapsed';

    paragraph.parentNode.insertBefore(wrapper, paragraph);
    wrapper.appendChild(body);
    body.appendChild(paragraph);

    const isServiceCard = paragraph.closest('#PracticeArea .services') !== null;
    const shouldToggle = isServiceCard || body.scrollHeight > 138;

    if (shouldToggle) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'collapsible-toggle';
      toggle.textContent = 'Read more ↓';

      toggle.addEventListener('click', function() {
        const isCollapsed = body.classList.toggle('collapsed');
        toggle.textContent = isCollapsed ? 'Read more ↓' : 'Show less ↑';
      });

      wrapper.appendChild(toggle);
    } else {
      body.classList.remove('collapsed');
    }
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
