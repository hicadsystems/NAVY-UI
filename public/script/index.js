/* login.js */
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  window.location.href = 'dashboard.html';
});

const payrollClassDropdown = document.getElementById('payroll-class');

// Example: Dynamic Payroll Class Setup
const payrollClasses = [
  { id: 1, name: 'Payroll Class 1', db: 'db1' },
  { id: 2, name: 'Payroll Class 2', db: 'db2' },
];

payrollClasses.forEach(cls => {
  const option = document.createElement('option');
  option.value = cls.db;
  option.textContent = cls.name;
  payrollClassDropdown.appendChild(option);
});

payrollClassDropdown.addEventListener('change', (e) => {
  const selectedDb = e.target.value;
  console.log(`Switched to database: ${selectedDb}`);
  // Here you could initiate an API call to set active DB context or fetch data from that DB
});

