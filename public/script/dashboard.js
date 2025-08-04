const menuItems = [
  'Administration',
  'Personnel Profile',
  'Data Input',
  'File Update',
  'Payroll Calculations',
  'Reference Tables',
  'Utilities',
  'Reports'
];

const sectionContent = {
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

menuItems.forEach((item) => {
  const card = document.createElement('div');
  card.className = 'bg-white p-4 text-center font-medium rounded-lg cursor-pointer hover:shadow-md';
  card.textContent = item;
  card.onclick = () => showSection(item);
  menuContainer.appendChild(card);
});

function showSection(title) {
  // Hide menu cards
  menuContainer.classList.add('hidden');

  // Clear previous section and show only selected one
  sectionsContainer.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'bg-white p-6 rounded-xl shadow-md';

  const heading = document.createElement('h2');
  heading.className = 'text-xl font-semibold mb-4';
  heading.textContent = title;

  const list = document.createElement('ul');
  list.className = 'list-disc pl-6 space-y-2 text-gray-700';
  sectionContent[title].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  container.appendChild(heading);
  container.appendChild(list);
  sectionsContainer.appendChild(container);
  sectionsContainer.classList.remove('hidden');
}
