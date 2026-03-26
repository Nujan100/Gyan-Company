/**
 * Contact Form Handler
 * Connects the frontend contact form to the Node.js backend API
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Add real-time email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmailField);
        emailInput.addEventListener('change', validateEmailField);
    }
});

function validateEmailField() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    // Remove any existing error
    const existingError = emailInput.parentElement.querySelector('.error-text');
    if (existingError) existingError.remove();
    
    if (email && !email.includes('@')) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-text text-red-500 text-sm block mt-1';
        errorSpan.innerHTML = '<i class="ri-alert-line mr-1"></i>Email must contain @ symbol';
        emailInput.parentElement.appendChild(errorSpan);
        emailInput.classList.add('border-red-500');
    } else if (email && !email.includes('.')) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-text text-red-500 text-sm block mt-1';
        errorSpan.innerHTML = '<i class="ri-alert-line mr-1"></i>Email must contain a domain (e.g., example.com)';
        emailInput.parentElement.appendChild(errorSpan);
        emailInput.classList.add('border-red-500');
    } else {
        emailInput.classList.remove('border-red-500');
    }
}

async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    // Get form elements
    const contactForm = event.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Create subject from service and company
    const service = serviceInput.value || 'General Inquiry';
    const company = companyInput.value || 'Not specified';
    const subject = `${service} - ${company}`;
    
    // Prepare form data
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subject.trim(),
        message: messageInput.value.trim()
    };
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
        showError(validation.message);
        return;
    }
    
    // Disable submit button and show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Sending...';
    
    try {
        // Send data to backend API
        const response = await fetch('http://localhost:3002/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            mode: 'cors'
        });
        
        const data = await response.json();
        console.log('Response:', data);
        
        if (response.ok && data.success) {
            // Show inline success message on the form
            displayFormSuccessMessage(contactForm);
            
            // Show prominent success toast notification
            showSuccess('🎉 Success! Your message has been sent successfully. We\'ll get back to you soon!');
            
            // Reset form immediately
            contactForm.reset();
            
            // Clear any error states
            document.querySelectorAll('.error-text').forEach(el => el.remove());
            document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('border-red-500'));
            
            // Reset button after a delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 4000);
        } else {
            // API returned an error
            showError('✗ ' + (data.message || 'Failed to send message. Please try again.'));
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    } catch (error) {
        console.error('Error sending form:', error);
        
        // Check if backend is not running
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            showError('✗ Unable to connect to the server. Please make sure the backend is running on port 3002.');
        } else {
            showError('✗ An error occurred while sending your message. Please try again later.');
        }
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

function validateFormData(data) {
    // Check if all required fields are filled
    if (!data.name || !data.email || !data.message) {
        return {
            isValid: false,
            message: 'Please fill in all required fields (Name, Email, Message)'
        };
    }
    
    // Check name length
    if (data.name.length < 2) {
        return {
            isValid: false,
            message: 'Name must be at least 2 characters long'
        };
    }
    
    // Validate email - must contain @ 
    if (!data.email.includes('@')) {
        return {
            isValid: false,
            message: 'Email must contain @ symbol'
        };
    }
    
    // Validate email format - must have domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return {
            isValid: false,
            message: 'Please enter a valid email address (e.g., name@example.com)'
        };
    }
    
    // Check message length
    if (data.message.length < 10) {
        return {
            isValid: false,
            message: 'Message must be at least 10 characters long'
        };
    }
    
    return { isValid: true };
}

function displayFormSuccessMessage(form) {
    // Remove any existing success messages
    const existingSuccess = form.querySelector('.form-success-message');
    if (existingSuccess) existingSuccess.remove();
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded-r-lg shadow-md animate-in fade-in duration-300';
    successMessage.innerHTML = `
        <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
                <i class="ri-check-circle-fill text-3xl text-green-500"></i>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-bold text-green-800 mb-1">Thank You! 🎉</h3>
                <p class="text-green-700 text-sm mb-2">
                    Your message has been received successfully!
                </p>
                <p class="text-green-600 text-xs">
                    We'll review your message and get back to you as soon as possible. Keep an eye on your inbox!
                </p>
            </div>
        </div>
    `;
    
    // Insert at the top of the form
    form.insertBefore(successMessage, form.firstChild);
    
    // Scroll success message into view
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Fade out and remove after 5 seconds
    setTimeout(() => {
        successMessage.style.transition = 'opacity 0.5s ease-out';
        successMessage.style.opacity = '0';
        
        setTimeout(() => {
            if (successMessage.parentElement) {
                successMessage.remove();
            }
        }, 500);
    }, 5000);
}

function showError(message) {
    // Remove any existing alerts
    removeExistingAlerts();
    
    // Create error alert
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 alert-message max-w-md';
    alert.innerHTML = `
        <div class="flex items-start gap-3">
            <i class="ri-close-circle-line text-xl mt-0.5 flex-shrink-0"></i>
            <div>
                <div class="font-semibold">Error</div>
                <div class="text-sm mt-1">${message}</div>
            </div>
            <button onclick="this.closest('.alert-message').remove()" class="ml-4 hover:text-red-200 flex-shrink-0">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Log error for debugging
    console.error('Form Error:', message);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 6000);
}

function showSuccess(message) {
    // Remove any existing alerts
    removeExistingAlerts();
    
    // Create success alert
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 alert-message max-w-md';
    alert.innerHTML = `
        <div class="flex items-start gap-3">
            <i class="ri-check-circle-line text-xl mt-0.5 flex-shrink-0"></i>
            <div>
                <div class="font-semibold">Success!</div>
                <div class="text-sm mt-1">${message}</div>
            </div>
            <button onclick="this.closest('.alert-message').remove()" class="ml-4 hover:text-green-200 flex-shrink-0">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Log success for debugging
    console.log('Form Success:', message);
    
    // Auto remove after 7 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 7000);
}

function removeExistingAlerts() {
    const existingAlerts = document.querySelectorAll('.alert-message');
    existingAlerts.forEach(alert => alert.remove());
}
