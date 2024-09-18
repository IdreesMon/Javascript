// JavaScript Document
// Week 6 - Simple Form Validation

document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector(`input[type="button"]`);

    // querySelect Span elements
    const errorElements = {
        fname: document.querySelector(`#fn-error`),
        lname: document.querySelector(`#ln-error`),
        email: document.querySelector(`#email-error`),
        confirmEmail: document.querySelector(`#confirm-error`),
        phone: document.querySelector(`#phone-error`)
    };

    // Regex/Regular expressions
    const patterns = {
        name: /^[a-zA-Z]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{3}-?\d{3}-?\d{4}$/
    };


    // Validate fields

    const validateField = (value, pattern, errorElement, errorMsgEmpty, errorMsgInvalid, inputSelector) => {
        const inputElement = document.querySelector(inputSelector).parentElement;
        if (!value) {
            errorElement.innerHTML = `<span style="color: red;">*</span> ${errorMsgEmpty}`;
            inputElement.style.color = 'red';
        } else if (!pattern.test(value)) {
            errorElement.innerHTML = `<span style="color: red;">*</span> ${errorMsgInvalid}`;
            inputElement.style.color = 'red';
        } else {
            errorElement.innerHTML = '';
            inputElement.style.color = '';
        }
    };


    // Validate confirm email


    const validateConfirmEmail = (email, confirmEmail) => {
        const confirmEmailElement = document.querySelector('#confirm-email').parentElement;
        if (!confirmEmail) {
            errorElements.confirmEmail.innerHTML = '<span style="color: red;">*</span> Confirm Email is required';
            confirmEmailElement.style.color = 'red';
        } else if (!patterns.email.test(confirmEmail)) {
            errorElements.confirmEmail.innerHTML = '<span style="color: red;">*</span> Email is invalid';
            confirmEmailElement.style.color = 'red';
        } else if (email !== confirmEmail) {
            errorElements.confirmEmail.innerHTML = '<span style="color: red;">*</span> Emails do not match';
            confirmEmailElement.style.color = 'red';
        } else {
            errorElements.confirmEmail.innerHTML = '';
            confirmEmailElement.style.color = '';
        }
    };

    submit.addEventListener('click', () => {
        const fname = document.querySelector(`#first-name`).value;
        const lname = document.querySelector(`#last-name`).value;
        const email = document.querySelector(`#email`).value;
        const cemail = document.querySelector(`#confirm-email`).value;
        const phone = document.querySelector(`#phone`).value;

        // Clears previous errors by setting innerHTML to empty string
        Object.values(errorElements).forEach(error => (error.innerHTML = ''));

        // Validate fields
        validateField(fname, patterns.name, errorElements.fname, 'First name is required', 'First Name cannot include special characters', '#first-name');
        validateField(lname, patterns.name, errorElements.lname, 'Last name is required', 'Last Name cannot include special characters', '#last-name');
        validateField(email, patterns.email, errorElements.email, 'Email is required', 'Email is invalid', '#email');
        validateConfirmEmail(email, cemail);
        validateField(phone, patterns.phone, errorElements.phone, 'Phone number is required', 'Phone number must be 10 digits', '#phone');

        // If no errors, proceed to confirmation
        if (!Object.values(errorElements).some(error => error.innerHTML)) {
            const confirmform = document.querySelector(`#confirmation`);
            const confirminfo = document.querySelector(`#confirmation p`);
            document.querySelector(`#form`).style.display = 'none';
            confirmform.style.display = 'block';
            confirminfo.innerHTML = '';
            // Format phone number
            const formattedPhone = phone.replace(/-/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            const person = { FName: fname, LName: lname, Email: email, Phone: formattedPhone };

            confirminfo.innerHTML = `<p><b>${person.FName} ${person.LName}</p><p>${person.Email}</p><p>${person.Phone}</b></p>`;
        }
    });
});


