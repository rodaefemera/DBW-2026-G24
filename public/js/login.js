'use strict';

const loginButton = document.querySelector('button[type="submit"]');

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    let isValid = true;

    if (emailInput.value.trim() !== "") {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        isValid = false;
    }

    if (passwordInput.value.trim() !== "") {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    } else {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        const userEmail = emailInput.value.trim();
        console.log(`Success! The entered email was: ${userEmail}`);
        
        emailInput.value = "";
        passwordInput.value = "";
        
        emailInput.classList.remove('is-valid');
        passwordInput.classList.remove('is-valid');
    }
});
