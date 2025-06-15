document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
    });
    
    // Mobile menu toggle - Fixed implementation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            if (getComputedStyle(mobileMenu).display === 'block') {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
                mobileMenu.style.transform = 'translateY(-10px)';
                
                // Change icon
                const icon = this.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Hide after transition
                setTimeout(function() {
                    mobileMenu.style.display = 'none';
                }, 300);
            } else {
                mobileMenu.style.display = 'block';
                mobileMenu.style.zIndex = '1000';
                
                // Trigger reflow to ensure display takes effect before other changes
                mobileMenu.offsetHeight;
                
                mobileMenu.style.opacity = '1';
                mobileMenu.style.visibility = 'visible';
                mobileMenu.style.transform = 'translateY(0)';
                
                // Change icon
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            mobileMenu.style.opacity = '0';
            mobileMenu.style.visibility = 'hidden';
            
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
            mobileMenu.style.opacity = '0';
            mobileMenu.style.visibility = 'hidden';
            
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Property gallery functionality
    const propertyThumbs = document.querySelectorAll('.gallery-thumbs .thumb');
    const mainPropertyImg = document.getElementById('main-property-img');
    
    // Function to navigate to a specific image
    function navigateToImage(index) {
        const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
        if (index >= 0 && index < thumbs.length) {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to selected thumb
            thumbs[index].classList.add('active');
            
            // Update main image
            const imgSrc = thumbs[index].getAttribute('data-img');
            mainPropertyImg.src = imgSrc;
        }
    }
    
    // Function to get current active image index
    function getCurrentImageIndex() {
        const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
        for (let i = 0; i < thumbs.length; i++) {
            if (thumbs[i].classList.contains('active')) {
                return i;
            }
        }
        return 0;
    }
    
    // Add click event for thumbnails
    propertyThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            navigateToImage(index);
        });
    });
    
    // Add click events for navigation controls
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    
    if (galleryPrev) {
        galleryPrev.addEventListener('click', function() {
            const currentIndex = getCurrentImageIndex();
            navigateToImage(currentIndex - 1);
        });
    }
    
    if (galleryNext) {
        galleryNext.addEventListener('click', function() {
            const currentIndex = getCurrentImageIndex();
            navigateToImage(currentIndex + 1);
        });
    }
    
    // Projects carousel functionality - simplified since we only have one project
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    if (carouselSlides.length > 0) {
        carouselSlides[0].classList.add('active');
    }
    
    // Form submission
    const contactForm = document.querySelector('#contacto form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});