// Initialize AOS Animation
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
  
  // DOM Elements
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');
  const contactForm = document.getElementById('contactForm');
  
  // Mobile Menu Toggle
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }
  
  // Close Mobile Menu
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event Listeners for Mobile Menu
  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  
  // Close mobile menu when clicking on nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Navbar Scroll Effect
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Scroll to Top Button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active Navigation Link Highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && 
          window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Form Submission Handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      submitBtn.disabled = true;
      
      // Reset after form submission (you can customize this based on your needs)
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
  
  // Floating Animation for Hero Cards
  function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
      // Add mouse move effect
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
  
  // Pricing Card Hover Effects
  function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Slightly reduce scale of other cards
        pricingCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.style.transform = 'scale(0.98)';
            otherCard.style.opacity = '0.8';
          }
        });
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset all cards
        pricingCards.forEach(otherCard => {
          otherCard.style.transform = '';
          otherCard.style.opacity = '';
        });
      });
    });
  }
  
  // Typing Animation for Hero Text
  function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;
    
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
  }
  
  // Counter Animation for Stats
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = counter.textContent;
      const increment = 1;
      let current = 0;
      
      // Handle different number formats
      if (target.includes('+')) {
        const num = parseInt(target.replace('+', ''));
        const timer = setInterval(() => {
          current += increment;
          counter.textContent = current + '+';
          if (current >= num) {
            clearInterval(timer);
            counter.textContent = target;
          }
        }, 50);
      } else if (target === '24/7') {
        // Keep as is for 24/7
        return;
      } else if (target === '100%') {
        const timer = setInterval(() => {
          current += 2;
          counter.textContent = current + '%';
          if (current >= 100) {
            clearInterval(timer);
            counter.textContent = '100%';
          }
        }, 30);
      }
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  // Parallax Effect for Hero Section
  function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
  
  // Service Cards Stagger Animation
  function initServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    });
    
    serviceCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      observer.observe(card);
    });
  }
  
  // Portfolio Items Hover Effect
  function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const placeholder = item.querySelector('.portfolio-placeholder');
        if (placeholder) {
          placeholder.style.background = 'linear-gradient(135deg, rgba(177, 89, 43, 0.2) 0%, rgba(212, 131, 79, 0.2) 100%)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const placeholder = item.querySelector('.portfolio-placeholder');
        if (placeholder) {
          placeholder.style.background = 'linear-gradient(135deg, rgba(177, 89, 43, 0.1) 0%, rgba(212, 131, 79, 0.1) 100%)';
        }
      });
    });
  }
  
  // Form Validation
  function initFormValidation() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
      input.addEventListener('blur', validateInput);
      input.addEventListener('input', clearValidation);
    });
    
    function validateInput(e) {
      const input = e.target;
      const value = input.value.trim();
      
      // Remove existing validation classes
      input.classList.remove('valid', 'invalid');
      
      if (input.hasAttribute('required') && !value) {
        input.classList.add('invalid');
        showInputError(input, 'Field ini wajib diisi');
        return false;
      }
      
      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          input.classList.add('invalid');
          showInputError(input, 'Format email tidak valid');
          return false;
        }
      }
      
      input.classList.add('valid');
      clearInputError(input);
      return true;
    }
    
    function clearValidation(e) {
      const input = e.target;
      input.classList.remove('valid', 'invalid');
      clearInputError(input);
    }
    
    function showInputError(input, message) {
      clearInputError(input);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'input-error';
      errorDiv.textContent = message;
      input.parentNode.appendChild(errorDiv);
    }
    
    function clearInputError(input) {
      const existingError = input.parentNode.querySelector('.input-error');
      if (existingError) {
        existingError.remove();
      }
    }
  }
  
  // Loading Screen
  function initLoadingScreen() {
    window.addEventListener('load', () => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    });
  }
  
  // Button Ripple Effect
  function initButtonRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  // Intersection Observer for Animations
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
  }
  
  // Theme Switcher (Optional - if you want to add dark mode)
  function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
  
  // Lazy Loading for Images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Scroll Progress Indicator
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
  
  // Performance Optimization - Debounce Function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Initialize all functions when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    animateFloatingCards();
    initPricingCards();
    animateCounters();
    initServiceCardsAnimation();
    initPortfolioHover();
    initFormValidation();
    initButtonRippleEffect();
    initScrollAnimations();
    initLazyLoading();
    initScrollProgress();
    
    // Optional features
    // initTypingAnimation(); // Uncomment if you want typing effect
    // initParallaxEffect(); // Uncomment if you want parallax
    // initThemeSwitcher(); // Uncomment if you add theme toggle
    // initLoadingScreen(); // Uncomment if you add loading screen
    
    console.log('🎨 Ranaka Rupa Studio - Website loaded successfully!');
  });
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 250));
  
  // Prevent form resubmission on page refresh
  window.addEventListener('beforeunload', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
  });
  
  // Add custom cursor effect (optional)
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
      cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('active');
    });
  }
  
  // Error handling for external resources
  window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
    }
  });
  
  // Add CSS for additional features
  const additionalCSS = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .form-input.valid {
    border-color: #27ae60;
  }
  
  .form-input.invalid {
    border-color: #e74c3c;
  }
  
  .input-error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: block;
  }
  
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gradient);
    z-index: 9999;
    transition: width 0.3s ease;
  }
  
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
  }
  
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
  }
  
  .custom-cursor.active {
    transform: scale(1.5);
  }
  
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
  `;
  
  // Inject additional CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalCSS;
  document.head.appendChild(styleSheet);