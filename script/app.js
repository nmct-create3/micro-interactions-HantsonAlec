let email = {},
    password = {},
    signInButton,
    passwordOptions = ['text', 'password'],
    passwordInput,
    toggle;
function handleFloatingLabel()
{
    email.input.addEventListener('blur', function () {
        if (!isEmpty(email.input.value))
        {
            email.field.classList.add('is-floating');
            console.log('floating')
        } else
        {
            email.field.classList.remove('is-floating');
            console.log('not floating')
        }
    });

    password.input.addEventListener('blur', function () {
        if (!isEmpty(password.input.value))
        {
            password.field.classList.add('is-floating');
        } else
        {
            password.field.classList.remove('is-floating');
        }
    });    
}

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
        if (isEmpty(email.input.value) && !isValidEmailAddress(email.input.value)) { 
            addErrors(email.field, email.errorMessage, "This field is required");
            email.input.addEventListener('input', doubleCheckEmailAddress);
        } else {
            if (!isEmpty(email.input.value)) { 
                //Als alles oke is dan mag het weg
                removeErrors(email.field, email.errorMessage,'Email');
                email.input.removeEventListener('input', doubleCheckEmailAddress);
            }
        }
    });
    password.input.addEventListener('blur', function () {
        if (isEmpty(password.input.value) && !isValidPassword(password.input.value)) { 
            addErrors(password.field, password.errorMessage, "This field is required");
            password.input.addEventListener('input', doubleCheckPassword);
        } else {
            if (!isEmpty(password.input.value)) { 
                //Als alles oke is dan mag het weg
                removeErrors(password.field, password.errorMessage,'Password');
                password.input.removeEventListener('input', doubleCheckPassword);
            }
        }
    });
    signInButton.addEventListener('click', function (e)
    {
        let validEmail = false;
        let validPw = false;
        if (isEmpty(email.input.value) && !isValidEmailAddress(email.input.value)) { 
            addErrors(email.field, email.errorMessage, "This field is required");
            email.input.addEventListener('input', doubleCheckEmailAddress);
        } else {
            if (!isEmpty(email.input.value)) { 
                //Als alles oke is dan mag het weg
                validEmail = true;
                removeErrors(email.field, email.errorMessage,'Email');
                email.input.removeEventListener('input', doubleCheckEmailAddress);
            }
        }
        if (isEmpty(password.input.value) && !isValidPassword(password.input.value)) { 
            addErrors(password.field, password.errorMessage, "This field is required");
            password.input.addEventListener('input', doubleCheckPassword);
        } else {
            if (!isEmpty(password.input.value)) { 
                //Als alles oke is dan mag het weg
                validPw = true;
                removeErrors(password.field, password.errorMessage,'Password');
                password.input.removeEventListener('input', doubleCheckPassword);
            }
        }
        if (validEmail && validPw)
        {
            e.preventDefault();
            console.log(email.input.value)
            console.log(password.input.value)
            console.log("OK")
        } else
        {
            e.preventDefault();
            console.log(email.input.value)
            console.log(password.input.value)
            console.log("NOK")
        }
    });
}
const doubleCheckEmailAddress = function () {
    if (!isEmpty(email.input.value) && isValidEmailAddress(email.input.value)) {
        removeErrors(email.field, email.errorMessage,'Email');
        email.input.removeEventListener('input', doubleCheckEmailAddress);
    } else {
        addErrors(email.field, email.errorMessage, "This email is incorrect");
    }
}
const doubleCheckPassword = function () {
    if (!isEmpty(password.input.value) && isValidPassword(password.input.value)) {
        removeErrors(password.field, password.errorMessage,'Password');
        password.input.removeEventListener('input', doubleCheckPassword);
    } else {
        addErrors(password.field, password.errorMessage, "This password is incorrect");
    }
}
const addErrors = function (formfield,errorField, errorMessage) {
    formfield.classList.add('has-error');
    errorField.style.display = 'block';
    errorField.innerHTML = errorMessage;
 }
const removeErrors = function (formfield,errorField,message) {
    formfield.classList.remove('has-error');
    //TODO: toggle dit met class (u-block/u-none)
    errorField.innerHTML = message;
    errorField.style.display = 'block';
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
