// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const storyForm = document.getElementById('story-form');
    const openFormLinks = document.querySelectorAll('#open-form, #cta-button');

    // Add click event to all "Submit Your Story" buttons/links
    openFormLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            storyForm.style.display = 'block'; // Show the story form
            storyForm.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form smoothly
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Select the login/signup link
    const loginLink = document.getElementById("login-page-link");

    // Add a click event listener to navigate to login.html
    loginLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = "loginpage.html"; // Redirect to login page
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Get the signup link element
    const signupLink = document.getElementById("signup-page-link");

    // Add a click event listener to redirect to the signup page
    signupLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href = "signup.html"; // Redirect to signup page
    });
});



