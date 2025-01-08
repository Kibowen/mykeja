document.getElementById('button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'flex';
})

document.querySelector('.close-btn').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
})

document.getElementById('add-apartment-button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
})

document.getElementById('remove-apartment-button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
})