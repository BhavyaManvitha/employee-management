document.addEventListener("DOMContentLoaded", () => {
    const payrollTableBody = document.querySelector("#payrollTable tbody");

    async function fetchAndRenderPayrolls() {
        try {
            const response = await fetch('http://localhost:3000/api/payrolls');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const payrolls = await response.json();
            renderPayrollTable(payrolls);
        } catch (error) {
            console.error("Error fetching payrolls:", error);
            payrollTableBody.innerHTML = '<tr><td colspan="7">Error loading payrolls.</td></tr>';
        }
    }

    function renderPayrollTable(payrolls) {
        payrollTableBody.innerHTML = '';

        if (!payrolls || payrolls.length === 0) {
            payrollTableBody.innerHTML = '<tr><td colspan="7">No payroll records found.</td></tr>';
            return;
        }

        payrolls.forEach(payroll => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', payroll.id);

            const payDate = payroll.pay_date ? new Date(payroll.pay_date).toLocaleDateString('en-IN') : 'N/A';
            const baseSalary = payroll.base_salary ? `₹${parseFloat(payroll.base_salary).toFixed(2)}` : 'N/A';
            const allowance = payroll.allowance ? `₹${parseFloat(payroll.allowance).toFixed(2)}` : 'N/A';
            const deductions = payroll.deductions ? `₹${parseFloat(payroll.deductions).toFixed(2)}` : 'N/A';
            const netSalary = payroll.net_salary ? `₹${parseFloat(payroll.net_salary).toFixed(2)}` : 'N/A';

            row.innerHTML = `
                <td>${payroll.employee_id || 'N/A'}</td>
                <td>${baseSalary}</td>
                <td>${allowance}</td>
                <td>${deductions}</td>
                <td>${netSalary}</td>
                <td>${payDate}</td>
                
            `;
            payrollTableBody.appendChild(row);
        });
    }

    fetchAndRenderPayrolls();
});