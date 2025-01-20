document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get the input values
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Dummy authentication logic
            if (username === "admin" && password === "password123") {
                alert("Login successful! Redirecting...");
                window.location.href = "dashboard.html"; // Redirect to the dashboard or homepage
            } else {
                alert("Invalid username or password. Please try again.");
            }
        });
    }
});
