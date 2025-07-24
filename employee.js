document.addEventListener("DOMContentLoaded", () => {
    const addEmployeeBtn = document.querySelector(".add-button");
    const addEmployeeFormCard = document.getElementById("addEmployeeFormCard");
    const addEmployeeFormContent = document.getElementById("addEmployeeFormContent");
    const employeeTableBody = document.querySelector("#employeeTable tbody");

    const closeButton = addEmployeeFormCard.querySelector(".close-button");
    const cancelButton = addEmployeeFormCard.querySelector(".action-button.secondary");

    
    async function fetchAndRenderEmployees() {
        try {
            const response = await fetch('http://localhost:3000/api/employees');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const employees = await response.json();
            renderEmployeeTable(employees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            employeeTableBody.innerHTML = '<tr><td colspan="9">Error loading employees.</td></tr>'; 
        }
    }

    function renderEmployeeTable(employees) {
        employeeTableBody.innerHTML = ''; 

        if (!employees || employees.length === 0) {
            employeeTableBody.innerHTML = '<tr><td colspan="9">No employees found.</td></tr>';
            return;
        }

        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', employee.id);

            
            const joinDate = employee.join_date ? new Date(employee.join_date).toLocaleDateString('en-IN') : 'N/A';
            const salary = employee.salary ? `₹${parseFloat(employee.salary).toFixed(2)}` : 'N/A';

            row.innerHTML = `
                <td>${employee.id || 'N/A'}</td>
                <td>${employee.name || 'N/A'}</td>
                <td>${employee.email || 'N/A'}</td>
                <td>${employee.phone || 'N/A'}</td>
                <td>${employee.department_id || 'N/A'}</td>
                <td>${employee.designation || 'N/A'}</td>
                <td>${joinDate}</td>
                <td>${salary}</td>
                <td class="table-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });
    }

    
    async function handleAddEmployeeFormSubmit(event) {
        event.preventDefault(); 

        const formData = new FormData(addEmployeeFormContent);
        const employeeData = Object.fromEntries(formData.entries());

       
        employeeData.salary = parseFloat(employeeData.salary);
        
        employeeData.department_id = employeeData.department_id === '' ? null : parseInt(employeeData.department_id);


        try {
            const response = await fetch('http://localhost:3000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
            }

            const result = await response.json();
            alert('Employee added successfully!');
            hideFormCard(); 
            fetchAndRenderEmployees();
        } catch (error) {
            console.error("Error adding employee:", error);
            alert('Failed to add employee: ' + error.message); 
        }
    }

    function showFormCard() {
        addEmployeeFormCard.style.display = "block";
        addEmployeeFormCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideFormCard() {
        addEmployeeFormCard.style.display = "none";
        addEmployeeFormContent.reset();
    }

    
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener("click", showFormCard);
    }
    if (closeButton) {
        closeButton.addEventListener("click", hideFormCard);
    }
    if (cancelButton) {
        cancelButton.addEventListener("click", hideFormCard);
    }
    
    addEmployeeFormContent.addEventListener("submit", handleAddEmployeeFormSubmit);

    
    fetchAndRenderEmployees();
});