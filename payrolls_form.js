document.addEventListener("DOMContentLoaded", () => {
    const addPayrollBtn = document.querySelector(".add-button");
    const addPayrollFormCard = document.getElementById("addPayrollFormCard");
    const addPayrollFormContent = document.getElementById("addPayrollFormContent");

    const closeButton = addPayrollFormCard.querySelector(".close-button");
    const cancelButton = addPayrollFormCard.querySelector(".action-button.secondary");

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
});