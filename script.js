// USF Website JavaScript Functions

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Program filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Form submission function
function submitInquiry() {
    // Get form data
    const form = document.getElementById('inquiryForm');
    const formData = new FormData(form);
    
    // Basic validation
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    
    // Check required fields
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields (First Name, Last Name, and Email).');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('button[onclick="submitInquiry()"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual backend call)
    setTimeout(() => {
        // Create summary of submitted data
        const interest = formData.get('interest') || 'Not specified';
        const studentType = formData.get('studentType') || 'Not specified';
        const phone = formData.get('phone') || 'Not provided';
        const message = formData.get('message') || 'No additional comments';
        
        // Show success message with submitted data
        const successMessage = `
Thank you ${firstName} ${lastName}!

Your information request has been submitted successfully.

Submitted Details:
• Email: ${email}
• Phone: ${phone}
• Program Interest: ${interest}
• Student Type: ${studentType}
• Comments: ${message}

We will contact you within 24-48 hours with more information about USF programs.

Go Bulls! 🐂
        `;
        
        alert(successMessage);
        
        // Reset form and close modal
        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('inquiryModal'));
        modal.hide();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
    }, 1500); // Simulate network delay
}

// Additional utility functions
function scheduleVisit() {
    alert('Thank you for your interest in visiting USF!\n\nYou will be redirected to our campus visit scheduling system.\n\nFor immediate assistance, please call (813) 974-3350.');
}
