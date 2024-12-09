// Initialize the activity log array in sessionStorage
if (!sessionStorage.getItem("activityLog")) {
    sessionStorage.setItem("activityLog", JSON.stringify([]));
}

// Function to log user activities
function logActivity(action, details) {
    const activity = {
        action: action,
        details: details,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Retrieve existing activities, update, and save back
    const activities = JSON.parse(sessionStorage.getItem("activityLog"));
    activities.push(activity);
    sessionStorage.setItem("activityLog", JSON.stringify(activities));
}

// Function to display recent activities
function displayRecentActivity() {
    const activityContainer = document.getElementById("activity-log");
    if (!activityContainer) return;

    activityContainer.innerHTML = ""; // Clear previous content

    const activities = JSON.parse(sessionStorage.getItem("activityLog")) || [];
    const recentActivities = activities.slice(-4); // Get the last 4 activities

    recentActivities.reverse().forEach((activity) => { // Show the newest first
        const activityItem = document.createElement("p");
        activityItem.innerText = `${activity.date} ${activity.time}: ${activity.action} - ${activity.details}`;
        activityContainer.appendChild(activityItem);
    });
}

// Display activities on page load
window.onload = displayRecentActivity;


// Add event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("payment-form").addEventListener("submit", function (e) {
        e.preventDefault();
        logActivity("Payment Submitted", "Payment form was submitted.");
    });

    document.getElementById("shipping-form").addEventListener("submit", function (e) {
        e.preventDefault();
        logActivity("Shipping Information Submitted", "Shipping form was submitted.");
    });

    document.getElementById("feedback-form").addEventListener("submit", function (e) {
        e.preventDefault();
        logActivity("Feedback Submitted", "Feedback form was submitted.");
    });

    document.getElementById("file-upload-form").addEventListener("submit", function (e) {
        e.preventDefault();
        logActivity("File Uploaded", "A file was uploaded.");
    });

    // Display recent activities when the page loads
    displayRecentActivity();
});
