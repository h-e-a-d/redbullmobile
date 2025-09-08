// Red Bull Racing Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.querySelector('.email-input').value;
            const requiredCheckbox = document.querySelector('input[type="checkbox"][required]');
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!requiredCheckbox.checked) {
                alert('Please accept the required terms.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Feature buttons in newsletter section
    const featureBtns = document.querySelectorAll('.feature-btn');
    featureBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            featureBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Carousel functionality
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Simple carousel simulation - in a real implementation, this would control actual carousel movement
            console.log('Carousel button clicked:', this.textContent);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    const cards = document.querySelectorAll('.news-card, .product-card, .experience-card, .driver-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Search functionality
    const searchBtns = document.querySelectorAll('.search-btn');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const searchTerm = prompt('What are you looking for?');
            if (searchTerm) {
                // In a real implementation, this would perform actual search
                alert(`Searching for: ${searchTerm}`);
            }
        });
    });

    // Cookie banner simulation (basic)
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <div class="cookie-content">
            <p>This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
            <div class="cookie-actions">
                <button class="btn btn-secondary cookie-accept">Accept All</button>
                <button class="btn btn-primary cookie-settings">Cookie Settings</button>
            </div>
        </div>
    `;
    
    // Add cookie banner styles
    const cookieStyles = `
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 22, 41, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1001;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .cookie-banner.show {
            transform: translateY(0);
        }
        
        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
        }
        
        .cookie-content p {
            flex: 1;
            margin: 0;
            font-size: 0.9rem;
        }
        
        .cookie-actions {
            display: flex;
            gap: 1rem;
        }
        
        .cookie-actions .btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cookieStyles;
    document.head.appendChild(styleSheet);
    
    // Show cookie banner after a delay (simulate first visit)
    setTimeout(() => {
        if (!localStorage.getItem('cookiesAccepted')) {
            document.body.appendChild(cookieBanner);
            setTimeout(() => cookieBanner.classList.add('show'), 100);
        }
    }, 2000);
    
    // Handle cookie banner actions
    cookieBanner.addEventListener('click', function(e) {
        if (e.target.classList.contains('cookie-accept')) {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
            setTimeout(() => cookieBanner.remove(), 300);
        } else if (e.target.classList.contains('cookie-settings')) {
            alert('Cookie settings would open here in a real implementation.');
        }
    });

    // Add some dynamic content updates
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute

    function updateCountdown() {
        // This would normally calculate time to next race
        const countdownElements = document.querySelectorAll('.countdown-value');
        countdownElements.forEach(el => {
            if (el.textContent === '-') {
                // Race is finished, keep showing dashes
                return;
            }
        });
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .social-link, .experience-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('Red Bull Racing website loaded successfully! 🏎️');
});