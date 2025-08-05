/* dashboard.js */
const menuItems = {
  'Administration': [
    'Create User',
    'Control User',
    'Close/Open Payroll Period',
    'Payroll Class Setup',
    'Company Profile',
    'Monthly and Yearly Processing'
  ],
  'Personnel Profile': [
    'Add New Personnel',
    'Current Personnel',
    'Old Personnel'
  ],
  'Data Input': [
    'Payments/Deductions',
    'Variation to Payments/Deductions',
    'Cumulative Payroll Transfer',
    'Input Documentation',
    'Arrears Calculation'
  ],
  'File Update': [
    'Save Payroll Class',
    'Input Variable Report',
    'Changes in Personnel Data',
    'Master File Update',
    'Recall Payment Files'
  ],
  'Payroll Calculations': [
    'Backup',
    'Restore',
    'Calculations'
  ],
  'Reference Tables': [
    'General Tables',
    'Tax Tables',
    'Allowances',
    'Deductions'
  ],
  'Utilities': [
    'System Preferences',
    'Import/Export',
    'User Logs'
  ],
  'Reports': [
    'Payroll Summary',
    'Payment Slips',
    'Audit Trail',
    'Custom Reports'
  ]
};

const menuContainer = document.getElementById('menu');
const sectionsContainer = document.getElementById('sections');
const backBtnWrapper = document.getElementById('back-button-wrapper');
const backBtn = document.getElementById('back-button');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

Object.keys(menuItems).forEach((item) => {
  const card = document.createElement('div');
  card.className = 'bg-white p-6 text-center font-semibold text-blue-800 border-2 border-blue-400 rounded-xl cursor-pointer shadow-md hover:shadow-xl hover:bg-yellow-100 transition duration-300';
  card.textContent = item;
  card.onclick = () => showSection(item);
  menuContainer.appendChild(card);
});

window.cancelToCurrentSection = function() {
  if (window.currentSection) {
      showSection(window.currentSection);
  }
};

window.showSection = function (title) {
  menuContainer.classList.add('hidden');
  backBtnWrapper.classList.remove('hidden');

  sectionsContainer.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'bg-white p-6 rounded-xl shadow-lg border-2 border-yellow-300';

  const heading = document.createElement('h2');
  heading.className = 'text-2xl font-bold mb-4 text-blue-700';
  heading.textContent = title;

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  if (menuItems[title] && Array.isArray(menuItems[title])) {
    menuItems[title].forEach(page => {
      const pageCard = document.createElement('div');
      pageCard.className = 'bg-gradient-to-br from-blue-300 via-yellow-100 to-yellow-300 p-4 rounded-lg shadow hover:scale-105 transform transition cursor-pointer text-center font-medium text-blue-900';
      pageCard.textContent = page;
      pageCard.onclick = () => openPage(title, page);
      grid.appendChild(pageCard);
    });
  } else {
    grid.innerHTML = `<div class="text-red-600 font-semibold col-span-full">No pages found for "${title}". Check your menuItems config.</div>`;
  }

  container.appendChild(heading);
  container.appendChild(grid);
  sectionsContainer.appendChild(container);
  sectionsContainer.classList.remove('hidden');

  sectionsContainer.appendChild(backBtnWrapper);
}

function openPage(section, page) {
  const inlineSections = [
    (section === 'Personnel Profile' && page === 'Add New Personnel'),
    (section === 'Personnel Profile' && page === 'Current Personnel'),
    (section === 'Personnel Profile' && page === 'Old Personnel'),
    (section === 'Data Input'),
    (section === 'Reference Tables'),
    (section === 'Utilities'),
    (section === 'Reports'),
    (section === 'File Update' && page === 'Changes in Personnel Data')
  ];

  const showInline = inlineSections.includes(true);
   window.currentSection = section;
  if (section === 'Personnel Profile' && page === 'Add New Personnel') {
    fetch('partials/personnelProfile/addPersonnel.html')
      .then(res => res.text())
      .then(html => {
        sectionsContainer.innerHTML = html;

        // Dynamically load the script AFTER inserting HTML
        const script = document.createElement('script');
        script.src = 'script/personnelProfile/addPersonnel.js';
        script.type = 'text/javascript';

        // Wait until the script loads, then call the function
        script.onload = () => {
          if (typeof loadPersonnelForm === 'function') {
            loadPersonnelForm();
          }
        };

        document.body.appendChild(script);
      });
  } else if (section === 'Data Input' && page === 'Variation to Payments/Deductions') {
     fetch('partials/dataInput/variations.html')
      .then(res => res.text())
      .then(html => {
        html = html.replace('{{section}}', section);
        sectionsContainer.innerHTML = html + `
          <div class="mt-6 flex justify-end">
            <button onclick="showSection('${section}')" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          </div>
        `;
        backBtnWrapper.classList.remove('hidden');

        // Dynamically load the JS after HTML is inserted
        const script = document.createElement('script');
        script.src = 'script/dataInput/variations.js'; // Relative to the HTML page location (not the JS file)
        script.type = 'text/javascript';
        document.body.appendChild(script);
      });
    }
  else if (showInline) {
    sectionsContainer.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow-lg border border-blue-300">
        <h3 class="text-2xl font-bold text-blue-800 mb-4">${page}</h3>
        <p class="text-gray-600">Inline view content for ${page} goes here. You can add specific inputs or components here.</p>
        <div class="mt-4 flex justify-end">
          <button onclick="showSection('${section}')" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
        </div>
      </div>`;
  } else {
    modal.classList.remove('hidden');
    if (section === 'Administration' && page === 'Create User') {
      modal.classList.remove('hidden');
      fetch('partials/administration/createUser.html')
        .then(res => res.text())
        .then(html => {
          modalContent.innerHTML = html;

          const script = document.createElement('script');
          script.src = 'scripts/administration/createUser.js';
          document.body.appendChild(script);
        });
      return;
    }

    modalContent.innerHTML = `
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 text-blue-800">${page}</h2>
        <p class="text-gray-600">Modal content for ${page} goes here. You can customize this modal as needed.</p>
      </div>`;
  }
  sectionsContainer.appendChild(backBtnWrapper);
}

function toggleStep(step) {
  document.getElementById('step1').classList.toggle('hidden', step !== 1);
  document.getElementById('step2').classList.toggle('hidden', step !== 2);
}

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

backBtn.addEventListener('click', () => {
  menuContainer.classList.remove('hidden');
  sectionsContainer.classList.add('hidden');
  backBtnWrapper.classList.add('hidden');
});
