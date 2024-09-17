function validateForm() {
    let valid = true;

    // Get input values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Clear previous error messages and reset label colors
    document.getElementById("fn-error").innerHTML = "";
    document.getElementById("ln-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    document.getElementById("phone-error").innerHTML = "";

    document.getElementById("first-name-label").style.color = "black";
    document.getElementById("last-name-label").style.color = "black";
    document.getElementById("email-label").style.color = "black";
    document.getElementById("phone-label").style.color = "black";

    // Validation regex patterns
    const nameRegex = /^[a-zA-Z\-]+$/;  // For names (letters and dashes)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // For emails
    const phoneRegex = /^\d{10}$/;  // For phone numbers (10 digits)

    // Validate First Name
    if (!firstName.match(nameRegex)) {
        
        document.getElementById("fn-error").innerHTML = "*";
        document.getElementById("first-name-label").style.color = "red";  // Turn label red
        valid = false;
    }

    // Validate Last Name
    if (!lastName.match(nameRegex)) {
        document.getElementById("ln-error").innerHTML = "*";
        document.getElementById("last-name-label").style.color = "red";  // Turn label red
        valid = false;
    }

    // Validate Email
    if (!email.match(emailRegex)) {
        document.getElementById("email-error").innerHTML = "*";
        document.getElementById("email-label").style.color = "red";  // Turn label red
        valid = false;
    }

    // Validate Phone Number (should be 10 digits)
    if (!phone.match(phoneRegex)) {
        document.getElementById("phone-error").innerHTML = "*";
        document.getElementById("phone-label").style.color = "red";  // Turn label red
        valid = false;
    }

    // If valid, proceed to confirmation
    if (valid) {
        showConfirmation(firstName, lastName, email, phone);
    }
}

function showConfirmation(firstName, lastName, email, phone) {
    // Hide the form
    document.getElementById("form").style.display = "none";

    // Format the phone number
    let formattedPhone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);

    // Show confirmation
    document.getElementById("info").innerHTML = `${firstName} ${lastName}<br>${email}<br>${formattedPhone}`;
    document.getElementById("confirmation").style.display = "block";
}
