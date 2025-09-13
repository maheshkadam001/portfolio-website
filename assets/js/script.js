/*==================== ENHANCED MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== ENHANCED MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
        // Hide toggle button when menu is open
        navToggle.style.opacity = '0'
        navToggle.style.visibility = 'hidden'
        navToggle.style.transform = 'scale(0)'
        
        // Add smooth animation class
        navMenu.classList.add('menu-opening')
        setTimeout(() => {
            navMenu.classList.remove('menu-opening')
        }, 300)
    })
}

/*===== ENHANCED MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        // Add closing animation
        navMenu.classList.add('menu-closing')
        
        setTimeout(() => {
            navMenu.classList.remove('show-menu')
            navMenu.classList.remove('menu-closing')
            
            // Show toggle button again
            navToggle.style.opacity = '1'
            navToggle.style.visibility = 'visible'
            navToggle.style.transform = 'scale(1)'
        }, 200)
    })
}

/*==================== ENHANCED REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    const navToggle = document.getElementById('nav-toggle')
    
    // Add closing animation
    navMenu.classList.add('menu-closing')
    
    setTimeout(() => {
        navMenu.classList.remove('show-menu')
        navMenu.classList.remove('menu-closing')
        
        // Show toggle button again
        if(navToggle) {
            navToggle.style.opacity = '1'
            navToggle.style.visibility = 'visible'
            navToggle.style.transform = 'scale(1)'
        }
    }, 200)
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints:{
        568:{
            slidesPerView: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SMOOTH SCROLLING ====================*/
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== FORM VALIDATION ====================*/
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('name');
const contactEmail = document.getElementById('email');
const contactSubject = document.getElementById('subject');
const contactMessage = document.getElementById('message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form validation function
function validateForm() {
    let isValid = true;
    
    // Remove existing error styles
    removeErrorStyles();
    
    // Name validation
    if (contactName.value.trim() === '') {
        showError(contactName, 'Name is required');
        isValid = false;
    } else if (contactName.value.trim().length < 2) {
        showError(contactName, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (contactEmail.value.trim() === '') {
        showError(contactEmail, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(contactEmail.value.trim())) {
        showError(contactEmail, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (contactSubject.value.trim() === '') {
        showError(contactSubject, 'Subject is required');
        isValid = false;
    }
    
    // Message validation
    if (contactMessage.value.trim() === '') {
        showError(contactMessage, 'Message is required');
        isValid = false;
    } else if (contactMessage.value.trim().length < 10) {
        showError(contactMessage, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

// Show error function
function showError(input, message) {
    const contactContent = input.parentElement;
    contactContent.classList.add('error');
    
    // Create error message element if it doesn't exist
    let errorMessage = contactContent.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        contactContent.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
    
    // Add error styling to input
    input.style.borderColor = '#e74c3c';
    input.style.backgroundColor = '#fdf2f2';
}

// Remove error styles function
function removeErrorStyles() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    
    const errorContents = document.querySelectorAll('.contact__content.error');
    errorContents.forEach(content => content.classList.remove('error'));
    
    const inputs = document.querySelectorAll('.contact__input');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            showLoadingMessage();
            
            // Collect form data
            const formData = {
                name: contactName.value.trim(),
                email: contactEmail.value.trim(),
                subject: contactSubject.value.trim(),
                message: contactMessage.value.trim()
            };
            
            // Send email using EmailJS (client-side email service)
            // Check if EmailJS is available, otherwise use fallback
            if (typeof sendEmailViaEmailJS === 'function') {
                // Use EmailJS for sending emails
                sendEmailViaEmailJS(formData)
                    .then(data => {
                        removeLoadingMessage();
                        showSuccessMessage(data.message);
                        // Reset form after successful submission
                        setTimeout(() => {
                            contactForm.reset();
                            removeSuccessMessage();
                        }, 3000);
                    })
                    .catch(error => {
                        removeLoadingMessage();
                        showErrorMessage(error.message || 'Failed to send message. Please try again.');
                        setTimeout(() => {
                            removeErrorMessage();
                        }, 4000);
                    });
            } else {
                // Fallback: Try PHP script if available, otherwise show manual contact info
                fetch('send-email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    removeLoadingMessage();
                    
                    if (data.success) {
                        showSuccessMessage(data.message);
                        // Reset form after successful submission
                        setTimeout(() => {
                            contactForm.reset();
                            removeSuccessMessage();
                        }, 3000);
                    } else {
                        showErrorMessage(data.message || 'Failed to send message. Please try again.');
                        setTimeout(() => {
                            removeErrorMessage();
                        }, 4000);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    removeLoadingMessage();
                    
                    // Show fallback message with direct contact information
                    showErrorMessage(
                        `Unable to send message automatically. Please contact me directly at: 
                        <strong>maheshramprasadkadam@gmail.com</strong> or 
                        <strong>+91 9322617530</strong>`
                    );
                    setTimeout(() => {
                        removeErrorMessage();
                    }, 6000);
                });
            }
        }
    });
}

// Show loading message function
function showLoadingMessage() {
    removeAllMessages();
    
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>Sending your message...</span>
    `;
    
    contactForm.appendChild(loadingMessage);
    
    // Disable form during submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
    }
}

// Remove loading message function
function removeLoadingMessage() {
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
    
    // Re-enable form
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

// Show success message function
function showSuccessMessage(message = 'Thank you! Your message has been sent successfully.') {
    removeAllMessages();
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    contactForm.appendChild(successMessage);
}

// Show error message function
function showErrorMessage(message = 'An error occurred. Please try again.') {
    removeAllMessages();
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message-main';
    errorMessage.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    contactForm.appendChild(errorMessage);
}

// Remove success message function
function removeSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.remove();
    }
}

// Remove error message function
function removeErrorMessage() {
    const errorMessage = document.querySelector('.error-message-main');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Remove all messages function
function removeAllMessages() {
    const messages = document.querySelectorAll('.success-message, .error-message-main, .loading-message');
    messages.forEach(message => message.remove());
}

/*==================== TYPING ANIMATION ====================*/
// Simple typing animation for home subtitle
const subtitle = document.querySelector('.home__subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    const roles = ['Data Analyst', 'Business Intelligence Specialist', 'Statistical Analyst', 'Data Visualization Expert'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeAnimation() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeAnimation, typeSpeed);
    }
    
    // Start typing animation after page load
    setTimeout(typeAnimation, 1000);
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
// Simple scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

// Add CSS for reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
    }
    .section.active {
        opacity: 1;
        transform: translateY(0);
    }
    .section:first-child {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/*==================== PARTICLE BACKGROUND (Optional) ====================*/
// Simple particle background for hero section
function createParticles() {
    const homeSection = document.querySelector('#home');
    if (!homeSection) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    homeSection.appendChild(particlesContainer);
    
    // Add CSS for particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: -1;
        }
        .particle {
            position: absolute;
            background: var(--first-color);
            border-radius: 50%;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

/*==================== COOKIE CONSENT MANAGEMENT ====================*/
// Check if cookies have been accepted before
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookieBanner = document.getElementById('cookie-consent');
    
    if (!cookieConsent && cookieBanner) {
        // Show banner after 1 second delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
}

// Accept cookies function
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBanner();
    
    // Initialize analytics or other tracking here if needed
    console.log('Cookies accepted - Analytics can be initialized');
}

// Decline cookies function
function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBanner();
    
    // Disable analytics or other tracking here
    console.log('Cookies declined - Analytics disabled');
}

// Hide cookie banner
function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookie-consent');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 400);
    }
}

// Check for cookie consent on page load
window.addEventListener('load', checkCookieConsent);

// Function to get cookie consent status (for other scripts to use)
function getCookieConsent() {
    return localStorage.getItem('cookieConsent');
}

// Function to clear cookie consent (for testing or reset)
function clearCookieConsent() {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentDate');
    location.reload();
}

/*==================== EXPERIENCE COUNTER ANIMATION ====================*/
// Animate the experience counter from 0 to 2
function animateExperienceCounter() {
    const experienceCounter = document.getElementById('experience-counter');
    if (!experienceCounter) return;
    
    let currentValue = 0;
    const targetValue = 2;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 50); // Update every 50ms
    
    // Start with 0
    experienceCounter.textContent = '0+';
    
    const counter = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            experienceCounter.textContent = '2+';
            clearInterval(counter);
        } else {
            experienceCounter.textContent = Math.floor(currentValue) + '+';
        }
    }, 50);
}

// Intersection Observer to trigger animation when about section is visible
function setupExperienceCounterObserver() {
    const aboutSection = document.getElementById('about');
    const experienceCounter = document.getElementById('experience-counter');
    
    if (!aboutSection || !experienceCounter) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay before starting animation
                setTimeout(() => {
                    animateExperienceCounter();
                }, 300);
                
                // Stop observing after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });
    
    observer.observe(aboutSection);
}

// Initialize experience counter animation when DOM is loaded
window.addEventListener('DOMContentLoaded', setupExperienceCounterObserver);

/*==================== EDUCATION EXPANDABLE SECTIONS ====================*/

// Education toggle function
function toggleEducation(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const header = event.currentTarget;
    const parent = header.parentNode;
    
    // Toggle the section state
    if (parent.classList.contains('education__close')) {
        parent.classList.remove('education__close');
        parent.classList.add('education__open');
        header.setAttribute('aria-expanded', 'true');
    } else if (parent.classList.contains('education__open')) {
        parent.classList.remove('education__open');
        parent.classList.add('education__close');
        header.setAttribute('aria-expanded', 'false');
    } else {
        // Fallback: assume closed and open it
        parent.classList.add('education__open');
        header.setAttribute('aria-expanded', 'true');
    }
}

// Initialize education functionality
function initializeEducationSections() {
    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
        // Get all education sections
        const educationSections = document.querySelectorAll('.education__content');
        
        educationSections.forEach((section) => {
            const header = section.querySelector('.education__header');
            
            if (header) {
                // Remove existing listeners to avoid duplicates
                header.removeEventListener('click', toggleEducation);
                
                // Add click event listener
                header.addEventListener('click', toggleEducation);
                
                // Visual and accessibility setup
                header.style.cursor = 'pointer';
                header.setAttribute('role', 'button');
                header.setAttribute('tabindex', '0');
                header.setAttribute('aria-expanded', section.classList.contains('education__open') ? 'true' : 'false');
                
                // Add keyboard support
                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleEducation.call(this, e);
                    }
                });
            }
            
            // Ensure section has proper state class
            if (!section.classList.contains('education__open') && !section.classList.contains('education__close')) {
                section.classList.add('education__close');
            }
        });
    }, 100);
}

// Multiple initialization approaches to ensure it works
document.addEventListener('DOMContentLoaded', initializeEducationSections);
window.addEventListener('load', initializeEducationSections);

// Immediate initialization if DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeEducationSections();
}
