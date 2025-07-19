document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/payrolls")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => renderPayrollTableRows(data))
    .catch(error => console.error("Error fetching payrolls:", error));
});

function renderPayrollTableRows(payrolls) {
  const tableBody = document.querySelector("#payrollTable tbody");
  tableBody.innerHTML = "";

  if (!payrolls || payrolls.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7">No payroll records found.</td></tr>';
    return;
  }

  payrolls.forEach(payroll => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", payroll.id);

    const payDate = payroll.pay_date ? new Date(payroll.pay_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

    row.innerHTML = `
      <td>${payroll.employee_id || 'N/A'}</td>
      <td>₹${parseFloat(payroll.base_salary || 0).toFixed(2)}</td>
      <td>₹${parseFloat(payroll.allowance || 0).toFixed(2)}</td>
      <td>₹${parseFloat(payroll.deductions || 0).toFixed(2)}</td>
      <td>₹${parseFloat(payroll.net_salary || 0).toFixed(2)}</td>
      <td>${payDate}</td>
      <td class="table-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}