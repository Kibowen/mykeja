var apartments = [];
var count = 0;
function addApartment() {
    var building = document.getElementById("building").value;
    var unit = document.getElementById("unit").value;
    var tenant = document.getElementById("tenant").value;
    var caretaker = document.getElementById("caretaker").value;

    var apartment = {
        building: building,
        unit: unit,
        tenant: tenant,
        caretaker: caretaker
    };

    apartments.push(apartment);

    var summaryContainer = document.getElementById("summary-container");
    var newApartmentSummary = document.createElement("div");
    newApartmentSummary.setAttribute("id", "apartment-summary-" + count);
    newApartmentSummary.innerHTML = 
        "<p>Building: " + building + "</p>" +
        "<p>Unit: " + unit + "</p>" +
        "<p>Tenant: " + tenant + "</p>" +
        "<p>Caretaker: " + caretaker + "</p>";

    summaryContainer.appendChild(newApartmentSummary);

}

document.getElementById("add-apartment-button").onclick = function() {
    addApartment();
};