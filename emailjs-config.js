/*==================== EMAILJS CONFIGURATION ====================*/
// EmailJS Configuration - Replace with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    // Get these from https://www.emailjs.com/
    SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
    TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
    PUBLIC_KEY: 'your_public_key' // Replace with your EmailJS public key
};

// Initialize EmailJS
function initEmailJS() {
    // Load EmailJS library if not already loaded
    if (typeof emailjs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = function() {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        };
        document.head.appendChild(script);
    } else {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
}

// Send email using EmailJS
function sendEmailViaEmailJS(formData) {
    return new Promise((resolve, reject) => {
        // Initialize EmailJS if not already done
        if (typeof emailjs === 'undefined') {
            initEmailJS();
            setTimeout(() => {
                sendEmailWithRetry(formData, resolve, reject);
            }, 1000);
        } else {
            sendEmailWithRetry(formData, resolve, reject);
        }
    });
}

// Send email with retry logic
function sendEmailWithRetry(formData, resolve, reject) {
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'maheshramprasadkadam@gmail.com',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString()
    };
    
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    ).then(
        function(response) {
            console.log('Email sent successfully:', response);
            resolve({
                success: true,
                message: 'Thank you! Your message has been sent successfully. I will get back to you soon.'
            });
        },
        function(error) {
            console.error('Email sending failed:', error);
            reject({
                success: false,
                message: 'Sorry, there was an error sending your message. Please try again or contact me directly at maheshramprasadkadam@gmail.com'
            });
        }
    );
}

// Initialize EmailJS when the page loads
window.addEventListener('load', initEmailJS);