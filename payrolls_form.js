document.addEventListener("DOMContentLoaded", () => {
    const addPayrollBtn = document.querySelector(".add-button");
    const addPayrollFormCard = document.getElementById("addPayrollFormCard");
    const addPayrollFormContent = document.getElementById("addPayrollFormContent");

    const closeButton = addPayrollFormCard.querySelector(".close-button");
    const cancelButton = addPayrollFormCard.querySelector(".action-button.secondary");

    async function handleAddPayrollFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(addPayrollFormContent);
        const payrollData = Object.fromEntries(formData.entries());

        payrollData.employee_id = parseInt(payrollData.employee_id);
        payrollData.base_salary = parseFloat(payrollData.base_salary);
        payrollData.allowance = parseFloat(payrollData.allowance);
        payrollData.deductions = parseFloat(payrollData.deductions);
        payrollData.net_salary = parseFloat(payrollData.net_salary);

        try {
            const response = await fetch('http://localhost:3000/api/payrolls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payrollData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
            }

            const result = await response.json();
            alert('Payroll added successfully!');
            hideFormCard();
            if (typeof fetchAndRenderPayrolls === 'function') {
                fetchAndRenderPayrolls();
            } else {
                window.location.reload(); 
            }
        } catch (error) {
            console.error("Error adding payroll:", error);
            alert('Failed to add payroll: ' + error.message);
        }
    }

    function showFormCard() {
        addPayrollFormCard.style.display = "block";
        addPayrollFormCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideFormCard() {
        addPayrollFormCard.style.display = "none";
        addPayrollFormContent.reset();
    }

    if (addPayrollBtn) {
        addPayrollBtn.addEventListener("click", showFormCard);
    }
    if (closeButton) {
        closeButton.addEventListener("click", hideFormCard);
    }
    if (cancelButton) {
        cancelButton.addEventListener("click", hideFormCard);
    }
    addPayrollFormContent.addEventListener("submit", handleAddPayrollFormSubmit);
});