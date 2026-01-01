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
const addModal = document.getElementById('add-modal');
const updateModal = document.getElementById('update-modal');
const addApartmentButton = document.getElementById('add-apartment-button');

// Open apartment modal
if (addApartmentButton) {
    addApartmentButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (addModal) {
            toggleModal(addModal, true);
            // focus first input for quick data entry
            const first = document.getElementById('building');
            if (first) first.focus();
        }
    });
}

// Close modal when close button is clicked
document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (addModal) {
            toggleModal(addModal, false);
        }
        if (updateModal) {
            toggleModal(updateModal, false);
        }
    });
});

// Cancel buttons (bottom of modal)
document.querySelectorAll('.cancel-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = btn.dataset.target;
        if (!target) return;
        const modal = document.getElementById(target);
        if (modal) toggleModal(modal, false);
    });
});

// Close modal when clicking outside on background
if (addModal) {
    addModal.addEventListener('click', function(e) {
        if (e.target === addModal) {
            toggleModal(addModal, false);
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
        const first = document.getElementById('update-building');
        if (first) first.focus();
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
        if (addModal) {
            toggleModal(addModal, false);
        }
        if (updateModal) {
            toggleModal(updateModal, false);
        }
    }
});
