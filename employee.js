document.addEventListener("DOMContentLoaded", () => {
    const addEmployeeBtn = document.querySelector(".add-button");
    const addEmployeeFormCard = document.getElementById("addEmployeeFormCard");
    const addEmployeeFormContent = document.getElementById("addEmployeeFormContent");

    const closeButton = addEmployeeFormCard.querySelector(".close-button");
    const cancelButton = addEmployeeFormCard.querySelector(".action-button.secondary");

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
});