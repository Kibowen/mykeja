document.getElementById('add-apartment-button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'flex';
})

document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelector('.bg-modal').style.display = 'none';
        document.getElementById('update-modal').style.display = 'none';
    });
});

document.querySelector('.bg-modal').addEventListener('click', function(e) {
    if (e.target.className === 'bg-modal') {
        document.querySelector('.bg-modal').style.display = 'none';
        document.getElementById('update-modal').style.display = 'none';
    }
})

function openUpdateModal(id, building, unit, tenant, caretaker) {
    document.getElementById('update-building').value = building;
    document.getElementById('update-unit').value = unit;
    document.getElementById('update-tenant').value = tenant;
    document.getElementById('update-caretaker').value = caretaker;
    document.getElementById('update-apartment-form').action = `/update-building/${id}`;
    document.getElementById('update-modal').style.display = 'flex';
}

function closeUpdateModal() {
    document.getElementById('update-modal').style.display = 'none';
}



