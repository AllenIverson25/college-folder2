// Basic website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Program filtering
    initProgramFilters();
    
    // Form validation if form exists
    initFormValidation();
});

// Program filter functionality
function initProgramFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Show/hide cards based on filter
            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Basic form validation
function initFormValidation() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        // Check each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });
        
        // If form is valid, show success message
        if (isValid) {
            alert('Thank you for your inquiry! We will contact you soon.');
            form.reset();
            // Close modal if it exists
            const modal = document.getElementById('inquiryModal');
            if (modal) {
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) {
                    bootstrapModal.hide();
                }
            }
        }
    });
}