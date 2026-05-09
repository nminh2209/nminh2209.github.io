/* ============================================
   CONTACT PAGE - INTERACTIVE SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // Form validation
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('success-message');
    const successClose = document.querySelector('.success-close');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            let isValid = true;

            if (!data.name || data.name.trim().length < 2) {
                showFieldError('name', 'Please enter a valid name');
                isValid = false;
            } else {
                clearFieldError('name');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.email || !emailRegex.test(data.email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearFieldError('email');
            }

            if (!data.subject) {
                showFieldError('subject', 'Please select a subject');
                isValid = false;
            } else {
                clearFieldError('subject');
            }

            if (!data.message || data.message.trim().length < 10) {
                showFieldError('message', 'Please enter a message (at least 10 characters)');
                isValid = false;
            } else {
                clearFieldError('message');
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                const btnText = submitBtn.querySelector('span');
                const originalText = btnText.textContent;

                btnText.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';

                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    showSuccessMessage();
                    contactForm.reset();
                }, 1500);
            }
        });
    }

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formField = field.closest('.form-field');
        clearFieldError(fieldId);

        field.classList.add('error');
        field.style.borderColor = '#f87171';

        const errorMsg = document.createElement('span');
        errorMsg.className = 'field-error';
        errorMsg.textContent = message;
        formField.appendChild(errorMsg);
    }

    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        const formField = field.closest('.form-field');
        if (!formField) return;
        const errorMsg = formField.querySelector('.field-error');
        if (errorMsg) errorMsg.remove();
        field.classList.remove('error');
        field.style.borderColor = '';
    }

    function showSuccessMessage() {
        if (successOverlay) {
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (successClose) {
        successClose.addEventListener('click', function() {
            if (successOverlay) {
                successOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (successOverlay) {
        successOverlay.addEventListener('click', function(e) {
            if (e.target === successOverlay) {
                successOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll reveal for contact sections
    const animatedSections = document.querySelectorAll('.contact-info-col, .contact-form');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 150);
            }
        });
    }, { threshold: 0.1 });

    animatedSections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        scrollObserver.observe(el);
    });

    // Stagger contact details
    const detailItems = document.querySelectorAll('.contact-detail');
    detailItems.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-20px)';
        el.style.transition = `opacity 0.5s ease-out ${i * 80}ms, transform 0.5s ease-out ${i * 80}ms`;
        scrollObserver.observe(el);
    });

});
