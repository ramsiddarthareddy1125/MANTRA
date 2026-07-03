/* 
   NOMAD HORIZON TRAVELS - JAVASCRIPT
   Author: Nomad Horizon Design Studio
   Version: 2.0.0
*/

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initTestimonialSlider();
    initFaqAccordion();
    initDestinationFilter();
    initGalleryLightbox();
    initBookingForm();
});

/* 1. STICKY HEADER SCROLL EFFECT */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Run once on load to catch current position
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

/* 2. RESPONSIVE MOBILE NAVIGATION MENU */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
        
        // Disable body scroll when menu is open
        if (navLinks.classList.contains('mobile-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
            document.body.style.overflow = '';
        });
    });
}

/* 3. TESTIMONIAL SLIDER */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (slides.length === 0 || !dotsContainer) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Clear any pre-existing dots (just in case)
    dotsContainer.innerHTML = '';
    
    // Create dots dynamic indicator
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Initialize auto-sliding
    startInterval();
}

/* 4. FAQ ACCORDION ABOUT PAGE */
function initFaqAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    if (faqHeaders.length === 0) return;
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.parentElement;
            const body = card.querySelector('.faq-body');
            
            // Toggle active state
            const isActive = card.classList.contains('active');
            
            // Close all other accordions first (accordion style)
            document.querySelectorAll('.faq-card').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-body').style.maxHeight = null;
            });
            
            if (!isActive) {
                card.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}

/* 5. DESTINATION FILTER (Client-side) */
function initDestinationFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card-item');
    
    if (filterButtons.length === 0 || destinationCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            destinationCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Card transitions
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

/* 6. GALLERY LIGHTBOX MODAL POPUP */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    // Create Lightbox DOM structure dynamically if not present
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close Lightbox" id="lightboxClose">
                <svg viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg>
            </button>
            <div class="lightbox-content">
                <img src="" alt="" id="lightboxImg">
                <div class="lightbox-caption">
                    <h4 id="lightboxTitle"></h4>
                    <p id="lightboxDesc"></p>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const desc = item.querySelector('p').textContent;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop body scrolling
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* 7. ENQUIRY / BOOKING FORM VALIDATION */
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;
    
    // Dynamic Pre-selection based on URL Query Parameters (e.g. booking.html?package=kyoto)
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');
    if (packageParam) {
        const packageSelect = document.getElementById('package');
        if (packageSelect) {
            packageSelect.value = packageParam;
        }
    }
    
    // Set check-in date limits to prevent past bookings
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
    }
    
    // Validation handlers
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const guestsInput = document.getElementById('guests');
    
    const showError = (input, msg) => {
        const group = input.parentElement;
        group.classList.add('has-error');
        let errorMsg = group.querySelector('.form-error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'form-error-msg';
            group.appendChild(errorMsg);
        }
        errorMsg.textContent = msg;
    };
    
    const clearError = (input) => {
        const group = input.parentElement;
        group.classList.remove('has-error');
    };
    
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // 1. Full name validation
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, 'Name must be at least 3 characters long.');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // 2. Email validation
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // 3. Date validation
        if (!startDateInput.value) {
            showError(startDateInput, 'Please choose a departure date.');
            isValid = false;
        } else {
            clearError(startDateInput);
        }
        
        // 4. Guests validation
        if (parseInt(guestsInput.value) < 1 || isNaN(parseInt(guestsInput.value))) {
            showError(guestsInput, 'Group size must be at least 1 traveler.');
            isValid = false;
        } else {
            clearError(guestsInput);
        }
        
        if (isValid) {
            // Form is valid! Display Custom Summary Modal Popup
            showConfirmationModal();
        }
    });
    
    // Live validation clears
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 3) clearError(nameInput);
    });
    
    emailInput.addEventListener('input', () => {
        if (validateEmail(emailInput.value.trim())) clearError(emailInput);
    });
    
    startDateInput.addEventListener('change', () => {
        if (startDateInput.value) clearError(startDateInput);
    });
    
    guestsInput.addEventListener('input', () => {
        if (parseInt(guestsInput.value) >= 1) clearError(guestsInput);
    });
}

/* 8. RESERVATION SUCCESS CONFIRMATION MODAL POPUP */
function showConfirmationModal() {
    // Collect reservation parameters
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const packageSelect = document.getElementById('package');
    const packageName = packageSelect.options[packageSelect.selectedIndex].text;
    const startDate = document.getElementById('startDate').value;
    const guests = document.getElementById('guests').value;
    
    // Create Modal DOM dynamically if not present
    let modal = document.getElementById('bookingModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'bookingModal';
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-modal-card">
                <div class="booking-modal-icon">
                    <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/></svg>
                </div>
                <h3>Journey Enquiry Sent!</h3>
                <p>Thank you for reaching out, <strong id="modalClientName"></strong>. Our expert travel designers are reviewing your request and will contact you within 24 hours.</p>
                <div class="booking-details-box">
                    <div class="booking-details-item">
                        <span>Selected Expedition</span>
                        <span id="modalPackageName"></span>
                    </div>
                    <div class="booking-details-item">
                        <span>Departure Date</span>
                        <span id="modalDate"></span>
                    </div>
                    <div class="booking-details-item">
                        <span>Travelers Count</span>
                        <span id="modalGuests"></span>
                    </div>
                    <div class="booking-details-item">
                        <span>Email Contact</span>
                        <span id="modalEmail"></span>
                    </div>
                </div>
                <button class="btn btn-primary" id="modalCloseBtn">Plan Another Journey</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Set dynamic values
    document.getElementById('modalClientName').textContent = fullName;
    document.getElementById('modalPackageName').textContent = packageName;
    document.getElementById('modalDate').textContent = startDate;
    document.getElementById('modalGuests').textContent = guests + ' Traveler' + (guests > 1 ? 's' : '');
    document.getElementById('modalEmail').textContent = email;
    
    // Activate overlay
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close button event
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    modalCloseBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset the booking form
        document.getElementById('bookingForm').reset();
    });
}
