if (!window.personnelFormLoaded) {
    window.personnelFormLoaded = true;
    
    const formTitle = 'Add New Personnel';
    const fields = [
        "Pensioner Number", "Rank", "Surname", "First Name", "Middle Name", "Date of Birth",
        "Gender", "Marital Status", "Religion", "Tribe", "State", "Local Government", "Home Address",
        "Place of Birth", "Email Address", "Phone", "Division", "Last Location", "Directorate",
        "Geo Political Zone", "Passport Photograph"
    ];

    function loadPersonnelForm() {
        const title = document.getElementById("form-title");
        const step1 = document.getElementById("step1");
        title.textContent = formTitle;
        step1.innerHTML = fields.map(field => {
            if (["Rank", "State", "Local Government", "Last Location", "Geo Political Zone"].includes(field)) {
                return `<select class='form-input'><option>${field}</option></select>`;
            } else if (field === "Passport Photograph") {
                return `<input type='file' class="form-input"/>`;
            } else if (field === "Date of Birth") {
                return `<input type='date' placeholder='${field}' class="form-input"/>`;
            } else {
                return `<input type='text' placeholder='${field}' class="form-input"/>`;
            }
        }).join('');
    }

    function toggleStep(step) {
        document.getElementById("step1").classList.toggle("hidden", step !== 1);
        document.getElementById("step2").classList.toggle("hidden", step !== 2);
    }

    window.loadPersonnelForm = loadPersonnelForm;
    window.toggleStep = toggleStep;
}