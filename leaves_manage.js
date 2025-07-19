document.addEventListener("DOMContentLoaded", () => {
    const manageLeavesBtn = document.getElementById("manageLeavesBtn");
    const manageLeaveCard = document.getElementById("manageLeaveCard");
    const closeButton = manageLeaveCard.querySelector(".close-button");
    const acceptButton = manageLeaveCard.querySelector(".accept-button");
    const rejectButton = manageLeaveCard.querySelector(".reject-button");
    const statusMessageElement = document.getElementById("statusMessage");
    const currentStatusBadge = document.getElementById("currentStatusBadge");

    const displayEmployeeId = document.getElementById("displayEmployeeId");
    const displayLeaveType = document.getElementById("displayLeaveType");
    const displayStartDate = document.getElementById("displayStartDate");
    const displayEndDate = document.getElementById("displayEndDate");
    const displayStatusContainer = document.getElementById("displayStatusContainer");

    const sampleLeaveRequest = {
        id: 1,
        employee_id: 'EMP001',
        leave_type: 'Sick Leave',
        start_date: '2025-07-20',
        end_date: '2025-07-22',
        status: 'pending'
    };

    function populateLeaveCard(leaveData) {
        displayEmployeeId.textContent = leaveData.employee_id;
        displayLeaveType.textContent = leaveData.leave_type;
        displayStartDate.textContent = new Date(leaveData.start_date).toLocaleDateString('en-IN');
        displayEndDate.textContent = new Date(leaveData.end_date).toLocaleDateString('en-IN');

        currentStatusBadge.className = 'status';
        statusMessageElement.className = 'status-message';

        currentStatusBadge.textContent = leaveData.status;
        currentStatusBadge.classList.add(leaveData.status);

        if (leaveData.status === 'pending') {
            acceptButton.style.display = 'inline-block';
            rejectButton.style.display = 'inline-block';
            statusMessageElement.style.display = 'none';
        } else {
            acceptButton.style.display = 'none';
            rejectButton.style.display = 'none';
            statusMessageElement.style.display = 'block';
            statusMessageElement.innerHTML = `This request is already <span class="status ${leaveData.status}">${leaveData.status.toUpperCase()}</span>.`;
        }
    }

    function showManageLeaveCard() {
        manageLeaveCard.style.display = "block";
        manageLeaveCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        populateLeaveCard(sampleLeaveRequest);
    }

    function hideManageLeaveCard() {
        manageLeaveCard.style.display = "none";
    }

    if (manageLeavesBtn) {
        manageLeavesBtn.addEventListener("click", showManageLeaveCard);
    }
    if (closeButton) {
        closeButton.addEventListener("click", hideManageLeaveCard);
    }

    if (acceptButton) {
        acceptButton.addEventListener("click", () => {
            alert('Leave Accepted!');
            sampleLeaveRequest.status = 'approved';
            populateLeaveCard(sampleLeaveRequest);
        });
    }
    if (rejectButton) {
        rejectButton.addEventListener("click", () => {
            alert('Leave Rejected!');
            sampleLeaveRequest.status = 'rejected';
            populateLeaveCard(sampleLeaveRequest);
        });
    }
});