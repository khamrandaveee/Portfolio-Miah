document.addEventListener('DOMContentLoaded', function() {
    
    /* 0. Responsive Mobile Navigation Menu */
    const navBar = document.querySelector('.nav-bar');
    const buttonContainer = document.querySelector('.button-container1');
    
    if (navBar && buttonContainer) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        
        for (let i = 0; i < 3; i++) {
            hamburger.appendChild(document.createElement('span'));
        }
        
        navBar.appendChild(hamburger);
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = buttonContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('nav-menu-open', isOpen);
        });
        
        document.addEventListener('click', function(e) {
            if (buttonContainer.classList.contains('active') && 
                !buttonContainer.contains(e.target) && 
                !hamburger.contains(e.target)) {
                buttonContainer.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-menu-open');
            }
        });
    }

    /* 1. Skill Progress Bar Animations (for about_me.html) */
    const progressBars = document.querySelectorAll('.skill-progress');
    if (progressBars.length > 0) {
        // Add a slight delay to allow page render, then trigger the transitions
        setTimeout(() => {
            progressBars.forEach(bar => {
                const targetPercent = bar.getAttribute('data-progress');
                if (targetPercent) {
                    bar.style.width = targetPercent;
                }
            });
        }, 150);
    }

    /* 2. Portfolio Category Filtering (for myWorks.html) */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (filterButtons.length > 0 && portfolioGrid) {
        const portfolioItems = portfolioGrid.querySelectorAll('.item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'flex';
                        // Add a small delay for opacity fade in animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        // Wait for transition before hiding completely
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /* 3. Fullscreen Overlay Image Lightbox (Global/Works) */
    // Create elements if not already present in the HTML
    let overlay = document.querySelector('.fullscreen-overlay');
    let fullscreenImg = document.querySelector('.fullscreen-image');
    let closeButton = document.querySelector('.close-button');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        
        fullscreenImg = document.createElement('img');
        fullscreenImg.className = 'fullscreen-image';
        fullscreenImg.alt = 'Zoomed Workspace Media';
        
        closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        closeButton.ariaLabel = 'Close Fullscreen Media';
        
        overlay.appendChild(fullscreenImg);
        overlay.appendChild(closeButton);
        document.body.appendChild(overlay);
    }
    
    const zoomableImages = document.querySelectorAll('.zoomable');
    
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            showFullscreen(this.src, this.alt);
        });
    });
    
    function showFullscreen(src, alt) {
        fullscreenImg.src = src;
        fullscreenImg.alt = alt || 'Zoomed Media';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
    
    function hideFullscreen() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock background scrolling
        // Clear src on close to stop loading hidden media
        setTimeout(() => {
            fullscreenImg.src = '';
        }, 300);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', hideFullscreen);
    }
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            hideFullscreen();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            hideFullscreen();
        }
    });
});