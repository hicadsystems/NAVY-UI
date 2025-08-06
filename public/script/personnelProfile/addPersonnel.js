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
    const btn1 = document.getElementById("stepBtn1");
    const btn2 = document.getElementById("stepBtn2");

    if (step === 1) {
      // Step 1 is active
      btn1.classList.add("bg-blue-600", "text-white", "cursor-default");
      btn1.classList.remove("bg-yellow-500", "hover:bg-blue-600");

      btn2.classList.add("bg-yellow-500", "hover:bg-blue-600");
      btn2.classList.remove("bg-blue-600", "cursor-default");

      // Show Step 1, hide Step 2
      document.getElementById("step1")?.classList.remove("hidden");
      document.getElementById("step2")?.classList.add("hidden");
    } else {
      // Step 2 is active
      btn2.classList.add("bg-blue-600", "text-white", "cursor-default");
      btn2.classList.remove("bg-yellow-500", "hover:bg-blue-600");

      btn1.classList.add("bg-yellow-500", "hover:bg-blue-600");
      btn1.classList.remove("bg-blue-600", "cursor-default");

      // Show Step 2, hide Step 1
      document.getElementById("step1")?.classList.add("hidden");
      document.getElementById("step2")?.classList.remove("hidden");
    }
  }

  // Optional: initialize with Step 1 active
  document.addEventListener("DOMContentLoaded", () => toggleStep(1));

    window.loadPersonnelForm = loadPersonnelForm;
    window.toggleStep = toggleStep;
}