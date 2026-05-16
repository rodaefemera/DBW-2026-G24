'use strict';

const form = document.querySelector('form');
const signupButton = document.querySelector('button[type="submit"]');

signupButton.addEventListener('click', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    let isValid = true;

    if (usernameInput.value.trim() !== "") {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
    } else {
        usernameInput.classList.remove('is-valid');
        usernameInput.classList.add('is-invalid');
        isValid = false;
    }

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

    if (confirmPasswordInput.value.trim() !== "") {
        confirmPasswordInput.classList.remove('is-invalid');
        confirmPasswordInput.classList.add('is-valid');
    } else {
        confirmPasswordInput.classList.remove('is-valid');
        confirmPasswordInput.classList.add('is-invalid');
        isValid = false;
    }

    // Check if passwords match
    if (isValid && passwordInput.value !== confirmPasswordInput.value) {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
        confirmPasswordInput.classList.remove('is-valid');
        confirmPasswordInput.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        form.submit();
    }
});
