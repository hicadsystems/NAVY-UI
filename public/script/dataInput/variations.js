      window.toggleVariationForm = function () {
        const form = document.getElementById('variationForm');
        form.classList.toggle('hidden');
      }

      window.generateVariationReport = function () {
        alert("Report generated (placeholder). You can implement PDF/download logic here.");
      };

      window.saveVariation = function () {
      const table = document.getElementById('variationTableBody');
      const name = document.querySelector('#variationForm input[type="text"]').value;
      const type = document.querySelector('#variationForm select:nth-of-type(1)').value;
      const action = document.querySelector('#variationForm select:nth-of-type(2)').value;
      const amount = document.querySelector('#variationForm input[type="number"]').value;

      if (name && type && action && amount) {
        const row = `<tr>
          <td class="border p-2">${name}</td>
          <td class="border p-2">${type}</td>
          <td class="border p-2">${amount}</td>
          <td class="border p-2">${action}</td>
        </tr>`;
        table.insertAdjacentHTML('beforeend', row);
      } else {
        alert('Please fill all fields');
      }
    };