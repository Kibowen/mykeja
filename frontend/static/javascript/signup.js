document.getElementById('login').addEventListener('click', function() {
    document.querySelector('.bg-loginbox').style.display = 'flex';
})

document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelector('.bg-loginbox').style.display = 'none';
        document.querySelector('.bg-signupbox').style.display = 'none';
    });
});

document.querySelector('.bg-loginbox').addEventListener('click', function(e) {
    if (e.target.className === 'bg-loginbox') {
        document.querySelector('.bg-loginbox').style.display = 'none';
    }
})

document.getElementById('signup').addEventListener('click', function() {
    document.querySelector('.bg-signupbox').style.display = 'flex';
})

document.querySelector('.bg-signupbox').addEventListener('click', function(e) { 
    if (e.target.className === 'bg-signupbox') {
        document.querySelector('.bg-signupbox').style.display = 'none';
    }
})