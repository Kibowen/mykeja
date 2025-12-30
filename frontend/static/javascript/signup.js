// Helper function to toggle modal
function toggleModal(modal, show) {
    if (!modal) return; // Guard against null modals
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

// Get modal elements
const bgLoginBox = document.querySelector('.bg-loginbox');
const bgSignupBox = document.querySelector('.bg-signupbox');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');

// Show login modal
if (loginLink) {
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModal(bgLoginBox, true);
        toggleModal(bgSignupBox, false);
    });
}

// Show signup modal from navbar
if (signupLink) {
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModal(bgSignupBox, true);
        toggleModal(bgLoginBox, false);
    });
}

// Show signup modal from login form link
const signupLinkInForm = document.getElementById('signup');
if (signupLinkInForm) {
    signupLinkInForm.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModal(bgSignupBox, true);
        toggleModal(bgLoginBox, false);
    });
}

// Show login modal from signup form link
const loginLinkInForm = document.getElementById('login');
if (loginLinkInForm) {
    loginLinkInForm.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModal(bgLoginBox, true);
        toggleModal(bgSignupBox, false);
    });
}

// Close modal when close button is clicked
document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleModal(bgLoginBox, false);
        toggleModal(bgSignupBox, false);
    });
});

// Close modal when clicking outside (on the background)
if (bgLoginBox) {
    bgLoginBox.addEventListener('click', function(e) {
        if (e.target === bgLoginBox) {
            toggleModal(bgLoginBox, false);
        }
    });
}

if (bgSignupBox) {
    bgSignupBox.addEventListener('click', function(e) {
        if (e.target === bgSignupBox) {
            toggleModal(bgSignupBox, false);
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        toggleModal(bgLoginBox, false);
        toggleModal(bgSignupBox, false);
    }
});