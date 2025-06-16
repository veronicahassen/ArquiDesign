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
    
    // Gallery functionality (for both property and project galleries)
    function setupGallery(gallerySelector, mainImgId) {
        const thumbs = document.querySelectorAll(`${gallerySelector} .thumb`);
        const mainImg = document.getElementById(mainImgId);
        
        if (!thumbs.length || !mainImg) return;
        
        // Function to navigate to a specific image
        function navigateToImage(index) {
            if (index >= 0 && index < thumbs.length) {
                // Remove active class from all thumbs
                thumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to selected thumb
                thumbs[index].classList.add('active');
                
                // Update main image
                const imgSrc = thumbs[index].getAttribute('data-img');
                mainImg.src = imgSrc;
            }
        }
        
        // Function to get current active image index
        function getCurrentImageIndex() {
            for (let i = 0; i < thumbs.length; i++) {
                if (thumbs[i].classList.contains('active')) {
                    return i;
                }
            }
            return 0;
        }
        
        // Add click event for thumbnails
        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                navigateToImage(index);
            });
        });
        
        // Add swipe functionality for the gallery
        const galleryMain = document.querySelector(`${gallerySelector} .gallery-main`);
        const galleryPrev = document.querySelector(`${gallerySelector} .gallery-prev`);
        const galleryNext = document.querySelector(`${gallerySelector} .gallery-next`);
        
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
        
        if (galleryMain) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            galleryMain.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            galleryMain.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            // For desktop mouse drag
            let isDragging = false;
            let startX = 0;
            
            galleryMain.addEventListener('mousedown', function(e) {
                isDragging = true;
                startX = e.pageX;
                e.preventDefault();
            });
            
            galleryMain.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                e.preventDefault();
            });
            
            galleryMain.addEventListener('mouseup', function(e) {
                if (!isDragging) return;
                
                const endX = e.pageX;
                const diffX = endX - startX;
                
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swiped right - go to previous
                        const currentIndex = getCurrentImageIndex();
                        navigateToImage(currentIndex - 1);
                    } else {
                        // Swiped left - go to next
                        const currentIndex = getCurrentImageIndex();
                        navigateToImage(currentIndex + 1);
                    }
                }
                
                isDragging = false;
            });
            
            galleryMain.addEventListener('mouseleave', function() {
                isDragging = false;
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diffX = touchEndX - touchStartX;
                
                if (Math.abs(diffX) > swipeThreshold) {
                    if (diffX > 0) {
                        // Swiped right - go to previous
                        const currentIndex = getCurrentImageIndex();
                        navigateToImage(currentIndex - 1);
                    } else {
                        // Swiped left - go to next
                        const currentIndex = getCurrentImageIndex();
                        navigateToImage(currentIndex + 1);
                    }
                }
            }
        }
        
        return { navigateToImage, getCurrentImageIndex };
    }
    
    // Setup property gallery
    setupGallery('.property-gallery', 'main-property-img');
    
    // Setup project gallery
    setupGallery('.project-gallery', 'main-project-img');
    
    // The duplicate navigation code has been removed as it's now handled by the setupGallery function
    
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