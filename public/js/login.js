'use strict';

const form = document.querySelector('form');
const loginButton = document.querySelector('button[type="submit"]');

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    let isValid = true;

    if (usernameInput.value.trim() !== "") {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
    } else {
        usernameInput.classList.remove('is-valid');
        usernameInput.classList.add('is-invalid');
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
        form.submit();
    }
});
