document.addEventListener("DOMContentLoaded", () => {
    const addDepartmentBtn = document.querySelector(".add-button");
    const addDepartmentFormCard = document.getElementById("addDepartmentFormCard");
    const addDepartmentFormContent = document.getElementById("addDepartmentFormContent");
    const departmentTableBody = document.querySelector("#departmentTable tbody");

    const closeButton = addDepartmentFormCard.querySelector(".close-button");
    const cancelButton = addDepartmentFormCard.querySelector(".action-button.secondary");

    // Function to fetch and render departments
    async function fetchAndRenderDepartments() {
        try {
            const response = await fetch('http://localhost:3000/api/departments');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const departments = await response.json();
            renderDepartmentTable(departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
            departmentTableBody.innerHTML = '<tr><td colspan="5">Error loading departments.</td></tr>'; // colspan matches number of columns
        }
    }

    function renderDepartmentTable(departments) {
        departmentTableBody.innerHTML = '';

        if (!departments || departments.length === 0) {
            departmentTableBody.innerHTML = '<tr><td colspan="5">No departments found.</td></tr>';
            return;
        }

        departments.forEach(department => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', department.id);

            row.innerHTML = `
                <td>${department.id || 'N/A'}</td>
                <td>${department.name || 'N/A'}</td>
                <td>${department.head_id || 'N/A'}</td>
                <td>${department.team_size || 'N/A'}</td>
                <td class="table-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            departmentTableBody.appendChild(row);
        });
    }

    // Function to handle form submission
    async function handleAddDepartmentFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(addDepartmentFormContent);
        const departmentData = Object.fromEntries(formData.entries());

        // Convert numeric fields to numbers or null
        departmentData.head_id = departmentData.head_id === '' ? null : parseInt(departmentData.head_id);
        departmentData.team_size = parseInt(departmentData.team_size);

        try {
            const response = await fetch('http://localhost:3000/api/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(departmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
            }

            const result = await response.json();
            alert('Department added successfully!');
            hideFormCard();
            fetchAndRenderDepartments(); // Refresh the department list
        } catch (error) {
            console.error("Error adding department:", error);
            alert('Failed to add department: ' + error.message);
        }
    }

    function showFormCard() {
        addDepartmentFormCard.style.display = "block";
        addDepartmentFormCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideFormCard() {
        addDepartmentFormCard.style.display = "none";
        addDepartmentFormContent.reset();
    }

    // Event Listeners
    if (addDepartmentBtn) {
        addDepartmentBtn.addEventListener("click", showFormCard);
    }
    if (closeButton) {
        closeButton.addEventListener("click", hideFormCard);
    }
    if (cancelButton) {
        cancelButton.addEventListener("click", hideFormCard);
    }
    addDepartmentFormContent.addEventListener("submit", handleAddDepartmentFormSubmit);

    // Initial fetch when the page loads
    fetchAndRenderDepartments();
});