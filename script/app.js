let email = {},
    password = {},
    signInButton,
    passwordOptions = ['text', 'password'],
    passwordInput,
    toggle;
function handleFloatingLabel() {}

function handlePasswordSwitcher() {
    toggle.addEventListener('change', function () {
        passwordInput.type = passwordOptions[+this.checked];
    });
}
function getDOMElements() {
    passwordInput = document.querySelector('.js-pw-input');
    toggle = document.querySelector('.js-pw-toggle');

    email.field = document.querySelector('.js-email-field');
    email.errorMessage = document.querySelector('.js-email-error-message');
    email.input = document.querySelector('.js-email-input');

    password.field = document.querySelector('.js-password-field');
    password.errorMessage = document.querySelector('.js-password-error-message');
    password.input = document.querySelector('.js-password-input');

    signInButton = document.querySelector('.js-sign-in-button');
}
function enableListeners() {
    email.input.addEventListener('blur', function () {
        if (!isEmpty(email.input.value)) {
            if (!isValidEmailAddress(email.input.value)) {
                email.errorMessage = 'Invalid emailaddress';
            }
        } else {
            email.errorMessage = 'This field is required';
        }
        console.log(email.errorMessage);
    });
    password.field.addEventListener('blur', function () {
        isValidPassword(password.input);
    });
    signInButton.addEventListener('click', function () {});
}
const isValidEmailAddress = function (emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isValidPassword = function (password) {
    // Basis manier om e-mailadres te checken.
    return /^.\d*$/.test(password);
};
const isEmpty = function (fieldValue) {
    return !fieldValue || !fieldValue.length;
};
document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    getDOMElements();
    enableListeners();
    handleFloatingLabel();
    handlePasswordSwitcher();
});
