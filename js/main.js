/**
 * MonetizeX - Mobile-First JavaScript
 * Handles all interactive elements and animations
 */

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuItems = document.querySelectorAll('.mobile-menu__item');

if (menuToggle && mobileMenu) {
  // Toggle menu on hamburger click
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking a menu item
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ==========================================
// FAQ ACCORDION
// ==========================================

const faqQuestions = document.querySelectorAll('.mobile-faq__question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.closest('.mobile-faq__item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQs (optional - remove if you want multiple open)
    document.querySelectorAll('.mobile-faq__item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
    
    // Accessibility: Update aria-expanded
    const isExpanded = faqItem.classList.contains('active');
    question.setAttribute('aria-expanded', isExpanded);
  });
});

// ==========================================
// PARTNERSHIP TABS
// ==========================================

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    const targetContent = document.getElementById(targetTab);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// ==========================================
// PLAY BUTTON (VIDEO MODAL - OPTIONAL)
// ==========================================

const playButton = document.querySelector('.play-button');

if (playButton) {
  playButton.addEventListener('click', () => {
    // Option 1: Open video in modal (you'd need to add modal HTML)
    // For now, we'll just open a YouTube link or show an alert
    
    // Replace with your actual YouTube video ID
    const youtubeVideoId = 'YOUR_VIDEO_ID';
    
    // Option A: Open in new tab
    // window.open(`https://youtube.com/watch?v=${youtubeVideoId}`, '_blank');
    
    // Option B: Show alert (temporary - replace with modal)
    alert('Video modal would open here. Replace this with your YouTube embed or video player.');
    
    // Option C: Embed video inline (requires adding video element to HTML)
    /*
    const videoContainer = document.querySelector('.mobile-hero__video');
    videoContainer.innerHTML = `
      <iframe 
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
    */
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#" or empty
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (menuToggle && mobileMenu) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Smooth scroll to target
      const navbar = document.querySelector('.mobile-nav');
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScrollTop = 0;
const navbar = document.getElementById('mobileNav');

if (navbar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll (optional - uncomment to enable)
    /*
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    */
    
    lastScrollTop = scrollTop;
  });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
const sections = document.querySelectorAll('.mobile-section');
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// ==========================================
// CAROUSEL AUTO-SCROLL (OPTIONAL)
// ==========================================

const trustCarousel = document.querySelector('.mobile-trust__carousel');

if (trustCarousel && window.innerWidth < 1024) {
  let isScrolling = false;
  let scrollInterval;
  
  // Auto-scroll function
  const autoScroll = () => {
    if (!isScrolling) {
      trustCarousel.scrollLeft += 1;
      
      // Reset to start when reaching end
      if (trustCarousel.scrollLeft >= trustCarousel.scrollWidth - trustCarousel.clientWidth - 10) {
        trustCarousel.scrollLeft = 0;
      }
    }
  };
  
  // Start auto-scroll
  scrollInterval = setInterval(autoScroll, 30);
  
  // Pause on user interaction
  trustCarousel.addEventListener('touchstart', () => {
    isScrolling = true;
    clearInterval(scrollInterval);
  });
  
  trustCarousel.addEventListener('touchend', () => {
    setTimeout(() => {
      isScrolling = false;
      scrollInterval = setInterval(autoScroll, 30);
    }, 3000);
  });
  
  trustCarousel.addEventListener('mouseenter', () => {
    isScrolling = true;
    clearInterval(scrollInterval);
  });
  
  trustCarousel.addEventListener('mouseleave', () => {
    isScrolling = false;
    scrollInterval = setInterval(autoScroll, 30);
  });
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // If image has data-src, use it
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
} else {
  // Fallback for browsers that don't support IntersectionObserver
  lazyImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

// ==========================================
// ANIMATE HERO WORDS ON LOAD
// ==========================================

const heroWords = document.querySelectorAll('.mobile-hero__subtitle .word');

heroWords.forEach((word, index) => {
  word.style.opacity = '0';
  word.style.transform = 'translateY(20px)';
  word.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
  
  setTimeout(() => {
    word.style.opacity = '1';
    word.style.transform = 'translateY(0)';
  }, 100);
});

// ==========================================
// VIDEO AUTOPLAY ON SCROLL (OPTIONAL)
// ==========================================

const videos = document.querySelectorAll('video');

if (videos.length > 0) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      
      if (entry.isIntersecting) {
        video.play().catch(err => {
          console.log('Autoplay prevented:', err);
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(video => {
    // Set video attributes
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    
    videoObserver.observe(video);
  });
}

// ==========================================
// FORM VALIDATION (If you add contact forms)
// ==========================================

const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const formData = new FormData(form);
    let isValid = true;
    
    // Check all required fields
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'red';
      } else {
        field.style.borderColor = '';
      }
    });
    
    if (isValid) {
      // Submit form (replace with your actual submission logic)
      console.log('Form data:', Object.fromEntries(formData));
      alert('Form submitted! (Replace this with actual submission)');
      form.reset();
    } else {
      alert('Please fill in all required fields');
    }
  });
});

// ==========================================
// TRACK ANALYTICS (OPTIONAL)
// ==========================================

// Track button clicks
document.querySelectorAll('.mobile-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonText = e.target.textContent.trim();
    
    // Send to Google Analytics (if installed)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'button_click', {
        'event_category': 'engagement',
        'event_label': buttonText
      });
    }
    
    console.log('Button clicked:', buttonText);
  });
});

// Track scroll depth
let maxScroll = 0;
const scrollMilestones = new Set();

window.addEventListener('scroll', () => {
  const scrollPercentage = Math.floor(
    ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
  );
  
  if (scrollPercentage > maxScroll) {
    maxScroll = scrollPercentage;
    
    // Track milestones (25%, 50%, 75%, 100%)
    [25, 50, 75, 100].forEach(milestone => {
      if (maxScroll >= milestone && !scrollMilestones.has(milestone)) {
        scrollMilestones.add(milestone);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': `${milestone}%`
          });
        }
        
        console.log('Scroll depth:', `${milestone}%`);
      }
    });
  }
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

// Log page load time
window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    
    console.log('Page loaded in:', loadTime, 'ms');
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        'name': 'load',
        'value': loadTime,
        'event_category': 'performance'
      });
    }
  }
});

// ==========================================
// PREVENT FLASH OF UNSTYLED CONTENT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.3s ease';
});

// Initially hide body (add this to your CSS: body { opacity: 0; })
if (document.readyState === 'loading') {
  document.body.style.opacity = '0';
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Example usage:
const handleResize = debounce(() => {
  console.log('Window resized');
  // Add your resize logic here
}, 250);

window.addEventListener('resize', handleResize);

// ==========================================
// CURSOR EFFECTS (OPTIONAL - DESKTOP ONLY)
// ==========================================

if (window.innerWidth > 1024) {
  const buttons = document.querySelectorAll('.mobile-btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ==========================================
// EASTER EGG (OPTIONAL - FUN!)
// ==========================================

let clickCount = 0;
const logo = document.querySelector('.mobile-nav__logo');

if (logo) {
  logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
      console.log('%c🚀 MonetizeX - Built with passion!', 'font-size: 20px; color: #6666FF; font-weight: bold;');
      console.log('%cLooking for a developer? Contact us!', 'font-size: 14px; color: #0055FE;');
      clickCount = 0;
    }
  });
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%cMonetizeX', 'font-size: 24px; font-weight: bold; color: #6666FF;');
console.log('%cBuilt with mobile-first approach 📱💻', 'font-size: 12px; color: #999;');
console.log('GitHub: https://github.com/dypgrowtoday-pixel/monetizex-mobile');
console.log('Questions? Contact: your@email.com');

// ==========================================
// EXPORT FOR TESTING (OPTIONAL)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle
  };
}

// ==========================================
// SERVICE WORKER (OPTIONAL - FOR PWA)
// ==========================================

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
*/

// ==========================================
// DARK MODE TOGGLE (OPTIONAL)
// ==========================================

/*
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
  // Check for saved preference
  const darkMode = localStorage.getItem('darkMode');
  
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', null);
    }
  });
}
*/

// ==========================================
// ONLINE/OFFLINE DETECTION
// ==========================================

window.addEventListener('online', () => {
  console.log('Connection restored');
  // Show notification to user
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
  // Show notification to user
});

// ==========================================
// COPY TO CLIPBOARD (OPTIONAL)
// ==========================================

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

// ==========================================
// READY STATE
// ==========================================

console.log('✅ MonetizeX JavaScript loaded successfully!');
```

---

## 📁 **SAVE THIS AS:**
```
js/main.js
```

---

## ✅ **YOUR COMPLETE FILE STRUCTURE:**
```
monetizex-mobile/
├── index.html          ✅
├── css/
│   └── mobile.css      ✅
├── js/
│   └── main.js         ✅ (THIS FILE)
├── images/             ✅
├── server.js           ✅
├── package.json        ✅
├── .gitignore          ✅
└── README.md           ✅
