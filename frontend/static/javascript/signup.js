// Show the login box when the login link is clicked
document.getElementById('login-link').addEventListener('click', function() {
    document.querySelector('.bg-loginbox').style.display = 'flex';
    document.querySelector('.bg-signupbox').style.display = 'none';
});

document.getElementById('login').addEventListener('click', function() {
    document.querySelector('.bg-loginbox').style.display = 'flex';
    document.querySelector('.bg-signupbox').style.display = 'none';
});

document.getElementById('signup').addEventListener('click', function() {
    document.querySelector('.bg-signupbox').style.display = 'flex';
    document.querySelector('.bg-loginbox').style.display = 'none';
});

// Show the signup box when the signup link is clicked
document.getElementById('signup-link').addEventListener('click', function() {
    document.querySelector('.bg-signupbox').style.display = 'flex';
    document.querySelector('.bg-loginbox').style.display = 'none';
});

// Close the modal when the close button is clicked
document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelector('.bg-loginbox').style.display = 'none';
        document.querySelector('.bg-signupbox').style.display = 'none';
    });
});

// Close the login modal when clicking outside of it
document.querySelector('.bg-loginbox').addEventListener('click', function(e) {
    if (e.target.className === 'bg-loginbox') {
        document.querySelector('.bg-loginbox').style.display = 'none';
    }
});

// Close the signup modal when clicking outside of it
document.querySelector('.bg-signupbox').addEventListener('click', function(e) {
    if (e.target.className === 'bg-signupbox') {
        document.querySelector('.bg-signupbox').style.display = 'none';
    }
});