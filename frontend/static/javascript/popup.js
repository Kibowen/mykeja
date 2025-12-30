// Helper function to toggle modal visibility
function toggleModal(modal, show) {
    if (!modal) return; // Guard against null modals
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

// Get modal elements
const bgModal = document.querySelector('.bg-modal');
const updateModal = document.getElementById('update-modal');
const addApartmentButton = document.getElementById('add-apartment-button');

// Open apartment modal
if (addApartmentButton) {
    addApartmentButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (bgModal) {
            toggleModal(bgModal, true);
        }
    });
}

// Close modal when close button is clicked
document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (bgModal) {
            toggleModal(bgModal, false);
        }
        if (updateModal) {
            toggleModal(updateModal, false);
        }
    });
});

// Close modal when clicking outside on background
if (bgModal) {
    bgModal.addEventListener('click', function(e) {
        if (e.target === bgModal) {
            toggleModal(bgModal, false);
        }
    });
}

if (updateModal) {
    updateModal.addEventListener('click', function(e) {
        if (e.target === updateModal) {
            toggleModal(updateModal, false);
        }
    });
}

// Open update modal with apartment data
function openUpdateModal(id, building, unit, tenant, caretaker) {
    const buildingInput = document.getElementById('update-building');
    const unitInput = document.getElementById('update-unit');
    const tenantInput = document.getElementById('update-tenant');
    const caretakerInput = document.getElementById('update-caretaker');
    const updateForm = document.getElementById('update-apartment-form');

    if (buildingInput) buildingInput.value = building;
    if (unitInput) unitInput.value = unit;
    if (tenantInput) tenantInput.value = tenant;
    if (caretakerInput) caretakerInput.value = caretaker;
    if (updateForm) updateForm.action = `/update-building/${id}`;

    if (updateModal) {
        toggleModal(updateModal, true);
    }
}

// Close update modal
function closeUpdateModal() {
    if (updateModal) {
        toggleModal(updateModal, false);
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (bgModal) {
            toggleModal(bgModal, false);
        }
        if (updateModal) {
            toggleModal(updateModal, false);
        }
    }
});



