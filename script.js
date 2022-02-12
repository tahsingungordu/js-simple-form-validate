const errorValid = (input, errorMsg = null) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.nextElementSibling.innerHTML = errorMsg;
};

const successValid = (input) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const checkRequired = (inputs) => {
    inputs.forEach(input => {
        if (! input.value) {
            let label = document.querySelector('label[for="'+input.getAttribute('id')+'"]');
            errorValid(input, `The <strong>${label.innerText}</strong> field is required.`);
        } else {
            successValid(input);
        }
    });
};

const checkEmail = (input) => {
    if (input.classList.contains('is-invalid')) {
        return false;
    }

    if (! validateEmail(input.value)) {
        errorValid(inputEmail, 'Incorrect email format.');
    } else {
        successValid(inputEmail);
    }
}

const checkLenght = (input, minValue = null, maxValue = null) => {
    if (input.classList.contains('is-invalid')) {
        return false;
    }

    const inputString = String(input.value);

    if (minValue && inputString.length < minValue) {
        errorValid(input, `Must be at least ${minValue} characters.`);

        return false;
    }

    if (maxValue && inputString.length > maxValue) {
        errorValid(input, `Must be a maximum of ${maxValue} characters.`);

        return false;
    }

    successValid(input);

}

const checkRePassword = (input, reInput) => {
    if (input.classList.contains('is-invalid')) {
        return false;
    }

    if (input.value != reInput.value) {
        errorValid(input);
        errorValid(reInput, `Passwords do not match.`);
    } else {
        if (input.value) {
            successValid(input);
            successValid(reInput);
        }
    }
}

function submitForm(e) {
    e.preventDefault();

    checkRequired([inputUsername, inputEmail, inputPassword, inputRePassword]);
    checkEmail(inputEmail);
    checkLenght(inputUsername, null, 5);
    checkLenght(inputPassword, 6);
    checkRePassword(inputPassword, inputRePassword);
}

const inputUsername = document.querySelector('#formUser');
const inputEmail = document.querySelector('#formEmail');
const inputPassword = document.querySelector('#formPassword');
const inputRePassword = document.querySelector('#formRePassword');

document.querySelector('#js-add-form').addEventListener('submit', submitForm);